import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PolicyPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/en/policies/${slug}`);
}

export function generateStaticParams() {
  return [
    { slug: "privacy" },
    { slug: "terms" },
    { slug: "cancellation" },
    { slug: "conduct" },
  ];
}
