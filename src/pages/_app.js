import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "react-bootstrap";
import { AuthContextProvider } from "@/context/AuthContextProvider";
import { SessionContextProvider } from "@/context/SessionContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthContextProvider>
        <SessionContextProvider>
          <Component {...pageProps} />
        </SessionContextProvider>
      </AuthContextProvider>
    </SSRProvider>
  );
}
