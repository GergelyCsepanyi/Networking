import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import ImageCellHeader, {ImageCellHeaderProps} from '../ImageCellHeader';

export type ImageCellProps = {
  imageUrl?: string;
  headerProps: ImageCellHeaderProps;
};

const screenWidth = Dimensions.get('window').width;
const imageHeight = 300;

const ImageCell: React.FC<ImageCellProps> = (props: ImageCellProps) => {
  return (
    <View>
      {/* <Inset horizontal={20}> */}
      <ImageCellHeader {...props.headerProps} />
      {/* </Inset> */}
      <Image
        style={styles.imageStyle}
        resizeMode="contain"
        source={{uri: props.imageUrl}}
      />
    </View>
  );
};

export default ImageCell;

const styles = StyleSheet.create({
  footerContainerStyle: {
    height: 26,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageStyle: {
    height: imageHeight,
    width: screenWidth,
  },
});
