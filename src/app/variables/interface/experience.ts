export interface experienceMap {
  year: string;
  position: string;
  company: string;
  companyUrl: string;
  description: string;
  subdescription: string;
  skills: string[];
}

export interface experienceListMap {
  year: string;
  position: string;
  company: string;
  joblist: string[];
}

export interface experienceResponseMap {
  success: boolean;
  message: string;
  data: {
    experience: experienceMap[];
  };
  error: string;
}

export interface experienceListResponseMap {
  success: boolean;
  message: string;
  data: {
    experienceList: experienceListMap[];
  };
  error: string;
}
