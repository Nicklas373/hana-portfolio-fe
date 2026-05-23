import { PortfolioPool } from "@/app/lib/pool";
import { experience, experienceList, projects } from "@/app/variables/constant";
import {
  getContact,
  getExperience,
  getExperienceList,
  getProject,
  insertContact,
} from "../portfolio";
import {
  contactMap,
  experienceListMap,
  experienceMap,
  projectMap,
} from "@/app/variables/interface";
import { applicationErrString } from "@/app/variables/enum";

jest.mock("@/app/lib/pool", () => ({
  PortfolioPool: {
    query: jest.fn(),
  },
}));

const mockContactData: contactMap[] = [
  {
    fullname: "myName",
    email: "myEmail",
    message: "myMessage",
    turnstileToken: "mock-token",
  },
];
const mockExperienceData: experienceMap[] = experience;
const mockExperienceListData: experienceListMap[] = experienceList;
const mockProjectData: projectMap[] = projects;

describe("getContact", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock contact data", async () => {
    (PortfolioPool.query as jest.Mock).mockResolvedValue({
      rows: mockContactData,
    });

    const result = await getContact();
    expect(result).toEqual(mockContactData);
    expect(result[0]).toMatchObject({
      fullname: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
    });
    expect(result).toHaveLength(1);
    expect(PortfolioPool.query).toHaveBeenCalled();
  });

  it("Mock error response", async () => {
    (PortfolioPool.query as jest.Mock).mockRejectedValue(
      new Error(applicationErrString.applicationErrFetchData + " contact"),
    );

    await expect(getContact()).rejects.toThrow(
      applicationErrString.applicationErrFetchData + " contact",
    );
  });
});

describe("insertContact", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockContactInsertPayload = {
    messageid: "1",
  };
  const mockContactResponsePayload = ["myName", "myEmail", "myMessage"];

  it("Mock insert contact", async () => {
    (PortfolioPool.query as jest.Mock).mockResolvedValue({
      rows: [mockContactInsertPayload],
    });

    const result = await insertContact(
      mockContactResponsePayload[0],
      mockContactResponsePayload[1],
      mockContactResponsePayload[2],
    );
    expect(result).toEqual(mockContactInsertPayload);
    expect(PortfolioPool.query).toHaveBeenCalledTimes(1);
    expect(PortfolioPool.query).toHaveBeenCalledWith(
      expect.any(String),
      mockContactResponsePayload,
    );
  });

  it("Mock error response", async () => {
    (PortfolioPool.query as jest.Mock).mockRejectedValue(
      new Error(
        applicationErrString.applicationErrFetchData + " contact insertion",
      ),
    );

    await expect(
      insertContact(
        mockContactResponsePayload[0],
        mockContactResponsePayload[1],
        mockContactResponsePayload[2],
      ),
    ).rejects.toThrow(
      applicationErrString.applicationErrFetchData + " contact insertion",
    );
  });
});

describe("getExperience", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock experience data", async () => {
    (PortfolioPool.query as jest.Mock).mockResolvedValue({
      rows: mockExperienceData,
    });

    const result = await getExperience();
    expect(result).toEqual(mockExperienceData);
    expect(result[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      companyUrl: expect.any(String),
      description: expect.any(String),
      subdescription: expect.any(String),
      skills: expect.any(Array),
    });
    expect(result).toHaveLength(1);
    expect(PortfolioPool.query).toHaveBeenCalled();
  });

  it("Mock error response", async () => {
    (PortfolioPool.query as jest.Mock).mockRejectedValue(
      new Error(applicationErrString.applicationErrFetchData + " experience"),
    );

    await expect(getExperience()).rejects.toThrow(
      applicationErrString.applicationErrFetchData + " experience",
    );
  });
});

describe("getExperienceList", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock experience list data", async () => {
    (PortfolioPool.query as jest.Mock).mockResolvedValue({
      rows: mockExperienceListData,
    });

    const result = await getExperienceList("myCompanyName");
    expect(result).toEqual(mockExperienceListData);
    expect(result[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      joblist: expect.any(Array),
    });
    expect(result).toHaveLength(1);
    expect(PortfolioPool.query).toHaveBeenCalled();
  });

  it("Mock error response", async () => {
    (PortfolioPool.query as jest.Mock).mockRejectedValue(
      new Error(
        applicationErrString.applicationErrFetchData + " experience list",
      ),
    );

    await expect(getExperienceList("myCompanyName")).rejects.toThrow(
      applicationErrString.applicationErrFetchData + " experience list",
    );
  });
});

describe("getProjects", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock project data", async () => {
    (PortfolioPool.query as jest.Mock).mockResolvedValue({
      rows: mockProjectData,
    });

    const result = await getProject();
    expect(result).toEqual(mockProjectData);
    expect(result[0]).toMatchObject({
      name: expect.any(String),
      description: expect.any(String),
      techstack: expect.any(Array),
      source: expect.any(String),
      icons: expect.any(String),
    });
    expect(result).toHaveLength(1);
    expect(PortfolioPool.query).toHaveBeenCalled();
  });

  it("Mock error response", async () => {
    (PortfolioPool.query as jest.Mock).mockRejectedValue(
      new Error(applicationErrString.applicationErrFetchData + " project"),
    );

    await expect(getProject()).rejects.toThrow(
      applicationErrString.applicationErrFetchData + " project",
    );
  });
});
