import doctor1 from "@/assets/doctor1.jpg";
import doctor2 from "@/assets/doctor2.jpg";
import doctor3 from "@/assets/doctor3.jpg";
import doctor4 from "@/assets/doctor4.jpg";
import doctor5 from "@/assets/doctor5.jpg";
import doctor6 from "@/assets/doctor6.jpg";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  country: string;
  rating: number;
  reviews: number;
  experience: number;
  priceDollars: number;
  priceDuxtcoins: number;
  image: string;
  available: boolean;
  languages: string[];
  bio: string;
  qualifications: string[];
  hospitalAffiliation: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-kwame-mensah",
    name: "Dr. Kwame Mensah",
    specialty: "General Practitioner",
    country: "Ghana",
    rating: 4.9,
    reviews: 324,
    experience: 12,
    priceDollars: 35,
    priceDuxtcoins: 150,
    image: doctor1,
    available: true,
    languages: ["English", "Twi", "French"],
    bio: "Dr. Kwame Mensah is a highly experienced general practitioner with over 12 years of practice. He specializes in preventive medicine, chronic disease management, and family health consultations.",
    qualifications: ["MBBS - University of Ghana", "MPH - Johns Hopkins University", "Fellow, Ghana College of Physicians"],
    hospitalAffiliation: "Korle Bu Teaching Hospital",
  },
  {
    id: "dr-amara-osei",
    name: "Dr. Amara Osei",
    specialty: "Pediatrician",
    country: "Nigeria",
    rating: 4.8,
    reviews: 256,
    experience: 9,
    priceDollars: 40,
    priceDuxtcoins: 170,
    image: doctor2,
    available: true,
    languages: ["English", "Yoruba"],
    bio: "Dr. Amara Osei is a compassionate pediatrician dedicated to children's health. She has extensive experience in neonatal care, childhood immunizations, and developmental pediatrics.",
    qualifications: ["MBBS - University of Lagos", "FWACP Pediatrics", "Certificate in Neonatal Medicine"],
    hospitalAffiliation: "Lagos University Teaching Hospital",
  },
  {
    id: "dr-kofi-adjei",
    name: "Dr. Kofi Adjei",
    specialty: "Cardiologist",
    country: "Kenya",
    rating: 4.7,
    reviews: 198,
    experience: 15,
    priceDollars: 55,
    priceDuxtcoins: 235,
    image: doctor3,
    available: false,
    languages: ["English", "Swahili"],
    bio: "Dr. Kofi Adjei is a board-certified cardiologist with expertise in heart disease prevention, echocardiography, and interventional cardiology.",
    qualifications: ["MBChB - University of Nairobi", "Fellowship in Cardiology - Aga Khan University", "Board Certified Cardiologist"],
    hospitalAffiliation: "Kenyatta National Hospital",
  },
  {
    id: "dr-fatima-diallo",
    name: "Dr. Fatima Diallo",
    specialty: "Dermatologist",
    country: "Senegal",
    rating: 4.9,
    reviews: 412,
    experience: 8,
    priceDollars: 45,
    priceDuxtcoins: 190,
    image: doctor4,
    available: true,
    languages: ["English", "French", "Wolof"],
    bio: "Dr. Fatima Diallo specializes in dermatology with a focus on skin conditions prevalent in African skin types, cosmetic dermatology, and skin cancer screening.",
    qualifications: ["MD - Cheikh Anta Diop University", "Dermatology Residency - Paris Descartes University", "Certified Dermoscopy Specialist"],
    hospitalAffiliation: "Hôpital Principal de Dakar",
  },
  {
    id: "dr-benjamin-nkrumah",
    name: "Dr. Benjamin Nkrumah",
    specialty: "Internal Medicine",
    country: "Ghana",
    rating: 4.6,
    reviews: 178,
    experience: 20,
    priceDollars: 50,
    priceDuxtcoins: 215,
    image: doctor5,
    available: true,
    languages: ["English", "Twi", "Ga"],
    bio: "Dr. Benjamin Nkrumah is a senior internist with two decades of clinical experience. He is an authority in diabetes management, hypertension, and tropical medicine.",
    qualifications: ["MBBS - KNUST", "MRCP (UK)", "Fellow, Royal College of Physicians"],
    hospitalAffiliation: "Komfo Anokye Teaching Hospital",
  },
  {
    id: "dr-samuel-okonkwo",
    name: "Dr. Samuel Okonkwo",
    specialty: "Orthopedic Surgeon",
    country: "Nigeria",
    rating: 4.8,
    reviews: 287,
    experience: 14,
    priceDollars: 60,
    priceDuxtcoins: 260,
    image: doctor6,
    available: true,
    languages: ["English", "Igbo"],
    bio: "Dr. Samuel Okonkwo is a leading orthopedic surgeon specializing in sports medicine, joint replacements, and trauma surgery. He has performed over 2,000 successful surgeries.",
    qualifications: ["MBBS - University of Nigeria", "Fellowship in Orthopedics - Royal College of Surgeons", "Sports Medicine Certification"],
    hospitalAffiliation: "National Orthopaedic Hospital Lagos",
  },
];
