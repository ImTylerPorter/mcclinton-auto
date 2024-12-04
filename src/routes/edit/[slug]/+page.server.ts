import { db } from '$lib/db';
import { galleryTable, sectionsTable, servicesTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { getOrCreateUserProfile } from '$lib/auth';
import type { PageServerLoad, Actions } from './$types';
import { handleGalleryUpdates, handleSectionUpdate, handleServiceUpdates } from './serverHandlers';

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  const sectionData = await db
    .select()
    .from(sectionsTable)
    .where(eq(sectionsTable.sectionName, slug));

  if (!sectionData.length) {
    throw error(404, 'Section not found');
  }

  const servicesData = await db
    .select()
    .from(servicesTable)
    .where(eq(servicesTable.sectionId, sectionData[0].id));

    const galleryData = await db
    .select()
    .from(galleryTable)
    .where(eq(galleryTable.sectionId, sectionData[0].id));

  return { sectionData: sectionData[0], servicesData, galleryData };
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

    await handleSectionUpdate(data, id, locals, userProfile.id);
    await handleServiceUpdates(data, locals, userProfile.id);
    await handleGalleryUpdates(data, locals, userProfile.id);

    return { success: true };
  }
};

