export type PageData = {
	reviews: {
		comment: string;
		customerName: string;
		carMake: string;
	}[];
};

export type Section = {
  id: string;
  title: string;
  subTitle: string;
  tagline: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  image: string | null;
  sectionName: string;
}

export type Service = {
  id: string;
  title: string;
  imageUrl: string | null;
}


export type Gallery = {
  id: string;
  imageUrl: string | null;
}

export type Settings = {
  id: string;
  phoneNumber: string;
  email: string;
  address: string;
  facebookLink: string;
  instagramLink: string;
}

export interface SectionState extends Omit<Section, 'image'> {
  image: File | string | null;
}

export interface ServiceState extends Omit<Service, 'imageUrl'> {
  imageUrl: File | string | null;
  previewSrc: string | null;
}

export interface GalleryState extends Omit<Gallery, 'imageUrl'> {
  imageUrl: File | string | null;
  previewSrc: string | null;
}

