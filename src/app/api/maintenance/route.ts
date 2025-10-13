import { NextResponse } from "next/server";

import { fetchPackageMaintenance, trackedPackages } from "@/lib/maintenance";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const packageParams = url.searchParams.getAll("package");
  const packagesToCheck = packageParams.length > 0 ? packageParams : trackedPackages.map((pkg) => pkg.name);

  try {
    const results = await Promise.all(
      packagesToCheck.map(async (pkgName) => {
        const metadata = await fetchPackageMaintenance(pkgName);
        const tracked = trackedPackages.find((pkg) => pkg.name === pkgName);

        return {
          ...metadata,
          displayName: tracked?.displayName ?? pkgName,
        };
      }),
    );

    return NextResponse.json({ packages: results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
