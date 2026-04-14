import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { supabase } from "@/lib/supabase";
import type { Tables } from "@/lib/database.types";
import { cacheLife } from "next/cache";

export default async function Page() {
  'use cace';
  cacheLife('hours');
  // page.tsx fetched its own API route via HTTP
  //const response = await fetch(`${BASE_URL}/api/events`);
  //const { events } = await response.json(); // 💥 HTML instead of JSON


  const { data: events } = await supabase
    .from("events")
    .select()
    .order("created_at", { ascending: false });
  return(
    <section>
      <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn />
      <div className="mt-2 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event: Tables<"events">) => (
            <li key={event.id} className="list-none">
              <EventCard {...event} />
            </li>
          ))}

        </ul>

      </div>
    </section>
    
  )
}