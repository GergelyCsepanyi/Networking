import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Images from '../../assets/images/Images';

interface LikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onToggleLike: () => void;
  imageId: string;
}

const LikeButton: React.FC<LikeButtonProps> = (props: LikeButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onToggleLike}
      style={styles.mainContainerStyle}>
      <Image source={Images.like} style={styles.imageStyle} />
      <Text
        style={[styles.textStyle, props.isLiked ? styles.likedTextStyle : {}]}>
        {props.likesCount}
      </Text>
    </TouchableOpacity>
  );
};

export default LikeButton;
