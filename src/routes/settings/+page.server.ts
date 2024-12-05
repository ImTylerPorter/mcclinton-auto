import { db } from '$lib/db';
import { galleryTable, globalSettingsTable, sectionsTable, servicesTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { getOrCreateUserProfile } from '$lib/auth';
import type { PageServerLoad, Actions } from './$types';
import type { Section } from '../../types';
import { handleSettingsUpdate } from './serverHandlers';

export const load: PageServerLoad = async () => {

  const settings = await db.select().from(globalSettingsTable)

  if (!settings.length) {
    throw error(404, 'Settings not found');
  }

  return { settings: settings[0] };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const userProfile = await getOrCreateUserProfile(locals);

    if (!userProfile) {
      throw error(401, "You need to be logged in!");
    }

    const data = await request.formData();
    const id = data.get('id') as string | null;

    if (!id) {
      throw error(400, 'Section ID is required.');
    }

    await handleSettingsUpdate(data, id);

    return { success: true };
  }
};

