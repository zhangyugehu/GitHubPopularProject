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

export default class DetailsPage extends Component{
    static defaultProps={
        title:'title'
    }
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
                barTitle={this.props.title}
                backPress={()=>this._onBack()}
                rightView={()=>this._renderBarRight()}
            />
            <WebView
                onNavigationStateChange={this._handleNavStateChanged}
                ref="webviewRef"
                source={{uri:this.props.url}}
                startInLoadingState={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}/>
        </View>
    }
    _renderBarRight(){
        return <View style={{flex:1, flexDirection:'row', width:80, height:30}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.menuPress}>
                <Image source={require('../../../res/images/ic_more_vert_white_48pt.png')}
                       style={[styles.navBtn, {marginLeft: 5, marginRight: 5}]}/>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.menuPress}>
                <Image source={require('../../../res/images/ic_more_vert_white_48pt.png')}
                       style={[styles.navBtn, {marginLeft: 5, marginRight: 5}]}/>
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
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
})