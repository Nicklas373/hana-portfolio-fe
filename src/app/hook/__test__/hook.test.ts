/**
 * @jest-environment jsdom
 */

import { act, renderHook, waitFor } from "@testing-library/react";
import {
  useExperienceHooks,
  useExperienceListHooks,
  useInsertContactHooks,
  useProjectHooks,
} from "../hook";
import { experience, experienceList, projects } from "@/app/variables/constant";
import {
  contactMap,
  experienceListMap,
  experienceMap,
  projectMap,
} from "@/app/variables/interface";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";

const mockContactData: contactMap[] = [
  {
    fullname: "myName",
    email: "myEmail",
    message: "myMessage",
    turnstileToken: "",
  },
];
const mockContactInsertPayload = {
  messageid: "1",
};
const mockContactResponsePayload = ["myName", "myEmail", "myMessage"];
const mockExperienceData: experienceMap[] = experience;
const mockExperienceListData: experienceListMap[] = experienceList;
const mockProjectData: projectMap[] = projects;

describe("Mock useInsertContactHooks", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Mocking Contact Insertion", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          contact: mockContactInsertPayload,
        },
      }),
    });

    const { result } = renderHook(() => useInsertContactHooks());
    await act(async () => {
      await result.current.handleInsertContact(
        mockContactResponsePayload[0],
        mockContactResponsePayload[1],
        mockContactResponsePayload[2],
      );
    });
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });

    expect(result.current.error).toBe("");
    expect(result.current.contact).toEqual(mockContactInsertPayload);
    expect(global.fetch).toHaveBeenCalledWith(
      `/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mockContactData[0]),
      },
    );
  });

  it("Mocking Contact Insertion Validation Failure", async () => {
    const { result } = renderHook(() => useInsertContactHooks());

    await act(async () => {
      await result.current.handleInsertContact("", "", "");
    });

    expect(result.current.contact).toEqual([]);
    expect(result.current.error).toBe(
      applicationValString.applicationValRequired,
    );
    expect(result.current.isWait).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("Mocking Contact Insertion API Failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useInsertContactHooks());
    await act(async () => {
      await result.current.handleInsertContact(
        mockContactResponsePayload[0],
        mockContactResponsePayload[1],
        mockContactResponsePayload[2],
      );
    });
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.contact).toEqual([]);
    expect(result.current.error).toBe(
      applicationErrString.applicationErrSubmitData,
    );
  });

  it("Mock network error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
    const { result } = renderHook(() => useInsertContactHooks());
    await act(async () => {
      await result.current.handleInsertContact(
        mockContactResponsePayload[0],
        mockContactResponsePayload[1],
        mockContactResponsePayload[2],
      );
    });

    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.contact).toEqual([]);
    expect(result.current.error).toBe(
      applicationErrString.applicationErrSubmitData,
    );
  });
});

describe("Mock useExperienceHooks", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Mocking Experience Data Fetching", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          experience: mockExperienceData,
        },
      }),
    });

    const { result } = renderHook(() => useExperienceHooks());
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.experience).toHaveLength(1);
    expect(result.current.error).toBe("");
    expect(result.current.experience[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      companyUrl: expect.any(String),
      description: expect.any(String),
      subdescription: expect.any(String),
      skills: expect.any(Array),
    });
  });

  it("Mocking Experience Data Fetching Failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useExperienceHooks());
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.experience).toEqual([]);
    expect(result.current.error).toBe(
      applicationErrString.applicationErrFetchData,
    );
  });

  it("Mocking Fetch Error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
    const { result } = renderHook(() => useExperienceHooks());
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.error).toBe(
      applicationErrString.applicationErrFetchData,
    );
  });
});

describe("Mock useExperienceListHooks", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Mocking Experience List Data Fetching", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          experienceList: mockExperienceListData,
        },
      }),
    });

    const { result } = renderHook(() => useExperienceListHooks());
    await act(async () => {
      await result.current.fetchExperienceList("myCompanyName");
    });
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.experienceList).toHaveLength(1);
    expect(result.current.error).toBe("");
    expect(result.current.experienceList[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      joblist: expect.any(Array),
    });
  });

  it("Mocking Experience List Validation Failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          experienceList: mockExperienceListData,
        },
      }),
    });

    const { result } = renderHook(() => useExperienceListHooks());
    await act(async () => {
      await result.current.fetchExperienceList("");
    });
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.experienceList).toHaveLength(0);
    expect(result.current.error).toContain(
      applicationValString.applicationValCompanyRequired,
    );
  });

  it("Mocking Experience List Data Fetching Failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useExperienceListHooks());
    await act(async () => {
      await result.current.fetchExperienceList("myCompanyName");
    });
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.experienceList).toEqual([]);
    expect(result.current.error).toBe(
      applicationErrString.applicationErrFetchData,
    );
  });

  it("Mocking Fetch Error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
    const { result } = renderHook(() => useExperienceListHooks());
    await act(async () => {
      await result.current.fetchExperienceList("myCompanyName");
    });
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.error).toBe(
      applicationErrString.applicationErrFetchData,
    );
  });
});

describe("Mock useProjectHooks", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Mocking Project Data Fetching", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          project: mockProjectData,
        },
      }),
    });

    const { result } = renderHook(() => useProjectHooks());
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.projects).toHaveLength(1);
    expect(result.current.error).toBe("");
    expect(result.current.projects[0]).toMatchObject({
      name: expect.any(String),
      description: expect.any(String),
      techstack: expect.any(Array),
      source: expect.any(String),
      icons: expect.any(String),
    });
  });

  it("Mocking Project Data Fetching Failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => useProjectHooks());
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.projects).toEqual([]);
    expect(result.current.error).toBe(
      applicationErrString.applicationErrFetchData,
    );
  });

  it("Mocking Fetch Error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));
    const { result } = renderHook(() => useProjectHooks());
    await waitFor(() => {
      expect(result.current.isWait).toBe(false);
    });
    expect(result.current.error).toBe(
      applicationErrString.applicationErrFetchData,
    );
  });
});
