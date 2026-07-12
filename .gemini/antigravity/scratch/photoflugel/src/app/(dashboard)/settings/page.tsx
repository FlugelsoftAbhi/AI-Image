"use client";

import { UserProfile } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and profile.</p>
      </div>

      <div className="bg-card rounded-2xl overflow-hidden border">
        {/* Clerk UserProfile handles a lot of this seamlessly */}
        <div className="flex justify-center p-6 bg-muted/20">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full shadow-none",
                cardBox: "w-full max-w-none shadow-none rounded-none border-0",
                navbar: "hidden",
                pageScrollBox: "px-0",
                profileSection: "mb-0",
              }
            }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive updates when generations finish.</p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">Toggle application theme.</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </div>
  );
}
