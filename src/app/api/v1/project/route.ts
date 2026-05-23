import { errorFormatter } from "@/app/lib/helper";
import { getProject } from "@/app/lib/model/portfolio";
import { applicationErrString } from "@/app/variables/enum";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const projectData = await getProject();
    return NextResponse.json(
      {
        success: true,
        message: "OK",
        data: {
          project: projectData,
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
