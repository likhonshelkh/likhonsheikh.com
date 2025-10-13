import { setDefaultResultOrder } from "node:dns";

if (typeof setDefaultResultOrder === "function") {
  setDefaultResultOrder("ipv4first");
}

const REGISTRY_URL = "https://registry.npmjs.org";

const MS_PER_DAY = 1000 * 60 * 60 * 24;
export const MAINTENANCE_THRESHOLD_DAYS = 365;

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

interface RegistryTimeMetadata {
  readonly modified?: string;
  readonly created?: string;
  readonly [version: string]: string | undefined;
}

interface RegistryResponse {
  readonly "dist-tags"?: {
    readonly latest?: string;
  };
  readonly time?: RegistryTimeMetadata;
}

export interface PackageMaintenanceResult {
  name: string;
  latestVersion: string;
  publishedAt: string;
  daysSincePublish: number;
  maintained: boolean;
}

function assertPresent<T>(value: T | undefined | null, message: string): asserts value is T {
  if (value === undefined || value === null) {
    throw new Error(message);
  }
}

export async function fetchPackageMaintenance(
  packageName: string,
  fetchImpl: FetchLike = fetch,
): Promise<PackageMaintenanceResult> {
  assertPresent(packageName, "package name is required");

  let response: Response;
  try {
    response = await fetchImpl(`${REGISTRY_URL}/${encodeURIComponent(packageName)}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown network error";
    throw new Error(`Failed to reach npm registry for ${packageName}: ${message}`);
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch package metadata for ${packageName}: ${response.status}`);
  }

  const json = (await response.json()) as RegistryResponse;
  const latest = json["dist-tags"]?.latest;
  assertPresent(latest, `Missing latest dist-tag for ${packageName}`);

  const publishTimestamp = json.time?.[latest] ?? json.time?.modified;
  assertPresent(publishTimestamp, `Missing publish timestamp for ${packageName}`);

  const publishedAt = new Date(publishTimestamp);
  if (Number.isNaN(publishedAt.getTime())) {
    throw new Error(`Invalid publish timestamp for ${packageName}`);
  }

  const daysSincePublish = Math.max(0, Math.floor((Date.now() - publishedAt.getTime()) / MS_PER_DAY));
  const maintained = daysSincePublish <= MAINTENANCE_THRESHOLD_DAYS;

  return {
    name: packageName,
    latestVersion: latest,
    publishedAt: publishedAt.toISOString(),
    daysSincePublish,
    maintained,
  };
}

export const trackedPackages = [
  { name: "next", displayName: "Next.js" },
  { name: "react", displayName: "React" },
  { name: "nuqs", displayName: "nuqs" },
  { name: "motion", displayName: "Motion" },
];
