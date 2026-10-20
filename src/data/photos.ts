export interface Photo {
  id: string;
}

export interface PhotoSet {
  id: string;
  name: string;
  photos: Photo[];
}

export const photoSets: PhotoSet[] = [
  {
    id: "set1",
    name: "Set 01",
    photos: Array.from({ length: 17 }, (_, i) => ({ id: String(i + 1) })),
  },
  {
    id: "set2",
    name: "Set 02",
    photos: Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1) })),
  },
  {
    id: "set3",
    name: "Set 03",
    photos: Array.from({ length: 9 }, (_, i) => ({ id: String(i + 1) })),
  },
];

export function getPhotoThumbUrl(setId: string, photoId: string): string {
  return `/photos/${setId}-${photoId.padStart(2, "0")}.jpg`;
}

export function getPhotoFullUrl(setId: string, photoId: string): string {
  return `/photos/${setId}-${photoId.padStart(2, "0")}-full.jpg`;
}
