"use client";

import dynamic from "next/dynamic";

// We must dynamically import the Scene component with SSR disabled
// because React Three Fiber relies on browser APIs (window/document).
const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Scene />
    </main>
  );
}
