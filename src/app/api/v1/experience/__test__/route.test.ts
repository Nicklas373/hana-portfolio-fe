import { GET } from "../route";
import { experience } from "@/app/variables/constant";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
} from "@/app/variables/enum";
import { experienceResponseMap } from "@/app/variables/interface/experience";

const mockExperienceData = {
  success: true,
  message: "OK",
  data: {
    experience: experience,
  },
  error: null,
};

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Experience Data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockExperienceData),
      } as Response),
    );
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`,
      ),
    );
    const body: experienceResponseMap = await response.json();
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.experience).toHaveLength(1);
    expect(body.data.experience[0]).toMatchObject({
      year: expect.any(String),
      position: expect.any(String),
      company: expect.any(String),
      companyUrl: expect.any(String),
      description: expect.any(String),
      subdescription: expect.any(String),
      skills: expect.any(Array),
    });
  });
  it("Mock API error response", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(
        new Error(applicationErrString.applicationErrFetchData + " experience"),
      ),
    );
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`,
      ),
    );
    const body: experienceResponseMap = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
