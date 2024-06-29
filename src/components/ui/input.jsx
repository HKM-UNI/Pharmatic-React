import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  (
    { className, type, onChange, startAdornment, endAdornment, ...props },
    ref,
  ) => {
    return (
      <div className="relative flex w-full items-center">
        {startAdornment && (
          <span className="absolute left-0 pl-3 text-sm text-muted-foreground">
            {startAdornment}
          </span>
        )}
        <input
          type={type}
          onChange={onChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pharmaticPrimary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            startAdornment ? "pl-10" : "",
            endAdornment ? "pr-10" : "",
            className,
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <span className="absolute right-0 pr-3 text-sm text-muted-foreground">
            {endAdornment}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
