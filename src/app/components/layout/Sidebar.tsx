"use client";

import { useActiveSection } from "@/app/hook/activeSection";
import { navItems, sidebarNavItems } from "@/app/variables/constant";
import { ContactModal } from "./Modal";
import { applicationString } from "@/app/variables/enum";
import Image from "next/image";
import { Typography } from "@heroui/react/typography";
import { useState } from "react";

export default function Sidebar() {
  const activeSection = useActiveSection();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <aside className="font-quicksand flex flex-col justify-between py-12 lg:py-16 lg:h-screen lg:sticky lg:top-0">
      <div>
        <div className="flex flex-col gap-4">
          <Image
            src={"/assets/icon.png"}
            width={64}
            height={64}
            alt="Logo"
            className="border rounded-full object-cover"
          />
          <p />
          <Typography
            type="h2"
            className="font-bold text-2xl lg:text-4xl text-white"
          >
            {applicationString.applicationOwnerName}
          </Typography>
          <Typography
            type="h3"
            className="font-semibold text-lg lg:text-xl text-slate-400"
          >
            {applicationString.applicationOwnerRole}
          </Typography>
          <Typography className="text-md text-slate-400 mt-2 max-w-sm leading-relaxed">
            {applicationString.applicationOwnerDescription}
          </Typography>
        </div>
        <nav className="hidden lg:flex flex-col gap-4 text-sm mt-24">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.id !== "contact" ? (
                <a
                  href={`#${item.id}`}
                  className={`transition-all duration-300 hover:translate-x-2 hover:text-amber-400
              ${
                activeSection === item.id
                  ? "text-amber-400 translate-x-2"
                  : "text-slate-400"
              }
              `}
                >
                  {item.name}
                </a>
              ) : (
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(true)}
                  className={`transition-all duration-300 hover:translate-x-2 hover:text-amber-400
              ${
                activeSection === item.id
                  ? "text-amber-400 translate-x-2"
                  : "text-slate-400"
              }
              `}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="flex flex-row mt-8 lg:mt-0 items-center gap-4 lg:gap-6">
        {sidebarNavItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.url}
              target={item.target}
              rel={item.rel}
              className="text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:text-amber-400"
            >
              <Icon size={24} />
            </a>
          );
        })}
      </div>
      {isOpen && (
        <ContactModal isOpen={isOpen} onOpenChange={() => setIsOpen(false)} />
      )}
    </aside>
  );
}
