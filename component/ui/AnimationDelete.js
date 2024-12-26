import LottieView from 'lottie-react-native';

const AnimationDelete = () => {
  return (
    <LottieView
      source={require('../../assets/animations/deleteTrash.json')}
      style={{width: 302, height: 200}}
      autoPlay={true}
      loop={true}
    />
  );
};

export default AnimationDelete;


