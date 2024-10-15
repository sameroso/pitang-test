import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Redo2 } from "lucide-react";
import { ComponentProps } from "react";

interface ChangeThemeColorInputProps {
  InputColorSelectorProps?: ComponentProps<typeof Input>;
  InputProps: ComponentProps<typeof Input>;
  ResetButtonProps: ComponentProps<typeof Button>;
}
export const ChangeThemeColorInput = ({
  InputColorSelectorProps,
  InputProps,
  ResetButtonProps,
}: ChangeThemeColorInputProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Input
        type="color"
        data-testid="input-color"
        className="h-10 w-14 p-1"
        {...InputColorSelectorProps}
      />
      <div className="relative">
        <Input
          data-testid="input-text"
          placeholder="#334155"
          className="flex-grow"
          {...InputProps}
        />
        <Button
          type="button"
          size="sm"
          className="absolute right-1 top-0 h-10"
          data-testid="reset-color-button"
          {...ResetButtonProps}
        >
          <Redo2 className="h-4 w-4" />
          <span className="sr-only">Resetar</span>
        </Button>
      </div>
    </div>
  );
};
