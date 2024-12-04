export interface SectionConfig {
  showSubTitle: boolean;
  showTagline: boolean;
  showContent: boolean;
  showButton: boolean;
  showImage: boolean;
}

export const sectionConfigs: Record<string, SectionConfig> = {
  hero: {
    showSubTitle: false,
    showTagline: false,
    showContent: true,
    showButton: true,
    showImage: false,
  },
  services: {
    showSubTitle: true,
    showTagline: true,
    showContent: true,
    showButton: true,
    showImage: true,
  },
  about: {
    showSubTitle: true,
    showTagline: false,
    showContent: true,
    showButton: false,
    showImage: true,
  },
  contact: {
    showSubTitle: false,
    showTagline: false,
    showContent: true,
    showButton: false,
    showImage: false,
  },
  testimonials: {
    showSubTitle: false,
    showTagline: false,
    showContent: false,
    showButton: false,
    showImage: true,
  },
  outro: {
    showSubTitle: false,
    showTagline: false,
    showContent: false,
    showButton: true,
    showImage: false,
  },
  gallery: {
    showSubTitle: false,
    showTagline: false,
    showContent: false,
    showButton: false,
    showImage: false,
  },
};

export function getSectionConfig(sectionName: string): SectionConfig {
  return sectionConfigs[sectionName] || {
    showSubTitle: false,
    showTagline: false,
    showContent: false,
    showButton: false,
    showImage: false,
  };
}

