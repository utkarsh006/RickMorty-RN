import { Character, Episode } from '@/types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch(`${BASE_URL}/character`);
  if (!res.ok) throw new Error('Failed to fetch characters');
  const data = await res.json();
  return data?.results ?? [];
}

export async function fetchCharacterById(id: string | number): Promise<Character> {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  if (!res.ok) throw new Error('Failed to fetch character');
  return res.json();
}

export async function fetchEpisodesByUrls(urls: string[]): Promise<Episode[]> {
  if (!urls.length) return [];
  const idsCsv = urls
    .map((url) => url.split('/').pop() || '')
    .filter(Boolean)
    .join(',');
  const res = await fetch(`${BASE_URL}/episode/${idsCsv}`);
  if (!res.ok) throw new Error('Failed to fetch episodes');
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
} 