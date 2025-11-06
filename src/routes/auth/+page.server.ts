import { SIGNUP_PASSPHRASE } from '$env/static/private';
import { error as svelteError } from '@sveltejs/kit';


export const actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const isLogin = data.get('isLogin');
    if (isLogin) {

      const { error } = await locals.supabase.auth.signInWithPassword({ email: email as string, password: password as string });
      if (error) {
        throw svelteError(400, error.message);
      }
    } else {
      const passphrase = data.get('passphrase');

      if (passphrase != SIGNUP_PASSPHRASE) {
        throw svelteError(400, 'Wrong passphrase, please try again.')
      }

      const { error } = await locals.supabase.auth.signUp({ email: email as string, password: password as string });
      if (error) {
        throw svelteError(400, error.message);
      }

    }
  }
}



