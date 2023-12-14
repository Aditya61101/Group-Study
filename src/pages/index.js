import Head from "next/head";
import HomePage  from "./home/index";

export default function Home() {
  return (
    <>
      <Head>
        <title>Group Study App</title>
        <meta name="description" content="A study app where people can come and join or create any study session!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <HomePage />
    </>
  );
}
