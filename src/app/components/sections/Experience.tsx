"use client";
import { Card } from "@heroui/react/card";
import { Chip } from "@heroui/react/chip";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { ExperienceListModal } from "../layout/Modal";
import { useExperienceHooks } from "@/app/hook/hook";
import { ExperienceSkeleton } from "../layout/Skeleton";
import { applicationErrString, applicationString } from "@/app/variables/enum";
import { Typography } from "@heroui/react/typography";
import { Button } from "@heroui/react/button";

export default function Experience() {
  const { experience, isWait, error } = useExperienceHooks();

  return (
    <section
      id="experience"
      className="relative flex flex-col font-quicksand text-slate-400 space-y-6 scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md lg:hidden">
        <Typography className="font-bold text-slate-200 text-lg">
          {applicationString.applicationSectionExperienceTitle}
        </Typography>
      </div>
      <Typography className="hidden lg:block leading-relaxed font-bold text-slate-200 text-lg">
        {applicationString.applicationSectionExperienceTitle}
      </Typography>
      {isWait ? (
        <ExperienceSkeleton />
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
          {experience.map((exp, index) => (
            <Card
              key={index}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr] bg-black border border-slate-800 hover:bg-slate-700/60 hover:border-slate-600 hover:backdrop-blur-sm transition-all duration-300"
            >
              <div className="p-4">
                <p className="text-sm text-slate-400">{exp.year}</p>
              </div>
              <div className="px-6 py-2 pt-0 md:pt-2">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Typography
                        type="h6"
                        className="flex flex-row text-md font-semibold text-slate-200 hover:text-amber-400 transition-colors duration-300"
                      >
                        {exp.position} - {exp.company}
                        <span className="ms-2 mt-1.5">
                          <FaArrowUpRightFromSquare
                            size={10}
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                          />
                        </span>
                      </Typography>
                    </a>
                    <Typography className="text-sm text-slate-300/80 leading-relaxed mt-4">
                      {exp.description}
                    </Typography>
                    <Typography className="text-sm text-slate-300/80 leading-relaxed">
                      {exp.subdescription}
                    </Typography>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, index) => (
                      <Chip
                        key={index}
                        className="px-3 py-1 bg-amber-800/40 text-amber-200 text-xs font-medium rounded-full border border-slate-600"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                  <div className="flex">
                    <ExperienceListModal company={exp.company} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </>
      )}
      <a
        href="https://nextcloud.hana-ci.com/s/KTBpTk78ymjEBQE"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-row leading-relaxed w-fit transition-all duration-300 hover:translate-x-2 hover:text-black"
      >
        <Button
          className="border border-amber-400 transition-all duration-300 hover:translate-x-2 hover:bg-amber-400 hover:border-amber-400"
          variant="ghost"
        >
          <Typography className="flex flex-row gap-2 mt-1 text-sm text-amber-400 leading-relaxed group-hover:text-black">
            {applicationString.applicationSectionExperienceSubResume}
            <span className="ms-2 -mt-1">
              <FaArrowUpRightFromSquare size={2} />
            </span>
          </Typography>
        </Button>
      </a>
    </section>
  );
}
