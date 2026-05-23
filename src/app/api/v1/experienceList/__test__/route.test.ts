import { experienceListMap } from "@/app/variables/interface";
import { GET } from "../route";
import { getExperienceList } from "@/app/lib/model/portfolio";
import { experienceList } from "@/app/variables/constant";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";

jest.mock("@/app/lib/model/portfolio", () => ({
  getExperienceList: jest.fn(),
}));

const mockExperienceListData: experienceListMap[] = experienceList;

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.experienceList}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Experience List Data", async () => {
    (getExperienceList as jest.Mock).mockResolvedValue(mockExperienceListData);
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experienceList}?company=PT%20BFI%20Finance%20Indonesia%20Tbk`,
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
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experienceList}?company=`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data.experienceList).toBeNull();
    expect(body.message).toContain(applicationValString.applicationValRequired);
  });
  it("Mock API not reserved parameter", async () => {
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experienceList}`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.data.experienceList).toBeNull();
    expect(body.message).toContain(applicationValString.applicationValRequired);
  });
  it("Mock API error response", async () => {
    (getExperienceList as jest.Mock).mockRejectedValue(
      new Error(
        applicationErrString.applicationErrFetchData + " experience list",
      ),
    );
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experienceList}?company=PT%20BFI%20Finance%20Indonesia%20Tbk`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
