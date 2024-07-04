import { Skeleton } from "@/components/ui/skeleton";

function LoadingPanel() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Skeleton className="h-[95%] w-[95%] rounded-xl" />
    </div>
  );
}

export default LoadingPanel;
