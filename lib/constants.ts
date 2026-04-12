export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "Next.js Conf 2026",
    image: "/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA",
    date: "Oct 22, 2026",
    time: "9:00 AM PDT",
  },
  {
    title: "Vercel Ship 2026",
    image: "/images/event2.png",
    slug: "vercel-ship-2026",
    location: "New York, NY",
    date: "Jun 25, 2026",
    time: "10:00 AM EDT",
  },
  {
    title: "React Summit US 2026",
    image: "/images/event3.png",
    slug: "react-summit-us-2026",
    location: "New York, NY",
    date: "Nov 18, 2026",
    time: "9:30 AM EST",
  },
  {
    title: "GitHub Universe 2026",
    image: "/images/event4.png",
    slug: "github-universe-2026",
    location: "San Francisco, CA",
    date: "Oct 28, 2026",
    time: "9:00 AM PDT",
  },
  {
    title: "MLH Global Hack Week",
    image: "/images/event5.png",
    slug: "mlh-global-hack-week",
    location: "Online",
    date: "Aug 03, 2026",
    time: "12:00 PM UTC",
  },
  {
    title: "JSNation Amsterdam 2026",
    image: "/images/event6.png",
    slug: "jsnation-amsterdam-2026",
    location: "Amsterdam, Netherlands",
    date: "Jun 11, 2026",
    time: "9:00 AM CEST",
  },
];
