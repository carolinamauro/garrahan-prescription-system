import { mergeTwClassNames } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={mergeTwClassNames("bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }
