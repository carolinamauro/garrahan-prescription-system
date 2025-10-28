import { Loader2Icon } from "lucide-react"

import { mergeTwClassNames } from "@/lib/utils"

function Spinner({
  className,
  ...props
}) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={mergeTwClassNames("size-4 animate-spin", className)}
      {...props} />
  );
}

export { Spinner }
