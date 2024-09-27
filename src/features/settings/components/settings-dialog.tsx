"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import General from "./general";
import Profile from "./profile";

export default function UserSettings() {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("General");

  const menuItems = [
    { category: "Explore", items: ["Features", "Shortcuts"] },
    { category: "Preferences", items: ["General", "Calendars"] },
    { category: "Integrations", items: ["External accounts", "Conferencing links"] },
    { category: "Account", items: ["Profile", "Info"] },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl overflow-hidden p-0">
        <div className="flex h-[700px]">
          <div className="w-56 border-r bg-muted/80">
            <ScrollArea className="h-full">
              {menuItems.map((section) => (
                <div key={section.category} className="mb-4">
                  <h3 className="px-4 py-3 text-sm font-semibold text-gray-500">{section.category}</h3>
                  {section.items.map((item) => (
                    <button
                      key={item}
                      className={`w-full px-4 py-2 text-left text-sm ${activeSection === item ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-200"}`}
                      onClick={() => setActiveSection(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ))}
            </ScrollArea>
          </div>

          <div className="flex-1">
            <DialogHeader className="border-b px-6 py-4">
              <DialogTitle>{activeSection}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[calc(100%-65px)] px-6 py-4">
              {activeSection == "General" ? <General /> : <></>}
              {/* {activeSection == "Profile" ? <Profile /> : <></>} */}
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
