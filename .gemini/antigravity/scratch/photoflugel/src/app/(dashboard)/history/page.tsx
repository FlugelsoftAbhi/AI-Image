"use client";

import { useState } from "react";
import { Image as ImageIcon, Download, Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const [images] = useState<any[]>([]); // In a real app, this would be fetched from /api/history

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Generation History</h1>
        <p className="text-muted-foreground">View and manage all your past creations.</p>
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center border rounded-2xl bg-background/50 border-dashed">
          <ImageIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No images yet</h2>
          <p className="text-muted-foreground mb-6">You haven't generated any images. Go to the dashboard to create your first masterpiece.</p>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden border bg-background/50 aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-white text-sm line-clamp-2 mb-3">{img.prompt}</p>
                <div className="flex gap-2">
                  <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white border-0">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white border-0">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <div className="flex-1" />
                  <Button size="icon" variant="destructive" className="w-8 h-8 rounded-full">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
