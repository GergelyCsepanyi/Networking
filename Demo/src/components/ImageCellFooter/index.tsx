import React from 'react';
import LikeButton from '../LikeButton';

export type ImageCellFooterProps = {
  isLiked: boolean;
  likesCount: number;
  onToggleLike: () => void;
  imageId: string;
};

const ImageCellFooter: React.FC<ImageCellFooterProps> = (
  props: ImageCellFooterProps,
) => {
  return <LikeButton {...props} />;
};

export default ImageCellFooter;
