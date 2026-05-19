import { useEffect } from 'react';

type SEOOptions = {
  title: string;
  description?: string;
  canonical?: string;
};

export function useSEO({ title, description, canonical }: SEOOptions) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    if (description) metaDesc.content = description;

    let metaOGTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!metaOGTitle) {
      metaOGTitle = document.createElement('meta');
      metaOGTitle.setAttribute('property', 'og:title');
      document.head.appendChild(metaOGTitle);
    }
    metaOGTitle.content = title;

    let metaOGDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!metaOGDesc) {
      metaOGDesc = document.createElement('meta');
      metaOGDesc.setAttribute('property', 'og:description');
      document.head.appendChild(metaOGDesc);
    }
    if (description) metaOGDesc.content = description;

    let linkCanonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    if (canonical) {
      linkCanonical.href = canonical;
    }
  }, [title, description, canonical]);
}
