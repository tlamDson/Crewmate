import { supabase } from "../supabaseClient";
import { TABLES } from "../config/constants";
import { handleError } from "../utils/errorHandler";

/**
 * Fetch all crewmates from the database
 * @returns {Promise<Array>}
 */
export const getAllCrewmates = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CREWMATES)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    const errorMessage = handleError(error, "getAllCrewmates");
    throw new Error(errorMessage);
  }
};

/**
 * Get a single crewmate by ID
 * @param {number} id - The crewmate ID
 * @returns {Promise<Object|null>}
 */
export const getCrewmateById = async (id) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CREWMATES)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    const errorMessage = handleError(error, "getCrewmateById");
    throw new Error(errorMessage);
  }
};

/**
 * Create a new crewmate
 * @param {Object} crewmateData - The crewmate data
 * @returns {Promise<Object>}
 */
export const createCrewmate = async (crewmateData) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CREWMATES)
      .insert([crewmateData])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    const errorMessage = handleError(error, "createCrewmate");
    throw new Error(errorMessage);
  }
};

/**
 * Update an existing crewmate
 * @param {number} id - The crewmate ID
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object>}
 */
export const updateCrewmate = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CREWMATES)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    const errorMessage = handleError(error, "updateCrewmate");
    throw new Error(errorMessage);
  }
};

/**
 * Delete a crewmate
 * @param {number} id - The crewmate ID
 * @returns {Promise<boolean>}
 */
export const deleteCrewmate = async (id) => {
  try {
    const { error } = await supabase
      .from(TABLES.CREWMATES)
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  } catch (error) {
    const errorMessage = handleError(error, "deleteCrewmate");
    throw new Error(errorMessage);
  }
};

/**
 * Search crewmates by name
 * @param {string} searchTerm - The search term
 * @returns {Promise<Array>}
 */
export const searchCrewmates = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from(TABLES.CREWMATES)
      .select("*")
      .ilike("name", `%${searchTerm}%`);

    if (error) throw error;

    return data || [];
  } catch (error) {
    const errorMessage = handleError(error, "searchCrewmates");
    throw new Error(errorMessage);
  }
};
