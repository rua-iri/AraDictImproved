import type { WordMeaning } from "../src/types/types.js";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

async function baseFetcher(requestURL: string) {
  try {
    const response = await fetch(requestURL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        "Error occurred while making request: " + JSON.stringify(data),
      );
    }

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
  return await baseFetcher(requestURL);
}

export async function fetchRootMeanings(root: string, dictionaryName: string) {
  const requestURL = `${BASE_API_URL}/root/${dictionaryName}/${root}`;

  console.log({ rootData: await baseFetcher(requestURL) });

  return await baseFetcher(requestURL);
}
