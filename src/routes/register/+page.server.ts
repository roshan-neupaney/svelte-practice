import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { RegisterSchema } from '$lib/services/register/register.validation';
import { zod4 } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(RegisterSchema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(RegisterSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: call registration API here
		// const res = await PostMethod(RegisterApi, form.data, fetch);
		// if (res.status !== 201) {
		//     return message(form, { type: 'error', text: res.message }, { status: 400 });
		// }

		return message(form, { type: 'success', text: 'Account created! Please sign in.' });
	}
} satisfies Actions;
