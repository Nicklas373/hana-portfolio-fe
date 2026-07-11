import { GET } from "../route";
import dotenv from "dotenv";
import { experienceList } from "@/app/variables/constant";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";
import { experienceListResponseMap } from "@/app/variables/interface/experience";
import { NextRequest } from "next/server";

// Initialize environment
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const mockExperienceListData = {
  success: true,
  message: "OK",
  data: {
    experienceList: experienceList,
  },
  error: null,
};

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.experienceList}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Experience List Data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockExperienceListData),
      } as Response),
    );
    const response = await GET(
      new NextRequest(
        `${process.env.APP_API_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}/${applicationApiEndpoint.experienceList}?company=PT%20BFI%20Finance%20Indonesia%20Tbk`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.experienceList).toHaveLength(1);
    expect(body.data.experienceList[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      joblist: expect.any(Array),
    });
  });
  it("Mock API validation response", async () => {
    const response = await GET(
      new NextRequest(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}/${applicationApiEndpoint.experienceList}?company=`,
      ),
    );
    const body: experienceListResponseMap = await response.json();
    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data.experienceList).toBeNull();
    expect(body.message).toContain(applicationValString.applicationValRequired);
  });
  it("Mock API not reserved parameter", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(
        new Error(
          applicationErrString.applicationErrFetchData + " experienceList",
        ),
      ),
    );

    const response = await GET(
      new NextRequest(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}/${applicationApiEndpoint.experienceList}`,
      ),
    );
    const body: experienceListResponseMap = await response.json();
    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data.experienceList).toBeNull();
    expect(body.message).toContain(applicationValString.applicationValRequired);
  });
  it("Mock API error response", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(
        new Error(
          applicationErrString.applicationErrFetchData + " experienceList",
        ),
      ),
    );

    const response = await GET(
      new NextRequest(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}/${applicationApiEndpoint.experienceList}?company=PT%20BFI%20Finance%20Indonesia%20Tbk`,
      ),
    );
    const body: experienceListResponseMap = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
