/**
 * Created by hth on 2017/4/7.
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
    // ToastAndroid,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../components/NavigationBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import PopularTab from '../components/PopularTabComponent'


const KEY_STORAGE = 'custom_key';
const KEY_REFRESH = 'key_refresh';
const DEF_DATA = require('../../mock/default/def_languages.json');
let _languages = []

export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            languages:_languages
        }
    }
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener(KEY_REFRESH,
                () => {this._getStorageData()})
        this._getStorageData();
    }
    componentWillUnmount() {
        // 移除
        this.subscription.remove();
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar
                barTitle={this.props.tabTitle}
                search={true}
                menu={true}/>
            <ScrollableTabView
                ref="tabsRef"
                tabBarBackgroundColor="#63b8ff"
                tabBarActiveTextColor="white"
                tabBarInactiveTextColor="#f5fffa"
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7', height:2}}
                >
                {
                    this.renderTabs()
                }
            </ScrollableTabView>
        </View>
    }

    // render
    renderTabs() {
        var flag = this.state.languages === undefined || this.state.languages === null;
        if(flag) {
            return null;
        }
        return this.state.languages.map((tab, i) =>
            <PopularTab
                key={tab + i}
                tabLabel={tab}
                navigator={this.props.navigator}/>
        )

    }

    // func
    _getDefaultData(){
        this._reSetCache(DEF_DATA);
    }

    _getStorageData(){
        AsyncStorage.getItem(KEY_STORAGE)
            .then((value)=> {
                var data = JSON.parse(value);
                if(data === undefined || data === null){
                    // 将默认数据填入 不进行重新渲染
                    AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(DEF_DATA))
                        .catch();
                    this._getDefaultData()
                }else {
                    this._reSetCache(data);
                }
            })
            .catch((error)=>{
                this._getDefaultData()
            })
            .done();
    }

    _reSetCache(data){
        _languages = [];
        data.forEach((item)=>{
            if(item.checked) _languages.push(item.name)
        })
        this.setState({
            languages:_languages
        })
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    tabContainer:{
        flex:1
    },
    itemContainer:{
        height:60,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    itemIcon:{
        height:50,
        width:50,
        marginLeft:10
    },
    contentWrapper:{
        margin:10
    },
    itemTitle:{
        fontSize:18,
        color:'black'
    },
    itemOwner:{
        fontSize:16,
        color:'gray'
    }
})

module.exports = PopularPage;