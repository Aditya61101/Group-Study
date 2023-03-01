import { getToken } from "next-auth/jwt";

export const APIProtect = async (req) => {
  const token = await getToken({ req });
  return token;
};
