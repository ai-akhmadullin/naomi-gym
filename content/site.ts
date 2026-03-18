import { CONTACT_ADDRESS_LINES } from "@/lib/constants";
import { DEFAULT_LOCALE, type Locale, type PolicySlug } from "@/lib/i18n";
import type {
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
    buyMembership: string;
    languageSwitcherLabel: string;
  };
  mobileNav: {
    openLabel: string;
    closeLabel: string;
    menuTitle: string;
    menuDescription: string;
    navLabel: string;
  };
  footer: {
    quickLinksTitle: string;
    policiesTitle: string;
    contactTitle: string;
    facebookLabel: string;
    instagramLabel: string;
    buyMembership: string;
  };
  home: {
    hero: {
      titlePrefix: string;
      titleHighlight: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      imageAlt: string;
      membersCount: string;
      membersLabel: string;
    };
    pricing: {
      title: string;
      subtitle: string;
      highlightLabel: string;
      plans: PricingPlan[];
    };
    trainers: {
      title: string;
      subtitle: string;
      scrollerLabel: string;
      experienceLabel: string;
      list: Trainer[];
    };
    gallery: {
      title: string;
      subtitle: string;
      scrollerLabel: string;
      images: GalleryImage[];
    };
    location: {
      title: string;
      subtitle: string;
      addressLabel: string;
      hoursLabel: string;
      mapTitle: string;
      directionsPrefix: string;
      directionsLinkLabel: string;
      info: LocationInfo;
    };
    reviews: {
      title: string;
      subtitle: string;
      scrollerLabel: string;
      starsLabelTemplate: string;
      readOnGoogle: string;
      googleReview: string;
      list: Review[];
    };
    faq: {
      title: string;
      subtitle: string;
      items: FaqItem[];
    };
  };
  buyMembership: {
    title: string;
    subtitle: string;
  };
  checkout: {
    startCheckoutAriaLabelTemplate: string;
    loadingLabel: string;
    unavailableMessage: string;
    planRequiredMessage: string;
    previewMessage: string;
  };
  policies: {
    links: PolicyLink[];
    pages: Record<PolicySlug, PolicyContent>;
    placeholder: string;
    backToHome: string;
    viewMemberships: string;
    availablePoliciesLabel: string;
  };
  notFound: {
    title: string;
    description: string;
    buyMembership: string;
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
        "Naomi Gym helps members build strength and confidence with elite coaching, modern equipment, and a supportive community.",
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
      buyMembership: "Buy Membership",
      languageSwitcherLabel: "Language",
    },
    mobileNav: {
      openLabel: "Open navigation menu",
      closeLabel: "Close navigation menu",
      menuTitle: "Menu",
      menuDescription: "Mobile navigation links for Naomi Gym.",
      navLabel: "Mobile",
    },
    footer: {
      quickLinksTitle: "Quick Links",
      policiesTitle: "Policies",
      contactTitle: "Contact",
      facebookLabel: "Facebook",
      instagramLabel: "Instagram",
      buyMembership: "Buy Membership",
    },
    home: {
      hero: {
        titlePrefix: "Train stronger at",
        titleHighlight: "Naomi Gym",
        description:
          "Transform your body and mind with our expert trainers and a supportive community. Your fitness journey starts here.",
        primaryCta: "Buy Membership",
        secondaryCta: "View Pricing",
        imageAlt: "Membership card",
        membersCount: "200+",
        membersLabel: "Active Members",
      },
      pricing: {
        title: "Membership Plans",
        subtitle: "Choose a plan that fits your routine",
        highlightLabel: "Most Popular",
        plans: [
          {
            id: "daily",
            name: "Daily",
            priceLabel: "40.000 VND",
            billingPeriodLabel: "day",
            highlight: false,
            ctaLabel: "Choose Daily",
          },
          {
            id: "monthly",
            name: "Monthly",
            priceLabel: "300.000 VND",
            billingPeriodLabel: "month",
            highlight: true,
            ctaLabel: "Choose Monthly",
          },
        ],
      },
      trainers: {
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
      },
      location: {
        title: "Visit Us",
        subtitle: "Find Naomi Gym near An Thuong and My Khe area",
        addressLabel: "Address",
        hoursLabel: "Hours",
        mapTitle: "Naomi Gym location map",
        directionsPrefix: "Can't see the map? Open directions",
        directionsLinkLabel: "here",
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
        title: "What Our Members Say",
        subtitle: "Honest feedback from people who train with us",
        scrollerLabel: "Member reviews",
        starsLabelTemplate: "{rating} out of 5 stars",
        readOnGoogle: "Read on Google",
        googleReview: "Google review",
        list: SHARED_REVIEWS,
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know before joining",
        items: [
          {
            id: "faq-plans",
            question: "What membership options do you offer?",
            answer:
              "We offer two options: Daily pass (40,000 VND/day) and Monthly membership (300,000 VND/month).",
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
              "You can find us at Lo 22 Le Van Hien, Khue My, Ngu Hanh Son, Da Nang.",
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
              "Bring comfortable workout clothes, clean indoor shoes, and water. Our team can help you get started.",
          },
        ],
      },
    },
    buyMembership: {
      title: "Choose Your Membership",
      subtitle: "Choose a plan that fits your routine",
    },
    checkout: {
      startCheckoutAriaLabelTemplate: "Start checkout for {planName} plan",
      loadingLabel: "Preparing checkout...",
      unavailableMessage: "Checkout is temporarily unavailable. Please try again in a moment.",
      planRequiredMessage: "Plan is required before checkout can begin.",
      previewMessage: "Checkout is currently in preview mode.",
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
      viewMemberships: "View Memberships",
      availablePoliciesLabel: "Available policies:",
    },
    notFound: {
      title: "Page not found",
      description: "The page you requested does not exist yet. Return home or continue to membership options.",
      buyMembership: "Buy Membership",
      backHome: "Back to Home",
    },
  },
  vi: {
    metadata: {
      description:
        "Naomi Gym giúp hội viên xây dựng sức mạnh và sự tự tin với huấn luyện chất lượng, thiết bị hiện đại và cộng đồng thân thiện.",
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
      buyMembership: "Mua gói tập",
      languageSwitcherLabel: "Ngôn ngữ",
    },
    mobileNav: {
      openLabel: "Mở menu điều hướng",
      closeLabel: "Đóng menu điều hướng",
      menuTitle: "Menu",
      menuDescription: "Liên kết điều hướng trên điện thoại cho Naomi Gym.",
      navLabel: "Điều hướng di động",
    },
    footer: {
      quickLinksTitle: "Liên kết nhanh",
      policiesTitle: "Chính sách",
      contactTitle: "Liên hệ",
      facebookLabel: "Facebook",
      instagramLabel: "Instagram",
      buyMembership: "Mua gói tập",
    },
    home: {
      hero: {
        titlePrefix: "Tập luyện mạnh mẽ hơn tại",
        titleHighlight: "Naomi Gym",
        description:
          "Nâng cấp cả thể chất lẫn tinh thần cùng đội ngũ huấn luyện viên tận tâm và cộng đồng tập luyện tích cực. Hành trình của bạn bắt đầu từ đây.",
        primaryCta: "Mua gói tập",
        secondaryCta: "Xem bảng giá",
        imageAlt: "Thẻ hội viên",
        membersCount: "200+",
        membersLabel: "Hội viên đang tập",
      },
      pricing: {
        title: "Các gói hội viên",
        subtitle: "Chọn gói tập phù hợp với lịch sinh hoạt của bạn",
        highlightLabel: "Được chọn nhiều",
        plans: [
          {
            id: "daily",
            name: "Ngày",
            priceLabel: "40.000 VND",
            billingPeriodLabel: "ngày",
            highlight: false,
            ctaLabel: "Chọn gói ngày",
          },
          {
            id: "monthly",
            name: "Tháng",
            priceLabel: "300.000 VND",
            billingPeriodLabel: "tháng",
            highlight: true,
            ctaLabel: "Chọn gói tháng",
          },
        ],
      },
      trainers: {
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
      },
      location: {
        title: "Đến với chúng tôi",
        subtitle: "Naomi Gym nằm gần khu An Thượng và bãi biển Mỹ Khê",
        addressLabel: "Địa chỉ",
        hoursLabel: "Giờ mở cửa",
        mapTitle: "Bản đồ Naomi Gym",
        directionsPrefix: "Không xem được bản đồ? Mở chỉ đường",
        directionsLinkLabel: "tại đây",
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
        title: "Khách tập nói gì về Naomi Gym",
        subtitle: "Những chia sẻ thực tế từ người đang tập cùng chúng tôi",
        scrollerLabel: "Đánh giá hội viên",
        starsLabelTemplate: "{rating} trên 5 sao",
        readOnGoogle: "Xem trên Google",
        googleReview: "Đánh giá Google",
        list: SHARED_REVIEWS,
      },
      faq: {
        title: "Câu hỏi thường gặp",
        subtitle: "Những thông tin bạn cần biết trước khi đăng ký tập",
        items: [
          {
            id: "faq-plans",
            question: "Phòng gym có những gói tập nào?",
            answer:
              "Hiện tại có 2 lựa chọn: vé ngày (40.000 VND/ngày) và gói tháng (300.000 VND/tháng).",
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
              "Bạn có thể tìm thấy chúng tôi tại Lô 22 Lê Văn Hiến, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng.",
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
              "Hãy mang theo quần áo thể thao thoải mái, giày tập sạch và nước uống. Đội ngũ của chúng tôi sẽ hỗ trợ bạn khi bắt đầu.",
          },
        ],
      },
    },
    buyMembership: {
      title: "Chọn gói tập phù hợp",
      subtitle: "Chọn gói hội viên phù hợp với lịch sinh hoạt của bạn",
    },
    checkout: {
      startCheckoutAriaLabelTemplate: "Bắt đầu thanh toán cho gói {planName}",
      loadingLabel: "Đang chuẩn bị thanh toán...",
      unavailableMessage: "Thanh toán đang tạm thời không khả dụng. Vui lòng thử lại sau ít phút.",
      planRequiredMessage: "Cần chọn gói tập trước khi bắt đầu thanh toán.",
      previewMessage: "Thanh toán hiện đang ở chế độ xem trước.",
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
      viewMemberships: "Xem các gói tập",
      availablePoliciesLabel: "Các chính sách hiện có:",
    },
    notFound: {
      title: "Không tìm thấy trang",
      description: "Trang bạn yêu cầu hiện chưa tồn tại. Bạn có thể quay về trang chủ hoặc tiếp tục xem các gói tập.",
      buyMembership: "Mua gói tập",
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
