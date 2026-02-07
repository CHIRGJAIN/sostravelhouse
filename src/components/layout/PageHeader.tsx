import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, align = "center", children }: PageHeaderProps) {
  return (
    <section className="gradient-primary py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
          {children}
          <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-primary-foreground/80 md:text-lg">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
