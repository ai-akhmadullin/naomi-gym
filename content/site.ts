import { CONTACT_ADDRESS_LINES } from "@/lib/constants";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import type {
  Benefit,
  FaqItem,
  GalleryImage,
  LocationInfo,
  NavItem,
  PricingPlan,
  Review,
  Trainer,
} from "@/types/marketing";

export type SiteDictionary = {
  metadata: {
    description: string;
  };
  localeNames: Record<Locale, string>;
  siteTagline: string;
  navItems: NavItem[];
  header: {
    primaryNavLabel: string;
    joinNow: string;
    languageSwitcherLabel: string;
  };
  mobileNav: {
    openLabel: string;
    closeLabel: string;
    menuTitle: string;
    menuDescription: string;
    navLabel: string;
  };
  openStatus: {
    openNow: string;
    closed: string;
    closesAt: string;
    opensAt: string;
  };
  quickActions: {
    chatLabel: string;
    closeLabel: string;
    callLabel: string;
    zaloLabel: string;
    whatsappLabel: string;
    messengerLabel: string;
  };
  footer: {
    quickLinksTitle: string;
    contactTitle: string;
    facebookLabel: string;
    instagramLabel: string;
    joinNow: string;
    rightsLabel: string;
  };
  home: {
    hero: {
      eyebrow: string;
      titlePrefix: string;
      titleHighlight: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      /** Figure + caption pairs for the strip beneath the headline. */
      stats: Array<{ value: string; label: string }>;
    };
    /** Short proof phrases for the scrolling band under the hero. */
    ticker: {
      label: string;
      items: string[];
    };
    benefits: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Benefit[];
    };
    pricing: {
      eyebrow: string;
      title: string;
      subtitle: string;
      highlightLabel: string;
      note: string;
      plans: PricingPlan[];
    };
    trainers: {
      eyebrow: string;
      title: string;
      subtitle: string;
      scrollerLabel: string;
      experienceLabel: string;
      list: Trainer[];
    };
    gallery: {
      eyebrow: string;
      title: string;
      subtitle: string;
      scrollerLabel: string;
      images: GalleryImage[];
      lightbox: {
        close: string;
        prev: string;
        next: string;
        counter: string;
      };
    };
    location: {
      eyebrow: string;
      title: string;
      subtitle: string;
      addressLabel: string;
      hoursLabel: string;
      mapTitle: string;
      getDirectionsLabel: string;
      info: LocationInfo;
    };
    reviews: {
      eyebrow: string;
      title: string;
      subtitle: string;
      scrollerLabel: string;
      starsLabelTemplate: string;
      readOnGoogle: string;
      googleReview: string;
      /** Label for the link out to the full Google listing. */
      allReviewsLabel: string;
      list: Review[];
    };
    faq: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: FaqItem[];
    };
    contact: {
      eyebrow: string;
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      contactLabel: string;
      contactPlaceholder: string;
      planLabel: string;
      planOptions: string[];
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      sendingLabel: string;
      successTitle: string;
      successMessage: string;
      errorMessage: string;
      requiredError: string;
      sideTitle: string;
      sideText: string;
      callLabel: string;
      messengerLabel: string;
      directionsLabel: string;
      reassurance: string;
      privacyNote: string;
    };
  };
  policies: {
    privacyLinkLabel: string;
    backToHome: string;
    privacy: {
      title: string;
      intro: string;
      sections: Array<{ heading: string; body: string }>;
    };
  };
  notFound: {
    title: string;
    description: string;
    join: string;
    backHome: string;
  };
};

