import React from 'react';
import {View, StyleSheet, Button, LayoutAnimation, NativeModules, Platform} from 'react-native';
import Card from './card';


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


class CardGroup extends React.Component{

  state={
    data:[
      {title:'title_1',content:'content_1',backgroundColor:'#ff81cc'},
      {title:'title_2',content:'content_2',backgroundColor:'#bcffa9'},
      {title:'title_3',content:'content_3',backgroundColor:'#a899ff'},
    ]
  } ;

  forward = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      data:this.state.data.reduce((pre,cur,index,arr)=>{
        if(index === 0){
          pre[arr.length - 1] = cur;

        }else {
          pre[index - 1] = cur;
        }
        return pre;
      },[])
    })
  };

  backward = () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      data:this.state.data.reduce((pre,cur,index,arr)=>{
        if(index === arr.length - 1){
          pre[0] = cur;
        }else {
          pre[index + 1] = cur;
        }
        return pre;
      },[])
    })
  };

  // componentDidUpdate(){
  //   console.log(this.state.data)
  // }

  componentWillMount(){
    if(Platform.OS === 'android'){
      this.setState({data: this.state.data.reverse()})
    }
    
  }

  render(){
    return(
      <View style={styles.container}>
        {
          this.state.data.map((item,index, arr)=>{
            return (
              <Card
                title={item.title}
                content={item.content}
                key={item.title}
                top={Platform.OS === 'ios' ? index*50 : (arr.length - index -1) * 50  }
                left={Platform.OS === 'ios' ?index*50 : (arr.length - index -1) * 50 }
                zIndex={3-index}
                elevation={index*2}
                // scale={1/(index+1)}
                forward={Platform.OS === 'ios' ? this.forward : this.backward}
                backward={Platform.OS === 'ios' ? this.backward : this.forward}
                backgroundColor={item.backgroundColor}
              />
            )
          })
        }
        <View style={styles.empty}/>
        
      </View>
    )
  }
}

export default CardGroup;

const styles = StyleSheet.create({
  container:{
    height:400,
    marginTop:'50%',
    marginLeft:'10%'
  },
  empty:{
    height:350
  }
});
