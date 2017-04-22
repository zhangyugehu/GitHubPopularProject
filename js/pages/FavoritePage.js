/**
 * Created by zhang on 2017/4/21.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    DeviceEventEmitter
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FavoriteModel from '../model/FavoriteModel'
import EasyToast from 'react-native-easy-toast';
import NavigationBar from '../components/NavigationBar';
import FavoriteTab from '../components/FavoriteTabComponent'

const KEY_FAVORITE = "key_favorite"
export default class FavoritePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            languages : [],
        }
    }
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener(KEY_FAVORITE,
            () => {this._getData()})
        this._getData();
    }
    componentWillUnmount(){
        this.subscription.remove();
    }
    render(){
        return <View style={styles.container}>
            <EasyToast ref="toastRef"/>
            <NavigationBar
                barTitle={this.props.pageTitle}
                search={true}
                menu={true}/>
            {
                this._renderView()
            }
        </View>
    }
    //
    _renderTabs() {
        var flag = this.state.languages === undefined || this.state.languages === null;
        if(flag) {
            return null;
        }
        return this.state.languages.map((tab, i) =>
            <FavoriteTab
                key={tab + i}
                tabLabel={tab}
                navigator={this.props.navigator}/>
        )

    }
    // func
    _toast=(text)=>{
        this.refs.toastRef.show(text, 2000);
    }

    _renderView = () => {
        var flag = this.state.languages === null
            || this.state.languages === undefined
            || this.state.languages.size < 1;
        return flag?
            <View style={[styles.container,{justifyContent:'center', alignItems:'center'}]}>
                <Text style={{fontSize:20, color:'gray'}}>您还没有任何收藏哦~</Text>
            </View>:
           <ScrollableTabView
                ref="tabsRef"
                tabBarBackgroundColor="#63b8ff"
                tabBarActiveTextColor="white"
                tabBarInactiveTextColor="#f5fffa"
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7', height:2}}>
                    {this._renderTabs()}
            </ScrollableTabView>
    }

    _getData() {
        FavoriteModel.getFavoriteLanguages((languages)=>{
            this.setState({
                languages: languages
            });
        },(e)=>{
            this._toast(e);
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})