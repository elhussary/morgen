import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";

const settingsFields = [
  { label: "Default calendar", type: "select", options: ["Automatic"] },
  { label: "Default calendar for tasks", type: "select", options: ["Automatic"] },
  { label: "Show slot details in one click", type: "select", options: ["Only on due date events"] },
  { label: "Visibility of scheduled tasks", type: "select", options: ["Private", "Public"] },
  { label: "Transparency of scheduled tasks", type: "select", options: ["Busy", "Free"] },
  { label: "Move task due date", type: "select", options: ["Ask every time", "Always", "Never"] },
  { label: "Time zone", type: "input", value: "Africa/Cairo" },
  { label: "Regional format", type: "input", value: "English (United States)" },
  { label: "First day of the week", type: "select", options: ["Sunday"] },
  { label: "Initial calendar view", type: "select", options: ["Day", "Week", "Month"] },
  { label: "Theme", type: "select", options: ["System", "Light", "Dark"] },
  { label: "Time grid start", type: "select", options: ["12:00 AM"] },
  { label: "Time grid end", type: "select", options: ["12:00 AM"] },
  { label: "Time display resolution", type: "select", options: ["15 minutes"] },
  { label: "Time dragging resolution", type: "select", options: ["15 minutes"] },
  { label: "Limit events per day", type: "select", options: ["4"] },
];

const General = () => {
  return (
    <>
      {settingsFields.map((field) => (
        <div key={field.label} className="mb-4 grid grid-cols-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === "select" ? (
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={field.options[0]} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input type="text" value={field.value} readOnly className="w-full" />
          )}
        </div>
      ))}
    </>
  );
};

export default General;
