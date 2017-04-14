/**
 * Created by hth on 2017/4/12.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid
} from 'react-native';

import NavigationBar from '../../components/NavigationBar'

export default class CustomTabPage extends Component{
    render(){
        return <View style={styles.container}>
            <NavigationBar
                barTitle="自定义标签"
                search={false}
                menu={false}
                right={true}
                rightText="保存"
                left={true}
                backPress={this.backPress.bind(this)}
                rightPress={this.rightPress.bind(this)}
            />
            <Text>CustomTabPage</Text>
        </View>
    }

    backPress=()=>{
        this.props.navigator.pop();
    }
    rightPress=()=>{
        ToastAndroid.show('rightPress', ToastAndroid.SHORT);
    }

}

const styles = StyleSheet.create({
   container:{
       flex:1,
   },
});