import { GET } from "../route";
import { projects } from "@/app/variables/constant";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
} from "@/app/variables/enum";
import { projectResponseMap } from "@/app/variables/interface/project";

const mockProjectData = {
  success: true,
  message: "OK",
  data: {
    project: projects,
  },
  error: null,
};

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Project Data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjectData),
      } as Response),
    );

    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`,
      ),
    );
    const body: projectResponseMap = await response.json();
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
    global.fetch = jest.fn(() =>
      Promise.reject(
        new Error(applicationErrString.applicationErrFetchData + " project"),
      ),
    );

    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`,
      ),
    );
    const body: projectResponseMap = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
