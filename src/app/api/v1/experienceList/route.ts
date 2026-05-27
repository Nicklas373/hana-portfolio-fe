import { errorFormatter } from "@/app/lib/helper";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";
import { experienceListResponseMap } from "@/app/variables/interface/experience";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const company = searchParams.get("company");
  if (!company) {
    return NextResponse.json(
      {
        success: false,
        message: applicationValString.applicationValRequired,
        data: {
          experienceList: null,
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
    // get list of experience list data
    const response = await fetch(
      `${process.env.APP_API_URL}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experienceList}?company=${company}`,
      {
        method: "GET",
        headers: {
          Authorization: `x-hana-key ${process.env.APP_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseBody: experienceListResponseMap = await response.json();

    if (responseBody.success) {
      return NextResponse.json(
        {
          success: true,
          message: "OK",
          data: {
            experienceList: responseBody.data.experienceList,
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
          message:
            applicationErrString.applicationErrFetchData + " experience list",
          data: {
            experience: [],
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
        message:
          applicationErrString.applicationErrFetchData + " experience list",
        data: {
          experienceList: null,
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
