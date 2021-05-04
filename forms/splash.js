import { connect, React } from "react";
const Splashscreen = (props) => {
  const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] = React.useState(
    false
  );

  // We only want to hide the Splash Screen after it has played at least once
  const handleAnimationFinish = () => {
    setHasAnimationPlayedOnce(true);
  };

  const isModalVisible = !(props.isAppInitialized && hasAnimationPlayedOnce);

  return (
    <Modal visible={isModalVisible} animationType="fade">
      <LottieView
        source={animatedLogo}
        loop={false}
        autoPlay
        onAnimationFinish={handleAnimationFinish}
      />
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isAppInitialized: appInitSelectors.isAppInitialized(state),
});

export default connect(mapStateToProps)(Splashscreen);
