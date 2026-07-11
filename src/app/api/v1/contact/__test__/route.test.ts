import {
  contactInsertResponseMap,
  contactMap,
  contactResponseMap,
} from "@/app/variables/interface/contact";
import { GET, POST } from "../route";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";
import { NextRequest } from "next/server";

const mockExpectedResponseData: contactMap[] = [
  {
    fullname: "myName",
    email: "myEmail@example.com",
    message: "myMessage",
    turnstileToken: "mock-token",
  },
];

const mockContactData = {
  success: true,
  message: "OK",
  data: {
    contact: mockExpectedResponseData,
  },
  error: null,
};

describe(`GET /api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Mock API Get Contact Data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockContactData),
      } as Response),
    );
    const response = await GET(
      new NextRequest(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      ),
    );
    const body: contactResponseMap = await response.json();
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
    global.fetch = jest.fn(() =>
      Promise.reject(
        new Error(applicationErrString.applicationErrFetchData + " contact"),
      ),
    );
    const response = await GET(
      new NextRequest(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      ),
    );
    const body: contactResponseMap = await response.json();
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
      ok: true,
      json: async () => ({
        success: true,
        data: {
          contact: mockContactInsertPayload,
        },
      }),
    } as Response);

    const response = await POST(
      new NextRequest(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockExpectedResponseData[0]),
        },
      ),
    );

    const body: contactInsertResponseMap = await response.json();

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.contact).toMatchObject({
      messageid: expect.any(String),
    });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      ),
      expect.objectContaining({
        method: "POST",
        body: expect.any(String),
      }),
    );
  });

  it("Mock invalid parameters response", async () => {
    const invalidPayload = {
      fullname: "myName",
      email: "myEmail",
      message: "myMessage",
      turnstileToken: "mock-token",
    };

    const response = await POST(
      new NextRequest(`${process.env.APP_URL}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidPayload),
      }),
    );

    const body: contactInsertResponseMap = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toEqual(
      applicationValString.applicationValEmailInvalid,
    );
  });

  it("Mock API error response", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Internal Server Error"));

    const response = await POST(
      new NextRequest(
        `${process.env.APP_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mockExpectedResponseData[0]),
        },
      ),
    );

    const body: contactInsertResponseMap = await response.json();

    expect(response.status).toBe(500);
    expect(body.success).toBe(false);
  });
});
