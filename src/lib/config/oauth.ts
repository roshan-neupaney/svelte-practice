import * as arctic from "arctic";
import { env } from '$env/dynamic/private'

const googleClientId = env.SECRET_GOOGLE_CLIENT_ID;
const googleClientSecret = env.SECRET_GOOGLE_CLIENT_SECRET;
const redirectURI = 'http://localhost:5173/login/google/callback'
export const google = googleClientId && googleClientSecret ?  new arctic.Google(googleClientId, googleClientSecret, redirectURI) : null;
