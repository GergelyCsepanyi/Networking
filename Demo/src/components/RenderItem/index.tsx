import React, {useEffect, useState} from 'react';
import {ListRenderItemInfo} from 'react-native/types';
import {View} from 'react-native';
import {PhotoModel} from '../../screens/ImageScreen';
import {ImageApi, PhotoDataResponse} from '../../services/ImageApi';
import ImageCell from '../ImageCell';
import styles from './styles';

const RenderItem = (props: {
  itemInfo: ListRenderItemInfo<PhotoModel>;
  imageApi: ImageApi<PhotoDataResponse>;
  images: PhotoModel[];
}) => {
  const {item} = props.itemInfo;
  const {imageApi, images} = props;

  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likesCount);

  useEffect(() => {
    setIsLiked(item.isLiked);
    setLikesCount(item.likesCount);
  }, [images, item.isLiked, item.likesCount]);

  const onToggleLike = () => {
    setIsLiked(currentState => {
      if (currentState) {
        setLikesCount(currentLikesState => --currentLikesState);
        imageApi
          .unlikePhoto(item.id)
          .then(response => console.log('Successfully disliked:', response))
          .catch(error => console.log('Error during dislike:', error));
      } else {
        setLikesCount(currentLikesState => ++currentLikesState);
        imageApi
          .likePhoto(item.id)
          .then(response => console.log('Successfully liked:', response))
          .catch(error => console.log('Error during like:', error));
      }
      return !currentState;
    });
  };

  return (
    <View style={styles.imageContainerStyle}>
      <ImageCell
        imageUrl={item.imageUrl}
        headerProps={{
          authorName: item.name,
          profileUrl: item.profileImageUrl,
        }}
        footerProps={{
          isLiked,
          likesCount,
          onToggleLike,
          imageId: item.id,
        }}
      />
    </View>
  );
};

export default RenderItem;
