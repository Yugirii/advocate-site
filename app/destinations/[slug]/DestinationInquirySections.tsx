"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

type DestinationCard = {
  name: string;
  image: string;
};

type TourItineraryDay = {
  day: string;
  items: readonly string[];
};

type TourDetails = {
  packageName: string;
  route?: string;
  airline?: string;
  highlight?: string;
  additionalSummaryLines?: readonly string[];
  travelDatesHeading?: string;
  travelDates: readonly string[];
  itineraryHeading?: string;
  itinerary: readonly TourItineraryDay[];
  hotelsHeading?: string;
  hotels?: readonly string[];
  inclusions: readonly string[];
  exclusions: readonly string[];
  exclusionNotes?: readonly string[];
};

type TravelerField = "adults" | "children" | "infants";

type InquiryFormState = {
  email: string;
  name: string;
  departure: string;
  returnDate: string;
  adults: number;
  children: number;
  infants: number;
  additionalInquiries: string;
};

type InquiryFormErrors = Partial<
  Record<
    "email" | "name" | "departure" | "returnDate" | "adults" | "additionalInquiries",
    string
  >
>;

const initialFormState: InquiryFormState = {
  email: "",
  name: "",
  departure: "",
  returnDate: "",
  adults: 0,
  children: 0,
  infants: 0,
  additionalInquiries: "",
};

