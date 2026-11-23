import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  getBlurPreviewUrl,
  getOptimizedImageUrl,
  getResponsiveImageProps,
  IMAGE_FALLBACK,
  isCloudinaryImage,
} from '../utils/imageDelivery';

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  sizes = '100vw',
  priority = false,
  fallback = IMAGE_FALLBACK,
  onLoad,
  onError,
  ...imageProps
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [nearViewport, setNearViewport] = useState(priority);
  const imageRef = useRef(null);
  const activeSource = failed ? fallback : src;
  const responsiveProps = useMemo(
    () => getResponsiveImageProps(activeSource, sizes),
    [activeSource, sizes]
  );
  const blurPreview = nearViewport && !failed ? getBlurPreviewUrl(src) : '';
  const style = {
    ...(imageProps.style || {}),
    ...(blurPreview ? { '--image-preview': `url("${blurPreview.replaceAll('"', '%22')}")` } : {}),
  };

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    if (priority || nearViewport || !imageRef.current) return undefined;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNearViewport(true);
      observer.disconnect();
    }, { rootMargin: '240px' });
    observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, [nearViewport, priority]);

  const handleLoad = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  const handleError = (event) => {
    onError?.(event);
    setLoaded(false);
    setFailed(true);
  };

  return (
    <img
      {...imageProps}
      {...responsiveProps}
      ref={imageRef}
      src={getOptimizedImageUrl(activeSource)}
      alt={alt}
      width={imageProps.width ?? 1200}
      height={imageProps.height ?? 800}
      className={`optimized-image${loaded ? ' is-loaded' : ''}${failed ? ' is-fallback' : ''}${className ? ` ${className}` : ''}`}
      style={style}
      loading={priority ? 'eager' : (imageProps.loading || 'lazy')}
      fetchPriority={priority ? 'high' : (imageProps.fetchPriority || 'auto')}
      decoding={priority ? 'sync' : (imageProps.decoding || 'async')}
      onLoad={handleLoad}
      onError={failed ? undefined : handleError}
      data-cloudinary={isCloudinaryImage(src) ? 'true' : undefined}
    />
  );
};

export default OptimizedImage;
