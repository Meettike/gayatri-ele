import * as React from "react";
import { cn } from "@/lib/utils";

// Simple chart configuration type
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

// Simple chart container component
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: ChartConfig;
  }
>(({ className, config, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("chart-container", className)}
      {...props}
    />
  );
});
ChartContainer.displayName = "ChartContainer";

// Simple chart tooltip component
const ChartTooltip = ({ children }: { children?: React.ReactNode }) => {
  return <div className="chart-tooltip">{children}</div>;
};

// Simple chart tooltip content
const ChartTooltipContent = ({ 
  children,
  className,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-2 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
};
