"use client";

import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CollectionsPage() {
  const collections = [
    { name: "Favorites", count: 12 },
    { name: "Character Designs", count: 4 },
    { name: "Landscapes", count: 8 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Collections</h1>
          <p className="text-muted-foreground">Organize your generated assets.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collections.map((col, i) => (
          <div key={i} className="group cursor-pointer rounded-xl border bg-card p-6 flex flex-col items-center justify-center text-center hover:border-primary transition-colors h-48">
            <FolderOpen className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mb-4" />
            <h3 className="font-semibold text-lg">{col.name}</h3>
            <p className="text-sm text-muted-foreground">{col.count} items</p>
          </div>
        ))}
      </div>
    </div>
  );
}
