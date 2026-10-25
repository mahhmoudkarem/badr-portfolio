export interface Video {
  id: string;
  name: string;
  youtubeId?: string;
  videoSrc?: string;
  thumbnailFrame?: "0" | "1" | "2" | "3";
  customThumbnail?: string;
}

export interface Section {
  id: number;
  title: string;
  category: string;
  description: string;
  coverVideo: string;
  videos: Video[];
}

export const socialLinks = {
  whatsapp: "https://wa.me/201124475228",
  instagram: "https://www.instagram.com/badrfared.ph",
  tiktok: "https://www.tiktok.com/@badrfared.photoog",
  facebook: "https://www.facebook.com/share/19CcEqPjbh/?mibextid=wwXIfr",
};

export const sections: Section[] = [
  {
    id: 1,
    title: "Drone",
    category: "Aerial Cinematography",
    description: "Breathtaking drone footage that captures cars and landscapes from above.",
    coverVideo: "ubG4XRRRNpY",
    videos: [
      { id: "1", name: "alraqi-cars-drons", youtubeId: "ubG4XRRRNpY" },
      {
        id: "2",
        name: "IMG_4804",
        youtubeId: "C7fVF3xP7kw",
        customThumbnail: "/ramadan-thumb.jpg",
      },
            { id: "6", name: "IMG_1013", youtubeId: "s2iWSCyzgBg" },

    ],
  },
  {
    id: 2,
    title: "Automotive",
    category: "AI Cinematic Films",
    description: "AI-powered cinematic automotive films that push the boundaries of visual storytelling.",
    coverVideo: "rndWtRTcsK4",
    videos: [
      { id: "1", name: "IMG_0233", youtubeId: "rndWtRTcsK4" },
      { id: "2", name: "IMG_0238", youtubeId: "LPWCkpb23p0" },
      { id: "3", name: "IMG_4039", youtubeId: "SElAGcdS3iw" },
      { id: "5", name: "IMG_5852", youtubeId: "Xp3OQulpCNQ" },
      { id: "7", name: "Automotive-1", youtubeId: "fIJnQ8krTIk" },
      { id: "8", name: "Automotive-2", youtubeId: "wFtgrJ9BYZI" },
      { id: "9", name: "Automotive-3", youtubeId: "Kfb6tWwGqM4" },
    ],
  },
  {
    id: 3,
    title: "On-Camera",
    category: "My Content",
    description: "Personal on-camera content showcasing versatility in front of the lens.",
    coverVideo: "GJ4gOBvrWMg",
    videos: [
      { id: "1", name: "IMG_0173", youtubeId: "GJ4gOBvrWMg" },
      { id: "2", name: "IMG_0519", youtubeId: "EEMTqLqpPGM" },
      { id: "3", name: "IMG_5887", youtubeId: "rOW8ab_GFJI" },
    ],
  },
  {
    id: 4,
    title: "Food & Beverage",
    category: "Cinematic Food Films",
    description: "Mouth-watering cinematic food films that bring flavors to life through the lens.",
    coverVideo: "s18sVukqsJk",
    videos: [
      { id: "1", name: "IMG_0828", youtubeId: "s18sVukqsJk" },
      { id: "2", name: "IMG_5888", youtubeId: "DDNR0BqU2RU" },
      { id: "3", name: "IMG_1010", youtubeId: "-e6zcZTB8O4" },
    ],
  },
  {
    id: 5,
    title: "Shoes",
    category: "Speed Ramp Commercial",
    description: "Dynamic speed ramp commercials for footwear brands, capturing motion and energy.",
    coverVideo: "Cn0Zy887gt4",
    videos: [
      { id: "1", name: "IMG_6823", youtubeId: "Cn0Zy887gt4" },
      { id: "2", name: "Shoes-2", youtubeId: "JBPt_5zYSZQ" },
            { id: "3", name: "IMG_1011", youtubeId: "RK7p70AbVpk" },
      { id: "4", name: "IMG_1012", youtubeId: "NRlSBhJqZbQ" },
    ],
  },
  {
    id: 6,
    title: "Food & Retail",
    category: "Supermarket",
    description: "Commercial supermarket productions capturing the essence of everyday retail.",
    coverVideo: "uyc5l2p-yFM",
    videos: [
      { id: "1", name: "IMG_5912", youtubeId: "uyc5l2p-yFM" },
    ],
  },
  {
    id: 7,
    title: "Events",
    category: "School Graduation",
    description: "Capturing the magic of milestone moments through cinematic event coverage.",
    coverVideo: "EGI3FPR3exU",
    videos: [
      { id: "1", name: "IMG_5911", youtubeId: "EGI3FPR3exU" },
    ],
  },
  {
    id: 8,
    title: "Fashion",
    category: "Studio Campaigns",
    description: "High-end fashion studio campaigns that define trends and elevate brands.",
    coverVideo: "huqRm7bHrfo",
    videos: [
      { id: "1", name: "IMG_0234", youtubeId: "huqRm7bHrfo" },
      { id: "2", name: "IMG_9455", youtubeId: "UxV7NHlddqI" },

    ],
  },
  {
    id: 9,
    title: "Interior Design",
    category: "AI Before & After",
    description: "Stunning AI-driven before and after transformations for interior design projects.",
    coverVideo: "wcj8TjtkZMo",
    videos: [
      { id: "1", name: "IMG_0216", youtubeId: "wcj8TjtkZMo" },
      { id: "2", name: "Interior Design-1", youtubeId: "5UvNlBKaNSM" },
      { id: "3", name: "Interior Design-2", youtubeId: "xfpJDt14k4Q" },
    ],
  },
];

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&fs=0&playsinline=1&disablekb=1&loop=1&playlist=${youtubeId}`;
}

export function getVideoThumbnailUrl(
  youtubeId: string,
  quality: "maxresdefault" | "hqdefault" | "0" | "1" | "2" | "3" = "maxresdefault"
): string {
  return `https://i.ytimg.com/vi/${youtubeId}/${quality}.jpg`;
}