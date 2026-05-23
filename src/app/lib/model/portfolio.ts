import {
  contactInsertMap,
  contactMap,
  experienceListMap,
  experienceMap,
  projectMap,
} from "@/app/variables/interface";
import {
  getContactQB,
  getExperienceListQB,
  getExperienceQB,
  getProjectQB,
  insertContactQB,
} from "../queryBuilder/portfolio";
import { PortfolioPool } from "../pool";
import { applicationErrString } from "@/app/variables/enum";

export async function getContact(): Promise<contactMap[]> {
  const query = getContactQB();

  try {
    const { rows } = await PortfolioPool.query(query);
    return rows as contactMap[];
  } catch (error) {
    console.error(
      applicationErrString.applicationErrFetchData + " contact:",
      error,
    );
    throw error;
  }
}

export async function getExperience(): Promise<experienceMap[]> {
  const query = getExperienceQB();

  try {
    const { rows } = await PortfolioPool.query(query);
    return rows as experienceMap[];
  } catch (error) {
    console.error(
      applicationErrString.applicationErrFetchData + " experience:",
      error,
    );
    throw error;
  }
}

export async function getExperienceList(
  company: string,
): Promise<experienceListMap[]> {
  const query = getExperienceListQB(company);

  try {
    const { rows } = await PortfolioPool.query(query, [company]);
    return rows as experienceListMap[];
  } catch (error) {
    console.error(
      applicationErrString.applicationErrFetchData + " experience list:",
      error,
    );
    throw error;
  }
}

export async function getProject(): Promise<projectMap[]> {
  const query = getProjectQB();

  try {
    const { rows } = await PortfolioPool.query(query);
    return rows as projectMap[];
  } catch (error) {
    console.error(
      applicationErrString.applicationErrFetchData + " project:",
      error,
    );
    throw error;
  }
}

export async function insertContact(
  fullname: string,
  email: string,
  message: string,
): Promise<contactInsertMap[]> {
  const query = insertContactQB(fullname, email, message);

  try {
    const { rows } = await PortfolioPool.query(query, [
      fullname,
      email,
      message,
    ]);
    return rows[0] as contactInsertMap[];
  } catch (error) {
    console.error(
      applicationErrString.applicationErrFetchData + " contact insertion:",
      error,
    );
    throw error;
  }
}
