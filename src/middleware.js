export { default } from "next-auth/middleware";

export const config = { matcher: ["/upcoming-sessions","/create-session","/api/sessions","/api/createSession","/api/sessions/:sessionId"] }