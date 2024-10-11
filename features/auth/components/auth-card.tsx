"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren, ReactNode } from "react";

interface AuthCard {
  title: string;
  description: string;
  footerElements?: ReactNode;
}

export const AuthCard = (props: PropsWithChildren<AuthCard>) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>
          {props.description}
        </CardDescription>
      </CardHeader>
      {props.children}
    </Card>
  );
};
