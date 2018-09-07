// https://medium.com/@andi.gu.ca/exploring-react-natives-panresponder-and-layoutanimation-dde77e7f4cc9
// https://facebook.github.io/react-native/docs/panresponder.html
// https://facebook.github.io/react-native/docs/animated#event

import React,{Component}from 'react';
import {View, Animated, PanResponder, Dimensions} from 'react-native';
import {Card,CardItem,Body,Text } from 'native-base';


export class SwipableCard extends Component {
  translateX = new Animated.Value(0);
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([
        null,
        {dx: this.translateX}],
      // {listener: (event, gestureState) => console.log(event, gestureState)},
    ),
    onPanResponderRelease: (e, {vx, dx}) => {
      const screenWidth = Dimensions.get("window").width;
      // console.log('vx', vx);
      // console.log('dx', dx);
      if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
        Animated.timing(this.translateX, {
          toValue: dx > 0 ? screenWidth : -screenWidth,
          duration: 200
        }).start(this.props.onDismiss);
      } else {
        Animated.spring(this.translateX, {
          toValue: 0,
          bounciness: 10
        }).start();
      }
    }
  });

  render() {
    const style = {transform: [{translateX: this.translateX}], height: 75};
    return (
      <View>
        <Animated.View
          style={style}
          {...this._panResponder.panHandlers}
        >
          <Card>
            <CardItem>
              <Body>
              <Text>
                {this.props.title}
              </Text>
              </Body>
            </CardItem>
          </Card>
        </Animated.View>
      </View>

    );
  }
}
