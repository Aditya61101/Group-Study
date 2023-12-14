import Head from "next/head";
import HomePage from "./home/index";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  let darkMode = theme === "dark";
  return (
    <>
      <Head>
        <title>Group Study App</title>
        <meta
          name="description"
          content="A study app where people can come and join or create any study session!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <Box
        className={`
      bg-${darkMode ? "black" : "white"}
      `}
        sx={{
          width: "100vw",
          height: "91vh",
          display: "flex",
        }}
      >
        <HomePage />
      </Box>
    </>
  );
}
