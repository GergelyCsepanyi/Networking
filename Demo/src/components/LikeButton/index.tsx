import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import LikeButtonStyles from './styles';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = (props: LikeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => console.log('LIKE')}
      style={LikeButtonStyles.mainContainerStyle}>
      <Image
        source={require('../../assets/images/like.jpeg')}
        style={LikeButtonStyles.imageStyle}
      />
      <Text style={LikeButtonStyles.textStyle}>{props.likesCount}</Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
