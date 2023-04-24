import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import LikeButtonStyles from './styles';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onToggleLike: () => void;
  imageId: string;
}

const LikeButton: React.FC<LikeButtonProps> = (props: LikeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onToggleLike();
      }}
      style={LikeButtonStyles.mainContainerStyle}>
      <Image
        source={require('../../assets/images/like.jpeg')}
        style={LikeButtonStyles.imageStyle}
      />
      <Text
        style={[
          LikeButtonStyles.textStyle,
          props.isLiked ? LikeButtonStyles.likedTextStyle : {},
        ]}>
        {props.likesCount}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
