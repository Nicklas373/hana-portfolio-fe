import { errorFormatter } from "@/app/lib/helper";
import { getExperienceList } from "@/app/lib/model/portfolio";
import {
  applicationErrString,
  applicationValString,
} from "@/app/variables/enum";
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
    const experienceListData = await getExperienceList(company);
    return NextResponse.json(
      {
        success: true,
        message: "OK",
        data: {
          experienceList: experienceListData,
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
