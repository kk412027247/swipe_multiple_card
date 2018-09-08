import React from 'react';
import {View, StyleSheet, Button, LayoutAnimation, NativeModules} from 'react-native';
import Card from './card';


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


class CardGroup extends React.Component{

  state={
    data:[
      {title:'title_1',content:'content_1'},
      {title:'title_2',content:'content_2'},
      {title:'title_3',content:'content_3'},
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

  render(){
    return(
      <View style={styles.container}>
        {
          this.state.data.map((item,index)=>{
            return (
              <Card
                title={item.title}
                content={item.content}
                key={item.title}
                top={index*50}
                left={index*50}
                zIndex={3-index}
                elevation={(3-index)*2}
                // scale={1/(index+1)}
                forward={this.forward}
                backward={this.backward}
              />
            )
          })
        }
        <View style={styles.empty}/>
        <Button
          title={'forward'}
          onPress={this.forward}
        />
        <Button
          title={'backward'}
          onPress={this.backward}
        />
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
