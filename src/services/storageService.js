import { supabase } from "../supabaseClient";
import {
  STORAGE_BUCKET,
  CACHE_CONTROL,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from "../config/constants";
import { handleError, validateFile } from "../utils/errorHandler";

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @returns {Promise<{url: string, path: string} | null>}
 */
export const uploadImage = async (file) => {
  try {
    // Validate file
    const validation = validateFile(file, MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: CACHE_CONTROL,
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: filePath,
    };
  } catch (error) {
    const errorMessage = handleError(error, "uploadImage");
    throw new Error(errorMessage);
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} filePath - The file path to delete
 * @returns {Promise<boolean>}
 */
export const deleteImage = async (filePath) => {
  try {
    if (!filePath) return false;

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (error) throw error;

    return true;
  } catch (error) {
    const errorMessage = handleError(error, "deleteImage");
    console.error(errorMessage);
    return false;
  }
};

/**
 * Extract file path from Supabase URL
 * @param {string} url - The full Supabase storage URL
 * @returns {string|null} - The file path or null
 */
export const extractPathFromUrl = (url) => {
  if (!url) return null;

  try {
    const parts = url.split(`/${STORAGE_BUCKET}/`);
    return parts[1] || null;
  } catch (error) {
    console.error("Error extracting path from URL:", error);
    return null;
  }
};
