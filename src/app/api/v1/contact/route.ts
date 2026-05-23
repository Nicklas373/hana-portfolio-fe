import { emailFormatter, errorFormatter } from "@/app/lib/helper";
import { getContact, insertContact } from "@/app/lib/model/portfolio";
import {
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const contactData = await getContact();
    return NextResponse.json(
      {
        success: true,
        message: "OK",
        data: {
          contact: contactData,
        },
        error: null,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
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

  // Validate cloudflare token
  const verifyResponse = await fetch(`${process.env.TURNSTILE_VERIFY_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY!,
      response: turnstileToken,
    }),
  });

  const verifyData = await verifyResponse.json();
  if (!verifyData.success) {
    return NextResponse.json(
      {
        success: false,
        message: applicationValString.applicationValTokenFail,
        data: {
          contact: [],
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
    // insert contact data
    const contactData = await insertContact(fullname, email, message);
    return NextResponse.json(
      {
        success: true,
        message: "OK",
        data: {
          contact: contactData,
        },
        error: null,
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
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
