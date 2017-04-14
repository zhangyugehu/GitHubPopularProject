/**
 * Created by hth on 2017/4/7.
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    TouchableOpacity
} from 'react-native';

/**
 * 导航栏
 */
const COLOR_MAIN = '#63b8ff';
export default class NavigationBar extends Component{
    render(){
        return <View>
            <View style={styles.barStyle}>
                <StatusBar hidden={false} barStyle={`light-content`}/>
            </View>
            <View style={styles.container}>
                <View style={styles.placeholder}/>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.barTitle}</Text>
                </View>
                <View style={styles.imgWrapper}>
                    {this.props.search?
                    <TouchableOpacity activeOpacity={0.7}>
                        <Image source={require('../../res/images/ic_search_white_48pt.png')} style={styles.navBtn}/>
                    </TouchableOpacity>:
                    <View></View>}
                    {this.props.menu?
                    <TouchableOpacity activeOpacity={0.7}>
                        <Image source={require('../../res/images/ic_more_vert_white_48pt.png')}
                               style={[styles.navBtn, {marginLeft:5, marginRight: 5}]}/>
                    </TouchableOpacity>:
                    <View></View>}
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:COLOR_MAIN,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        alignItems:'center',
    },
    barStyle:{
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor:COLOR_MAIN
    },
    placeholder:{
        width:60
    },
    titleWrapper:{

    },
    title:{
        fontSize: 20,
        color:'white'
    },
    imgWrapper:{
        flexDirection:'row',
        width:60
    },
    navBtn:{
        width:30,
        height:30
    }
});

module.exports = NavigationBar;