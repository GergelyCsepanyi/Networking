import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  ImageApi,
  ImageApiInterface,
  PhotoDataResponse,
} from '../../services/ImageApi';
import styles from './styles';
import {Stack} from 'react-native-spacing-system';
import BackgroundForm from '../../components/BackgroundForm';
import RenderItem from '../../components/RenderItem';

export type PhotoModel = {
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

const ListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainerStyle}>
      <Text style={styles.emptyTextStyle}>No images yet</Text>
    </View>
  );
};

const ItemSeparatorComponent = () => {
  return <Stack size={20} />;
};

const ImageScreen = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [images, setImages] = useState([] as PhotoModel[]);
  const [imageApi] = useState(new ImageApi<PhotoDataResponse>());
  const [currentPage, setCurrentPage] = useState(1);

  const loadPhotos = useCallback(
    (page: number = 1) => {
      imageApi
        .fetchPhotos(page)
        .then(values => {
          setImages(formatToPhotoModelArray(values));
          setRefreshing(false);
          setCurrentPage(1);
        })
        .catch(error => console.log('fetch error: ', error));
    },
    [imageApi],
  );

  useEffect(() => {
    loadPhotos();
  }, [imageApi, loadPhotos]);

  const formatToPhotoModelArray = (
    values: PhotoDataResponse[],
  ): PhotoModel[] => {
    return values.map(value => ({
      id: value.id,
      imageUrl: value.urls?.small,
      isLiked: value.liked_by_user,
      profileImageUrl: value.user?.profile_image?.small,
      name: value.user?.name,
      likesCount: value.likes,
    }));
  };

  const fetchMore = () => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);

    const nextPage = currentPage + 1;

    imageApi.fetchPhotos(nextPage).then(values => {
      const newData = formatToPhotoModelArray(values);

      setCurrentPage(nextPage);
      setRefreshing(false);
      setImages(currentData => [...currentData, ...newData]);
    });
  };

  return (
    <BackgroundForm
      additionalViewStyle={styles.additionalViewStyle}
      backgroundColor="darkslategrey"
      headerProps={{title: 'Images'}}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        keyExtractor={(_, index) => String(index)}
        style={styles.flatListStyle}
        data={images}
        renderItem={itemInfo => (
          <RenderItem itemInfo={itemInfo} imageApi={imageApi} images={images} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadPhotos} />
        }
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
      />
    </BackgroundForm>
  );
};

export default ImageScreen;
