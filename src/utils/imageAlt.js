const PEXELS_PHOTOGRAPHERS = {
  '31029367': 'Vikash Singh',
  '33965719': 'Dhaval S M',
  '37835745': 'Harsh Kukadiya',
  '31029368': 'Vikash Singh'
};

export const getImageAltWithCredit = (alt, src) => {
  const photoId = String(src || '').match(/pexels\.com\/photos\/(\d+)/)?.[1];
  const photographer = PEXELS_PHOTOGRAPHERS[photoId];

  return photographer ? `${alt}, photo by ${photographer} on Pexels` : alt;
};
