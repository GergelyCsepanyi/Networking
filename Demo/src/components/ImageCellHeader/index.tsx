import React from 'react';
import {Image, Text, View} from 'react-native';
import ImageCellHeaderStyles from './styles';
import {Queue} from 'react-native-spacing-system';

export type ImageCellHeaderProps = {
  profileUrl?: string;
  authorName?: string;
};

const ImageCellHeader: React.FC<ImageCellHeaderProps> = (
  props: ImageCellHeaderProps,
) => {
  return (
    <View style={ImageCellHeaderStyles.headerContainerStyle}>
      <Image
        style={ImageCellHeaderStyles.profileImageStyle}
        source={
          props.authorName
            ? {uri: props.profileUrl}
            : require('../../assets/images/profileImagePlaceholder.jpg')
        }
      />
      <Queue size={10} />
      <Text style={ImageCellHeaderStyles.nameTextStyle}>
        {props.authorName ?? 'Incognito'}
      </Text>
    </View>
  );
};

export default ImageCellHeader;
