import React from 'react';
import {Text, StyleSheet, Animated, PanResponder, Dimensions, Platform} from 'react-native';


export default class Card extends React.Component{
  
  translateX = new Animated.Value(0);

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => Platform.OS === 'ios' ? this.props.zIndex ===3 : this.props.zIndex === 1,
    onMoveShouldSetPanResponderCapture: () => Platform.OS === 'ios' ? this.props.zIndex ===3 : this.props.zIndex === 1,
    onPanResponderMove: Animated.event([null,{dx: this.translateX}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      const screenWidth = Dimensions.get("window").width;
      if (vx >= 0.5 || dx >= 0.5 * screenWidth) {
        this.props.forward();
        Animated.timing(this.translateX, {
          toValue: 0,
          duration: 200
        }).start();
      } else if(vx <= -0.5 || dx <= -0.5 * screenWidth){
        this.props.backward();
        Animated.timing(this.translateX, {
          toValue: 0,
          duration: 200
        }).start();
      } else {
        Animated.spring(this.translateX, {
          toValue: 0,
          bounciness: 10
        }).start();
      }
    }
  });


  render(){
    const {title,content, top, left, zIndex, elevation, backgroundColor,scale} = this.props;
    const _style = [
      styles.container, {
        top,
        left,
        zIndex,
        elevation,
        backgroundColor,
        transform:[
          // {scale:scale},
          {translateX: this.translateX}
        ]
      }
    ];
    return(
      <Animated.View
        style={_style}
        {...this._panResponder.panHandlers}
      >
        <Text style={styles.title}>{title}</Text>
        <Text>{content}</Text>
      </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    width:200,
    height:200,
    alignItems:'center',
    justifyContent:'space-around',
    position:'absolute',
    shadowOffset:{width:2, height:2} ,
    shadowOpacity:.5,
    shadowRadius:2,
  },
  title:{
    fontSize:30,
  }
});
