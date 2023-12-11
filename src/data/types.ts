// data/types.ts
export interface ImageType {
  id: string;
  category: string;
  title: string;
  url: string;
  views?: number;
  downloads?: number;
  published?: string;
  camera?: string;
  imageUrl?: string;
  image?: string;
  open?: boolean;
  onClose?: () => void;
  nextImage?: () => void;
  prevImage?: () => void;
}

export interface PopupImageDetailProps {
  imageUrl: string;
  title: string;
  open: boolean;
  onClose: () => void;
  nextImage: () => void;
  prevImage: () => void;
}

export interface ImageData {
  id: string;
  title: string;
  published?: string;
}

export interface PopupImageDetailProps {
  image: ImageType;
  open: boolean;
  onClose: () => void;
}
