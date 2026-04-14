import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Missing or invalid slug parameter" },
        { status: 400 }
      );
    }

    // Fetch event by unique slug
    const { data: event, error } = await supabase
      .from("events")
      .select()
      .eq("slug", slug)
      .single();

    if (error) {
      // PGRST116 = no rows found
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { message: "Event not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Failed to fetch event", error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Event fetching failed", error: e instanceof Error ? e.message : "Unknown" },
      { status: 500 }
    );
  }
}
