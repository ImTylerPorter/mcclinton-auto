declare global {
	namespace App {
		interface Locals {
			safeGetSession: () => Promise<{ session: null; user: null }>;
			session: null;
			user: null;
		}
		interface PageData {
			session: null;
		}
	}
}

export {};
