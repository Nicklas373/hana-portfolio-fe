import { errorFormatter } from "@/app/lib/helper";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
} from "@/app/variables/enum";
import { projectResponseMap } from "@/app/variables/interface/project";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${process.env.APP_API_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.projects}`,
      {
        method: "GET",
        headers: {
          Authorization: `x-hana-key ${process.env.APP_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody: projectResponseMap = await response.json();

    if (responseBody.success) {
      return NextResponse.json(
        {
          success: true,
          message: "OK",
          data: {
            project: responseBody.data.project,
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
          message: applicationErrString.applicationErrFetchData + " project",
          data: {
            project: [],
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
        message: applicationErrString.applicationErrFetchData + " project",
        data: {
          project: null,
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
