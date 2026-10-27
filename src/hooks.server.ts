import type { Handle } from '@sveltejs/kit';

/**
 * Public site is static/hard-coded. CMS/auth (Supabase) is disconnected for public pages.
 * Admin routes under /auth /edit /settings redirect home.
 */
export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = null;
	event.locals.user = null;
	event.locals.safeGetSession = async () => ({ session: null, user: null });

	const path = event.url.pathname;
	if (
		path.startsWith('/auth') ||
		path.startsWith('/edit') ||
		path.startsWith('/settings') ||
		path.startsWith('/logout') ||
		path.startsWith('/account') ||
		path.startsWith('/dashboard')
	) {
		return new Response(null, {
			status: 303,
			headers: { location: '/' }
		});
	}

	return resolve(event);
};
