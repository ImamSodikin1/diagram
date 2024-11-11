// pages/index.js

import Head from "next/head";
import DiagramFlow from "@/components/DiagramFlow";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Diagram App</title>
        <meta
          name="description"
          content="Interactive diagram with floating nodes"
        />
      </Head>
      <DiagramFlow />
    </div>
  );
}