const tourDetailsByDestination: Record<string, TourDetails> = {
  "Memorable Japan": {
    packageName: "Memorable Japan 2026 Tour Package",
    route: "Tokyo, Fuji, Gifu, Kyoto, Osaka",
    airline: "Via Japan Airlines (JAL)",
    highlight: "Includes Tokyo Disneyland or DisneySea",
    travelDates: [
      "Jul 23 - Jul 30, 2026",
      "Aug 20 - Aug 27, 2026",
      "Sep 09 - Sep 16, 2026",
      "Oct 30 - Nov 06, 2026",
      "Nov 25 - Dec 02, 2026",
    ],
    itinerary: [
      {
        day: "Day 1",
        items: ["Meals on board", "Departure from Manila"],
      },
      {
        day: "Day 2",
        items: [
          "Breakfast, Lunch, Dinner",
          "Arrival in Haneda",
          "Travel to Kamakura",
          "Visit Kotoku-in Great Buddha and Hasedera Temple",
          "Proceed to Yokohama: Ramen Museum, Biggest Chinatown, Minato Mirai Shopping Area",
        ],
      },
      {
        day: "Day 3",
        items: [
          "Breakfast",
          "Tokyo Disney Resort: Enjoy Tokyo Disneyland or DisneySea (day pass ticket and transfers included)",
        ],
      },
      {
        day: "Day 4",
        items: [
          "Breakfast, Lunch, Dinner",
          "Visit Senso-ji Temple in Asakusa",
          "Visit Nakamise Street",
          "Photo stop at Sky Tree",
          "Visit Shibuya Crossing",
          "Photo stop at Hachiko Statue",
          "Transfer to Kawaguchiko",
        ],
      },
      {
        day: "Day 5",
        items: [
          "Breakfast, Lunch, Dinner",
          "Shop at Gotemba Factory",
          "Visit Oshino Hakkai (viewing of Mt. Fuji)",
          "Photo stop at Lake Kawaguchi (viewing of Mt. Fuji)",
          "Transfer to Nagoya",
        ],
      },
      {
        day: "Day 6",
        items: [
          "Breakfast, Lunch, Dinner",
          "Transfer to Kyoto",
          "Visit Arashiyama Bamboo Grove (with Togetsukyo Bridge)",
          "Visit Fushimi Inari Taisha Shrine",
          "Transfer to Osaka",
          "Enjoy shopping at Shinsaibashi or Dotonbori",
        ],
      },
      {
        day: "Day 7",
        items: [
          "Breakfast",
          "Photo stop at Osaka Castle",
          "Enjoy Universal Studios Japan (day pass ticket included)",
          "Transfer to airport for departure",
        ],
      },
      {
        day: "Day 8",
        items: ["Meals on board", "Arrival in Manila"],
      },
    ],
    inclusions: [
      "Roundtrip airfare via Japan Airlines",
      "Check-in baggage and hand carry",
      "5 nights hotel accommodation",
      "Private coach transfers",
      "Meals as specified (6 breakfasts, 4 lunches, 4 dinners)",
      "Fully loaded tours",
      "Universal Studios Japan entrance",
      "Tokyo Disneyland or DisneySea entrance",
      "English-speaking guide",
      "Filipino tour escort",
    ],
    exclusions: ["Airline tax", "Tipping", "Travel insurance", "Japan visa"],
  },
  "Vietnam Rose 2.0": {
    packageName: "Vietnam Rose 2.0 (2026-2027)",
    route: "Da Nang, Hoi An, Hue, Incense Village",
    airline: "4 Days / 3 Nights",
    highlight: "For as low as ₱38,888 per pax",
    travelDates: [
      "Apr 22 - Apr 25, 2026",
      "Apr 24 - Apr 27, 2026",
      "Apr 25 - Apr 28, 2026",
      "Apr 28 - May 01, 2026",
      "Apr 29 - May 02, 2026",
      "May 02 - May 05, 2026",
      "May 07 - May 10, 2026",
      "May 13 - May 16, 2026",
      "May 18 - May 21, 2026",
      "May 22 - May 25, 2026",
      "May 28 - May 31, 2026",
      "Jun 10 - Jun 13, 2026",
      "Jul 23 - Jul 26, 2026",
      "Aug 19 - Aug 22, 2026",
      "Oct 29 - Nov 01, 2026",
      "Nov 27 - Nov 30, 2026",
      "Dec 25 - Dec 28, 2026",
      "Jan 02 - Jan 05, 2027",
    ],
    itineraryHeading: "Itinerary",
    itinerary: [
      {
        day: "Day 1",
        items: [
          "Departure from Manila",
          "Arrival in Da Nang",
          "Meet and greet at the airport",
          "Proceed to Da Nang City Center",
        ],
      },
      {
        day: "Day 2 (Breakfast + Lunch + Dinner)",
        items: [
          "Shop at Han Market",
          "Cross the High Mountain Pass of Hai Van",
          "Visit Thuy Xuan Incense Village",
          "Visit Hue's Ancient Citadel",
          "Proceed to the Noon Gate to visit Thai Hoa Palace",
          "Proceed back to Da Nang",
        ],
      },
      {
        day: "Day 3 (Breakfast + Lunch + Dinner)",
        items: [
          "Visit Linh Ung Pagoda and Lady Buddha Statue",
          "Transfer to Ba Na Hills",
          "Enjoy journey to mountain by cable car",
          "Visit Debay Wine Cellar, Loc Uyen Garden, Golden Bridge, Quan Am Pavilion, Monkey Garden, French Village, Fantasy Park",
          "Return to Da Nang then drive to Hoi An",
          "Enjoy Hoi An Lantern Boat along Thu Bon River",
        ],
      },
      {
        day: "Day 4 (Breakfast + Lunch + Dinner)",
        items: [
          "Proceed to Hoi An Ancient Town",
          "Visit Ecological Village of Cam Thanh",
          "Visit Bay Mau Coconut Forest (Basket Boat Race)",
          "Visit Japanese Covered Bridge",
          "Visit Phuc Kien Chinese Assembly Hall",
          "Enjoy last minute shopping at Hoi An Market or Ancient Town",
          "Transfer to airport",
          "Arrival in Manila",
        ],
      },
    ],
    hotels: [
      "Da Nang Hotel: 4-Star Deluxe Beachfront (Premium)",
      "Hoi An Hotel: #1 Rated 5-Star Deluxe Resort (Premium)",
    ],
    inclusions: [
      "Roundtrip airfare via Cebu Pacific",
      "7kg hand carry",
      "2 nights in Da Nang (4-Star Deluxe Beachfront Hotel)",
      "1 night in Hoi An (#1 Rated 5-Star Hotel)",
      "Full board meals (B+L+D)",
      "Private coach",
      "Fully loaded tours",
      "English-speaking guide",
      "Filipino tour escort",
    ],
    exclusions: [
      "PH travel tax",
      "Tipping",
      "Travel insurance",
      "Check-in baggage",
    ],
  },
  "Tales of Arctic 2026": {
    packageName: "Tales of Arctic 2026",
    route: "10 Days / 9 Nights",
    airline: "Christmas in Arctic",
    highlight: "Dec 21 - Dec 30, 2026",
    additionalSummaryLines: [
      "Via Turkish Airlines",
      "For as low as $5,988 per pax",
      "#ChoosePremium - Tales of Europe",
    ],
    travelDates: ["Dec 21 - Dec 30, 2026"],
    itineraryHeading: "Itinerary",
    itinerary: [
      {
        day: "Day 1 - Manila",
        items: ["Meals on board", "Departure from Manila"],
      },
      {
        day: "Day 2 - Rovaniemi, Suomutunturi",
        items: [
          "Meals on board + Dinner",
          "Arrival in Rovaniemi",
          "Visit Santa Claus Village (meet Santa himself and cross Arctic Circle with certificates)",
          "Proceed to Suomutunturi",
        ],
      },
      {
        day: "Day 3 - Suomutunturi, Saariselka",
        items: [
          "Breakfast + Lunch + Dinner",
          "Transfer to Saariselka",
          "Snowmobile Safari (2 pax per snowmobile)",
          "Northern Lights hunting by bus (3 hours)",
        ],
      },
      {
        day: "Day 4 - Saariselka, Kirkenes",
        items: [
          "Breakfast + Lunch + Dinner",
          "Husky Safari",
          "Visit Sami Museum Siida (with entrance)",
          "Departure to Kirkenes",
        ],
      },
      {
        day: "Day 5 - Kirkenes, Saariselka",
        items: [
          "Breakfast + Lunch + Dinner",
          "King Crab Safari with crab lunch",
          "Visit Snow Hotel Kirkenes",
          "Proceed to Saariselka",
          "Overnight in Arctic Studios at Aurora Collection Resort (2 pax per studio)",
        ],
      },
      {
        day: "Day 6 - Saariselka",
        items: [
          "Breakfast + Lunch + Dinner",
          "Visit Reindeer Farm (short sledge ride)",
          "Experience Finnish sauna and ice swimming",
          "Overnight in Arctic Studios at Aurora Collection Resort",
        ],
      },
      {
        day: "Day 7 - Saariselka, Haparanda, Kemi",
        items: [
          "Breakfast + Lunch + Dinner",
          "Proceed to Haparanda, cross border of Sweden and Finland",
          "Ice Fishing and Whitefish Grilling in Timber Smoke Hut",
          "Proceed to Kemi",
        ],
      },
      {
        day: "Day 8 - Kemi",
        items: [
          "Breakfast + Lunch + Dinner",
          "Free day: leisure and shopping or optional Arktis Morning Cruise / Afternoon Cruise",
        ],
      },
      {
        day: "Day 9 - Kemi, Rovaniemi",
        items: [
          "Breakfast + Meals on board",
          "Transfer to Rovaniemi for flight back to Manila",
        ],
      },
      {
        day: "Day 10 - Manila",
        items: ["Meals on board", "Arrival in Manila"],
      },
    ],
    inclusions: [
      "Roundtrip international airfare via Turkish Airlines",
      "Hand carry with check-in baggage",
      "7 nights hotel accommodation",
      "Meals as specified",
      "Private coach",
      "Fully loaded tours",
      "English-speaking tour guide",
      "Filipino tour escort",
    ],
    exclusions: ["Airline taxes", "Travel insurance", "Visa fee", "Tipping"],
  },
  "Disney Fly & Cruise 2026": {
    packageName: "Disney Fly & Cruise 2026",
    route: "6 Days / 5 Nights",
    airline: "Philippines - Singapore - Philippines",
    highlight: "For as low as $1,288 per pax",
    additionalSummaryLines: ["#ChoosePremium"],
    travelDates: [
      "Apr 26 - May 01, 2026 - SOLD OUT",
      "May 17 - May 22, 2026 - SOLD OUT",
      "Oct 25 - Oct 30, 2026",
      "Nov 15 - Nov 20, 2026",
    ],
    itineraryHeading: "Itinerary",
    itinerary: [
      {
        day: "Day 1 - Manila to Singapore",
        items: [
          "Departure from Manila",
          "Arrival in Singapore",
          "Transfer to hotel",
        ],
      },
      {
        day: "Day 2 - Cruise Embarkation (Breakfast + Dinner)",
        items: [
          "Proceed to Marina Bay Cruise Centre",
          "Embark on the Disney Adventure Cruise",
        ],
      },
      {
        day: "Day 3 - Disney Adventure Cruise (Breakfast + Lunch + Dinner)",
        items: [
          "Be enchanted with Disney-exclusive experiences",
          "Explore seven unique themed areas",
        ],
      },
      {
        day: "Day 4 - Disney Adventure Cruise (Breakfast + Lunch + Dinner)",
        items: [
          "Enjoy world-class entertainment onboard",
          "Immerse in magical, story-driven environments",
        ],
      },
      {
        day: "Day 5 - Singapore City Tour (Breakfast)",
        items: [
          "Disembark at Marina Bay Cruise Centre",
          "Enjoy Singapore City Tour",
          "Transfer to hotel",
        ],
      },
      {
        day: "Day 6 - Singapore to Manila (Breakfast)",
        items: [
          "Free time",
          "Transfer to airport",
          "Departure from Singapore",
          "Arrival in Manila",
        ],
      },
    ],
    inclusions: [
      "Roundtrip airfare via Cebu Pacific",
      "20kg check-in baggage with 7kg hand carry",
      "1 night pre-cruise accommodation",
      "3 nights Disney Adventure Cruise (based on twin sharing)",
      "1 night post-cruise accommodation",
      "Post-cruise city tour in Singapore",
      "Full board meals onboard",
      "Private transfers (pre and post)",
      "Travel insurance (up to 75 y/o only)",
      "English-speaking guide",
      "Filipino tour escort",
    ],
    exclusions: ["Port charges", "Gratuities", "PH travel tax (by own)"],
  },
  "Go Batanes 2026": {
    packageName: "Go Batanes 2026",
    route: "4 Days / 3 Nights",
    airline: "For as low as ₱28,888 per pax",
    highlight: "ALL IN! NO EXCLUSIONS!",
    additionalSummaryLines: ["Via Philippine Airlines - Out of Clark"],
    travelDatesHeading: "Travel Dates & Prices",
    travelDates: [
      "Jun 26 - Jun 29, 2026",
      "Jul 10 - Jul 13, 2026",
      "Aug 24 - Aug 27, 2026",
      "Sep 04 - Sep 07, 2026",
      "May 15 - May 18, 2026",
      "Oct 30 - Nov 02, 2026",
      "Nov 20 - Nov 23, 2026",
      "Dec 23 - Dec 26, 2026",
      "Dec 30 - Jan 02, 2027",
    ],
    itineraryHeading: "Itinerary",
    itinerary: [
      {
        day: "Day 1 - Arrival and Batan North Tour",
        items: [
          "Breakfast + Lunch",
          "Departure from Manila",
          "Arrival in Basco",
          "Transfer to hotel",
          "Free time",
          "Batan North Tour:",
          "Valugan Boulder Bay",
          "Japanese Tunnel",
          "Basco Cathedral",
          "Tukon Chapel",
          "Basco Lighthouse",
          "Basco Rolling Hills",
          "Radar Station",
          "Casa Real",
          "Amandangat",
          "Kilometer Zero",
        ],
      },
      {
        day: "Day 2 - Sabtang Island Tour",
        items: [
          "Breakfast + Lunch",
          "Proceed to Sabtang Island via Faluwa",
          "Transfer to Ivana Port",
          "Transfer to hotel",
          "Free time",
          "Sabtang Island Tour:",
          "San Vicente Ferrer Church",
          "Savidug Community",
          "Savidug Idjang Fortress",
          "Tinyan Viewing of Pacific Ocean",
          "Vernacular Houses",
          "Chavayan Community Vernacular Houses",
          "Ahaw Arc",
          "Morong Beach",
          "Souvenir Shops",
        ],
      },
      {
        day: "Day 3 - Batan South Tour",
        items: [
          "Breakfast + Lunch",
          "Batan South Tour:",
          "Racuh A Payaman",
          "Mahatao Church Complex",
          "Chawa View Deck",
          "Mahatao Shelter Port",
          "Maydangeb White Beach (no swimming)",
          "San Jose Spanish Bridge",
          "House of Dakay",
          "Honesty Coffee Shop",
          "Ivana Church Complex",
          "Mutchong Viewpoint",
          "Itbud Church",
          "Madangay Hills and Alapad Rock Formation",
          "BAMSO Museum",
          "Transfer to hotel",
        ],
      },
      {
        day: "Day 4 - Departure",
        items: [
          "Breakfast",
          "Transfer to airport for departure",
          "Flight back to Manila",
        ],
      },
    ],
    inclusions: [
      "Roundtrip airfare via Philippine Airlines",
      "7kg hand carry",
      "10kg check-in baggage",
      "3 nights hotel accommodation",
      "Roundtrip airport transfers via private company",
      "Roundtrip boat transfers",
      "Meals as per itinerary (4B-3L)",
      "Daily hotel breakfast",
      "Fully loaded tours",
      "Licensed tour guide",
      "Bottled water",
      "LGU fees",
      "Environmental fee",
      "Travel insurance",
    ],
    exclusions: ["₱400 Fuel Surcharge"],
    exclusionNotes: ["NOTE: Amount is subject to change."],
  },
  "Go Boracay 2026": {
    packageName: "Go Boracay 2026",
    airline: "For as low as \u20b111,888 per pax",
    highlight: "ALL IN! NO EXCLUSIONS!",
    travelDates: [],
    itinerary: [],
    hotelsHeading: "Boracay Beachfront Hotel Options",
    hotels: [
      "Mandarin Nest Boracay - Beachfront (Station 2) | Twin - \u20b116,888 | Triple - \u20b116,588",
      "Belmont Hotel Boracay - Beachfront (Newcoast) | Twin - \u20b113,888 | Triple - \u20b113,588",
      "The Muse Hotel Boracay - Beachfront (Station 1) | Twin - \u20b115,588 | Triple - \u20b114,888",
      "La Carmela de Boracay - Beachfront (Station 2) | Twin - \u20b112,888 | Triple - \u20b112,888",
      "Bamboo Beach Resort Boracay - Beachfront (Station 3) | Twin - \u20b111,888 | Triple - \u20b111,888",
    ],
    inclusions: [
      "Roundtrip airfare via Cebu Pacific (via Caticlan)",
      "7kg hand carry",
      "3 nights hotel accommodation",
      "Daily hotel breakfast",
      "Roundtrip airport transfers via private company",
      "Terminal fee",
      "Environmental fee",
    ],
    exclusions: ["Check-in baggage", "Travel insurance", "\u20b1400 Fuel Surcharge"],
    exclusionNotes: ["NOTE: Amount is subject to change."],
  },
};

