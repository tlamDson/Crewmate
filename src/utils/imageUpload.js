import { supabase } from "../supabaseClient";

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name (default: 'crewmate-images')
 * @returns {Promise<{url: string, path: string, error: null} | {url: null, path: null, error: Error}>}
 */
export const uploadImage = async (file, bucket = "crewmate-images") => {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
      error: null,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      url: null,
      path: null,
      error: error,
    };
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} filePath - The file path to delete
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<{success: boolean, error: null | Error}>}
 */
export const deleteImage = async (filePath, bucket = "crewmate-images") => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      throw error;
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      error: error,
    };
  }
};
