import { contactMap } from "@/app/variables/interface";
import { GET, POST } from "../route";
import { getContact, insertContact } from "@/app/lib/model/portfolio";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
} from "@/app/variables/enum";

jest.mock("@/app/lib/model/portfolio", () => ({
  getContact: jest.fn(),
  insertContact: jest.fn(),
}));

const mockContactData: contactMap[] = [
  {
    fullname: "myName",
    email: "myEmail@example.com",
    message: "myMessage",
    turnstileToken: "mock-token",
  },
];

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Contact Data", async () => {
    (getContact as jest.Mock).mockResolvedValue(mockContactData);
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.contact).toHaveLength(1);
    expect(body.data.contact[0]).toMatchObject({
      fullname: expect.any(String),
      email: expect.any(String),
      message: expect.any(String),
      turnstileToken: expect.any(String),
    });
  });

  it("Mock API error response", async () => {
    (getContact as jest.Mock).mockRejectedValue(
      new Error(applicationErrString.applicationErrFetchData + " contact"),
    );
    const response = await GET(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});

describe("POST /api/v1/contact", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockContactInsertPayload = {
    messageid: "1",
  };
  it("Mock API POST Contact Data", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });
    (insertContact as jest.Mock).mockResolvedValue(mockContactInsertPayload);
    const response = await POST(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockContactData[0]),
        },
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.contact).toMatchObject(mockContactInsertPayload);
  });
  it("Mock API validation response", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({ success: false }),
    });
    const response = await POST(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockContactData[0]),
        },
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
  });

  it("Mock API error response", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });
    (insertContact as jest.Mock).mockRejectedValue(
      new Error(applicationErrString.applicationErrSubmitData + " contact"),
    );
    const response = await POST(
      new Request(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockContactData[0]),
        },
      ),
    );
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
