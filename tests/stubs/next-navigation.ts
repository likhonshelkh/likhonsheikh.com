import { useEffect, useState } from "react";

type RouterLike = {
  replace: (href: string) => Promise<void>;
  push: (href: string) => Promise<void>;
  prefetch: () => Promise<void>;
};

function notifyLocationChange() {
  window.dispatchEvent(new Event("popstate"));
}

function updateHistory(method: "pushState" | "replaceState", href: string) {
  window.history[method](null, "", href);
  notifyLocationChange();
}

export function useRouter(): RouterLike {
  return {
    async replace(href: string) {
      updateHistory("replaceState", href);
    },
    async push(href: string) {
      updateHistory("pushState", href);
    },
    async prefetch() {
      // no-op stub
    },
  };
}

export function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname || "/en");

  useEffect(() => {
    const handler = () => setPathname(window.location.pathname || "/en");
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  return pathname;
}

export function useSearchParams(): URLSearchParams {
  const [params, setParams] = useState(() => new URLSearchParams(window.location.search));

  useEffect(() => {
    const handler = () => setParams(new URLSearchParams(window.location.search));
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  return params;
}
