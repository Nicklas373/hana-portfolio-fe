import { applicationString } from "@/app/variables/enum";
import { Typography } from "@heroui/react";

export default function About() {
  return (
    <section
      id="about"
      className="relative flex flex-col py-16 font-quicksand text-slate-400 space-y-6 scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 px-6 py-4 backdrop-blur-md lg:hidden">
        <Typography className="font-bold text-slate-200 text-lg">
          {applicationString.applicationSectionAboutTitle}
        </Typography>
      </div>
      <Typography className="hidden lg:block leading-relaxed font-bold text-slate-200 text-lg">
        {applicationString.applicationSectionAboutTitle}
      </Typography>
      <Typography className="leading-relaxed text-md text-slate-400">
        {applicationString.applicationSectionAboutDescription1}
      </Typography>
      <Typography className="leading-relaxed text-md text-slate-400">
        Currently, I&apos;m working as Application Operation Support at
        <a
          href="https://www.bfifinance.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-200 hover:text-amber-400 transition-colors duration-300"
        >
          <span> BFI Finance, </span>
        </a>
        {applicationString.applicationSectionAboutDescription2}
      </Typography>
    </section>
  );
}
