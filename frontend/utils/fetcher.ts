import type { WordMeaning } from "../src/types/types.js";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export async function fetchWordMeanings(word: string): Promise<WordMeaning[]> {
  try {
    const response = await fetch(`${BASE_API_URL}/word/${word}`);
    const data = await response.json();

    if (!data.data) {
      return [];
    }

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchRootMeanings(root: string, dictionaryName: string) {
  try {
    const response = await fetch(
      `${BASE_API_URL}/root/${dictionaryName}/${root}`,
    );
    const data = await response.json();

    if (!data.data) {
      return [];
    }

    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
