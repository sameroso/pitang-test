import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorComponentProps {
  title: string;
  description: string;
  onRetry: () => Promise<void> | void;
  cardClassName?: string;
}

export function ErrorComponent({
  title,
  description,
  onRetry,
  cardClassName,
}: ErrorComponentProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-md mx-auto border-none bg-transparent",
        cardClassName
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={onRetry} className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Tentar Novamente
        </Button>
      </CardFooter>
    </Card>
  );
}
