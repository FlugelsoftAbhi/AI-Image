import { supabase } from './database';

export async function uploadImage(userId: string, imageBuffer: Buffer, filename: string) {
  const filePath = `${userId}/${Date.now()}_${filename}`;
  
  const { data, error } = await supabase.storage
    .from('generated-images')
    .upload(filePath, imageBuffer, {
      contentType: 'image/png',
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image to storage');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('generated-images')
    .getPublicUrl(filePath);

  return publicUrl;
}
