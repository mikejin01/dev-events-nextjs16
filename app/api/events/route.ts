import { supabase } from "@/lib/supabase";
import type { TablesInsert } from "@/lib/database.types";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary using the CLOUDINARY_URL env var
cloudinary.config({ secure: true });

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const raw = Object.fromEntries(formData.entries()) as Record<string, string>;

        // Upload image to Cloudinary
        const file = formData.get('image') as File;

        if (!file)
            return NextResponse.json({ message: 'Image file is required' }, { status: 400 });

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'dev-events' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result as { secure_url: string });
                }).end(buffer);
        });

        // Generate a URL-friendly slug from the title
        const slug = raw.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        // Build typed insert payload, parsing comma-separated strings to arrays
        const event: TablesInsert<"events"> = {
            title: raw.title,
            slug,
            description: raw.description,
            overview: raw.overview,
            image: uploadResult.secure_url,
            venue: raw.venue,
            location: raw.location,
            date: raw.date,
            time: raw.time,
            mode: raw.mode,
            audience: raw.audience,
            agenda: raw.agenda ? raw.agenda.split(",").map(s => s.trim()) : [],
            organizer: raw.organizer,
            tags: raw.tags ? raw.tags.split(",").map(s => s.trim()) : [],
        };

        const { data: createdEvent, error } = await supabase
            .from("events")
            .insert(event)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ message: "Event creation failed", error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: 'Event created successfully', event: createdEvent }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: 'Event creation failed', error: e instanceof Error ? e.message : 'Unknown' },
            { status: 500 }
        );
    }

}

export async function GET() {
    try {
        const { data: events, error } = await supabase
            .from("events")
            .select()
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json({ message: "Event fetching failed", error: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: 'Events fetched successfully', events }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { message: 'Event fetching failed', error: e instanceof Error ? e.message : 'Unknown' },
            { status: 500 }
        );
    }
}
