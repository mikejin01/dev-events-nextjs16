import { createClient } from "@supabase/supabase-js";
import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import * as path from "path";

cloudinary.config({ secure: true });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const events = [
  {
    title: "Next.js Conf 2026",
    image: "public/images/event1.png",
    slug: "nextjs-conf-2026",
    location: "San Francisco, CA",
    date: "Oct 22, 2026",
    time: "9:00 AM PDT",
    description: "The official Next.js conference bringing together developers from around the world to explore the latest in React and web development.",
    overview: "Next.js Conf is the premier event for Next.js developers. Join us for a full day of talks, workshops, and networking with the creators and community behind the most popular React framework.",
    venue: "Moscone Center",
    mode: "hybrid",
    audience: "Developers",
    organizer: "Vercel",
    agenda: ["Opening Keynote", "What's New in Next.js", "Performance Deep Dive", "Community Showcase", "Closing Remarks"],
    tags: ["nextjs", "react", "vercel", "web-development"],
  },
  {
    title: "Vercel Ship 2026",
    image: "public/images/event2.png",
    slug: "vercel-ship-2026",
    location: "New York, NY",
    date: "Jun 25, 2026",
    time: "10:00 AM EDT",
    description: "Vercel's flagship product launch event showcasing the latest tools and features for modern web development.",
    overview: "Vercel Ship is where new products and features are unveiled. Get an exclusive first look at what's next for the Vercel platform, from serverless functions to edge computing and beyond.",
    venue: "The Shed, Hudson Yards",
    mode: "hybrid",
    audience: "Developers",
    organizer: "Vercel",
    agenda: ["Product Announcements", "Live Demos", "Customer Stories", "Developer Panel", "Networking Reception"],
    tags: ["vercel", "nextjs", "deployment", "cloud"],
  },
  {
    title: "React Summit US 2026",
    image: "public/images/event3.png",
    slug: "react-summit-us-2026",
    location: "New York, NY",
    date: "Nov 18, 2026",
    time: "9:30 AM EST",
    description: "The biggest React conference in the US featuring talks from top engineers and open-source maintainers.",
    overview: "React Summit US brings together thousands of React developers for a day of advanced talks, workshops, and networking. Learn from the best in the React ecosystem about Server Components, performance, and more.",
    venue: "Javits Center",
    mode: "hybrid",
    audience: "Developers",
    organizer: "GitNation",
    agenda: ["React Server Components", "State Management in 2026", "Testing Best Practices", "Panel: Future of React", "Lightning Talks"],
    tags: ["react", "javascript", "frontend", "web-development"],
  },
  {
    title: "GitHub Universe 2026",
    image: "public/images/event4.png",
    slug: "github-universe-2026",
    location: "San Francisco, CA",
    date: "Oct 28, 2026",
    time: "9:00 AM PDT",
    description: "GitHub's annual conference exploring the future of software development, AI-assisted coding, and open source collaboration.",
    overview: "GitHub Universe is the premier event for the global developer community. Discover new GitHub features, learn about AI-powered development with Copilot, and connect with maintainers and contributors from every corner of open source.",
    venue: "Fort Mason Center",
    mode: "offline",
    audience: "Developers",
    organizer: "GitHub",
    agenda: ["Keynote: The Future of Code", "GitHub Copilot Workshop", "Open Source Maintainer Summit", "Security Best Practices", "After Party"],
    tags: ["github", "open-source", "ai", "devtools"],
  },
  {
    title: "MLH Global Hack Week",
    image: "public/images/event5.png",
    slug: "mlh-global-hack-week",
    location: "Online",
    date: "Aug 03, 2026",
    time: "12:00 PM UTC",
    description: "A week-long virtual hackathon by Major League Hacking with daily challenges, workshops, and prizes for developers worldwide.",
    overview: "MLH Global Hack Week is a free, week-long event where developers of all skill levels come together to build projects, learn new technologies, and compete in fun challenges. Participate from anywhere in the world.",
    venue: "Virtual",
    mode: "online",
    audience: "Students & Developers",
    organizer: "Major League Hacking",
    agenda: ["Day 1: Kickoff & Team Formation", "Day 2: API Challenge", "Day 3: AI/ML Workshop", "Day 5: Demo Prep", "Day 7: Final Demos & Awards"],
    tags: ["hackathon", "mlh", "students", "open-source"],
  },
  {
    title: "JSNation Amsterdam 2026",
    image: "public/images/event6.png",
    slug: "jsnation-amsterdam-2026",
    location: "Amsterdam, Netherlands",
    date: "Jun 11, 2026",
    time: "9:00 AM CEST",
    description: "Europe's largest JavaScript conference bringing together the global JS community in the heart of Amsterdam.",
    overview: "JSNation is a two-day celebration of all things JavaScript. From Node.js and Deno to browser APIs and frameworks, hear from world-class speakers and participate in hands-on workshops in one of Europe's most vibrant cities.",
    venue: "Theater Amsterdam",
    mode: "hybrid",
    audience: "Developers",
    organizer: "GitNation",
    agenda: ["JavaScript in 2026", "Node.js Performance", "Edge Computing Workshop", "TypeScript Deep Dive", "Community Awards"],
    tags: ["javascript", "nodejs", "frontend", "web-development"],
  },
];

async function uploadImage(localPath: string): Promise<string> {
  const absolutePath = path.resolve(localPath);
  const buffer = fs.readFileSync(absolutePath);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "image", folder: "dev-events" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!.secure_url);
        }
      )
      .end(buffer);
  });
}

async function seed() {
  console.log(`Seeding ${events.length} events...\n`);

  for (const evt of events) {
    // Check if slug already exists
    const { data: existing } = await supabase
      .from("events")
      .select("id")
      .eq("slug", evt.slug)
      .single();

    if (existing) {
      console.log(`⏭  "${evt.title}" already exists, skipping`);
      continue;
    }

    // Upload image to Cloudinary
    console.log(`📤 Uploading image for "${evt.title}"...`);
    const imageUrl = await uploadImage(evt.image);

    // Insert into Supabase
    const { error } = await supabase.from("events").insert({
      title: evt.title,
      slug: evt.slug,
      description: evt.description,
      overview: evt.overview,
      image: imageUrl,
      venue: evt.venue,
      location: evt.location,
      date: evt.date,
      time: evt.time,
      mode: evt.mode,
      audience: evt.audience,
      agenda: evt.agenda,
      organizer: evt.organizer,
      tags: evt.tags,
    });

    if (error) {
      console.error(`❌ Failed: "${evt.title}" — ${error.message}`);
    } else {
      console.log(`✅ Created: "${evt.title}"`);
    }
  }

  console.log("\nDone!");
}

seed();
