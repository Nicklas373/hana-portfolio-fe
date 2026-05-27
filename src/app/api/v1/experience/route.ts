import { errorFormatter } from "@/app/lib/helper";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
} from "@/app/variables/enum";
import { experienceResponseMap } from "@/app/variables/interface/experience";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${process.env.APP_API_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`,
      {
        method: "GET",
        headers: {
          Authorization: `x-hana-key ${process.env.APP_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody: experienceResponseMap = await response.json();

    if (responseBody.success) {
      return NextResponse.json(
        {
          success: true,
          message: "OK",
          data: {
            experience: responseBody.data.experience,
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
          success: true,
          message: applicationErrString.applicationErrFetchData + " experience",
          data: {
            experience: [],
          },
          error: responseBody.error,
        },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: applicationErrString.applicationErrFetchData + " experience",
        data: {
          experience: null,
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
