import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

import { CheckCircleIcon, Rocket, Settings, User } from "lucide-react";

import { getServerAuthSession } from "~/server/auth";

export default async function Sidebar() {
  const session = await getServerAuthSession();

  return (
    <aside className="fixed flex h-screen w-20 flex-col items-center justify-between border-r bg-muted/35 py-10">
      <Button size="icon">
        <CheckCircleIcon size={20} />
      </Button>

      <Popover>
        <PopoverTrigger>
          <Avatar className="h-7 w-7">
            {/* @ts-ignore */}
            <AvatarImage src={session?.user.image} alt={session?.user.name} />
            <AvatarFallback>{session?.user.name}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        <PopoverContent className="ml-6 w-60 px-0">
          <Button size={"sm"} variant={"ghost"} className="mb-1 w-full justify-normal gap-2">
            <User size={18} className="text-muted-foreground" />
            <p>Profile</p>
          </Button>

          <Button size={"sm"} variant={"ghost"} className="mb-1 w-full justify-normal gap-2">
            <Settings size={18} className="text-muted-foreground" />
            <p>Preferences</p>
          </Button>

          <Button size={"sm"} variant={"ghost"} className="mb-5 w-full justify-normal gap-2 border-b">
            <Rocket size={18} className="text-muted-foreground" />
            <p>Shortcuts</p>
          </Button>

          {/* Social  Media */}

          <Button size={"sm"} variant={"ghost"} className="w-full justify-normal gap-2">
            <p>Follow Morgen on X</p>
          </Button>

          <Button size={"sm"} variant={"ghost"} className="w-full justify-normal gap-2">
            <p>Join our Discord</p>
          </Button>
        </PopoverContent>
      </Popover>
    </aside>
  );
}
