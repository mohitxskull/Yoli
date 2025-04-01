import * as React from "react";
import { cn } from "@/lib/utils";

type GroupSpacing = "xs" | "sm" | "md" | "lg" | "xl";

type GroupAlign = "start" | "center" | "end" | "baseline" | "stretch";

type GroupJustify =
  | "start"
  | "center"
  | "end"
  | "between"
  | "around"
  | "evenly";

type GroupWrap = "wrap" | "nowrap";

const gapMap: Record<GroupSpacing, string> = {
  xs: "gap-1", // 4px
  sm: "gap-2", // 8px
  md: "gap-4", // 16px
  lg: "gap-6", // 24px
  xl: "gap-8", // 32px
};

const alignMap: Record<GroupAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
  stretch: "items-stretch",
};

const justifyMap: Record<GroupJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const wrapMap: Record<GroupWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
};


export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls the gap between children. Defaults to 'md'. */
  gap?: GroupSpacing;
  /** Controls alignment along the cross axis. Defaults to 'center'. */
  align?: GroupAlign;
  /** Controls justification along the main axis. Defaults to 'start'. */
  justify?: GroupJustify;
  /** Controls whether children wrap to the next line. Defaults to 'nowrap'. */
  wrap?: GroupWrap;
  /** Content */
  children: React.ReactNode;
}

const Group = React.forwardRef<HTMLDivElement, GroupProps>(
  (
    {
      className,
      children,
      gap = "md",
      align = "center",
      justify = "start",
      wrap = "nowrap",
      ...props
    },
    ref,
  ) => {
    const groupClasses = cn(
      "flex",
      gapMap[gap],
      alignMap[align],
      justifyMap[justify],
      wrapMap[wrap],
      className,
    );

    return (
      <div ref={ref} className={groupClasses} {...props}>
        {children}
      </div>
    );
  },
);

Group.displayName = "Group";

export { Group };
