/**
 * Created by hth on 2017/4/7.
 */

import React, { Component, PropTypes } from 'react';
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
const BAR_ICON_SIZE = 30;
/**
 * 右边文字
 * @type {string}
 */
const TEXT_RIGHT = '确定';

export default class NavigationBar extends Component{
    static defaultProps={
        barTitle:'',
        search:false,
        searchPress:null,
        menu:false,
        menuPress:null,
        left:false,
        backPress:null,
        right:false,
        rightText:TEXT_RIGHT,
        rightPress:null
    }
    // static propTypes={
    //     search:PropTypes.boolean,
    //     menu:PropTypes.boolean,
    //     left:PropTypes.boolean,
    //     leftIconSrc:PropTypes.string,
    //     right:PropTypes.boolean,
    //     rightText:PropTypes.string
    //
    // }
    render(){
        return <View>
            <View style={styles.barStyle} ref="barViewRef">
                <StatusBar
                    hidden={false}
                    barStyle="light-content"
                    backgroundColor="blue"
                    translucent={true}
                />
            </View>
            <View style={styles.container}>
                <View style={styles.barLeftStyle}>
                    {this.renderLeft()}
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.barTitle}</Text>
                </View>
                <View>
                    {this.renderRight()}
                </View>
            </View>
        </View>
    }

    renderRight(){
        if(this.props.right){
            // 右边为文字
            return <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.rightPress}>
                <Text style={styles.rightTextStyle}>{this.props.rightText}</Text>
            </TouchableOpacity>
        }else{
            // 右边为搜索和菜单
            return <View style={styles.searchableRightWrapper}>
                {this.renderSearch()}
                {this.renderMenu()}
            </View>
        }
    }
    renderSearch(){
        return this.props.search ?
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.searchPress}>
                <Image source={require('../../res/images/ic_search_white_48pt.png')}
                       style={styles.navBtn}/>
            </TouchableOpacity>
            :
            null
    }

    renderMenu() {
        return this.props.menu ?
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.menuPress}>
                <Image source={require('../../res/images/ic_more_vert_white_48pt.png')}
                       style={[styles.navBtn, {marginLeft: 5, marginRight: 5}]}/>
            </TouchableOpacity>
            :
            null
    }

    renderLeft() {
        return this.props.left?
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.backPress}>
                <Image
                    style={styles.backImgStyle}
                    source={require('../../res/images/ic_arrow_back_white_36pt.png')}/>
            </TouchableOpacity>
            :null
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
        // barheight: Platform.OS === 'ios' ? 20 : 0,
        height: 25,
        backgroundColor:COLOR_MAIN
    },
    barLeftStyle:{
        width:60
    },
    backImgStyle:{
        width:BAR_ICON_SIZE,
        height:BAR_ICON_SIZE
    },
    titleWrapper:{

    },
    title:{
        fontSize: 20,
        color:'white',
        height:30
    },
    searchableRightWrapper:{
        flexDirection:'row',
        width:60
    },
    navBtn:{
        width:BAR_ICON_SIZE,
        height:BAR_ICON_SIZE
    },
    rightTextStyle:{
        fontSize: 18,
        color:'white',
        alignItems:'center'
    }
});

module.exports = NavigationBar;