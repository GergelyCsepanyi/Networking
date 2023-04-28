import React from 'react';
import {Image, View, useWindowDimensions} from 'react-native';
import ImageCellHeader, {ImageCellHeaderProps} from '../ImageCellHeader';
import ImageCellFooter, {ImageCellFooterProps} from '../ImageCellFooter';
import styles from './styles';

export type ImageCellProps = {
  headerProps: ImageCellHeaderProps;
  footerProps: ImageCellFooterProps;
  imageUrl?: string;
};

const ImageCell: React.FC<ImageCellProps> = (props: ImageCellProps) => {
  const screenWidth = useWindowDimensions().width;
  const imageHeight = 300;

  return (
    <View>
      <ImageCellHeader {...props.headerProps} />
      <Image
        style={[styles.imageStyle, {height: imageHeight, width: screenWidth}]}
        resizeMode="contain"
        source={{uri: props.imageUrl}}
      />
      <ImageCellFooter {...props.footerProps} />
    </View>
  );
};

export default ImageCell;
