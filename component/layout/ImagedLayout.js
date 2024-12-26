import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

const ImagedLayout = ({children}) => {
  return (
    <ImageBackground
      source={require('../../assets/image/bg/transpBg.png')}
      style={styles.ImageLayout}>
      {children}
    </ImageBackground>
  );
};

export default ImagedLayout;

const styles = StyleSheet.create({
  ImageLayout: {
    flex: 1,
  },
});
