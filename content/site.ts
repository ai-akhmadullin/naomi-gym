import { CONTACT_ADDRESS_LINES } from "@/lib/constants";
import { DEFAULT_LOCALE, type Locale, type PolicySlug } from "@/lib/i18n";
import type {
  Benefit,
  FaqItem,
  GalleryImage,
  LocationInfo,
  NavItem,
  PolicyLink,
  PricingPlan,
  Review,
  Trainer,
} from "@/types/marketing";

type PolicyContent = {
  title: string;
  summary: string;
};

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
    policiesTitle: string;
    contactTitle: string;
    facebookLabel: string;
    instagramLabel: string;
    joinNow: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
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
      imageAlt: string;
      membersCount: string;
      membersLabel: string;
      highlights: string[];
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
      directionsPrefix: string;
      directionsLinkLabel: string;
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
    };
  };
  policies: {
    links: PolicyLink[];
    pages: Record<PolicySlug, PolicyContent>;
    placeholder: string;
    backToHome: string;
    join: string;
    availablePoliciesLabel: string;
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
        "Naomi Gym is Da Nang's friendly, great-value gym near An Thuong and My Khe — two full floors of equipment, expert coaching, and a welcoming community. Day pass 40k, monthly 300k.",
    },
    localeNames: {
      en: "English",
      vi: "Tiếng Việt",
    },
    siteTagline: "Train stronger, live better",
    navItems: [
      { label: "Home", href: "#home", kind: "section" },
      { label: "Pricing", href: "#pricing", kind: "section" },
      { label: "Trainers", href: "#trainers", kind: "section" },
      { label: "Gallery", href: "#gallery", kind: "section" },
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
      policiesTitle: "Policies",
      contactTitle: "Contact",
      facebookLabel: "Facebook",
      instagramLabel: "Instagram",
      joinNow: "Join Now",
      ctaTitle: "Your first workout is on us",
      ctaText: "Come try Naomi Gym — no sign-up fee, no contract. Just bring water and good energy.",
      ctaButton: "Join Now",
      rightsLabel: "All rights reserved.",
    },
    home: {
      hero: {
        eyebrow: "Da Nang · An Thượng & Mỹ Khê",
        titlePrefix: "Train stronger at",
        titleHighlight: "Naomi Gym",
        description:
          "Two full floors of weights and machines, friendly hands-on coaching, and a community that actually trains. Day pass 40k, full month just 300k — no contract.",
        primaryCta: "Join Now",
        secondaryCta: "View Plans",
        imageAlt: "Naomi Gym training floor",
        membersCount: "200+",
        membersLabel: "Active members",
        highlights: ["Open from 5 AM", "Day pass just 40k", "No contract"],
      },
      benefits: {
        eyebrow: "Why Naomi Gym",
        title: "A real gym, not a showroom",
        subtitle: "Everything you need to train hard — and nothing you'd overpay for.",
        items: [
          {
            id: "benefit-floors",
            icon: "layers",
            title: "Two floors of training",
            description:
              "Free weights and machines downstairs, a full legs and functional-training floor upstairs — plenty of room to move.",
          },
          {
            id: "benefit-kit",
            icon: "dumbbell",
            title: "Built for lifters",
            description:
              "Squat racks, deadlift platforms, bumper plates, benches, cables and a boxing bag. Real iron, no frills.",
          },
          {
            id: "benefit-value",
            icon: "sparkles",
            title: "Unbeatable value",
            description:
              "40k for a day pass, 300k for a whole month — no joining fee, no lock-in contract. Just pay at the gym.",
          },
          {
            id: "benefit-coaching",
            icon: "heart-handshake",
            title: "Friendly, helpful staff",
            description:
              "Members love the welcome here — the owner is often around and happy to help with your form, for free.",
          },
          {
            id: "benefit-hours",
            icon: "sunrise",
            title: "Open early, 7 days",
            description:
              "Doors open at 5 AM Monday to Saturday, with hours on Sunday too — train before work or before the beach.",
          },
          {
            id: "benefit-space",
            icon: "users",
            title: "Spacious & rarely crowded",
            description:
              "Spread over two airy floors, it rarely feels busy — there's almost always a free rack, bench or machine.",
          },
        ],
      },
      pricing: {
        eyebrow: "Memberships",
        title: "Simple pricing, no surprises",
        subtitle: "Pay at the gym. Start today, cancel any time — there's no contract to sign.",
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
            tagline: "Drop in any day",
            features: [
              "Full access to both floors",
              "All equipment included",
              "No commitment",
              "Perfect for travellers",
            ],
          },
          {
            id: "monthly",
            name: "Monthly",
            priceLabel: "300.000 VND",
            billingPeriodLabel: "month",
            highlight: true,
            ctaLabel: "Become a member",
            tagline: "Our most popular plan",
            features: [
              "Everything in the day pass",
              "Best value — save vs. day passes",
              "Train any time we're open",
              "Free form help from our coach",
            ],
          },
        ],
      },
      trainers: {
        eyebrow: "The team",
        title: "Meet Our Trainers",
        subtitle: "Expert coaches dedicated to helping you succeed",
        scrollerLabel: "Trainers",
        experienceLabel: "{years}+ years experience",
        list: [
          {
            id: "marcus-thompson",
            name: "Marcus Thompson",
            specialty: "Strength Training",
            bio: "10+ years helping athletes and enthusiasts build strength and power.",
            image: "/images/trainers/marcus.svg",
            experienceYears: 10,
          },
          {
            id: "sarah-chen",
            name: "Sarah Chen",
            specialty: "Yoga & Flexibility",
            bio: "Certified yoga instructor focused on mindful movement and recovery.",
            image: "/images/trainers/sarah.svg",
            experienceYears: 8,
          },
          {
            id: "jordan-hayes",
            name: "Jordan Hayes",
            specialty: "HIIT & Cardio",
            bio: "High-energy coach dedicated to helping members push past limits.",
            image: "/images/trainers/jordan.svg",
            experienceYears: 7,
          },
        ],
      },
      gallery: {
        eyebrow: "Inside the gym",
        title: "Our Facility",
        subtitle: "Take a look at our modern, clean, and fully-equipped gym",
        scrollerLabel: "Facility gallery",
        images: [
          {
            id: "gallery-1",
            src: "/images/gallery/gym-1.svg",
            alt: "Kettlebells on a rack in the weight area",
            category: "Equipment",
          },
          {
            id: "gallery-2",
            src: "/images/gallery/gym-2.svg",
            alt: "Group fitness class in session",
            category: "Classes",
          },
          {
            id: "gallery-3",
            src: "/images/gallery/gym-3.svg",
            alt: "Open training floor with modern lighting",
            category: "Facility",
          },
          {
            id: "gallery-4",
            src: "/images/gallery/gym-4.svg",
            alt: "Cardio machines lined up",
            category: "Cardio",
          },
          {
            id: "gallery-5",
            src: "/images/gallery/gym-5.svg",
            alt: "Clean studio with functional training space",
            category: "Studio",
          },
          {
            id: "gallery-6",
            src: "/images/gallery/gym-6.svg",
            alt: "Member training at heavy bag station",
            category: "Boxing",
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
        subtitle: "Find Naomi Gym near An Thuong and My Khe area",
        addressLabel: "Address",
        hoursLabel: "Hours",
        mapTitle: "Naomi Gym location map",
        directionsPrefix: "Can't see the map? Open directions",
        directionsLinkLabel: "here",
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
        subtitle: "Honest feedback from people who train with us",
        scrollerLabel: "Member reviews",
        starsLabelTemplate: "{rating} out of 5 stars",
        readOnGoogle: "Read on Google",
        googleReview: "Google review",
        list: SHARED_REVIEWS,
      },
      faq: {
        eyebrow: "Good to know",
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know before joining",
        items: [
          {
            id: "faq-plans",
            question: "What membership options do you offer?",
            answer:
              "We keep it simple: a day pass (40,000 VND/day) and a monthly membership (300,000 VND/month). No joining fee and no contract.",
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
              "You can find us at Lo 22 Le Van Hien, Khue My, Ngu Hanh Son, Da Nang — close to the An Thuong and My Khe beach area.",
          },
          {
            id: "faq-crowded",
            question: "When is the gym less crowded?",
            answer:
              "For quieter sessions, come in the morning or later evening. Peak times are usually late afternoon and early evening.",
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
          "Drop by for your first session, or send a quick message and we'll get you set up. No sign-up fees, no pressure.",
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
        reassurance: "Free look around · No contract · Friendly staff",
      },
    },
    policies: {
      links: [
        { id: "privacy", label: "Privacy Policy", href: "" },
        { id: "terms", label: "Terms of Service", href: "" },
        { id: "cancellation", label: "Cancellation Policy", href: "" },
        { id: "conduct", label: "Code of Conduct", href: "" },
      ],
      pages: {
        privacy: {
          title: "Privacy Policy",
          summary: "How we collect, use, and protect your data.",
        },
        terms: {
          title: "Terms of Service",
          summary: "Member responsibilities and gym usage terms.",
        },
        cancellation: {
          title: "Cancellation Policy",
          summary: "Rules around membership changes, pauses, and cancellation windows.",
        },
        conduct: {
          title: "Code of Conduct",
          summary: "Behavior standards that keep our gym respectful and safe.",
        },
      },
      placeholder: "This is a placeholder policy page for v1. Final legal copy will be added before launch.",
      backToHome: "Back to Home",
      join: "Join Now",
      availablePoliciesLabel: "Available policies:",
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
        "Naomi Gym là phòng tập thân thiện, giá tốt ở Đà Nẵng gần An Thượng và Mỹ Khê — hai tầng đầy đủ thiết bị, huấn luyện tận tâm và cộng đồng thân thiện. Vé ngày 40k, gói tháng 300k.",
    },
    localeNames: {
      en: "English",
      vi: "Tiếng Việt",
    },
    siteTagline: "Tập mạnh hơn, sống khỏe hơn",
    navItems: [
      { label: "Trang chủ", href: "#home", kind: "section" },
      { label: "Gói tập", href: "#pricing", kind: "section" },
      { label: "Huấn luyện viên", href: "#trainers", kind: "section" },
      { label: "Không gian", href: "#gallery", kind: "section" },
      { label: "Địa điểm", href: "#location", kind: "section" },
      { label: "Đánh giá", href: "#reviews", kind: "section" },
      { label: "Liên hệ", href: "#contact", kind: "section" },
    ],
    header: {
      primaryNavLabel: "Điều hướng chính",
      joinNow: "Tham gia ngay",
      languageSwitcherLabel: "Ngôn ngữ",
    },
    mobileNav: {
      openLabel: "Mở menu điều hướng",
      closeLabel: "Đóng menu điều hướng",
      menuTitle: "Menu",
      menuDescription: "Liên kết điều hướng trên điện thoại cho Naomi Gym.",
      navLabel: "Điều hướng di động",
    },
    openStatus: {
      openNow: "Đang mở cửa",
      closed: "Đã đóng cửa",
      closesAt: "đóng lúc {time}",
      opensAt: "mở lúc {time}",
    },
    quickActions: {
      chatLabel: "Chat với chúng tôi",
      closeLabel: "Đóng",
      callLabel: "Gọi",
      zaloLabel: "Zalo",
      whatsappLabel: "WhatsApp",
      messengerLabel: "Messenger",
    },
    footer: {
      quickLinksTitle: "Liên kết nhanh",
      policiesTitle: "Chính sách",
      contactTitle: "Liên hệ",
      facebookLabel: "Facebook",
      instagramLabel: "Instagram",
      joinNow: "Tham gia ngay",
      ctaTitle: "Buổi tập đầu tiên, chúng tôi mời bạn",
      ctaText: "Đến trải nghiệm Naomi Gym — không phí đăng ký, không hợp đồng. Chỉ cần mang theo nước và năng lượng tích cực.",
      ctaButton: "Tham gia ngay",
      rightsLabel: "Bảo lưu mọi quyền.",
    },
    home: {
      hero: {
        eyebrow: "Đà Nẵng · An Thượng & Mỹ Khê",
        titlePrefix: "Tập luyện mạnh mẽ hơn tại",
        titleHighlight: "Naomi Gym",
        description:
          "Hai tầng đầy đủ tạ và máy tập, huấn luyện viên tận tâm hướng dẫn trực tiếp, cùng cộng đồng tập luyện thực thụ. Vé ngày 40k, cả tháng chỉ 300k — không hợp đồng.",
        primaryCta: "Tham gia ngay",
        secondaryCta: "Xem bảng giá",
        imageAlt: "Khu tập luyện Naomi Gym",
        membersCount: "200+",
        membersLabel: "Hội viên đang tập",
        highlights: ["Mở cửa từ 5 giờ sáng", "Vé ngày chỉ 40k", "Không hợp đồng"],
      },
      benefits: {
        eyebrow: "Vì sao chọn Naomi Gym",
        title: "Phòng tập thực thụ, không phải nơi sống ảo",
        subtitle: "Đầy đủ mọi thứ để tập luyện nghiêm túc — và không có khoản nào khiến bạn trả thừa.",
        items: [
          {
            id: "benefit-floors",
            icon: "layers",
            title: "Hai tầng tập luyện",
            description:
              "Tạ tự do và máy tập ở tầng dưới, một tầng chân và functional đầy đủ ở tầng trên — rộng rãi để vận động.",
          },
          {
            id: "benefit-kit",
            icon: "dumbbell",
            title: "Dành cho người tập tạ",
            description:
              "Squat rack, khu deadlift, bumper plate, ghế tập, cáp và bao cát boxing. Sắt thép thực thụ, không màu mè.",
          },
          {
            id: "benefit-value",
            icon: "sparkles",
            title: "Giá cực kỳ hợp lý",
            description:
              "40k cho vé ngày, 300k cho cả tháng — không phí gia nhập, không hợp đồng. Chỉ cần thanh toán tại phòng tập.",
          },
          {
            id: "benefit-coaching",
            icon: "heart-handshake",
            title: "Nhân viên thân thiện",
            description:
              "Hội viên rất thích sự thân thiện ở đây — chủ phòng thường có mặt và sẵn lòng chỉnh kỹ thuật miễn phí.",
          },
          {
            id: "benefit-hours",
            icon: "sunrise",
            title: "Mở sớm, 7 ngày/tuần",
            description:
              "Mở cửa từ 5 giờ sáng Thứ Hai đến Thứ Bảy, Chủ Nhật cũng có giờ tập — tập trước giờ làm hoặc trước khi ra biển.",
          },
          {
            id: "benefit-space",
            icon: "users",
            title: "Rộng rãi & ít khi đông",
            description:
              "Trải trên hai tầng thoáng khí, hiếm khi đông — gần như luôn có rack, ghế hay máy trống cho bạn.",
          },
        ],
      },
      pricing: {
        eyebrow: "Gói hội viên",
        title: "Giá đơn giản, không bất ngờ",
        subtitle: "Thanh toán tại phòng tập. Bắt đầu hôm nay, hủy bất cứ lúc nào — không cần ký hợp đồng.",
        highlightLabel: "Được chọn nhiều",
        note: "Không phí đăng ký · Không hợp đồng · Thanh toán tại phòng tập",
        plans: [
          {
            id: "daily",
            name: "Vé ngày",
            priceLabel: "40.000 VND",
            billingPeriodLabel: "ngày",
            highlight: false,
            ctaLabel: "Lấy vé ngày",
            tagline: "Ghé tập bất kỳ ngày nào",
            features: [
              "Sử dụng toàn bộ cả hai tầng",
              "Bao gồm mọi thiết bị",
              "Không ràng buộc",
              "Lý tưởng cho khách du lịch",
            ],
          },
          {
            id: "monthly",
            name: "Gói tháng",
            priceLabel: "300.000 VND",
            billingPeriodLabel: "tháng",
            highlight: true,
            ctaLabel: "Trở thành hội viên",
            tagline: "Gói được chọn nhiều nhất",
            features: [
              "Mọi quyền lợi của vé ngày",
              "Giá tốt nhất — tiết kiệm hơn vé ngày",
              "Tập bất kỳ giờ mở cửa nào",
              "Được HLV hướng dẫn kỹ thuật miễn phí",
            ],
          },
        ],
      },
      trainers: {
        eyebrow: "Đội ngũ",
        title: "Đội ngũ huấn luyện viên",
        subtitle: "Những người đồng hành giàu kinh nghiệm giúp bạn tiến bộ bền vững",
        scrollerLabel: "Huấn luyện viên",
        experienceLabel: "{years}+ năm kinh nghiệm",
        list: [
          {
            id: "marcus-thompson",
            name: "Marcus Thompson",
            specialty: "Sức mạnh",
            bio: "Hơn 10 năm đồng hành cùng học viên xây dựng sức mạnh và hiệu suất vận động.",
            image: "/images/trainers/marcus.svg",
            experienceYears: 10,
          },
          {
            id: "sarah-chen",
            name: "Sarah Chen",
            specialty: "Yoga & độ linh hoạt",
            bio: "Huấn luyện viên yoga được chứng nhận, tập trung vào vận động chánh niệm và phục hồi.",
            image: "/images/trainers/sarah.svg",
            experienceYears: 8,
          },
          {
            id: "jordan-hayes",
            name: "Jordan Hayes",
            specialty: "HIIT & tim mạch",
            bio: "Huấn luyện viên giàu năng lượng, luôn thúc đẩy học viên vượt qua giới hạn của mình.",
            image: "/images/trainers/jordan.svg",
            experienceYears: 7,
          },
        ],
      },
      gallery: {
        eyebrow: "Bên trong phòng tập",
        title: "Không gian phòng tập",
        subtitle: "Khám phá phòng gym sạch sẽ, hiện đại và đầy đủ thiết bị của chúng tôi",
        scrollerLabel: "Bộ sưu tập phòng tập",
        images: [
          {
            id: "gallery-1",
            src: "/images/gallery/gym-1.svg",
            alt: "Khu tạ tay được sắp xếp gọn gàng",
            category: "Thiết bị",
          },
          {
            id: "gallery-2",
            src: "/images/gallery/gym-2.svg",
            alt: "Lớp tập nhóm đang diễn ra",
            category: "Lớp học",
          },
          {
            id: "gallery-3",
            src: "/images/gallery/gym-3.svg",
            alt: "Khu tập chính rộng rãi với ánh sáng hiện đại",
            category: "Cơ sở vật chất",
          },
          {
            id: "gallery-4",
            src: "/images/gallery/gym-4.svg",
            alt: "Dãy máy cardio",
            category: "Cardio",
          },
          {
            id: "gallery-5",
            src: "/images/gallery/gym-5.svg",
            alt: "Phòng studio sạch sẽ với khu functional training",
            category: "Studio",
          },
          {
            id: "gallery-6",
            src: "/images/gallery/gym-6.svg",
            alt: "Hội viên đang tập tại khu bao cát",
            category: "Boxing",
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
        eyebrow: "Tìm chúng tôi",
        title: "Đến với chúng tôi",
        subtitle: "Naomi Gym nằm gần khu An Thượng và bãi biển Mỹ Khê",
        addressLabel: "Địa chỉ",
        hoursLabel: "Giờ mở cửa",
        mapTitle: "Bản đồ Naomi Gym",
        directionsPrefix: "Không xem được bản đồ? Mở chỉ đường",
        directionsLinkLabel: "tại đây",
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
        subtitle: "Những chia sẻ thực tế từ người đang tập cùng chúng tôi",
        scrollerLabel: "Đánh giá hội viên",
        starsLabelTemplate: "{rating} trên 5 sao",
        readOnGoogle: "Xem trên Google",
        googleReview: "Đánh giá Google",
        list: SHARED_REVIEWS,
      },
      faq: {
        eyebrow: "Thông tin hữu ích",
        title: "Câu hỏi thường gặp",
        subtitle: "Những thông tin bạn cần biết trước khi đăng ký tập",
        items: [
          {
            id: "faq-plans",
            question: "Phòng gym có những gói tập nào?",
            answer:
              "Rất đơn giản: vé ngày (40.000 VND/ngày) và gói tháng (300.000 VND/tháng). Không phí gia nhập và không hợp đồng.",
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
              "Bạn có thể tìm thấy chúng tôi tại Lô 22 Lê Văn Hiến, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng — gần khu An Thượng và biển Mỹ Khê.",
          },
          {
            id: "faq-crowded",
            question: "Khi nào phòng tập vắng hơn?",
            answer:
              "Nếu muốn tập thoải mái hơn, bạn nên đến vào buổi sáng hoặc tối muộn. Khung giờ đông nhất thường là chiều muộn và đầu buổi tối.",
          },
          {
            id: "faq-first-visit",
            question: "Lần đầu đến tập tôi cần mang theo gì?",
            answer:
              "Hãy mang theo quần áo thể thao thoải mái, giày tập sạch và nước uống. Chỉ cần ghé trong giờ mở cửa — đội ngũ của chúng tôi sẽ hỗ trợ bạn bắt đầu.",
          },
        ],
      },
      contact: {
        eyebrow: "Tham gia",
        title: "Sẵn sàng tập luyện? Ghé chào chúng tôi nhé.",
        subtitle:
          "Ghé buổi tập đầu tiên, hoặc gửi tin nhắn nhanh để được hỗ trợ. Không phí đăng ký, không áp lực.",
        nameLabel: "Tên của bạn",
        namePlaceholder: "Ví dụ: An",
        contactLabel: "Số điện thoại hoặc email",
        contactPlaceholder: "Để chúng tôi liên hệ lại với bạn",
        planLabel: "Tôi quan tâm đến",
        planOptions: ["Gói tháng", "Vé ngày", "Chưa chắc chắn"],
        messageLabel: "Lời nhắn (không bắt buộc)",
        messagePlaceholder: "Bạn có câu hỏi gì? Cho chúng tôi biết khi nào bạn muốn bắt đầu.",
        submitLabel: "Gửi tin nhắn",
        sendingLabel: "Đang gửi…",
        successTitle: "Đã gửi tin nhắn!",
        successMessage: "Cảm ơn bạn đã liên hệ — chúng tôi sẽ phản hồi sớm. Hẹn gặp bạn tại phòng tập!",
        errorMessage: "Đã xảy ra lỗi. Vui lòng thử lại hoặc gọi trực tiếp cho chúng tôi.",
        requiredError: "Vui lòng nhập tên và cách liên hệ với bạn.",
        sideTitle: "Muốn trao đổi trực tiếp?",
        sideText: "Gọi hoặc nhắn tin cho chúng tôi — thường phản hồi trong vài giờ.",
        callLabel: "Gọi cho chúng tôi",
        messengerLabel: "Nhắn tin qua Facebook",
        directionsLabel: "Xem chỉ đường",
        reassurance: "Tham quan miễn phí · Không hợp đồng · Nhân viên thân thiện",
      },
    },
    policies: {
      links: [
        { id: "privacy", label: "Chính sách bảo mật", href: "" },
        { id: "terms", label: "Điều khoản dịch vụ", href: "" },
        { id: "cancellation", label: "Chính sách hủy gói", href: "" },
        { id: "conduct", label: "Nội quy ứng xử", href: "" },
      ],
      pages: {
        privacy: {
          title: "Chính sách bảo mật",
          summary: "Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.",
        },
        terms: {
          title: "Điều khoản dịch vụ",
          summary: "Trách nhiệm của hội viên và các điều khoản sử dụng phòng tập.",
        },
        cancellation: {
          title: "Chính sách hủy gói",
          summary: "Các quy định về thay đổi gói, tạm ngưng và hủy hội viên.",
        },
        conduct: {
          title: "Nội quy ứng xử",
          summary: "Những tiêu chuẩn ứng xử giúp phòng tập luôn an toàn và tôn trọng lẫn nhau.",
        },
      },
      placeholder: "Đây là trang chính sách mẫu cho phiên bản đầu tiên. Nội dung pháp lý hoàn chỉnh sẽ được cập nhật trước khi ra mắt.",
      backToHome: "Quay về trang chủ",
      join: "Tham gia ngay",
      availablePoliciesLabel: "Các chính sách hiện có:",
    },
    notFound: {
      title: "Không tìm thấy trang",
      description: "Trang bạn yêu cầu hiện chưa tồn tại. Bạn có thể quay về trang chủ hoặc liên hệ để tham gia.",
      join: "Tham gia ngay",
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
