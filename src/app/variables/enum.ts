export enum applicationString {
  applicationTitle = "DH - Portfolio",
  applicationModalSubmittingTitle = "Submitting your message...",
  applicationOwnerName = "Dicky Herlambang",
  applicationOwnerRole = "Application Operation Support",
  applicationOwnerDescription = "I work in the space between IT Operations and Software Engineering, building internal tools and maintaining systems that keep applications stable and reliable.",
  applicationSectionAboutTitle = "About",
  applicationSectionAboutDescription1 = "Most of my work revolves around troubleshooting production issues, improving operational workflows, and developing tools that help teams work more efficiently. I enjoy understanding how systems behave under real-world conditions and finding practical solutions to improve them.",
  applicationSectionAboutDescription2 = "where I maintain and optimize the company's data infrastructure. I lead initiatives in troubleshooting, documentation, and performance analysis, partnering closely with developers to ensure accessibility is built into the foundation of our systems.",
  applicationSectionContactScsTitle = "Thank you for reaching out",
  applicationSectionContactScsMessage = "Your message has been successfully sent",
  applicationSectionContactErrTitle = "Whoops!",
  applicationSectionContactErrMessage = "Please try again later",
  applicationSectionExperienceTitle = "Experience",
  applicationSectionExperienceSubResume = "View Full Résumé",
  applicationSectionProjectTitle = "Projects",
}

export enum applicationErrString {
  applicationErrFailParseMsg = "Failed to parse error message",
  applicationErrSubmitData = "Failed to submit data",
  applicationErrFetchData = "Failed to fetch data",
  applicationErrUXTitle = "Whoops!",
  applicationErrUXSubTitle = " Something went wrong while fetching the data",
}

export enum applicationValString {
  applicationValCompanyRequired = "Missing company name",
  applicationValEmailInvalid = "Invalid email address",
  applicationValTooLong = "Parameter value too long",
  applicationValRequired = "Missing required value",
  applicationValTokenFail = "Token validation failed",
}

export enum applicationApiVersion {
  v1 = "v1",
}

export enum applicationApiEndpoint {
  contact = "contact",
  experience = "experience",
  experienceList = "list",
  projects = "project",
}
