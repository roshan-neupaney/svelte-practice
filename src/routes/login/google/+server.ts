import * as arctic from "arctic";
import { google } from "$lib/config/oauth"
import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";

export const GET: RequestHandler = async({cookies}) => {
	if(!google) redirect(302, '/login');

	const state = arctic.generateState();
	const codeVerifier = arctic.generateCodeVerifier();
	const scopes = ["openid", "profile"];
	const url = google.createAuthorizationURL(state, codeVerifier, scopes);
	cookies.set("google_oauth_state", state, {
		secure: true,
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10
	});

	redirect(302, url.toString())
}
