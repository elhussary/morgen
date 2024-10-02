"use client";
import { api } from "~/trpc/react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

import CreateList from "~/features/lists/components/create-list";
import CreateTask from "~/features/tasks/components/create-task";
import ListManager from "~/features/lists/components/list-manager";
import Tasks from "~/features/tasks/components/tasks";

import { Plus, Search, ListFilter, Blocks, Settings2, ArchiveIcon } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

export default function Calendar() {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = (i + 1) % 24;
    return hour === 0 ? "12 AM" : `${hour % 12 || 12}${hour < 12 ? " AM" : " PM"}`;
  });

  const { data: lists, isLoading: Loading } = api.list.getlists.useQuery();

  return (
    <main className="flex h-screen pl-24">
      <section className="w-80 border-r px-2 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="font-semibold">Tasks</h1>

          <div className="flex gap-2">
            <Button variant={"ghost"} size={"sm"} className="text-muted-foreground">
              <Search size={16} />
            </Button>

            <Button variant={"ghost"} size={"sm"} className="text-muted-foreground">
              <ListFilter size={16} />
            </Button>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-3">
            <Button title="Morgen Tasks" variant={"ghost"} size={"icon"} className="rounded-3xl border bg-muted/60">
              <img src="/favicon.ico" alt="morgen" width={18} height={18} />
            </Button>

            <Button
              title="Connect a task integration"
              variant={"ghost"}
              size={"icon"}
              className="rounded-2xl text-muted-foreground"
            >
              <Blocks size={18} />
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} size={"sm"} className="text-muted-foreground">
                <Settings2 size={17} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="px-2">
              <div className="grid gap-2">
                <CreateList />

                <Button variant={"ghost"} size={"sm"} className="w-full justify-start gap-2">
                  <ArchiveIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">Show archived tasks</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {Loading && (
          <div className="flex flex-col pt-4">
            <Skeleton className="h-8 w-full" />
          </div>
        )}

        {/* Lists */}
        <Accordion type="multiple">
          {lists?.map((list) => (
            <AccordionItem key={list.id} value={`item-${list.id}`} className="relative border-none">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="absolute right-14 top-3 text-muted-foreground"
                    title="Create a task"
                  >
                    <Plus size={14} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="p-0">
                  <CreateTask />
                </PopoverContent>
              </Popover>

              <ListManager list={list} />

              <AccordionTrigger className="cursor-default hover:no-underline">
                <div className="flex items-center gap-2">
                  <p className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: list.color }}></p>
                  {list.title}
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <Tasks tasks={list.tasks} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Time Blocking */}
      <section className="flex-auto pl-20">
        {hours.map((hour, index) => (
          <div key={index} className="relative flex h-20 items-center">
            <div className="absolute left-0 -mt-8 -translate-x-full pr-3 text-sm text-gray-500">{hour}</div>
            <div className="w-full">
              <div className="h-10 border-t border-gray-200"></div>
              <div className="border-b border-gray-200"></div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
