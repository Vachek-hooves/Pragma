import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/image/logo/PragmaLogo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    // marginTop: 5,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: '50%',
    overflow: 'hidden',
  },
});
