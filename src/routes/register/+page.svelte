<script lang="ts">
	import { untrack } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import * as Form from 'formsnap';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ZapIcon } from '@lucide/svelte';
	import { RegisterSchema } from '$lib/services/register/register.validation.js';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const form = superForm(untrack(() => data.form), {
		validators: zod4Client(RegisterSchema)
	});

	const { form: formData, enhance, message } = form;
</script>

<div class="bg-background flex min-h-screen items-center justify-center p-4">
	<Card.Root class="w-full max-w-md">
		<Card.Header class="space-y-1 text-center">
			<div class="flex justify-center">
				<div
					class="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl"
				>
					<ZapIcon class="size-6" />
				</div>
			</div>
			<Card.Title class="text-2xl font-bold">Create an account</Card.Title>
		</Card.Header>

		<Card.Content>
			{#if $message}
				<div
					class="mb-4 rounded-md p-3 text-sm {$message.type === 'error'
						? 'bg-destructive/10 text-destructive'
						: 'bg-green-100 text-green-800'}"
				>
					{$message.text}
				</div>
			{/if}

			<form method="POST" use:enhance class="space-y-4">
				<Form.Field {form} name="full_name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Full Name</Form.Label>
							<Input
								{...props}
								bind:value={$formData.full_name}
								type="text"
								placeholder="John Doe"
								autocomplete="name"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-xs" />
				</Form.Field>

				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input
								{...props}
								bind:value={$formData.email}
								type="email"
								placeholder="john@example.com"
								autocomplete="email"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-xs" />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input
								{...props}
								bind:value={$formData.password}
								type="password"
								placeholder="8+ characters"
								autocomplete="new-password"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-xs" />
				</Form.Field>

				<Form.Field {form} name="confirm_password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input
								{...props}
								bind:value={$formData.confirm_password}
								type="password"
								placeholder="Re-enter your password"
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive text-xs" />
				</Form.Field>

				<Button type="submit" class="w-full">Create account</Button>
			</form>
		</Card.Content>

		<Card.Footer class="justify-center">
			<p class="text-muted-foreground text-sm">
				Already have an account?
				<a href="/login" class="text-primary underline-offset-4 hover:underline">Sign in</a>
			</p>
		</Card.Footer>
	</Card.Root>
</div>
