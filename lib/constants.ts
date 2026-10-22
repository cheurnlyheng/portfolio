export const MAX_IMAGES_PER_PROJECT = 5;
export const MAX_HERO_SLIDES = 6;

export const COVER_POSITIONS = [
  { value: "left top", label: "Top Left" },
  { value: "center top", label: "Top Center" },
  { value: "right top", label: "Top Right" },
  { value: "left center", label: "Middle Left" },
  { value: "center center", label: "Center" },
  { value: "right center", label: "Middle Right" },
  { value: "left bottom", label: "Bottom Left" },
  { value: "center bottom", label: "Bottom Center" },
  { value: "right bottom", label: "Bottom Right" },
] as const;

export const DEFAULT_COVER_POSITION = "center top";
