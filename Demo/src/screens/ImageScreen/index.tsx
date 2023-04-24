import React, {useEffect, useState} from 'react';
import {ListRenderItemInfo} from 'react-native/types';
import {Text, View, FlatList} from 'react-native';
import {
  ImageApi,
  ImageApiInterface,
  PhotoDataResponse,
} from '../../services/ImageApi';
import ImageScreenStyles from './styles';
import ImageCell from '../../components/ImageCell';
import {Stack} from 'react-native-spacing-system';
import BackgroundForm from '../../components/BackgroundForm';

type PhotoModel = {
  id: string;
  imageUrl?: string;
  profileImageUrl?: string;
  name?: string;
  isLiked: boolean;
  likesCount: number;
};

export interface ImageScreenState {
  images: Array<PhotoModel>;
  imageApi: ImageApiInterface<PhotoDataResponse>;
}

type LikePhotoFunction = (id: string) => Promise<Response>;

const RenderItem = (props: {
  itemInfo: ListRenderItemInfo<PhotoModel>;
  likePhoto: LikePhotoFunction;
  unlikePhoto: LikePhotoFunction;
}) => {
  const {item} = props.itemInfo;
  const {likePhoto, unlikePhoto} = props;

  console.log('likePhoto:', likePhoto);

  const [isLiked, setIsLiked] = useState(item.isLiked);
  const [likesCount, setLikesCount] = useState(item.likesCount);

  const onToggleLike = () => {
    setIsLiked(currentState => {
      if (currentState) {
        console.log('DISLIKE id: ', item.id);
        setLikesCount(currentLikesState => --currentLikesState);
        unlikePhoto(item.id)
          .then(response => console.log('Successfully disliked:', response))
          .catch(error => console.log('Error during dislike:', error));
      } else {
        console.log('LIKE id: ', item.id);
        setLikesCount(currentLikesState => ++currentLikesState);
        likePhoto(item.id)
          .then(response => console.log('Successfully liked:', response))
          .catch(error =>
            console.log('Error during like:', error, 'likePhoto:', likePhoto),
          );
      }
      return !currentState;
    });
  };

  return (
    <View style={ImageScreenStyles.imageContainerStyle}>
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

const ListEmptyComponent = () => {
  return (
    <View style={ImageScreenStyles.emptyContainerStyle}>
      <Text style={ImageScreenStyles.emptyTextStyle}>No images yet</Text>
    </View>
  );
};

const ItemSeparatorComponent = () => {
  return <Stack size={20} />;
};

const ImageScreen = () => {
  const [images, setImages] = useState([] as PhotoModel[]);
  const [imageApi] = useState(new ImageApi<PhotoDataResponse>());

  useEffect(() => {
    imageApi
      .fetchPhotos()
      .then(values => {
        setImages(
          values.map(value => ({
            id: value.id,
            imageUrl: value.urls?.small,
            isLiked: value.liked_by_user,
            profileImageUrl: value.user?.profile_image?.small,
            name: value.user?.name,
            likesCount: value.likes,
          })),
        );
      })
      .catch(error => console.log('fetch error: ', error));
  }, [imageApi]);

  return (
    <BackgroundForm
      additionalViewStyle={ImageScreenStyles.additionalViewStyle}
      backgroundColor="darkslategrey"
      headerProps={{title: 'Images'}}>
      <FlatList
        keyExtractor={(_, index) => String(index)}
        style={ImageScreenStyles.flatListStyle}
        data={images}
        renderItem={itemInfo => (
          <RenderItem
            itemInfo={itemInfo}
            likePhoto={imageApi.likePhoto}
            unlikePhoto={imageApi.unlikePhoto}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </BackgroundForm>
  );
};

export default ImageScreen;
