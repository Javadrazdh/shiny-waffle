import { services } from "./services";
import { listings } from "./listings";
import { testimonials } from "./testimonials";
import { posts } from "./posts";

/**
 * Content adapter.
 *
 * The rest of the app only talks to these functions — never to the raw data
 * files. To connect a real data source later (Airtable, Notion, a custom API
 * or CRM), swap the implementations here to fetch from that source. The UI and
 * page components will not need to change.
 */

export async function getServices() {
  return services;
}

export async function getListings() {
  return listings;
}

export async function getFeaturedListings() {
  return listings.filter((l) => l.featured);
}

export async function getListing(slug: string) {
  return listings.find((l) => l.slug === slug) ?? null;
}

export async function getTestimonials() {
  return testimonials;
}

export async function getPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string) {
  return posts.find((p) => p.slug === slug) ?? null;
}
