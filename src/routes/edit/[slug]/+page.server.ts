import { db } from '$lib/db'; // Your Drizzle ORM database instance
import { sectionsTable, servicesTable} from '$lib/db/schema'; // Assuming your schema is defined in this path
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

  const servicesData = await db
    .select()
    .from(servicesTable)
    .where(eq(servicesTable.sectionId, sectionData[0].id));

  return { sectionData: sectionData[0], servicesData };
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
    const content = data.get('content') as string | null;
    const buttonText = data.get('button_text') as string | null;
    const buttonLink = data.get('button_link') as string | null;
    const image = data.get('image') as File | null;

    // Validate the 'id' field
    if (!id) {
      return error(400, 'Section ID is required.');
    }

    if (title === null) {
      return error(400, 'Title cannot be null.');
    }

    const updatedSectionResult = await db.update(sectionsTable).set({
      title,
      subTitle,
      tagline,
      content,
      buttonText,
      buttonLink
    }).where(eq(sectionsTable.id, id)).returning({
      id: sectionsTable.id,
    });

    // Handle section image upload
    if (image && image instanceof File) {
      const fileName = `${Date.now()}-${image.name}` || 'default_profile.jpg'; // Default name if not provided
      const { data: uploadData, error: uploadError } = await locals.supabase.storage
         .from('website-images')
         .upload(`${fileName}`, image, {
          metadata: { userId: userProfile.id }
        });

      if (uploadError) {
        error(401, uploadError.message);
      }

      const publicUrl = locals.supabase.storage
        .from('website-images')
        .getPublicUrl(fileName).data.publicUrl;

      await db.update(sectionsTable).set({
        image: publicUrl,
      }).where(eq(sectionsTable.id, id));
    }

    // Handle services update
    const services = []; // Placeholder array for services
    let index = 0;
    while (data.has(`services[${index}][id]`)) {
      const serviceId = data.get(`services[${index}][id]`) as string | null;
      const serviceTitle = data.get(`services[${index}][title]`) as string | null;
      const serviceImage = data.get(`services[${index}][image]`) as File | null;

      if (!serviceId || !serviceTitle) {
        index++;
        continue;
      }

      let serviceImageUrl = null;

      // Handle image upload if there's a new image file
      if (serviceImage && serviceImage instanceof File) {
        const serviceFileName = `${Date.now()}-${serviceImage.name}`;
        const { data: serviceUploadData, error: serviceUploadError } = await locals.supabase.storage
          .from('website-images')
          .upload(serviceFileName, serviceImage, {
            metadata: { userId: userProfile.id }
          });

        if (serviceUploadError) {
          error(401, serviceUploadError.message);
        }

        serviceImageUrl = locals.supabase.storage
          .from('website-images')
          .getPublicUrl(serviceFileName).data.publicUrl;
      }

      // Update the service in the database
      await db.update(servicesTable).set({
        title: serviceTitle,
        imageUrl: serviceImageUrl ? serviceImageUrl : undefined,
      }).where(eq(servicesTable.id, serviceId));

      index++;
    }

    return { success: true };
  }
};
