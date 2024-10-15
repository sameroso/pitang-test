import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ComponentProps, PropsWithChildren } from "react";

interface UserPreferencesDialogProps {
  DialogProps: ComponentProps<typeof Dialog>;
  DialogHeaderProps?: ComponentProps<typeof DialogHeader>;
  DialogTitleProps?: ComponentProps<typeof DialogTitle>;
  DialogDescriptionProps?: ComponentProps<typeof DialogDescription>;
  DialogContentProps?: ComponentProps<typeof DialogContent>;
  title?: string;
  description?: string;
}

export function SimpleDialog({
  DialogProps,
  DialogDescriptionProps,
  DialogHeaderProps,
  DialogTitleProps,
  description,
  DialogContentProps,
  title,
  children,
}: PropsWithChildren<UserPreferencesDialogProps>) {
  return (
    <Dialog data-testid="dialog" {...DialogProps}>
      <DialogContent
        data-testid="dialog-content"
        {...DialogContentProps}
        className={cn(["sm:max-w-[500px]", DialogContentProps?.className])}
      >
        <DialogHeader data-testid="dialog-header" {...DialogHeaderProps}>
          <DialogTitle data-testid="dialog-title" {...DialogTitleProps}>
            {title}
          </DialogTitle>
          <DialogDescription
            data-testid="dialog-description"
            {...DialogDescriptionProps}
          >
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
