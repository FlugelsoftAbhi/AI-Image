"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { GenerateImageRequest, GenerateImageResponse } from "@/services/imageGenerator";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [style, setStyle] = useState("photorealistic");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    toast.info("Waiting for AI generation...");

    try {
      const width = aspectRatio === "16:9" ? 1024 : aspectRatio === "9:16" ? 576 : 1024;
      const height = aspectRatio === "16:9" ? 576 : aspectRatio === "9:16" ? 1024 : 1024;

      const reqBody: GenerateImageRequest = {
        prompt,
        negativePrompt,
        style,
        width,
        height,
        count: 1,
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Generation failed");
      }

      const data: GenerateImageResponse = await res.json();
      setImages(data.images);
      toast.success("Generation complete!");
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto h-full flex flex-col md:flex-row gap-6">
      {/* Settings Panel */}
      <div className="w-full md:w-80 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Create</h1>
          <p className="text-sm text-muted-foreground">Transform your ideas into reality</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea 
              id="prompt" 
              placeholder="A futuristic city with flying cars, photorealistic, 8k..."
              className="resize-none h-32 bg-background/50 backdrop-blur-sm"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="negative">Negative Prompt</Label>
            <Input 
              id="negative" 
              placeholder="blurry, low quality, distorted..." 
              className="bg-background/50 backdrop-blur-sm"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="photorealistic">Photorealistic</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="digital-art">Digital Art</SelectItem>
                <SelectItem value="3d-render">3D Render</SelectItem>
                <SelectItem value="cinematic">Cinematic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Aspect Ratio</Label>
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">Square (1:1)</SelectItem>
                <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                <SelectItem value="9:16">Portrait (9:16)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full mt-4" 
            size="lg" 
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Generation View */}
      <div className="flex-1 rounded-2xl border bg-background/40 backdrop-blur-md flex flex-col overflow-hidden relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-lg font-medium animate-pulse">Waiting for AI generation...</p>
            <p className="text-sm text-muted-foreground">This typically takes 10-20 seconds</p>
          </div>
        ) : null}

        <div className="flex-1 p-6 flex items-center justify-center">
          {images.length > 0 ? (
            <div className="grid gap-4 w-full h-full max-h-[800px]">
              {images.map((url, i) => (
                <div key={i} className="relative w-full h-full rounded-xl overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Generated ${i}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground font-medium">Your generated masterpiece will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
