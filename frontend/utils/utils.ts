import { localStorageKeys } from "../src/constants.js";
import type { HistoryWords } from "../src/types/types.js";

/**
 * Converts a regular unicode string into base64
 * Used for the voice API
 *
 * @param {string} unicodeString the string to be converted
 * @returns {string} the string converted into base64
 */
export const unicodeToBase64 = (unicodeString: string): string => {
  const encodedArray = new TextEncoder().encode(unicodeString);

  const binaryString = Array.from(encodedArray, (encodedChar) =>
    String.fromCodePoint(encodedChar),
  ).join("");

  return btoa(binaryString);
};

/**
 * Retrieves the words that the user has referenced previously
 *
 * @returns {HistoryWords[]} an array of words that have been referenced
 */
export const retriveHistoryList = (): HistoryWords[] => {
  const historyString = localStorage.getItem(localStorageKeys.WORD_HISTORY);
  if (!historyString) return [];

  try {
    return JSON.parse(historyString);
  } catch (error) {
    return [];
  }
};

/**
 *
 * Stores a new/updated list of words that the user has reference
 *
 * @param {HistoryWords} historyList an array of words that have been referenced
 */
export const storeHistoryList = (historyList: HistoryWords[]) => {
  const historyString = JSON.stringify(historyList);
  localStorage.setItem(localStorageKeys.WORD_HISTORY, historyString);
};
