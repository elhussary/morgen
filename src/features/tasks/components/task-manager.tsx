import { useState } from "react";
import { api } from "~/trpc/react";
import { Clock, CalendarIcon, Inbox } from "lucide-react";
import { Task } from "~/types/api";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Calendar } from "~/components/ui/calendar";
import { Textarea } from "~/components/ui/textarea";
import { formatDateToLocal } from "~/lib/utils";

const priorities = [
  { name: "High", color: "bg-red-500" },
  { name: "Medium", color: "bg-yellow-500" },
  { name: "Low", color: "bg-green-500" },
  { name: "No priority", color: "bg-gray-300" },
];

export default function TaskManager({ task }: { task: Task }) {
  const [formData, setFormData] = useState({
    id: task.id,
    title: task.title,
    notes: task.notes,
    tasklist: task.tasklist,
    priority: task.priority,
    estimate: task.estimate,
    duedate: task.duedate,
  });

  const utils = api.useUtils();
  const { mutate, error, isPending } = api.task.update.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate();
      setFormData((prev) => ({ ...prev, name: "" }));
    },
  });

  const deleteTask = api.task.delete.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleDelete = () => {
    deleteTask.mutate({ id: formData.id });
  };

  return (
    <div className="mx-auto w-72 overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="border-b bg-gray-50 p-2">
        <h2 className="text-right font-semibold">Task</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="New Task"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="focus-visible:ring-0"
          />
          <Textarea
            placeholder="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="focus-visible:ring-0"
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Inbox className="mr-2 h-4 w-4" />
                {formData.tasklist}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Task List</h4>
                  <p className="text-sm text-muted-foreground">Select a task list for this task.</p>
                </div>
                <div className="grid gap-2">
                  <Button variant="outline" className="justify-start">
                    <Inbox className={`mr-2 h-4 w-4`} />
                    Inbox
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="borb w-full justify-start">
                <span
                  className={`mr-2 h-2 w-2 rounded-full ${priorities.find((p) => p.name === formData.priority)?.color}`}
                ></span>
                {formData.priority}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Priority</h4>
                  <p className="text-sm text-muted-foreground">Set the priority for this task.</p>
                </div>
                <div className="grid gap-2">
                  {priorities.map((p) => (
                    <Button
                      key={p.name}
                      variant="outline"
                      className="justify-start"
                      onClick={() => setFormData((prev) => ({ ...prev, priority: p.name }))}
                    >
                      <span className={`mr-2 h-2 w-2 rounded-full ${p.color}`}></span>
                      {p.name}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                {formData.estimate ? formData.estimate : "Estimate"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Estimate</h4>
                  <p className="text-sm text-muted-foreground">Set the estimated time for this task.</p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 gap-2">
                    {["1h", "2h", "4h"].map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, estimate: time }))}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.duedate ? formatDateToLocal(formData.duedate) : "Due Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.duedate ? new Date(formData.duedate) : undefined}
                initialFocus
                onSelect={(date) => setFormData((prev) => ({ ...prev, duedate: date ? formatDateToLocal(date) : "" }))}
              />
            </PopoverContent>
          </Popover>

          <div className="flex justify-between space-x-2 py-4">
            <Button variant="outline" type="submit" onClick={handleDelete} disabled={isPending}>
              Delete
            </Button>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
