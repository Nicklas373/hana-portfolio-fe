export interface projectMap {
  name: string;
  description: string;
  techstack: string[];
  link: string;
  source: string;
  icons: string;
}

export interface projectResponseMap {
  success: boolean;
  message: string;
  data: {
    project: projectMap[];
  };
  error: string;
}
