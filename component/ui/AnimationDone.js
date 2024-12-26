import LottieView from 'lottie-react-native';

const AnimationDone = () => {
  return (
    <LottieView
      source={require('../../assets/animations/done.json')}
      style={{width: '100%', height: '100%'}}
      autoPlay={true}
      loop={true}
      speed={1.2}
    />
  );
};

export default AnimationDone;


