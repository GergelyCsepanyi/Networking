import {StyleSheet} from 'react-native';

const ImageScreenStyles = StyleSheet.create({
  additionalViewStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 0,
    paddingTop: 30,
    paddingBottom: 50,
  },
  flatListStyle: {
    flex: 1,
    width: '100%',
  },
  imageContainerStyle: {
    width: '100%',
  },
  emptyContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ImageScreenStyles;