const SHARED_REVIEWS: Review[] = [
  {
    id: "review-alison-otoru",
    memberName: "Alison Otoru [Ropp]",
    quote:
      "GREAT GYM!! we went around to quite a few gyms to pick the best one for us and this was definitely it! It is a little further out from where we are staying - a 30min walk, but worth it. We use the walk as our cardio anyway while getting in some sunshine before and after workout! You could easily bike here quicker if you have one. It's never too busy like other ones we went to, and the price is great for what you get! Huge bonus for me is there is a little monkey bar area and a boxing bag for my husband. Also room to do circuit training as well. It is 2 floors and all the weights and machines are in good condition. Wear and tear is normal, but we were happily surprised that everything is in good working condition. Some other gyms this was not the case. No AC but they have fans and open windows and door for ventilation. Helps you get a good sweat on anyway. It has never been unbearable for us! We got the monthly membership for a shocking 300k each! Totally worth it! Highly recommend this place!",
    rating: 5,
    source: "local",
  },
  {
    id: "review-vivian-bartz",
    memberName: "Vivian Bartz",
    quote:
      "Great value for money. Both the day pass and the monthly membership are very affordable. The gym is rarely overcrowded, and most of the equipment and machines do the job. Since the gym is spread over two floors, it doesn't feel cramped. I tried 2 or 3 other gyms in An Thuong before, but this one was my favorite. I highly recommend it if you're looking for a solid place to train - not just a spot where people go to shoot Instagram stories.",
    rating: 5,
    source: "local",
  },
  {
    id: "review-joey",
    memberName: "Joey",
    quote:
      "Price was great at 40k for day pass 300k for 1 month I was paying 100k plus for a day pass at other gyms but this Gym was great compared to the other gyms around town I will come back again. no ac only fans you will sweat but they have a lot of equipment to use upstairs and ground floor.",
    rating: 5,
    source: "local",
  },
  {
    id: "review-karin-poravne",
    memberName: "Karin Poravne",
    quote:
      "One of the best gyms I have ever been. It is 2 floor place, so well equipped, you have everything you can think of. I have been doing amazing workouts here because of the options they offer. The young man who is running the place is such a legend, always happy to help and give you instructions for free :) Always nice music, clean, good opening hours and the price is just a big bonus. We paid 300.000 for one month, drop in is 50.000 (smth like that). Amazing :) 5/5",
    rating: 5,
    source: "local",
  },
  {
    id: "review-curtis-griffith",
    memberName: "Curtis Griffith",
    quote:
      "Best gym I've been to in Da Nang so far. Bumper plates and great equipment. Only 40k for a day pass.",
    rating: 5,
    source: "local",
  },
];

