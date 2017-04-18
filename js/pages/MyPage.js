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
import SortKeyPage from './mine/SortKeyPage'

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
        </View>
    }
    startCustomPage=()=>{
        this.startPage(CustomTabPage);
    }
    startOrderPage=()=>{
        this.startPage(SortKeyPage);
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
        onPress:null,
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
        fontSize:20,
        marginLeft:10
    },
});