export function unicodeToBase64(unicodeString: string): string {
  const encodedArray = new TextEncoder().encode(unicodeString);

  const binaryString = Array.from(encodedArray, (encodedChar) =>
    String.fromCodePoint(encodedChar),
  ).join("");

  return btoa(binaryString);
}
