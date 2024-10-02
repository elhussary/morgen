import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

import { BadgePlus, Check } from "lucide-react";
import { HexColorPicker } from "react-colorful";

const colorOptions = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#1A535C", "#FF9FF3"];

const Colors = ({ color, setColor }: { color: string; setColor: (color: string) => void }) => {
  return (
    <div className="flex justify-center gap-5 pt-1.5">
      {colorOptions.map((co) => (
        <Button
          key={co}
          type="button"
          size={"icon"}
          className="h-5 w-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{ backgroundColor: co }}
          onClick={() => setColor(co)}
        >
          {color === co && <Check className="mx-auto h-4 w-4 text-white" />}
        </Button>
      ))}

      <Popover>
        <PopoverTrigger>
          <BadgePlus size={22} />
        </PopoverTrigger>
        <PopoverContent side="right" align="start" className="flex gap-3 p-0">
          <HexColorPicker color={color} onChange={setColor} />
          <p
            className="mt-3 h-5 w-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            style={{ backgroundColor: color }}
          ></p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Colors;
