import { serverConfig } from "@/app/lib/config/server";
import { errorFormatter } from "@/app/lib/helper";
import { logger } from "@/app/lib/logger";
import {
  applicationApiEndpoint,
  applicationApiVersion,
  applicationErrString,
} from "@/app/variables/enum";
import { experienceResponseMap } from "@/app/variables/interface/experience";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getExperienceData(request: NextRequest) {
  try {
    const response = await fetch(
      `${serverConfig.api.apiUrl}/api/${applicationApiVersion.v1}/${applicationApiEndpoint.experience}`,
      {
        method: "GET",
        headers: {
          Authorization: `x-hana-key ${serverConfig.api.apiKey}`,
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
          success: false,
          message: applicationErrString.applicationErrFetchData + " experience",
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

export const GET = logger(getExperienceData);
