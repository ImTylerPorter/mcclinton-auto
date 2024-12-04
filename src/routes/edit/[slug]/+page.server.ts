import { db } from '$lib/db'; // Your Drizzle ORM database instance
import { sectionsTable } from '$lib/db/schema'; // Assuming your schema is defined in this path
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { getOrCreateUserProfile } from '$lib/auth';

export const load = async ({ params }) => {
  const { slug } = params;

  // Fetch the section data from the database
  const sectionData = await db
    .select()
    .from(sectionsTable)
    .where(eq(sectionsTable.sectionName, slug));

    if (!sectionData.length) {
    throw error(404, 'Section not found');
  }
  return { sectionData: sectionData[0] };
};


export const actions = {
  default: async ({ request, locals }) => {
    const userProfile = await getOrCreateUserProfile(locals);

    if (!userProfile) {
      error(401, "You need to be logged in!");
    }

    const data = await request.formData();
    const id = data.get('id') as string | null;
    const title = data.get('title') as string | null;
    const subTitle = data.get('sub_title') as string | null;
    const tagline = data.get('tagline') as string | null;
    const content = data.get('content') as string | null
    const buttonText = data.get('button_text') as string | null


    // Validate the 'id' field
    if (!id) {
      return error(400, 'Section ID is required.' );
    }

    if (title === null) {
      return error(400, 'Title cannot be null.' );
    }

    const updatedSectionResult = await db.update(sectionsTable).set({
      title,
      subTitle,
      tagline,
      content,
      buttonText

    }).where(eq(sectionsTable.id, id)).returning({
      id: sectionsTable.id,
    });;


    return { success: true };

  }
}
