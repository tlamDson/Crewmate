import { supabase } from "./supabaseClient";

/**
 * Uploads a file to Supabase Storage and returns the public URL
 * @param {File} file - The file object from input
 * @param {string} fileName - The name to save as in Supabase Storage
 * @returns {string} - Public URL of uploaded file
 */
export const uploadImage = async (file, fileName) => {
  const { data, error } = await supabase.storage
    .from("crewmate-images") // your bucket name
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading file:", error);
    return null;
  }

  // Get the public URL
  const { publicUrl, error: urlError } = supabase.storage
    .from("crewmate-images")
    .getPublicUrl(fileName);

  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return null;
  }

  return publicUrl;
};
