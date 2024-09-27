import { useState } from "react";
import { api } from "~/trpc/react";
import { List } from "~/types/api";

import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Input } from "~/components/ui/input";

import { Trash2, Ellipsis, Check } from "lucide-react";

const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#1A535C", "#FF9FF3", "#FAC05E"];

export default function ListManager({ list }: { list: List }) {
  const [newList, setNewList] = useState(list.title);
  const [selectedColor, setSelectedColor] = useState(list.color);

  const utils = api.useUtils();
  const { mutate, error, isPending } = api.list.update.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      mutate({ title: newList, id: list.id });
    }
  };

  const deleteTaskList = api.list.delete.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate();
    },
  });

  const handleDelete = () => {
    deleteTaskList.mutate({ id: list.id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"sm"} className="absolute right-5 top-3 text-muted-foreground">
          <Ellipsis size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <Input value={newList} onKeyDown={handleSubmit} name="title" onChange={(e) => setNewList(e.target.value)} />
          <div className="flex justify-around">
            {colors.map((color, index) => (
              <button
                key={index}
                type="button"
                className="h-5 w-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
                onClick={() => {
                  setSelectedColor(color);
                  mutate({ id: list.id, color: selectedColor });
                }}
              >
                {color === selectedColor && <Check className="mx-auto h-4 w-4 text-white" />}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={deleteTaskList.isPending}
            onClick={handleDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
