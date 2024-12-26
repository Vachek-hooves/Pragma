import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';

const StackLayout = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollLayout}>
        {children}
      </ScrollView>
      {/* <View style={{height: 100}}></View> */}
    </SafeAreaView>
  );
};

export default StackLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16001E',
    padding: 16,
    // alignItems: 'center',
  },
  scrollLayout: {
    flex: 1,
    backgroundColor: '#16001E',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
