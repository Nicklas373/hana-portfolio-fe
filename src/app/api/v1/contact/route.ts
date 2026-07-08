import { emailFormatter, errorFormatter } from "@/app/lib/helper";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";
import {
  contactInsertResponseMap,
  contactResponseMap,
} from "@/app/variables/interface/contact";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${process.env.APP_API_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      {
        method: "GET",
        headers: {
          Authorization: `x-hana-key ${process.env.APP_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody: contactResponseMap = await response.json();
    if (responseBody.success) {
      return NextResponse.json(
        {
          success: true,
          message: "OK",
          data: {
            contact: responseBody.data.contact,
          },
          error: null,
        },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: applicationErrString.applicationErrFetchData + " contact",
          data: {
            contact: [],
          },
          error: responseBody.error,
        },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: applicationErrString.applicationErrFetchData + " contact",
        data: {
          contact: null,
        },
        error: errorFormatter(error),
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(request: Request) {
  // Define request body parameter
  const body = await request.json();
  const { fullname, email, message, turnstileToken } = body;

  // Validate request body parameter
  if (!fullname || !email || !message || !turnstileToken) {
    return NextResponse.json(
      {
        success: false,
        message: applicationValString.applicationValRequired,
        data: {
          contact: null,
        },
        error: null,
      },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validate email format
  if (!emailFormatter(email)) {
    return NextResponse.json(
      {
        success: false,
        message: applicationValString.applicationValEmailInvalid,
        data: {
          contact: null,
        },
        error: null,
      },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Validate maximum message characters
  if (message.length > 500) {
    return NextResponse.json(
      {
        success: false,
        message: applicationValString.applicationValTooLong,
        data: {
          contact: null,
        },
        error: null,
      },
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const response = await fetch(
      `${process.env.APP_API_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.contact}`,
      {
        method: "POST",
        headers: {
          Authorization: `x-hana-key ${process.env.APP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const responseBody: contactInsertResponseMap = await response.json();

    if (responseBody.success) {
      return NextResponse.json(
        {
          success: true,
          message: "OK",
          data: {
            contact: responseBody.data.contact,
          },
          error: null,
        },
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: applicationErrString.applicationErrSubmitData + " contact",
          data: {
            contact: [],
          },
          error: responseBody.error,
        },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: applicationErrString.applicationErrSubmitData + " contact",
        data: {
          contact: null,
        },
        error: errorFormatter(error),
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
