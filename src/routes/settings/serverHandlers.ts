import { db } from '$lib/db';
import { globalSettingsTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function handleSettingsUpdate(data: FormData, id: string) {
  const phoneNumber = data.get('phone_number') as string | null;
  const email = data.get('email') as string | null;
  const address = data.get('address') as string | null;
  const facebookLink = data.get('facebook_link') as string | null;
  const instagramLink = data.get('instagram_link') as string | null;

  await db.update(globalSettingsTable).set({
    phoneNumber,
    email,
    address,
    facebookLink,
    instagramLink,
  }).where(eq(globalSettingsTable.id, id));

}