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
                onPress={this._menuPress}>
                <Image source={require('../../../res/images/ic_more_vert_white_48pt.png')}
                       style={{marginLeft: 5, marginRight: 5, height:30, width:30}}/>
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
            ()=>{},
            (e)=>{});
    }
    _menuPress =()=>{

    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
})