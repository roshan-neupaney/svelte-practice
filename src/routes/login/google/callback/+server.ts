import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "../$types";
import axios from "axios";

export const GET: RequestHandler = async ({ url }) => {
  const authCode = url.searchParams.get("code");
  const res = await axios.post(
    "http://localhost:8000/api/auth/google/",
    {
      code: authCode,
      redirect_uri: 'http://localhost:5173/login/google/callback',
    },
    { withCredentials: true }
  );
  console.log('res', res);
  redirect(302, "#");
};
