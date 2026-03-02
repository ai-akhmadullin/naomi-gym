import { CONTACT_ADDRESS_LINES } from "@/lib/constants";
import type { FaqItem, GalleryImage, LocationInfo, Review, Trainer } from "@/types/marketing";

export const HERO_STATS = {
  membersLabel: "Active Members",
  membersCount: "200+",
};

export const TRAINERS: Trainer[] = [
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
];

export const GALLERY_IMAGES: GalleryImage[] = [
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
];

export const LOCATION_INFO: LocationInfo = {
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
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.5703472270934!2d108.2444807!3d16.0358665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142174f8140feb9%3A0x97f5a939db82f73f!2sNaomi%20Gym!5e0!3m2!1sen!2s!4v1772186331990!5m2!1sen!2s",
  directionsUrl: "https://maps.app.goo.gl/fKSy4mctAHiw6hqm6",
};

export const REVIEWS: Review[] = [
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

export const FAQ_ITEMS: FaqItem[] = [
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
];
