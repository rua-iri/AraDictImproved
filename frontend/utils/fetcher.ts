import type { WordMeaning, RootMeaning } from "../src/types/types.js";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

async function baseFetcher<T>(requestURL: string): Promise<T[]> {
  try {
    const response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error("Error occurred while making request: ");
    }

    const data = (await response.json()) as { data?: T[] };

    if (!data.data) {
      return [];
    }

    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchWordMeanings(word: string): Promise<WordMeaning[]> {
  const requestURL = `${BASE_API_URL}/word/${word}`;
  return await baseFetcher<WordMeaning>(requestURL);
}

export async function fetchRootMeanings(
  root: string,
  dictionaryName: string,
): Promise<RootMeaning[]> {
  const requestURL = `${BASE_API_URL}/root/${dictionaryName}/${root}`;
  return await baseFetcher<RootMeaning>(requestURL);
}
