import { Card } from "@heroui/react/card";
import { Skeleton } from "@heroui/react/skeleton";

const chipWidths = ["w-16", "w-20", "w-24", "w-14", "w-28"];

export function ExperienceSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="grid grid-cols-1 md:grid-cols-[140px_1fr] bg-black border border-slate-800 p-0">
        <div className="p-4">
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <div className="p-6 pt-0 md:pt-2">
          <div className="space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-64 rounded-md" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-11/12 rounded-md" />
                <Skeleton className="h-3 w-10/12 rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-9/12 rounded-md" />
                <Skeleton className="h-3 w-7/12 rounded-md" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {chipWidths.map((width, i) => (
                <Skeleton key={i} className={`h-7 ${width} rounded-full`} />
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Skeleton className="h-9 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ExperienceListSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Card className="flex flex-col bg-black border border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr]">
            <div className="p-4">
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <div className="p-6 pt-0 md:pt-2">
              <Skeleton className="h-5 w-48 rounded-md mt-1.5" />
            </div>
          </div>
          <div className="p-4 pt-0 md:pt-2">
            <div className="space-y-4">
              <Skeleton className="h-5 w-40 rounded-md" />
              <div className="space-y-3 max-h-72 overflow-hidden">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-2 w-2 rounded-full mt-2" />
                  <Skeleton className={"h-3 rounded-md w-10/12"} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function ProjectSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="grid grid-cols-1 md:grid-cols-[140px_1fr] bg-black border border-slate-800">
        <div className="p-4 mx-auto flex items-center justify-center">
          <Skeleton className="w-[85px] h-[85px] rounded-xl" />
        </div>
        <div className="p-6 pt-0 md:pt-2">
          <div className="space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-52 rounded-md" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-11/12 rounded-md" />
                <Skeleton className="h-3 w-9/12 rounded-md" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {chipWidths.map((width, chipIndex) => (
                <Skeleton
                  key={chipIndex}
                  className={`h-7 ${width} rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
