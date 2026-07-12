import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateImage } from "@/services/imageGenerator";
import { decrementCredits, saveGeneratedImage } from "@/services/database";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, negativePrompt, style, width, height, seed, cfg, steps, count } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Abstracted AI generation layer - will throw "Gemini API not connected." as required
    const result = await generateImage({
      prompt,
      negativePrompt,
      style,
      width,
      height,
      seed,
      cfg,
      steps,
      count
    });

    // We never reach this point currently, but architecture is ready.
    
    // Deduct credit
    await decrementCredits(userId, 1);

    // Save image to DB
    if (result.images && result.images.length > 0) {
      for (const url of result.images) {
        await saveGeneratedImage({
          user_id: userId, // This expects a UUID in Supabase, in real implementation we map Clerk ID to Supabase ID
          prompt,
          negative_prompt: negativePrompt,
          style,
          width,
          height,
          seed,
          cfg,
          steps,
          image_url: url,
          status: 'completed'
        });
      }
    }

    return NextResponse.json({ images: result.images });

  } catch (error: any) {
    console.error("[API_GENERATE_ERROR]", error);
    
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
