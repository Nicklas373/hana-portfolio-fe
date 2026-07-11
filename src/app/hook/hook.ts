/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
  applicationValString,
} from "../variables/enum";
import { baseUrlBuilder } from "../lib/helper";
import { contactInsertMap } from "../variables/interface/contact";
import {
  experienceListMap,
  experienceMap,
} from "../variables/interface/experience";
import { projectMap } from "../variables/interface/project";

export function useInsertContactHooks() {
  const [contact, setContact] = useState<contactInsertMap[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isWait, setIsWait] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState("");

  const handleInsertContact = async (
    name: string,
    email: string,
    message: string,
  ) => {
    if (!name || !email || !message) {
      setContact([]);
      setIsWait(false);
      setIsSuccess(false);
      setIsError(true);
      setError(applicationValString.applicationValRequired);
      return;
    }

    try {
      setIsWait(true);
      const response = await baseUrlBuilder(
        `/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: name,
            email,
            message,
            turnstileToken: token,
          }),
        },
      );

      if (!response.ok) {
        setContact([]);
        setError(applicationErrString.applicationErrSubmitData);
        setIsSuccess(false);
        setIsError(true);
        setIsWait(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setContact(data.data.contact);
        setError("");
        setIsSuccess(true);
        setIsError(false);
      } else {
        setContact([]);
        setError(applicationErrString.applicationErrSubmitData);
        setIsSuccess(false);
        setIsError(false);
      }
    } catch (err) {
      setContact([]);
      setError(applicationErrString.applicationErrSubmitData);
      setIsSuccess(false);
      setIsError(false);
    } finally {
      setIsWait(false);
    }
  };

  return {
    handleInsertContact,
    setIsError,
    setIsSuccess,
    setToken,
    contact,
    token,
    isSuccess,
    isError,
    isWait,
    error,
  };
}

export function useExperienceHooks() {
  const [experience, setExperience] = useState<experienceMap[]>([]);
  const [isWait, setIsWait] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setIsWait(true);

        const response = await baseUrlBuilder(
          `/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`,
        );
        if (!response.ok) {
          setExperience([]);
          setError(applicationErrString.applicationErrFetchData);
          setIsWait(false);
          return;
        }

        const data = await response.json();

        if (data.success) {
          setExperience(data.data.experience);
          setError("");
        } else {
          setExperience([]);
          setError(applicationErrString.applicationErrFetchData);
        }
      } catch (err) {
        setExperience([]);
        setError(applicationErrString.applicationErrFetchData);
      } finally {
        setIsWait(false);
      }
    };

    fetchExperience();
  }, []);

  return {
    experience,
    isWait,
    error,
  };
}

export function useExperienceListHooks() {
  const [experienceList, setExperienceList] = useState<experienceListMap[]>([]);
  const [isWait, setIsWait] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchExperienceList = async (company: string) => {
    if (!company) {
      setExperienceList([]);
      setIsWait(false);
      setError(applicationValString.applicationValCompanyRequired);
      return;
    }

    try {
      setIsWait(true);
      const response = await baseUrlBuilder(
        `/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}/${applicationApiEndpoint.experienceListFE}?company=${company}`,
      );
      if (!response.ok) {
        setExperienceList([]);
        setError(applicationErrString.applicationErrFetchData);
        return;
      }

      const data = await response.json();
      if (data.success) {
        setExperienceList(data.data.experienceList);
        setError("");
      } else {
        setExperienceList([]);
        setError(applicationErrString.applicationErrFetchData);
      }
    } catch (err) {
      setExperienceList([]);
      setError(applicationErrString.applicationErrFetchData);
    } finally {
      setIsWait(false);
    }
  };

  return {
    fetchExperienceList,
    experienceList,
    isWait,
    error,
  };
}

export function useProjectHooks() {
  const [projects, setProjects] = useState<projectMap[]>([]);
  const [isWait, setIsWait] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsWait(true);
        const response = await baseUrlBuilder(
          `/api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`,
        );
        if (!response.ok) {
          setProjects([]);
          setError(applicationErrString.applicationErrFetchData);
          setIsWait(false);
          return;
        }

        const data = await response.json();
        if (data.success) {
          setProjects(data.data.project);
          setError("");
        } else {
          setProjects([]);
          setError(applicationErrString.applicationErrFetchData);
        }
      } catch (err) {
        setProjects([]);
        setError(applicationErrString.applicationErrFetchData);
      } finally {
        setIsWait(false);
      }
    };

    fetchProjects();
  }, []);

  return {
    projects,
    isWait,
    error,
  };
}
