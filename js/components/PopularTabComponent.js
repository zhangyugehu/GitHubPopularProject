/**
 * Created by hth on 2017/4/22.
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
import DetailsPage from '../pages/popular/DetailsPage'
import ItemComponent from './ItemComponent'
import FavoriteModel from '../model/FavoriteModel'

const BASE_URL = 'https://api.github.com/search/'

export default class PopularTabComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2}),
            isRefreshing:false,
            starList:[],
        }
    }

    componentDidMount(){
        this.requireData();
    }

    render(){
        return <View style={styles.tabContainer}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                refreshControl={this.renderRefreshController()}
            >

            </ListView>
        </View>
    }

    // render
    renderRow(item, id, position){
        return <TouchableOpacity activeOpacity={0.5} onPress={()=>{
            this.onItemClick(item, position);
        }}>
            <View style={styles.itemContainer}>
                <ItemComponent
                    name={item.name}
                    author={item.owner.login}
                    avatar={item.owner.avatar_url}
                    favoritePress={()=>{this._favoritePress(item)}}
                    isStar={this._isStart(item.id)}/>
            </View>
        </TouchableOpacity>
    }
    renderRefreshController=()=>{
        return <RefreshControl
            ref="refCtrl"
            title="加载中..."
            onRefresh={()=>this.requireData()}
            colors={['blue', 'red', 'green']}
            refreshing={this.state.isRefreshing}/>
    }

    // func
    requireData=()=>{
        this.setState({
            isRefreshing:true
        });
        this._restoreStarList();
        let url = `${BASE_URL}repositories?q=${this.props.tabLabel}&sort=stars`;
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((json)=>{
                // json.items.forEach((item)=>{
                //     console.log(item.owner.avatar_url);
                // })
                // console.log(json);
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(json.items),
                    isRefreshing:false
                })
            })
            .catch((error)=>{
                console.log(error);
                // ToastAndroid.show("网络错误！", ToastAndroid.SHORT);
                this.setState({
                    isRefreshing:false
                });
            })
            .done();
    }
    onItemClick(item, i){
        this.props.navigator.push({
            params:{
                navigator:this.props.navigator,
                item:item,
                language:this.props.tabLabel
            },
            component:DetailsPage
        });
    }

    /**
     * 收藏按钮点击事件
     * @param item
     * @private
     */
    _favoritePress=(item)=>{
        FavoriteModel.save(this.props.tabLabel, item,
            ()=>{
                this._restoreStarList();
            },
            (error)=>{
                this._show(error);
            })
    }
    _show=text=>{
        console.log(text);
    }

    /**
     * 异步取出收藏信息，并存入缓存
     * @private
     */
    _restoreStarList=()=> {
        FavoriteModel.getStarListByLanguage(this.props.tabLabel,
            (list)=>{
                this.setState({
                    starList:list,
                })
                console.log(this.state.starList);
            },
            (error)=>{
                this._show(error);
            })
    }
    /**
     * 从提前取出的缓存里面判断是否标记
     * @param id
     * @returns {boolean}
     * @private
     */
    _isStart=(id, count)=>{
        if(this.state.starList === undefined || this.state.starList === null) return false;
        var flag = false;
        this.state.starList.forEach((item)=>{
            if(id===item){
                flag = true;
            }
        })
        return flag;
    }
}

const styles = StyleSheet.create({
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