type DestinationInquirySectionsProps = {
  headingFontClass: string;
  featuredDestinations?: readonly DestinationCard[];
  longHaulDestinations: readonly DestinationCard[];
  shortHaulDestinations?: readonly DestinationCard[];
  featuredTitle?: string | null;
  longHaulTitle?: string | null;
  shortHaulTitle?: string | null;
};

type DestinationGridSectionProps = {
  title?: string | null;
  headingFontClass: string;
  destinations: readonly DestinationCard[];
  onInquire: (destinationName: string) => void;
  extraTopMargin?: string;
  gridTopMargin?: string;
};

function DestinationGridSection({
  title,
  headingFontClass,
  destinations,
  onInquire,
  extraTopMargin = "mt-10",
  gridTopMargin,
}: DestinationGridSectionProps) {
  const showHeading = Boolean(title);
  const resolvedGridTopMargin = gridTopMargin ?? (showHeading ? "mt-4" : "mt-10");

  return (
    <>
      {showHeading ? (
        <h2
          className={`${headingFontClass} ${extraTopMargin} text-2xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-3xl`}
        >
          {title}
        </h2>
      ) : null}

      <div
        className={`grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${resolvedGridTopMargin}`}
      >
        {destinations.map((destination) => (
          <div key={destination.name} className="w-full">
            <h3 className="mb-2 text-xl font-semibold leading-tight text-black">
              {destination.name}
            </h3>

            <article
              className="group overflow-hidden rounded-[4px] border border-[#cfcfcf] bg-white"
              tabIndex={0}
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={`/Images/${destination.image}`}
                  alt={`${destination.name} tour package`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />

                <button
                  type="button"
                  onClick={() => onInquire(destination.name)}
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex min-h-[3.7rem] w-full translate-y-2 items-center justify-center bg-white/95 text-xl font-semibold leading-none text-[#50a7a4] opacity-0 transition-all duration-200 hover:text-[#E39727] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  aria-label={`Inquire about ${destination.name}`}
                >
                  Inquire
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}

export default function DestinationInquirySections({
  headingFontClass,
  featuredDestinations = [],
  longHaulDestinations,
  shortHaulDestinations = [],
  featuredTitle = "Featured Packages",
  longHaulTitle = "Long Haul",
  shortHaulTitle = "Short Haul",
}: DestinationInquirySectionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [formState, setFormState] = useState<InquiryFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<InquiryFormErrors>({});
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedTourDetails = tourDetailsByDestination[selectedDestination];

  const openModal = (destinationName: string) => {
    setSelectedDestination(destinationName);
    setIsModalOpen(true);
    setSubmitError(null);
    setFormErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(initialFormState);
    setSelectedDestination("");
    setIsSubmitting(false);
    setSubmitError(null);
    setFormErrors({});
  };

  const adjustTravelerCount = (field: TravelerField, delta: number) => {
    setFormState((prev) => {
      const nextValue = Math.max(0, prev[field] + delta);
      if (field === "adults") {
        setFormErrors((prevErrors) => {
          const nextErrors = { ...prevErrors };
          if (nextValue < 1) {
            nextErrors.adults = "At least 1 adult is required";
          } else {
            delete nextErrors.adults;
          }
          return nextErrors;
        });
      }
      return {
        ...prev,
        [field]: nextValue,
      };
    });
  };

  const updateFormField = (field: keyof InquiryFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof InquiryFormErrors]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof InquiryFormErrors];
        return next;
      });
    }
  };

  const getTodayString = () => {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(now.getTime() - offsetMs);
    return localDate.toISOString().split("T")[0];
  };

  const addDays = (dateString: string, days: number) => {
    const date = new Date(`${dateString}T00:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0];
  };

  const validateForm = () => {
    const nextErrors: InquiryFormErrors = {};
    const email = formState.email.trim();
    const name = formState.name.trim();
    const departure = formState.departure;
    const returnDate = formState.returnDate;
    const message = formState.additionalInquiries.trim();
    const today = getTodayString();

    if (!email) {
      nextErrors.email = "Required Field";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Invalid Email format";
    }

    if (!name) {
      nextErrors.name = "Required Field";
    } else if (!/^[A-Za-z\s.'-]+$/.test(name)) {
      nextErrors.name = "Allowed Characters";
    }

    if (!departure) {
      nextErrors.departure = "Required Field";
    } else if (departure < today) {
      nextErrors.departure = "Select a future date";
    }

    if (!returnDate) {
      nextErrors.returnDate = "Required Field";
    } else if (returnDate < today) {
      nextErrors.returnDate = "Select a future date";
    } else if (departure && returnDate <= departure) {
      nextErrors.returnDate = "Return date must be after departure";
    }

    if (formState.adults < 1) {
      nextErrors.adults = "At least 1 adult is required";
    }

    if (message.length > 600) {
      nextErrors.additionalInquiries = "Message must be 600 characters or less";
    }

    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateField = (field: keyof InquiryFormErrors) => {
    const today = getTodayString();
    const email = formState.email.trim();
    const name = formState.name.trim();
    const departure = formState.departure;
    const returnDate = formState.returnDate;
    const message = formState.additionalInquiries.trim();
    let error: string | null = null;

    if (field === "email") {
      if (!email) {
        error = "Required Field";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error = "Invalid Email format";
      }
    }

    if (field === "name") {
      if (!name) {
        error = "Required Field";
      } else if (!/^[A-Za-z\s.'-]+$/.test(name)) {
        error = "Allowed Characters";
      }
    }

    if (field === "departure") {
      if (!departure) {
        error = "Required Field";
      } else if (departure < today) {
        error = "Select a future date";
      }
    }

    if (field === "returnDate") {
      if (!returnDate) {
        error = "Required Field";
      } else if (returnDate < today) {
        error = "Select a future date";
      } else if (departure && returnDate <= departure) {
        error = "Return date must be after departure";
      }
    }

    if (field === "additionalInquiries") {
      if (message.length > 600) {
        error = "Message must be 600 characters or less";
      }
    }

    setFormErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 4000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          destination: selectedDestination,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setSubmitError(data.error ?? "Failed to send inquiry. Try again.");
        setIsSubmitting(false);
        return;
      }

      closeModal();
      showToast(
        "Your message has been sent, we will get back to you soon. Happy Travels!"
      );
    } catch {
      setSubmitError("Failed to send inquiry. Check your connection.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      {featuredTitle ? (
        <h2
          className={`${headingFontClass} mt-10 text-2xl uppercase leading-[1.1] tracking-[0.03em] text-[#50a7a4] sm:text-3xl`}
        >
          {featuredTitle}
        </h2>
      ) : null}

      {featuredDestinations.length > 0 ? (
        <DestinationGridSection
          title={null}
          headingFontClass={headingFontClass}
          destinations={featuredDestinations}
          onInquire={openModal}
          gridTopMargin="mt-4"
        />
      ) : null}

      <DestinationGridSection
        title={longHaulTitle}
        headingFontClass={headingFontClass}
        destinations={longHaulDestinations}
        onInquire={openModal}
        extraTopMargin={featuredDestinations.length > 0 ? "mt-12" : featuredTitle ? "mt-6" : "mt-10"}
      />

      {shortHaulDestinations.length > 0 ? (
        <DestinationGridSection
          title={shortHaulTitle}
          headingFontClass={headingFontClass}
          destinations={shortHaulDestinations}
          onInquire={openModal}
          extraTopMargin="mt-12"
        />
      ) : null}

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[#d5d5d5] bg-[#f6f6f6] p-4 shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Destination Inquiry"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl font-semibold leading-tight text-black">
                  Destination Inquiry
                </h3>
                <p className="mt-1 text-sm text-[#5d5d5d]">
                  For:{" "}
                  <span className="font-semibold text-black">
                    {selectedDestination}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded p-1 transition-opacity hover:opacity-80"
                aria-label="Close destination inquiry form"
              >
                <Image
                  src="/Images/cross.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              </button>
            </div>

            {selectedTourDetails ? (
              <section className="mt-6 rounded-lg border border-[#d5d5d5] bg-white px-4 py-4 sm:px-5">
                <h4 className="text-2xl font-semibold leading-tight text-black">
                  Tour Details
                </h4>

                <div className="mt-4 space-y-0.5 text-base leading-7 text-[#1f1f1f]">
                  <p className="font-semibold">{selectedTourDetails.packageName}</p>
                  {selectedTourDetails.route ? <p>{selectedTourDetails.route}</p> : null}
                  {selectedTourDetails.airline ? <p>{selectedTourDetails.airline}</p> : null}
                  {selectedTourDetails.highlight ? (
                    <p>{selectedTourDetails.highlight}</p>
                  ) : null}
                  {selectedTourDetails.additionalSummaryLines?.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                {selectedTourDetails.travelDates.length ? (
                  <div className="mt-5">
                    <h5 className="text-xl font-semibold leading-tight text-black">
                      {selectedTourDetails.travelDatesHeading ?? "Travel Dates"}
                    </h5>
                    <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-tight text-[#111111]">
                      {selectedTourDetails.travelDates.map((date) => (
                        <li key={date}>{date}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {selectedTourDetails.itinerary.length ? (
                  <div className="mt-6">
                    <h5 className="text-xl font-semibold leading-tight text-black">
                      {selectedTourDetails.itineraryHeading ?? "Updated Itinerary"}
                    </h5>
                    <div className="mt-3 space-y-4 text-[#111111]">
                      {selectedTourDetails.itinerary.map((entry) => (
                        <div key={entry.day}>
                          <p className="text-lg font-semibold leading-tight">
                            {entry.day}
                          </p>
                          <ul className="mt-1 list-disc space-y-1 pl-6 text-base leading-tight">
                            {entry.items.map((item) => (
                              <li key={`${entry.day}-${item}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedTourDetails.hotels?.length ? (
                  <div className="mt-6">
                    <h5 className="text-xl font-semibold leading-tight text-black">
                      {selectedTourDetails.hotelsHeading ?? "Hotels"}
                    </h5>
                    <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-tight text-[#111111]">
                      {selectedTourDetails.hotels.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6">
                  <h5 className="text-xl font-semibold leading-tight text-black">
                    Inclusions
                  </h5>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-tight text-[#111111]">
                    {selectedTourDetails.inclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h5 className="text-xl font-semibold leading-tight text-black">
                    Exclusions
                  </h5>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-base leading-tight text-[#111111]">
                    {selectedTourDetails.exclusions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {selectedTourDetails.exclusionNotes?.length ? (
                    <div className="mt-2 space-y-1 text-sm leading-tight text-[#444444]">
                      {selectedTourDetails.exclusionNotes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}

            <form
              onSubmit={handleSubmit}
              className={`${selectedTourDetails ? "mt-8" : "mt-6"} space-y-6`}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(event) => updateFormField("email", event.target.value)}
                    onBlur={() => validateField("email")}
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                  {formErrors.email ? (
                    <p className="text-sm text-red-600">{formErrors.email}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(event) => updateFormField("name", event.target.value)}
                    onBlur={() => validateField("name")}
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                  {formErrors.name ? (
                    <p className="text-sm text-red-600">{formErrors.name}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Departure <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formState.departure}
                    onChange={(event) =>
                      updateFormField("departure", event.target.value)
                    }
                    onBlur={() => validateField("departure")}
                    min={getTodayString()}
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                  {formErrors.departure ? (
                    <p className="text-sm text-red-600">{formErrors.departure}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                    Return <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formState.returnDate}
                    onChange={(event) =>
                      updateFormField("returnDate", event.target.value)
                    }
                    onBlur={() => validateField("returnDate")}
                    min={
                      formState.departure
                        ? addDays(formState.departure, 1)
                        : getTodayString()
                    }
                    className="w-full rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                  />
                  {formErrors.returnDate ? (
                    <p className="text-sm text-red-600">{formErrors.returnDate}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid items-start gap-4 sm:grid-cols-3">
                {[
                  { label: "Adults", hint: "12+ years", field: "adults" as const },
                  {
                    label: "Children",
                    hint: "2 - under 12 Yrs",
                    field: "children" as const,
                  },
                  {
                    label: "Infants",
                    hint: "Under 2 Yrs",
                    field: "infants" as const,
                  },
                ].map((traveler) => (
                  <div key={traveler.field} className="justify-self-start">
                    <p className="text-base font-medium leading-6 text-[#1f1f1f]">
                      {traveler.label}{" "}
                      <span className="font-normal text-base text-[#7a7a7a]">
                        {traveler.hint}
                      </span>
                    </p>

                    <div className="mt-2 flex h-10 w-[13rem] max-w-full overflow-hidden rounded-md border border-[#bcbcbc] bg-white">
                      <button
                        type="button"
                        onClick={() => adjustTravelerCount(traveler.field, -1)}
                        className="h-full w-10 text-lg leading-none text-[#1f1f1f] transition-colors hover:bg-[#ececec]"
                        aria-label={`Decrease ${traveler.label}`}
                      >
                        -
                      </button>

                      <div className="flex h-full flex-1 items-center justify-center border-x border-[#bcbcbc] text-base font-medium leading-none text-[#1f1f1f]">
                        {formState[traveler.field]}
                      </div>

                      <button
                        type="button"
                        onClick={() => adjustTravelerCount(traveler.field, 1)}
                        className="h-full w-10 text-lg leading-none text-[#1f1f1f] transition-colors hover:bg-[#ececec]"
                        aria-label={`Increase ${traveler.label}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {formErrors.adults ? (
                <p className="text-sm text-red-600">{formErrors.adults}</p>
              ) : null}

              <div className="space-y-2">
                <label className="text-base font-medium leading-6 text-[#1f1f1f]">
                  Message
                </label>
                <textarea
                  value={formState.additionalInquiries}
                  onChange={(event) =>
                    updateFormField("additionalInquiries", event.target.value)
                  }
                  onBlur={() => validateField("additionalInquiries")}
                  rows={5}
                  className="w-full resize-y rounded-md border border-[#bcbcbc] bg-white px-3 py-2.5 text-base text-black outline-none transition focus:border-[#50a7a4] focus:ring-2 focus:ring-[#50a7a4]/20"
                />
                {formErrors.additionalInquiries ? (
                  <p className="text-sm text-red-600">
                    {formErrors.additionalInquiries}
                  </p>
                ) : null}
              </div>

              {submitError ? (
                <p className="text-sm text-red-600">{submitError}</p>
              ) : null}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[9rem] cursor-pointer rounded-md bg-[#50a7a4] px-6 py-2.5 text-xl font-medium text-white transition-colors duration-200 hover:bg-[#458f8c] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {toastMessage ? (
        <div
          className="fixed bottom-6 left-1/2 z-[130] w-[min(90vw,900px)] -translate-x-1/2 rounded-2xl border border-[#cfcfcf] bg-white px-6 py-5 text-center text-lg text-[#1f1f1f] shadow-2xl sm:px-10 sm:py-6"
          role="status"
          aria-live="polite"
        >
          <span
            className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#28b30f] text-lg font-semibold text-white shadow-lg"
            aria-hidden="true"
          >
            ✓
          </span>
          {toastMessage}
        </div>
      ) : null}
    </>
  );
}
