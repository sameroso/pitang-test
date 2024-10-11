"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren } from "react";

interface AuthCard {
  title: string;
  description: string;
}

export const AuthCard = (props: PropsWithChildren<AuthCard>) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      {props.children}
    </Card>
  );
};
