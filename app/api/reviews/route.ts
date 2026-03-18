import { NextResponse } from "next/server";

import { getDefaultReviews } from "@/content/site";
import type { Review } from "@/types/marketing";

type GooglePlaceDetailsReview = {
  publishTime?: string;
  rating?: number;
  text?: {
    text?: string;
    languageCode?: string;
  };
  originalText?: {
    text?: string;
    languageCode?: string;
  };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type GooglePlaceDetailsResponse = {
  reviews?: GooglePlaceDetailsReview[];
};

type ReviewsApiResponse = {
  source: "google" | "fallback";
  reviews: Review[];
  reason?: string;
};

const REVIEWS_CACHE_CONTROL = "public, s-maxage=21600, stale-while-revalidate=86400";
const GOOGLE_REVIEWS_TIMEOUT_MS = 8_000;

function normalizedRating(value?: number): 1 | 2 | 3 | 4 | 5 {
  const rounded = Math.round(value ?? 5);
  const clamped = Math.min(5, Math.max(1, rounded));
  return clamped as 1 | 2 | 3 | 4 | 5;
}

function createReviewId(review: GooglePlaceDetailsReview, index: number) {
  const authorToken = review.authorAttribution?.displayName
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const publishToken = review.publishTime
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `google-review-${authorToken || "google-user"}-${publishToken || index + 1}`;
}

function fallbackResponse(reason: string) {
  const payload: ReviewsApiResponse = {
    source: "fallback",
    reviews: getDefaultReviews(),
    reason,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": REVIEWS_CACHE_CONTROL,
    },
  });
}

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const rawPlaceId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !rawPlaceId) {
    return fallbackResponse("Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID");
  }

  const placeId = rawPlaceId.replace(/^places\//, "");
  const url = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews.rating,reviews.text,reviews.originalText,reviews.publishTime,reviews.authorAttribution",
      },
      signal: AbortSignal.timeout(GOOGLE_REVIEWS_TIMEOUT_MS),
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!response.ok) {
      return fallbackResponse(`Google request failed with status ${response.status}`);
    }

    const data = (await response.json()) as GooglePlaceDetailsResponse;
    const mappedReviews: Review[] = (data.reviews ?? []).map((review, index) => ({
      id: createReviewId(review, index),
      memberName: review.authorAttribution?.displayName ?? "Google user",
      quote: review.text?.text?.trim() || review.originalText?.text?.trim() || "No written review provided.",
      rating: normalizedRating(review.rating),
      avatar: review.authorAttribution?.photoUri,
      source: "google",
      sourceUrl: review.authorAttribution?.uri,
    }));

    const sortedReviews = mappedReviews
      .filter((review) => review.rating >= 4)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    if (sortedReviews.length === 0) {
      return fallbackResponse("Google returned zero reviews");
    }

    const payload: ReviewsApiResponse = {
      source: "google",
      reviews: sortedReviews,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": REVIEWS_CACHE_CONTROL,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.name === "AbortError" || error.name === "TimeoutError")
    ) {
      return fallbackResponse("Google request timed out");
    }

    const reason = error instanceof Error ? error.message : "Unknown error";
    return fallbackResponse(`Unexpected error: ${reason}`);
  }
}
