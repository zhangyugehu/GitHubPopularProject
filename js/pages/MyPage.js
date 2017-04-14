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
            <NavigationBar barTitle={this.props.pageTitle} search={false} menu={false}/>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.preferenceSettingStyle}
                onPress={this.startCustomPage.bind(this)}>
                <Text>自定义标签</Text>
            </TouchableOpacity>
        </View>
    }
    startCustomPage=()=>{
        this.props.navigator.push({
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
        borderColor:'#eee',
        fontSize:20,
        justifyContent:'center',
        alignItems:'flex-start',
        margin:10,
    },
});