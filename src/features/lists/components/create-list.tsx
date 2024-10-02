import { useState } from "react";
import { api } from "~/trpc/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

import { HexColorPicker } from "react-colorful";
import { Plus } from "lucide-react";
import Colors from "./colors";

export default function CreateList() {
  const [listName, setListName] = useState("");
  const [color, setColor] = useState("#FF6B6B");

  const utils = api.useUtils();
  const { mutate, error, isPending } = api.list.create.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      setListName("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title: listName, color: color });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          <span className="text-sm font-medium">New task list</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Create a new list</h4>
            <Input
              type="text"
              placeholder="Type a name for the list..."
              name="title"
              required
              className="focus-visible:ring-0"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />

            {error?.data?.zodError?.fieldErrors.title && (
              <span className="mb-8 text-xs text-red-500">{error.data.zodError.fieldErrors.title}</span>
            )}

            <Colors color={color} setColor={setColor} />

            <Button className="w-full" type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
