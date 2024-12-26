import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import MainHeader from '../TabScreenComponents/MainHeader';

const ScrollLayout = ({children, title}) => {
  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={title} />
      <ScrollView>{children}</ScrollView>
      {/* <View style={{height: 100}}></View> */}
    </SafeAreaView>
  );
};

export default ScrollLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16001E',
    padding: 16,
  },
});
