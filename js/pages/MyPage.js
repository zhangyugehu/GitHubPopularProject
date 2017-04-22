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
    RefreshControl,
    AsyncStorage,
    Alert,
    AlertIOS,
    DeviceEventEmitter
} from 'react-native';
import EasyToast from 'react-native-easy-toast';
import NavigationBar from '../components/NavigationBar';
import CustomTabPage from './mine/CustomTabPage'
import SortKeyPage from './mine/SortKeyPage'

const KEY_REFRESH = 'key_refresh';
export default class MyPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar barTitle={this.props.pageTitle}/>
            <PreferenceCompontent
                onPress={()=>this.startCustomPage()}
                title='自定义标签'/>
            <PreferenceCompontent
                onPress={()=>this.startOrderPage()}
                title='排序'/>
            <PreferenceCompontent
                onPress={()=>this._clearAlert()}
                title='清除数据'/>
            <EasyToast ref="toastRef"/>
        </View>
    }
    startCustomPage=()=>{
        this.startPage(CustomTabPage);
    }
    startOrderPage=()=>{
        this.startPage(SortKeyPage);
    }
    _clearAlert(){
        AlertIOS.alert(
            '提示',
            '清除数据',
            [
                {text: '确定',
                    onPress: () => {
                        AsyncStorage.clear((error)=>{
                            this.refs.toastRef.show("数据已清楚", 2000);
                            DeviceEventEmitter.emit(KEY_REFRESH, '');
                        })
                    }
                },
                {text: '取消', onPress: () => {console.log("cancel");}}
            ]
        )
    }

    startPage(page) {
        this.props.navigator.push({
            params:{
                navigator:this.props.navigator,
            },
            component:page
        })
    }
}

class PreferenceCompontent extends Component{
    static defaultProps={
        onPress:()=>{},
        title:'default'
    }
    constructor(props){
        super(props);
    }

    render(){
        return <TouchableOpacity
                activeOpacity={0.5}
                style={styles.preferenceSettingStyle}
                onPress={this.props.onPress}>
                <Text style={styles.preferenceSettingTextStyle}>{this.props.title}</Text>
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    preferenceSettingStyle:{
        borderBottomWidth:1,
        height:50,
        borderColor:'#e8e8e8',
        justifyContent:'center',
        alignItems:'flex-start',
        marginLeft:10
    },
    preferenceSettingTextStyle:{
        fontSize:20
    },
});