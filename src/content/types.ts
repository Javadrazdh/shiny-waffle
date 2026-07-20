import type { Locale } from "@/i18n/routing";

export type Localized = Record<Locale, string>;

export interface Service {
  slug: string;
  icon: string;
  image: string;
  title: Localized;
  excerpt: Localized;
}

export interface Listing {
  slug: string;
  featured: boolean;
  images: string[];
  video?: string;
  title: Localized;
  type: Localized;
  areaSqm: number;
  location: Localized;
  deedStatus: Localized;
  potential: Localized;
  price: Localized;
  description: Localized;
}

export interface Testimonial {
  name: string;
  dealType: Localized;
  city: Localized;
  quote: Localized;
  rating: number;
  /** Whether this is a real, approved testimonial. Sample entries are placeholders. */
  sample: boolean;
}

export interface Post {
  slug: string;
  date: string;
  cover: string;
  title: Localized;
  excerpt: Localized;
  body: Localized;
}
