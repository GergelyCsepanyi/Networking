import React from 'react';
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

class ImageScreen extends React.Component<{}, ImageScreenState> {
  state = {
    images: [] as PhotoModel[],
    imageApi: new ImageApi<PhotoDataResponse>(),
  };

  renderItem = (itemInfo: ListRenderItemInfo<PhotoModel>) => {
    const {item} = itemInfo;
    return (
      <View style={ImageScreenStyles.imageContainerStyle}>
        <ImageCell
          imageUrl={item.imageUrl}
          headerProps={{
            authorName: item.name,
            profileUrl: item.profileImageUrl,
          }}
        />
      </View>
    );
  };

  ListEmptyComponent = () => {
    return (
      <View style={ImageScreenStyles.emptyContainerStyle}>
        <Text style={ImageScreenStyles.emptyTextStyle}>No images yet</Text>
      </View>
    );
  };

  ItemSeparatorComponent = () => {
    return <Stack size={20} />;
  };

  componentDidMount() {
    this.state.imageApi
      .fetchPhotos()
      .then(values => {
        this.setState({
          images: values.map(value => ({
            id: value.id,
            imageUrl: value.urls?.small,
            isLiked: value.liked_by_user,
            profileImageUrl: value.user?.profile_image?.small,
            name: value.user?.name,
            likesCount: value.likes,
          })),
        });
      })
      .catch(error => console.log('fetch error: ', error));
  }

  render() {
    return (
      <BackgroundForm
        additionalViewStyle={ImageScreenStyles.additionalViewStyle}
        backgroundColor="darkslategrey"
        headerProps={{title: 'Images'}}>
        <FlatList
          keyExtractor={(_, index) => String(index)}
          style={ImageScreenStyles.flatListStyle}
          data={this.state.images}
          renderItem={this.renderItem}
          ListEmptyComponent={this.ListEmptyComponent}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
        />
      </BackgroundForm>
    );
  }
}

export default ImageScreen;
