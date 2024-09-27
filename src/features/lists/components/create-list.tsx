import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

import { Check, Plus } from "lucide-react";
import { api } from "~/trpc/react";

const colorOptions = [
  "#FF6B6B",
  "#FF9FF3",
  "#54A0FF",
  "#5CD859",
  "#FF9F43",
  "#5E77FF",
  "#2ED573",
  "#A4B0BE",
  "#747D8C",
];

export default function CreateList() {
  const [listName, setListName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const utils = api.useUtils();
  const { mutate, error, isPending } = api.list.create.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      setListName("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ title: listName, color: selectedColor });
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
              className="focus-visible:ring-0"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <div className="flex flex-wrap justify-center gap-2">
              {colorOptions.map((color) => (
                <Button
                  key={color}
                  type="button"
                  size={"icon"}
                  className="h-6 w-6 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  {color === selectedColor && <Check className="mx-auto h-4 w-4 text-white" />}
                </Button>
              ))}
            </div>

            {error?.data?.zodError?.fieldErrors.title && (
              <span className="mb-8 text-xs text-red-500">{error.data.zodError.fieldErrors.title}</span>
            )}

            <Button className="w-full" type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
