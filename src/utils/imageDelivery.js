const CLOUDINARY_UPLOAD = /\/(image|video)\/upload\//i;
const RESPONSIVE_WIDTHS = [48, 96, 160, 240, 320, 480, 640, 768, 960, 1200, 1600, 2000];
const URL_BASE = typeof window === 'undefined' ? 'https://www.flavourholidays.com' : window.location.origin;

const addCloudinaryTransform = (source, transform) => {
  try {
    const url = new URL(source, URL_BASE);
    const match = url.pathname.match(CLOUDINARY_UPLOAD);
    if (!match) return source;

    const uploadIndex = url.pathname.indexOf(match[0]) + match[0].length;
    const tail = url.pathname.slice(uploadIndex);
    const versionIndex = tail.search(/\/v\d+\//);
    const insertAt = versionIndex >= 0 ? uploadIndex + versionIndex + 1 : uploadIndex;
    url.pathname = `${url.pathname.slice(0, insertAt)}${transform}/${url.pathname.slice(insertAt)}`;
    return url.toString();
  } catch {
    return source;
  }
};

const resizeExternalImage = (source, width) => {
  try {
    const url = new URL(source, URL_BASE);
    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.set('auto', 'format');
      url.searchParams.set('q', '75');
      url.searchParams.set('w', String(width));
      return url.toString();
    }
    if (url.hostname === 'images.pexels.com') {
      url.searchParams.set('auto', 'compress');
      url.searchParams.set('cs', 'tinysrgb');
      url.searchParams.set('w', String(width));
      return url.toString();
    }
    return source;
  } catch {
    return source;
  }
};

export const isCloudinaryImage = (source = '') => CLOUDINARY_UPLOAD.test(source);

export const getOptimizedImageUrl = (source, width = 1200) => {
  if (!source) return '';
  if (isCloudinaryImage(source)) {
    return addCloudinaryTransform(source, `f_auto,q_auto,w_${width},c_limit`);
  }
  return resizeExternalImage(source, width);
};

export const getResponsiveImageProps = (source, sizes = '100vw') => {
  if (!source) return {};
  const isResponsiveHost = isCloudinaryImage(source)
    || /images\.(unsplash|pexels)\.com/i.test(source);
  if (!isResponsiveHost) return { src: source };

  return {
    src: getOptimizedImageUrl(source, 1200),
    srcSet: RESPONSIVE_WIDTHS.map((width) => `${getOptimizedImageUrl(source, width)} ${width}w`).join(', '),
    sizes,
  };
};

export const getBlurPreviewUrl = (source) => {
  if (isCloudinaryImage(source)) {
    return addCloudinaryTransform(source, 'f_auto,q_10,w_40,e_blur:1000,c_limit');
  }
  if (/images\.unsplash\.com/i.test(source)) return resizeExternalImage(source, 40);
  return '';
};

export const IMAGE_FALLBACK = '/image-fallback.svg';
