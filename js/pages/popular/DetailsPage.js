/**
 * Created by hth on 2017/4/18.
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
    RefreshControl,
    ToastAndroid,
    AsyncStorage,
    WebView
} from 'react-native';
import NavigationBar from '../../components/NavigationBar'
import FavoriteModel from '../../model/FavoriteModel'
import EasyToast from 'react-native-easy-toast';

export default class DetailsPage extends Component{
    constructor(props){
        super(props)
        this.state={
            canGoBack:false
        }
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                left={true}
                barTitle={this.props.item.name}
                backPress={()=>this._onBack()}
                rightView={this._renderBarRight()}
            />
            <WebView
                onNavigationStateChange={this._handleNavStateChanged}
                ref="webviewRef"
                source={{uri:this.props.item.html_url}}
                startInLoadingState={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}/>
            <EasyToast ref="toastRef"/>
        </View>
    }
    _renderBarRight(){
        return <View style={{flex:1, flexDirection:'row', width:60, height:30, alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this._starPress}>
                <Image source={require('../../../res/images/ic_star_navbar.png')}
                       style={{height:20, width:20}}/>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this._sharePress}>
                <Image source={require('../../../res/images/ic_share.png')}
                       style={{marginLeft: 10, marginRight: 5, height:23, width:23, tintColor:'#fff'}}/>
            </TouchableOpacity>
        </View>
    }
    _onBack(){
        if(this.state.canGoBack) {
            this.refs.webviewRef.goBack()
        }else {
            this.props.navigator.pop();
        }
    }

    _handleNavStateChanged=s=>{
        this.setState({
            canGoBack:s.canGoBack
        })
    }
    _starPress = ()=>{
        FavoriteModel.save(this.props.language, this.props.item,
            ()=>{
                // TODO 刷新收藏按钮状态
                this._toast("完成")
            },
            (e)=>{
                this._toast("错误：" + e)
            });
    }
    _sharePress =()=>{
        this._toast("分享功能")
    }
    _toast=(text)=>{
        this.refs.toastRef.show(text, 1000);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
})