const SITE_CONTENT: Record<Locale, SiteDictionary> = {
  en: {
    metadata: {
      description:
        "Naomi Gym is a two-floor gym on Lê Văn Hiến in Khuê Mỹ, Đà Nẵng. Free weights, racks and machines, open from 5 AM. Day pass 40,000đ, monthly 300,000đ, no contract.",
    },
    localeNames: {
      en: "English",
      vi: "Tiếng Việt",
    },
    siteTagline: "Two floors on Lê Văn Hiến, Đà Nẵng",
    navItems: [
      { label: "Home", href: "#home", kind: "section" },
      { label: "Pricing", href: "#pricing", kind: "section" },
      { label: "Gallery", href: "#gallery", kind: "section" },
      { label: "Trainers", href: "#trainers", kind: "section" },
      { label: "Location", href: "#location", kind: "section" },
      { label: "Reviews", href: "#reviews", kind: "section" },
      { label: "Contact", href: "#contact", kind: "section" },
    ],
    header: {
      primaryNavLabel: "Primary",
      joinNow: "Join Now",
      languageSwitcherLabel: "Language",
    },
    mobileNav: {
      openLabel: "Open navigation menu",
      closeLabel: "Close navigation menu",
      menuTitle: "Menu",
      menuDescription: "Mobile navigation links for Naomi Gym.",
      navLabel: "Mobile",
    },
    openStatus: {
      openNow: "Open now",
      closed: "Closed",
      closesAt: "closes {time}",
      opensAt: "opens {time}",
    },
    quickActions: {
      chatLabel: "Chat with us",
      closeLabel: "Close",
      callLabel: "Call",
      zaloLabel: "Zalo",
      whatsappLabel: "WhatsApp",
      messengerLabel: "Messenger",
    },
    footer: {
      quickLinksTitle: "Quick Links",
      contactTitle: "Contact",
      facebookLabel: "Facebook",
      instagramLabel: "Instagram",
      joinNow: "Join Now",
      rightsLabel: "All rights reserved.",
    },
    home: {
      hero: {
        eyebrow: "Da Nang · An Thượng & Mỹ Khê",
        titlePrefix: "Train stronger at",
        titleHighlight: "Naomi Gym",
        description:
          "Two floors of free weights, racks and machines in Khuê Mỹ, open from 5 AM. A day pass is 40k and a month is 300k, paid at the desk — no contract and no joining fee.",
        primaryCta: "Join Now",
        secondaryCta: "View Plans",
        stats: [
          { value: "40k", label: "Day pass" },
          { value: "300k", label: "Per month" },
          { value: "2", label: "Training floors" },
          { value: "5 AM", label: "Doors open" },
        ],
      },
      ticker: {
        label: "What you get at Naomi Gym",
        items: [
          "Open from 5 AM",
          "Two floors",
          "Day pass 40k",
          "Month 300k",
          "No contract",
          "Free help with your form",
          "Squat racks & bumper plates",
          "Walk in, no booking",
        ],
      },
      benefits: {
        eyebrow: "The gym",
        title: "What's on the two floors",
        subtitle: "The equipment, the hours and the things worth knowing before you come.",
        items: [
          {
            id: "benefit-floors",
            icon: "layers",
            title: "Two floors",
            description:
              "Free weights and machines on the ground floor. Legs machines and functional training upstairs.",
          },
          {
            id: "benefit-kit",
            icon: "dumbbell",
            title: "Racks, platforms, bumper plates",
            description:
              "Squat racks, deadlift platforms, bumper plates, benches, cables and a heavy bag — all of it in working order.",
          },
          {
            id: "benefit-value",
            icon: "sparkles",
            title: "No contract, no joining fee",
            description:
              "40k buys a day, 300k buys a month. You pay at the desk on the day, so there is nothing to sign and nothing to cancel.",
          },
          {
            id: "benefit-coaching",
            icon: "heart-handshake",
            title: "Free help with your form",
            description:
              "The owner is usually on the floor and will talk you through a lift if you ask. There's no charge for it.",
          },
          {
            id: "benefit-hours",
            icon: "sunrise",
            title: "Open early, seven days",
            description:
              "5 AM to 8:30 PM Monday to Saturday, so you can train before work. Sunday runs in two blocks, morning and afternoon.",
          },
          {
            id: "benefit-space",
            icon: "users",
            title: "Rarely crowded",
            description:
              "Two floors means there's almost always a free rack or bench. Mornings and after 7:30 PM are the quietest.",
          },
        ],
      },
      pricing: {
        eyebrow: "Memberships",
        title: "40k a day, 300k a month",
        subtitle: "Both are paid at the desk when you arrive. There is no contract, no joining fee and nothing to cancel.",
        highlightLabel: "Most Popular",
        note: "No sign-up fee · No contract · Pay at the gym",
        plans: [
          {
            id: "daily",
            name: "Day Pass",
            priceLabel: "40.000 VND",
            billingPeriodLabel: "day",
            highlight: false,
            ctaLabel: "Get a day pass",
            tagline: "Good for one day",
            features: [
              "Both floors and all the equipment",
              "Pay at the desk when you arrive",
              "Nothing to sign",
            ],
          },
          {
            id: "monthly",
            name: "Monthly",
            priceLabel: "300.000 VND",
            billingPeriodLabel: "month",
            highlight: true,
            ctaLabel: "Become a member",
            tagline: "30 days from the day you pay",
            features: [
              "Everything in the day pass",
              "Cheaper than 8 day passes",
              "No contract — it just runs out",
              "Free help with your form",
            ],
          },
        ],
      },
      trainers: {
        eyebrow: "The team",
        title: "Meet Our Trainers",
        subtitle: "Who's on the floor and what they work on.",
        scrollerLabel: "Trainers",
        experienceLabel: "{years}+ years experience",
        list: [
          {
            id: "marcus-thompson",
            name: "Marcus Thompson",
            specialty: "Strength Training",
            bio: "10+ years helping athletes and enthusiasts build strength and power.",
            experienceYears: 10,
          },
          {
            id: "sarah-chen",
            name: "Sarah Chen",
            specialty: "Yoga & Flexibility",
            bio: "Certified yoga instructor focused on mindful movement and recovery.",
            experienceYears: 8,
          },
          {
            id: "jordan-hayes",
            name: "Jordan Hayes",
            specialty: "HIIT & Cardio",
            bio: "High-energy coach dedicated to helping members push past limits.",
            experienceYears: 7,
          },
        ],
      },
      gallery: {
        eyebrow: "The space",
        title: "Inside the gym",
        subtitle: "A look at both floors and the equipment on them.",
        scrollerLabel: "Facility gallery",
        images: [
          {
            id: "gallery-first-floor",
            src: "/images/gallery/first-floor.jpg",
            alt: "The ground floor looking towards the back, machines on the left and treadmills on the right",
            category: "Ground floor",
          },
          {
            id: "gallery-second-floor",
            src: "/images/gallery/second-floor.jpg",
            alt: "Upstairs, with plate-loaded machines down one side of the turf walkway",
            category: "Upstairs",
          },
          {
            id: "gallery-squat-racks",
            src: "/images/gallery/squat-racks.jpg",
            alt: "Squat racks with loaded barbells and bumper plates on the rubber floor",
            category: "Racks",
          },
          {
            id: "gallery-core-training",
            src: "/images/gallery/core-training.jpg",
            alt: "Benches, a rower and cable stations under the Fitter Healthier Happier wall",
            category: "Functional",
          },
          {
            id: "gallery-boxing-bag",
            src: "/images/gallery/boxing-bag.jpg",
            alt: "A heavy bag hanging over the turf beside the stairwell",
            category: "Boxing",
          },
          {
            id: "gallery-treadmills",
            src: "/images/gallery/treadmills.jpg",
            alt: "A row of treadmills along the concrete wall",
            category: "Cardio",
          },
        ],
        lightbox: {
          close: "Close",
          prev: "Previous photo",
          next: "Next photo",
          counter: "{current} / {total}",
        },
      },
      location: {
        eyebrow: "Find us",
        title: "Visit Us",
        subtitle: "We're on Lê Văn Hiến in Khuê Mỹ, south of An Thượng.",
        addressLabel: "Address",
        hoursLabel: "Hours",
        mapTitle: "Naomi Gym location map",
        getDirectionsLabel: "Get directions",
        info: {
          addressLines: CONTACT_ADDRESS_LINES,
          openingHours: [
            {
              dayLabel: "Monday - Saturday",
              ranges: ["5:00 AM - 8:30 PM"],
            },
            {
              dayLabel: "Sunday",
              ranges: ["6:00 AM - 10:30 AM", "2:00 PM - 7:00 PM"],
            },
          ],
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5703472270934!2d108.2444807!3d16.0358665!2m3!1f0!3f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142174f8140feb9%3A0x97f5a939db82f73f!2sNaomi%20Gym!5e0!3m2!1sen!2s!4v1772186331990!5m2!1sen!2s",
          directionsUrl: "https://maps.app.goo.gl/fKSy4mctAHiw6hqm6",
        },
      },
      reviews: {
        eyebrow: "Reviews",
        title: "What Our Members Say",
        subtitle: "Unedited Google reviews from people who train here.",
        scrollerLabel: "Member reviews",
        starsLabelTemplate: "{rating} out of 5 stars",
        readOnGoogle: "Read on Google",
        googleReview: "Google review",
        allReviewsLabel: "See all reviews on Google",
        list: SHARED_REVIEWS,
      },
      faq: {
        eyebrow: "Good to know",
        title: "Frequently Asked Questions",
        subtitle: "The things people ask at the desk.",
        items: [
          {
            id: "faq-plans",
            question: "What membership options do you offer?",
            answer:
              "We keep it simple: a day pass (40,000 VND/day) and a monthly membership (300,000 VND/month). No joining fee and no contract.",
          },
          {
            /* Two of the five reviews on this page raise the lack of air
               conditioning. Answering it here costs nothing and stops it being
               a surprise on someone's first visit. */
            id: "faq-air-con",
            question: "Is there air conditioning?",
            answer:
              "No — the gym runs on fans with the windows and doors open. You will sweat, so bring water.",
          },
          {
            id: "faq-hours",
            question: "What are your opening hours?",
            answer:
              "Monday to Saturday: 5:00 AM - 8:30 PM. Sunday: 6:00 AM - 10:30 AM and 2:00 PM - 7:00 PM.",
          },
          {
            id: "faq-location",
            question: "Where is Naomi Gym located?",
            answer:
              "Lô 22 Lê Văn Hiến, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng. It's on the main road south of An Thượng.",
          },
          {
            id: "faq-crowded",
            question: "When is the gym less crowded?",
            answer:
              "Mornings and after about 7:30 PM are the quietest. Late afternoon and early evening are the busiest, though with two floors you can usually still get a rack.",
          },
          {
            id: "faq-first-visit",
            question: "What should I bring on my first visit?",
            answer:
              "Bring comfortable workout clothes, clean indoor shoes, and water. Just turn up during opening hours — our team will help you get started.",
          },
        ],
      },
      contact: {
        eyebrow: "Join us",
        title: "Ready to train? Come say hi.",
        subtitle:
          "Walk in any time we're open — you don't need to book. Or send a message and we'll reply.",
        nameLabel: "Your name",
        namePlaceholder: "e.g. Alex",
        contactLabel: "Phone or email",
        contactPlaceholder: "So we can reply to you",
        planLabel: "I'm interested in",
        planOptions: ["Monthly membership", "Day pass", "Not sure yet"],
        messageLabel: "Message (optional)",
        messagePlaceholder: "Any questions? Tell us when you'd like to start.",
        submitLabel: "Send message",
        sendingLabel: "Sending…",
        successTitle: "Message sent!",
        successMessage: "Thanks for reaching out — we'll reply soon. See you at the gym!",
        errorMessage: "Something went wrong. Please try again, or call us directly.",
        requiredError: "Please add your name and a way to reach you.",
        sideTitle: "Prefer to talk?",
        sideText: "Call or message us — we usually reply within a few hours.",
        callLabel: "Call us",
        messengerLabel: "Message on Facebook",
        directionsLabel: "Get directions",
        reassurance: "Look around first · No contract · Pay at the desk",
        privacyNote: "We'll only use your details to reply.",
      },
    },
    policies: {
      privacyLinkLabel: "Privacy Policy",
      backToHome: "Back to Home",
      privacy: {
        title: "Privacy Policy",
        intro:
          "This page explains what personal information Naomi Gym collects through this website, and how we use it. In short: we only collect what you choose to send us, and we use it only to reply to you.",
        sections: [
          {
            heading: "What we collect",
            body: "When you use the contact form on this website, we collect the name and the phone number or email you provide, together with any message you write. We don't ask you to create an account, and we don't collect any payment details on this website.",
          },
          {
            heading: "How we use it",
            body: "We use your details only to reply to your enquiry and to help you get started at the gym. We never sell your information, and we don't share it with third parties for marketing.",
          },
          {
            heading: "Cookies & third parties",
            body: "This website doesn't use advertising or tracking cookies. The embedded Google map and the links to our social pages are provided by those services under their own privacy terms.",
          },
          {
            heading: "Keeping and deleting your data",
            body: "We keep enquiry messages only as long as we need them to respond and follow up. If you'd like us to delete your details, just ask using the contact details on this site.",
          },
          {
            heading: "Contact us",
            body: "If you have any question about your personal data — or want it removed — please reach us using the phone number or Facebook page listed on this website.",
          },
        ],
      },
    },
    notFound: {
      title: "Page not found",
      description: "The page you requested does not exist yet. Return home or get in touch to join.",
      join: "Join Now",
      backHome: "Back to Home",
    },
  },
  vi: {
    metadata: {
      description:
        "Naomi Gym – phòng tập hai tầng trên đường Lê Văn Hiến, Khuê Mỹ, Đà Nẵng. Đầy đủ tạ rời, rack và máy tập, mở cửa từ 5 giờ sáng. Vé ngày 40.000đ, gói tháng 300.000đ, không cần hợp đồng.",
    },
    localeNames: {
      en: "English",
      vi: "Tiếng Việt",
    },
    siteTagline: "Phòng tập hai tầng trên đường Lê Văn Hiến, Đà Nẵng",
    navItems: [
      { label: "Trang chủ", href: "#home", kind: "section" },
      { label: "Gói tập", href: "#pricing", kind: "section" },
      { label: "Hình ảnh", href: "#gallery", kind: "section" },
      { label: "Huấn luyện viên", href: "#trainers", kind: "section" },
      { label: "Địa điểm", href: "#location", kind: "section" },
      { label: "Đánh giá", href: "#reviews", kind: "section" },
      { label: "Liên hệ", href: "#contact", kind: "section" },
    ],
    header: {
      primaryNavLabel: "Điều hướng chính",
      joinNow: "Đăng ký ngay",
      languageSwitcherLabel: "Ngôn ngữ",
    },
    mobileNav: {
      openLabel: "Mở menu điều hướng",
      closeLabel: "Đóng menu điều hướng",
      menuTitle: "Menu",
      menuDescription: "Menu điều hướng của Naomi Gym.",
      navLabel: "Điều hướng di động",
    },
    openStatus: {
      openNow: "Đang mở cửa",
      closed: "Đã đóng cửa",
      closesAt: "đóng lúc {time}",
      opensAt: "mở lúc {time}",
    },
    quickActions: {
      chatLabel: "Nhắn tin cho tụi mình",
      closeLabel: "Đóng",
      callLabel: "Gọi",
      zaloLabel: "Zalo",
      whatsappLabel: "WhatsApp",
      messengerLabel: "Messenger",
    },
    footer: {
      quickLinksTitle: "Liên kết nhanh",
      contactTitle: "Liên hệ",
      facebookLabel: "Facebook",
      instagramLabel: "Instagram",
      joinNow: "Đăng ký ngay",
      rightsLabel: "Mọi quyền được bảo lưu.",
    },
    home: {
      hero: {
        eyebrow: "Đà Nẵng · An Thượng & Mỹ Khê",
        titlePrefix: "Khỏe hơn mỗi ngày cùng",
        titleHighlight: "Naomi Gym",
        description:
          "Hai tầng đầy đủ tạ rời, rack và máy tập ở Khuê Mỹ, mở cửa từ 5 giờ sáng. Vé ngày 40k, gói tháng 300k, thanh toán tại quầy — không hợp đồng, không phí gia nhập.",
        primaryCta: "Đăng ký ngay",
        secondaryCta: "Xem bảng giá",
        stats: [
          { value: "40k", label: "Vé ngày" },
          { value: "300k", label: "Gói tháng" },
          { value: "2", label: "Tầng tập" },
          { value: "5:00", label: "Mở cửa từ" },
        ],
      },
      ticker: {
        label: "Tập ở Naomi Gym, bạn có",
        items: [
          "Mở cửa từ 5 giờ sáng",
          "Hai tầng rộng rãi",
          "Vé ngày 40k",
          "Gói tháng 300k",
          "Không hợp đồng",
          "Hướng dẫn kỹ thuật miễn phí",
          "Rack squat & tạ bumper",
          "Đến là tập, không cần đặt lịch",
        ],
      },
      benefits: {
        eyebrow: "Phòng tập",
        title: "Hệ thống máy tập ở 2 tầng",
        subtitle: "Thiết bị, giờ giấc và vài điều nên biết trước khi ghé.",
        items: [
          {
            id: "benefit-floors",
            icon: "layers",
            title: "Hai tầng",
            description:
              "Tầng trệt là khu tạ rời và máy tập. Tầng trên có máy tập chân và khu functional.",
          },
          {
            id: "benefit-kit",
            icon: "dumbbell",
            title: "Rack squat, sàn deadlift, tạ bumper",
            description:
              "Rack squat, sàn deadlift, tạ bumper, ghế đẩy, máy cáp và bao cát — thiết bị nào cũng dùng tốt.",
          },
          {
            id: "benefit-value",
            icon: "sparkles",
            title: "Không hợp đồng, không phí gia nhập",
            description:
              "Vé ngày 40k, gói tháng 300k, thanh toán tại quầy. Không phải ký gì, cũng chẳng có gì để hủy.",
          },
          {
            id: "benefit-coaching",
            icon: "heart-handshake",
            title: "Hướng dẫn kỹ thuật miễn phí",
            description:
              "Chủ phòng hầu như lúc nào cũng có mặt ở sàn tập, bạn cứ hỏi là được chỉ tận tình từng động tác — hoàn toàn miễn phí.",
          },
          {
            id: "benefit-hours",
            icon: "sunrise",
            title: "Mở sớm, cả tuần không nghỉ",
            description:
              "Thứ Hai đến Thứ Bảy mở từ 5:00 đến 20:30, tha hồ tập trước giờ đi làm. Chủ Nhật mở hai khung sáng và chiều.",
          },
          {
            id: "benefit-space",
            icon: "users",
            title: "Ít khi phải chờ máy",
            description:
              "Nhờ có hai tầng nên hầu như lúc nào cũng còn rack hoặc ghế trống. Vắng nhất là buổi sáng và sau 19:30.",
          },
        ],
      },
      pricing: {
        eyebrow: "Gói hội viên",
        title: "40k một ngày, 300k một tháng",
        subtitle: "Đến tập thanh toán ngay tại quầy. Không hợp đồng, không phí gia nhập, không cần hủy gói.",
        highlightLabel: "Phổ biến nhất",
        note: "Không phí gia nhập · Không hợp đồng · Thanh toán tại phòng tập",
        plans: [
          {
            id: "daily",
            name: "Vé ngày",
            priceLabel: "40.000đ",
            billingPeriodLabel: "ngày",
            highlight: false,
            ctaLabel: "Mua vé ngày",
            tagline: "Tập thoải mái trong ngày",
            features: [
              "Dùng toàn bộ thiết bị ở cả hai tầng",
              "Thanh toán tại quầy khi đến",
              "Không cần đăng ký gì",
            ],
          },
          {
            id: "monthly",
            name: "Gói tháng",
            priceLabel: "300.000đ",
            billingPeriodLabel: "tháng",
            highlight: true,
            ctaLabel: "Đăng ký gói tháng",
            tagline: "Đủ 30 ngày tính từ ngày đăng ký",
            features: [
              "Đầy đủ quyền lợi như vé ngày",
              "Tập từ 8 ngày trở lên là lời hơn vé lẻ",
              "Không hợp đồng — hết hạn thì thôi",
              "Hướng dẫn kỹ thuật miễn phí",
            ],
          },
        ],
      },
      trainers: {
        eyebrow: "Đội ngũ",
        title: "Đội ngũ huấn luyện viên",
        subtitle: "Những người trực tiếp đứng phòng và thế mạnh của từng người.",
        scrollerLabel: "Huấn luyện viên",
        experienceLabel: "{years}+ năm kinh nghiệm",
        list: [
          {
            id: "marcus-thompson",
            name: "Marcus Thompson",
            specialty: "Huấn luyện sức mạnh",
            bio: "Hơn 10 năm giúp học viên và vận động viên xây nền tảng sức mạnh.",
            experienceYears: 10,
          },
          {
            id: "sarah-chen",
            name: "Sarah Chen",
            specialty: "Yoga & giãn cơ",
            bio: "HLV yoga có chứng chỉ, chú trọng hít thở, kiểm soát chuyển động và phục hồi cơ thể.",
            experienceYears: 8,
          },
          {
            id: "jordan-hayes",
            name: "Jordan Hayes",
            specialty: "HIIT & Cardio",
            bio: "HLV tràn đầy năng lượng, luôn đẩy bạn vượt qua giới hạn của chính mình.",
            experienceYears: 7,
          },
        ],
      },
      gallery: {
        eyebrow: "Không gian",
        title: "Bên trong phòng tập",
        subtitle: "Dạo một vòng qua hai tầng và các khu tập.",
        scrollerLabel: "Hình ảnh phòng tập",
        images: [
          {
            id: "gallery-first-floor",
            src: "/images/gallery/first-floor.jpg",
            alt: "Tầng trệt nhìn từ cửa vào, khu máy bên trái và dãy máy chạy bên phải",
            category: "Tầng trệt",
          },
          {
            id: "gallery-second-floor",
            src: "/images/gallery/second-floor.jpg",
            alt: "Tầng hai với dãy máy tạ đĩa chạy dọc lối cỏ nhân tạo",
            category: "Tầng hai",
          },
          {
            id: "gallery-squat-racks",
            src: "/images/gallery/squat-racks.jpg",
            alt: "Giàn squat với thanh đòn và bánh tạ trên sàn cao su",
            category: "Giàn tạ",
          },
          {
            id: "gallery-core-training",
            src: "/images/gallery/core-training.jpg",
            alt: "Ghế tập, máy chèo và khu cáp dưới bức tường Fitter Healthier Happier",
            category: "Functional",
          },
          {
            id: "gallery-boxing-bag",
            src: "/images/gallery/boxing-bag.jpg",
            alt: "Bao cát treo trên khu cỏ nhân tạo cạnh cầu thang",
            category: "Boxing",
          },
          {
            id: "gallery-treadmills",
            src: "/images/gallery/treadmills.jpg",
            alt: "Dãy máy chạy bộ dọc bức tường bê tông",
            category: "Cardio",
          },
        ],
        lightbox: {
          close: "Đóng",
          prev: "Ảnh trước",
          next: "Ảnh sau",
          counter: "{current} / {total}",
        },
      },
      location: {
        eyebrow: "Chỉ đường",
        title: "Ghé phòng tập",
        subtitle: "Naomi Gym nằm trên đường Lê Văn Hiến, Khuê Mỹ, phía nam khu An Thượng.",
        addressLabel: "Địa chỉ",
        hoursLabel: "Giờ mở cửa",
        mapTitle: "Bản đồ Naomi Gym",
        getDirectionsLabel: "Xem chỉ đường",
        info: {
          addressLines: CONTACT_ADDRESS_LINES,
          openingHours: [
            {
              dayLabel: "Thứ Hai - Thứ Bảy",
              ranges: ["5:00 - 20:30"],
            },
            {
              dayLabel: "Chủ Nhật",
              ranges: ["6:00 - 10:30", "14:00 - 19:00"],
            },
          ],
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5703472270934!2d108.2444807!3d16.0358665!2m3!1f0!3f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142174f8140feb9%3A0x97f5a939db82f73f!2sNaomi%20Gym!5e0!3m2!1sen!2s!4v1772186331990!5m2!1sen!2s",
          directionsUrl: "https://maps.app.goo.gl/fKSy4mctAHiw6hqm6",
        },
      },
      reviews: {
        eyebrow: "Đánh giá",
        title: "Khách tập nói gì về Naomi Gym",
        subtitle: "Đánh giá thật trên Google của khách đang tập tại đây.",
        scrollerLabel: "Đánh giá hội viên",
        starsLabelTemplate: "{rating} trên 5 sao",
        readOnGoogle: "Xem trên Google",
        googleReview: "Đánh giá Google",
        allReviewsLabel: "Xem tất cả đánh giá trên Google",
        list: SHARED_REVIEWS,
      },
      faq: {
        eyebrow: "Có thể bạn muốn biết",
        title: "Câu hỏi thường gặp",
        subtitle: "Những câu khách hay hỏi tại quầy.",
        items: [
          {
            id: "faq-plans",
            question: "Phòng gym có những gói tập nào?",
            answer:
              "Chỉ có hai lựa chọn: vé ngày 40.000đ và gói tháng 300.000đ. Không phí gia nhập, không hợp đồng.",
          },
          {
            id: "faq-air-con",
            question: "Phòng tập có máy lạnh không?",
            answer:
              "Không có — phòng dùng quạt và mở cửa cho thoáng. Tập sẽ ra mồ hôi nhiều, bạn nhớ mang theo nước nhé.",
          },
          {
            id: "faq-hours",
            question: "Giờ mở cửa của phòng gym là khi nào?",
            answer:
              "Thứ Hai đến Thứ Bảy: 5:00 - 20:30. Chủ Nhật: 6:00 - 10:30 và 14:00 - 19:00.",
          },
          {
            id: "faq-location",
            question: "Naomi Gym nằm ở đâu?",
            answer:
              "Lô 22 Lê Văn Hiến, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng. Nằm trên trục đường chính phía nam An Thượng.",
          },
          {
            id: "faq-crowded",
            question: "Khi nào phòng tập vắng hơn?",
            answer:
              "Vắng nhất là buổi sáng và sau khoảng 19:30. Chiều tối là giờ cao điểm, nhưng nhờ có hai tầng nên bạn vẫn thường tìm được rack trống.",
          },
          {
            id: "faq-first-visit",
            question: "Lần đầu đến tập cần mang theo gì?",
            answer:
              "Chỉ cần đồ tập thoải mái, giày sạch để mang trong phòng và nước uống. Cứ ghé trong giờ mở cửa, sẽ có người hướng dẫn bạn ngay.",
          },
        ],
      },
      contact: {
        eyebrow: "Bắt đầu thôi",
        title: "Sẵn sàng chưa? Bắt đầu tập luyện nào!",
        subtitle:
          "Phòng mở cửa là bạn cứ ghé thẳng, không cần đặt trước. Hoặc để lại lời nhắn, tụi mình sẽ trả lời sớm.",
        nameLabel: "Tên của bạn",
        namePlaceholder: "Ví dụ: An",
        contactLabel: "Số điện thoại hoặc email",
        contactPlaceholder: "Để tụi mình liên hệ lại cho bạn",
        planLabel: "Bạn đang quan tâm",
        planOptions: ["Gói tháng", "Vé ngày", "Chưa quyết định"],
        messageLabel: "Lời nhắn (không bắt buộc)",
        messagePlaceholder: "Có thắc mắc gì cứ nhắn, hoặc cho tụi mình biết bạn muốn bắt đầu khi nào.",
        submitLabel: "Gửi lời nhắn",
        sendingLabel: "Đang gửi…",
        successTitle: "Đã gửi rồi nhé!",
        successMessage: "Cảm ơn bạn đã nhắn — tụi mình sẽ trả lời sớm. Hẹn gặp bạn ở phòng tập!",
        errorMessage: "Có lỗi xảy ra rồi. Bạn thử gửi lại, hoặc gọi thẳng cho phòng tập nhé.",
        requiredError: "Bạn nhớ điền tên và số điện thoại hoặc email nhé.",
        sideTitle: "Thích gọi điện hơn?",
        sideText: "Gọi hay nhắn tin đều được — tụi mình thường trả lời trong vài tiếng.",
        callLabel: "Gọi ngay",
        messengerLabel: "Nhắn qua Facebook",
        directionsLabel: "Xem chỉ đường",
        reassurance: "Ghé xem phòng trước · Không hợp đồng · Thanh toán tại quầy",
        privacyNote: "Thông tin bạn gửi chỉ dùng để liên hệ lại, không dùng vào việc khác.",
      },
    },
    policies: {
      privacyLinkLabel: "Chính sách bảo mật",
      backToHome: "Quay về trang chủ",
      privacy: {
        title: "Chính sách bảo mật",
        intro:
          "Trang này giải thích Naomi Gym thu thập những thông tin cá nhân nào qua website và sử dụng ra sao. Nói ngắn gọn: chúng tôi chỉ thu thập những gì bạn chủ động gửi và chỉ dùng để phản hồi bạn.",
        sections: [
          {
            heading: "Chúng tôi thu thập gì",
            body: "Khi bạn dùng biểu mẫu liên hệ trên website, chúng tôi thu thập tên và số điện thoại hoặc email bạn cung cấp, cùng nội dung tin nhắn bạn viết. Chúng tôi không yêu cầu bạn tạo tài khoản và không thu thập thông tin thanh toán trên website này.",
          },
          {
            heading: "Chúng tôi dùng để làm gì",
            body: "Chúng tôi chỉ dùng thông tin của bạn để phản hồi yêu cầu và hỗ trợ bạn bắt đầu tập. Chúng tôi không bao giờ bán thông tin và không chia sẻ cho bên thứ ba vì mục đích tiếp thị.",
          },
          {
            heading: "Cookie & bên thứ ba",
            body: "Website này không dùng cookie quảng cáo hay theo dõi. Bản đồ Google được nhúng và các liên kết mạng xã hội do các dịch vụ đó cung cấp theo điều khoản bảo mật riêng của họ.",
          },
          {
            heading: "Lưu trữ và xóa dữ liệu",
            body: "Chúng tôi chỉ lưu tin nhắn liên hệ trong thời gian cần thiết để phản hồi và hỗ trợ bạn. Khi bạn muốn xóa thông tin, chỉ cần liên hệ qua các kênh trên website.",
          },
          {
            heading: "Liên hệ",
            body: "Nếu có bất kỳ câu hỏi nào về dữ liệu cá nhân — hoặc muốn xóa dữ liệu — vui lòng liên hệ qua số điện thoại hoặc trang Facebook được nêu trên website.",
          },
        ],
      },
    },
    notFound: {
      title: "Không tìm thấy trang",
      description: "Trang bạn tìm không tồn tại. Mời bạn quay về trang chủ, hoặc liên hệ nếu muốn đăng ký tập.",
      join: "Đăng ký ngay",
      backHome: "Quay về trang chủ",
    },
  },
};

export function getDictionary(locale: Locale) {
  return SITE_CONTENT[locale];
}

export function getDefaultReviews() {
  return SITE_CONTENT[DEFAULT_LOCALE].home.reviews.list;
}
