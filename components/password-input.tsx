import { ComponentProps, forwardRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  ComponentProps<typeof Input>
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        {...props}
        ref={ref}
        role="textbox"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff
            className="h-4 w-4 text-gray-500"
            data-testid="eye-off-icon"
          />
        ) : (
          <Eye className="h-4 w-4 text-gray-500" data-testid="eye-icon" />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = "password-input";
