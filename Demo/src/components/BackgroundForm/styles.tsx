import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  titleContainerStyle: {
    paddingBottom: 10,
  },
  titleStyle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  childrenContainerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 0,
    paddingTop: 30,
    paddingBottom: 50,
  },
});

export default styles;
