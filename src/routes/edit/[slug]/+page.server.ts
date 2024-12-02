import { db } from '$lib/db'; // Your Drizzle ORM database instance
import { sectionsTable } from '$lib/db/schema'; // Assuming your schema is defined in this path
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const { slug } = params;

  // Fetch the section data from the database
  const sectionData = await db
    .select()
    .from(sectionsTable)
    .where(eq(sectionsTable.sectionName, slug));

    console.log(sectionData)
  if (!sectionData.length) {
    throw error(404, 'Section not found');
  }


  return { sectionData: sectionData[0] };
};
