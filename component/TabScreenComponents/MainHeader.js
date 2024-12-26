import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';

const MainHeader = ({title}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert('Navigation', "You're already on the main screen", [
        {
          text: 'OK',
          style: 'default',
        },
      ]);
    }
  };

  const handleStatisticScreen = () => {
    navigation.navigate('StackStatisticsScreen');
  };

  const handleUserScreen = () => {
    navigation.navigate('StackUserScreen');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton}
      //  onPress={handleBack}
      onPress={handleUserScreen}
       >
        <AntDesign name="user" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleStatisticScreen}>
        <Octicons name="graph" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconButton: {
    borderRadius: 50,
    backgroundColor: '#6F4D7B50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6F4D7B50',
    marginHorizontal: 30,
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
