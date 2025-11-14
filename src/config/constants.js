// Storage configuration
export const STORAGE_BUCKET = "crewmate-images";

// File upload configuration
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

// Cache configuration
export const CACHE_CONTROL = "3600"; // 1 hour

// Database tables
export const TABLES = {
  CREWMATES: "Crewmates",
};
