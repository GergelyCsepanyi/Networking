import {StyleSheet} from 'react-native';

const LikeButtonStyles = StyleSheet.create({
  mainContainerStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    width: '10%',
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: '400',
  },
  likedTextStyle: {
    fontWeight: 'bold',
  },
});

export default LikeButtonStyles;
