"use client";
import { Card } from "@heroui/react/card";
import { Chip } from "@heroui/react/chip";
import { FaArrowUpRightFromSquare, FaDocker } from "react-icons/fa6";
import Image from "next/image";
import { useProjectHooks } from "@/app/hook/hook";
import { ProjectSkeleton } from "../layout/Skeleton";
import { applicationErrString, applicationString } from "@/app/variables/enum";
import { Typography } from "@heroui/react/typography";
import { Button } from "@heroui/react";

export default function Project() {
  const { projects, isWait, error } = useProjectHooks();

  return (
    <section
      id="projects"
      className="relative flex flex-col py-16 font-quicksand text-slate-400 space-y-6 scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md lg:hidden">
        <Typography className="font-bold text-slate-200 text-lg">
          {applicationString.applicationSectionProjectTitle}
        </Typography>
      </div>
      <Typography className="hidden lg:block leading-relaxed font-bold text-slate-200 text-lg">
        {applicationString.applicationSectionProjectTitle}
      </Typography>
      {isWait ? (
        <ProjectSkeleton />
      ) : error ? (
        <Card className="flex min-h-[260px] w-full flex-col items-center justify-center gap-6 border border-slate-800 bg-black p-12 text-center transition-all duration-300 hover:border-slate-600 hover:bg-slate-700/60">
          <div className="space-y-2">
            <Typography type="h4" className="font-bold text-red-400">
              {applicationErrString.applicationErrUXTitle}
            </Typography>
            <Typography type="h5" className="text-slate-400">
              {applicationErrString.applicationErrUXSubTitle}
            </Typography>
          </div>
          <Button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-amber-800/40 px-6 py-3 text-amber-200 transition-all duration-300 hover:bg-amber-800/60"
          >
            Retry
          </Button>
        </Card>
      ) : (
        <>
          {projects.map((project, index) => (
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <Card className="grid grid-cols-1 md:grid-cols-[140px_1fr] bg-black border border-slate-800 hover:bg-slate-700/60 hover:border-slate-600 hover:backdrop-blur-sm transition-all duration-300">
                <div className="p-4 mx-auto">
                  {project.icons ? (
                    <Image
                      src={project.icons}
                      width={100}
                      height={100}
                      alt={project.name}
                    />
                  ) : (
                    <span className="mt-10">
                      <FaDocker size={85} />
                    </span>
                  )}
                </div>
                <div className="p-6 pt-0 md:pt-2">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Typography
                        type="h6"
                        className="flex flex-row text-md font-semibold text-slate-200"
                      >
                        {project.name}
                        <span className="ms-2 mt-1.5">
                          <FaArrowUpRightFromSquare
                            size={10}
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                          />
                        </span>
                      </Typography>
                      <Typography className="text-sm text-slate-300/80 leading-relaxed mt-4">
                        {project.description}
                      </Typography>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techstack.map((skill, index) => (
                        <Chip
                          key={index}
                          className="px-3 py-1 bg-amber-800/40 text-amber-200 text-xs font-medium rounded-full border border-slate-600"
                        >
                          {skill}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </>
      )}
    </section>
  );
}
