/**
 * Centralized error handling utility
 */

export const handleError = (error, context = "") => {
  console.error(`Error in ${context}:`, error);

  // Check for common Supabase errors
  if (error.message?.includes("JWT")) {
    return "Authentication error. Please refresh the page.";
  }

  if (error.message?.includes("policy")) {
    return "Permission denied. Please check your access rights.";
  }

  if (error.message?.includes("network")) {
    return "Network error. Please check your connection.";
  }

  // Return user-friendly message
  return error.message || "An unexpected error occurred";
};

/**
 * Validate file before upload
 */
export const validateFile = (file, maxSize, allowedTypes) => {
  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Max size: ${maxSize / 1024 / 1024}MB`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload an image.",
    };
  }

  return { valid: true, error: null };
};
