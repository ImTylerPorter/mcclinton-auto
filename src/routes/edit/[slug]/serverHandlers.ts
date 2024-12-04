import { db } from '$lib/db';
import { sectionsTable, servicesTable, galleryTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export async function handleSectionUpdate(data: FormData, id: string, locals: App.Locals, userId: string) {
  const title = data.get('title') as string | null;
  const subTitle = data.get('sub_title') as string | null;
  const tagline = data.get('tagline') as string | null;
  const content = data.get('content') as string | null;
  const buttonText = data.get('button_text') as string | null;
  const buttonLink = data.get('button_link') as string | null;
  const image = data.get('image') as File | null;

  if (title === null) {
    throw error(400, 'Title cannot be null.');
  }

  await db.update(sectionsTable).set({
    title,
    subTitle,
    tagline,
    content,
    buttonText,
    buttonLink
  }).where(eq(sectionsTable.id, id));

  if (image && image instanceof File) {
    const fileName = `${Date.now()}-${image.name}` || 'default_profile.jpg';
    const { data: uploadData, error: uploadError } = await locals.supabase.storage
      .from('website-images')
      .upload(fileName, image, {
        metadata: { userId }
      });

    if (uploadError) {
      throw error(401, uploadError.message);
    }

    const publicUrl = locals.supabase.storage
      .from('website-images')
      .getPublicUrl(fileName).data.publicUrl;

    await db.update(sectionsTable).set({
      image: publicUrl,
    }).where(eq(sectionsTable.id, id));
  }
}

export async function handleServiceUpdates(data: FormData, locals: App.Locals, userId: string) {
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

    if (serviceImage && serviceImage instanceof File) {
      const serviceFileName = `${Date.now()}-${serviceImage.name}`;
      const { data: serviceUploadData, error: serviceUploadError } = await locals.supabase.storage
        .from('website-images')
        .upload(serviceFileName, serviceImage, {
          metadata: { userId }
        });

      if (serviceUploadError) {
        throw error(401, serviceUploadError.message);
      }

      serviceImageUrl = locals.supabase.storage
        .from('website-images')
        .getPublicUrl(serviceFileName).data.publicUrl;
    }

    await db.update(servicesTable).set({
      title: serviceTitle,
      imageUrl: serviceImageUrl ? serviceImageUrl : undefined,
    }).where(eq(servicesTable.id, serviceId));

    index++;
  }
}


export async function handleGalleryUpdates(data: FormData, locals: App.Locals, userId: string) {
  let index = 0;
  while (data.has(`gallery[${index}][id]`)) {
    const galleryId = data.get(`gallery[${index}][id]`) as string | null;
    const galleryImage = data.get(`gallery[${index}][image]`) as File | null;

    if (!galleryId) {
      index++;
      continue;
    }

    let galleryImageUrl = null;

    if (galleryImage && galleryImage instanceof File) {
      const galleryFileName = `${Date.now()}-${galleryImage.name}`;
      const { data: galleryUploadData, error: galleryUploadError } = await locals.supabase.storage
        .from('website-images')
        .upload(galleryFileName, galleryImage, {
          metadata: { userId }
        });

      if (galleryUploadError) {
        throw error(401, galleryUploadError.message);
      }

      galleryImageUrl = locals.supabase.storage
        .from('website-images')
        .getPublicUrl(galleryFileName).data.publicUrl;
    }

    await db.update(galleryTable).set({
      imageUrl: galleryImageUrl ? galleryImageUrl : undefined,
    }).where(eq(galleryTable.id, galleryId));

    index++;
  }
}

