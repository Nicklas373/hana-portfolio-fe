import { projectMap } from "@/app/variables/interface";
import { GET } from "../route";
import { getProject } from "@/app/lib/model/portfolio";
import { projects } from "@/app/variables/constant";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
} from "@/app/variables/enum";

jest.mock("@/app/lib/model/portfolio", () => ({
  getProject: jest.fn(),
}));

const mockProjectData: projectMap[] = projects;

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Project Data", async () => {
    (getProject as jest.Mock).mockResolvedValue(mockProjectData);
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.project).toHaveLength(1);
    expect(body.data.project[0]).toMatchObject({
      name: expect.any(String),
      description: expect.any(String),
      techstack: expect.any(Array),
      link: expect.any(String),
      source: expect.any(String),
      icons: expect.any(String),
    });
  });
  it("Mock API error response", async () => {
    (getProject as jest.Mock).mockRejectedValue(
      new Error(applicationErrString.applicationErrFetchData + " project"),
    );
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
