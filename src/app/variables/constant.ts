import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiGmail, SiHuggingface } from "react-icons/si";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

export const experience = [
  {
    year: "myYear",
    position: "myPosition",
    company: "myCompanyName",
    companyUrl: "myCompanyUrl",
    description: "myDescription",
    subdescription: "mySubDescription",
    skills: ["mySkill1"],
  },
];

export const experienceList = [
  {
    year: "myYear",
    position: "myPosition",
    company: "myCompanyName",
    joblist: ["myJobList1"],
  },
];

export const projects = [
  {
    name: "myProjectName",
    description: "myProjectDescription",
    techstack: ["myTechStack1", "myTechStack2", "myTechStack3"],
    link: "myProjectLink",
    source: "myProjectSourceCode",
    icons: "/myIconsPath.svg",
  },
];

export const navItems = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export const sidebarNavItems = [
  {
    url: "https://github.com/Nicklas373",
    icon: FaGithub,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    url: "https://linkedin.com/in/dicky-herlambang-b8247813a",
    icon: FaLinkedin,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    url: "https://huggingface.co/nicklas373",
    icon: SiHuggingface,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  {
    url: "mailto:herlambangdicky5@gmail.com",
    icon: SiGmail,
    target: "",
    rel: "",
  },
];
