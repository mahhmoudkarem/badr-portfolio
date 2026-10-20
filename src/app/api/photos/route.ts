import { NextResponse } from "next/server";
import { photoSets, getPhotoThumbUrl, getPhotoFullUrl } from "@/data/photos";

export async function GET() {
  const sets = photoSets.map((set) => ({
    id: set.id,
    name: set.name,
    photos: set.photos.map((photo) => ({
      id: photo.id,
      thumb: getPhotoThumbUrl(set.id, photo.id),
      full: getPhotoFullUrl(set.id, photo.id),
    })),
  }));

  return NextResponse.json(
    { sets },
    {
      headers: {
        "Cache-Control": "public, max-age=600, s-maxage=600, stale-while-revalidate=3600",
      },
    }
  );
}
