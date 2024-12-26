import LottieView from 'lottie-react-native';

const AnimationStatistics = () => {
  return (
    <LottieView
      source={require('../../assets/animations/graph.json')}
      style={{width: 302, height: 200, alignSelf: 'center'}}
      autoPlay={true}
      loop={true}
      speed={0.6}
    />
  );
};

export default AnimationStatistics;
