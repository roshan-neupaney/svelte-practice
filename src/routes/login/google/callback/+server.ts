import { redirect, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { google } from "$lib/config/oauth";

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const storedState = cookies.get("google_oauth_state");
	const codeVerifier = cookies.get("google_code_verifier");

	// clear the one-time cookies
	cookies.delete("google_oauth_state", { path: "/" });
	cookies.delete("google_code_verifier", { path: "/" });

	if (!code || !state || !storedState || !codeVerifier) {
		error(400, "Missing OAuth parameters");
	}

	if (state !== storedState) {
		error(400, "State mismatch — possible CSRF attack");
	}

	if (!google) {
		error(500, "Google OAuth is not configured");
	}
	// exchange code → tokens using Arctic (this is where codeVerifier is needed)
	const tokens = await google.validateAuthorizationCode(code, codeVerifier);
	const accessToken = tokens.accessToken();

	// send access_token to Django — Django validates it with Google and logs the user in
	const res = await fetch("http://localhost:8000/api/auth/google/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ access_token: accessToken }),
		credentials: "include",
	});

	if (!res.ok) {
		const body = await res.json().catch(() => ({}));
		console.error("Django OAuth error:", body);
		redirect(302, "/login?error=oauth_failed");
	}

	const data = await res.json();
	console.log("OAuth success:", data);

	redirect(302, "/login");
};
