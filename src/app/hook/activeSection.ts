"use client";

import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const triggerPoint = window.innerHeight * 0.3;
        if (sectionTop <= triggerPoint && sectionBottom >= triggerPoint) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}
