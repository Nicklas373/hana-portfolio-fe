import { experienceMap } from "@/app/variables/interface";
import { GET } from "../route";
import { getExperience } from "@/app/lib/model/portfolio";
import { experience } from "@/app/variables/constant";
import {
  applicationApiEndpoint,
  applicationApiVersion,
} from "@/app/variables/enum";

jest.mock("@/app/lib/model/portfolio", () => ({
  getExperience: jest.fn(),
}));

const mockExperienceData: experienceMap[] = experience;

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Experience Data", async () => {
    (getExperience as jest.Mock).mockResolvedValue(mockExperienceData);
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`,
      ),
    );
    const body = await response.json();
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
    (getExperience as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch experience data"),
    );
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
