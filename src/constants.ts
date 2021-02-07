const googleKey = import.meta.env.VITE_GOOGLE_KEY;

export const CLOUDVISION =
  'https://vision.googleapis.com/v1/images:annotate?key=' + googleKey;
export const TRANSLATE =
  'https://www.googleapis.com/language/translate/v2?key=' + googleKey;

export const MAX_CLOUDVISION_RESULTS = 5;
