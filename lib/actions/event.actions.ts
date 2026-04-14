'use server';

import { supabase } from "@/lib/supabase";

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        // Step 1: Fetch the current event by slug so we know its tags
        const { data: currentEvent, error: eventError } = await supabase
            .from("events")
            .select("id, tags")
            .eq("slug", slug)
            .single();

        if (eventError || !currentEvent) return [];

        // Step 2: Fetch other events that share at least one tag with the current event
        const { data: similarEvents, error: similarError } = await supabase
            .from("events")
            .select()
            .neq("id", currentEvent.id)                // exclude the current event
            .overlaps("tags", currentEvent.tags ?? [])  // match any shared tag
            .order("created_at", { ascending: false })
            .limit(3);

        if (similarError) return [];

        return similarEvents;
    } catch {
        return [];
    }
}