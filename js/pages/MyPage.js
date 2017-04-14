/**
 * Created by hth on 2017/4/12.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Image,
    RefreshControl
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import CustomTabPage from './mine/CustomTabPage'

export default class MyPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar barTitle={this.props.pageTitle}/>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.preferenceSettingStyle}
                onPress={this.startCustomPage.bind(this)}>
                <Text style={styles.preferenceSettingTextStyle}>自定义标签</Text>
            </TouchableOpacity>
        </View>
    }
    startCustomPage=()=>{
        this.props.navigator.push({
            passProp:{
                navigator:this.props.navigator,
            },
            component:CustomTabPage
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    preferenceSettingStyle:{
        borderTopWidth:1,
        borderBottomWidth:1,
        height:50,
        borderColor:'red',
        justifyContent:'center',
        alignItems:'flex-start',
        margin:10,
    },
    preferenceSettingTextStyle:{
        fontSize:20,
        marginLeft:10
    },
});