import { errorFormatter } from "@/app/lib/helper";
import { getExperience } from "@/app/lib/model/portfolio";
import { applicationErrString } from "@/app/variables/enum";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const experienceData = await getExperience();
    return NextResponse.json(
      {
        success: true,
        message: "OK",
        data: {
          experience: experienceData,
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
