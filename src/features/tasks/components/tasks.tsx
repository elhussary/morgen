import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

import TaskManager from "./task-manager";
import { Task } from "~/types/api";

export default function Tasks(tasks: any) {
  return (
    <>
      {tasks.tasks?.map((task: Task) => (
        <Popover key={task.id}>
          <div className="flex gap-2 rounded-md p-1 hover:bg-muted/70">
            <Checkbox />

            <PopoverTrigger asChild>
              <div>
                <Label>{task.title}</Label>

                <div className="flex flex-wrap gap-2 pt-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant={"outline"}>{task.priority}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Priority: {task.priority}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant={"outline"}>{task.duedate}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Due date: {task.duedate}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant={"outline"}>⌚ {task.estimate}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Estimated Duration: {task.estimate}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant={"outline"}>{task.tasklist}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Task list: {task.tasklist}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent className="p-0 text-sm">
              {/* @ts-ignore */}
              <TaskManager task={task} />
            </PopoverContent>
          </div>
        </Popover>
      ))}
    </>
  );
}
