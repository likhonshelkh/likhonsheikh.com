import assert from "node:assert/strict";
import test from "node:test";

import { fetchPackageMaintenance } from "@/lib/maintenance";

function mockFetch(data: unknown, init: { status?: number } = {}) {
  const status = init.status ?? 200;
  return async (_input: RequestInfo | URL, _init?: RequestInit) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "content-type": "application/json" },
    });
}

test("marks package as maintained when recently published", async () => {
  const now = Date.UTC(2025, 0, 20);
  const originalNow = Date.now;
  Date.now = () => now;

  try {
    const result = await fetchPackageMaintenance("nuqs", mockFetch({
      "dist-tags": { latest: "2.7.1" },
      time: {
        created: "2020-01-01T00:00:00.000Z",
        modified: "2025-01-10T00:00:00.000Z",
        "2.7.1": "2025-01-10T00:00:00.000Z",
      },
    }));

    assert.equal(result.name, "nuqs");
    assert.equal(result.latestVersion, "2.7.1");
    assert.equal(result.maintained, true);
    assert.equal(result.daysSincePublish, 10);
  } finally {
    Date.now = originalNow;
  }
});


test("marks package as stale when last publish is beyond threshold", async () => {
  const now = Date.UTC(2025, 0, 20);
  const originalNow = Date.now;
  Date.now = () => now;

  try {
    const result = await fetchPackageMaintenance("deprecated-lib", mockFetch({
      "dist-tags": { latest: "1.0.0" },
      time: {
        created: "2018-01-01T00:00:00.000Z",
        modified: "2020-01-01T00:00:00.000Z",
        "1.0.0": "2020-01-01T00:00:00.000Z",
      },
    }));

    assert.equal(result.maintained, false);
    assert.equal(result.daysSincePublish, Math.floor((now - Date.parse("2020-01-01T00:00:00.000Z")) / (1000 * 60 * 60 * 24)));
  } finally {
    Date.now = originalNow;
  }
});
