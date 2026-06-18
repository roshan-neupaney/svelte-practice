// src/routes/login/google/callback/+page.ts
import { goto } from '$app/navigation';
import axios from 'axios';

export async function load({ url }) {
    const code = url.searchParams.get('code');
    
    const res = await axios.post(
        'http://localhost:8000/api/auth/google/',
        { code, redirect_uri: 'http://localhost:5173/login/google/callback' },
        { withCredentials: true }
    );
    console.log(res)
    // cookies are now set directly on the browser
    goto('/dashboard');
}