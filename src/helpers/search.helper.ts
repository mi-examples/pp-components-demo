export type SearchToken = string;

const FULL_MATCH_TOKEN_REGEX = /".*?"/g;

export function getSearchTokens(search: string): SearchToken[] {
  const tokens: SearchToken[] = [];

  let trimmedSearch = search.trim();

  if (trimmedSearch.length === 0) {
    return tokens;
  }

  if (FULL_MATCH_TOKEN_REGEX.test(trimmedSearch)) {
    const fullMatchTokens = trimmedSearch.match(FULL_MATCH_TOKEN_REGEX)!;

    for (const token of fullMatchTokens) {
      tokens.push(token.slice(1, -1));

      trimmedSearch = trimmedSearch.replace(token, ' ');
    }
  }

  tokens.push(
    ...trimmedSearch
      .split(' ')
      .map((token) => token.trim())
      .filter((token) => token.length > 0),
  );

  return tokens;
}

export function searchMatch(search: SearchToken, value: string): boolean {
  return value.toLowerCase().includes(search.toLowerCase());
}

export function searchMatchAll(search: SearchToken[], value: string): boolean {
  return search.some((searchToken) => searchMatch(searchToken, value));
}
