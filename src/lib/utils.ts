import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYoutubeThumbnail(youtubeId: string) {
  // Use maxresdefault for high quality, fallback to hqdefault
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}
