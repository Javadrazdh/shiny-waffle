import type { Testimonial } from "./types";

/**
 * NOTE: These are placeholder/sample entries (sample: true) — no fabricated
 * real reviews. Replace with genuine, approved client testimonials over time,
 * or connect to Google Reviews later.
 */
export const testimonials: Testimonial[] = [
  {
    name: "—",
    dealType: {
      fa: "فروش زمین شهری",
      en: "Urban land sale",
      ar: "بيع أرض حضرية",
      ru: "Продажа городского участка",
    },
    city: { fa: "ساری", en: "Sari", ar: "ساري", ru: "Сари" },
    quote: {
      fa: "این متن نمونه است. پس از تکمیل معاملات، رضایت‌نامه‌های واقعی مشتریان در اینجا نمایش داده می‌شود.",
      en: "This is a sample. Genuine client testimonials will appear here once shared and approved.",
      ar: "هذا نص تجريبي. ستظهر هنا شهادات العملاء الحقيقية بعد مشاركتها والموافقة عليها.",
      ru: "Это образец. Реальные отзывы клиентов появятся здесь после согласования.",
    },
    rating: 5,
    sample: true,
  },
  {
    name: "—",
    dealType: {
      fa: "مشارکت در ساخت",
      en: "Construction partnership",
      ar: "مشاركة في البناء",
      ru: "Партнёрство в строительстве",
    },
    city: { fa: "مازندران", en: "Mazandaran", ar: "مازندران", ru: "Мазандаран" },
    quote: {
      fa: "این متن نمونه است. جای این بخش برای تجربه‌ی واقعی مالکان و سرمایه‌گذاران محفوظ است.",
      en: "This is a sample, reserved for the real experiences of owners and investors.",
      ar: "هذا نص تجريبي، مخصص لتجارب المالكين والمستثمرين الحقيقية.",
      ru: "Это образец, зарезервированный для реальных отзывов владельцев и инвесторов.",
    },
    rating: 5,
    sample: true,
  },
  {
    name: "—",
    dealType: {
      fa: "خرید ویلای جنگلی",
      en: "Forest villa purchase",
      ar: "شراء فيلا في الغابة",
      ru: "Покупка лесной виллы",
    },
    city: { fa: "مازندران", en: "Mazandaran", ar: "مازندران", ru: "Мазандаран" },
    quote: {
      fa: "این متن نمونه است و بعداً با نظر واقعی مشتری جایگزین خواهد شد.",
      en: "This is a sample and will later be replaced with a real client's words.",
      ar: "هذا نص تجريبي وسيُستبدل لاحقًا بكلمات عميل حقيقي.",
      ru: "Это образец, который позже заменит реальный отзыв клиента.",
    },
    rating: 5,
    sample: true,
  },
];
