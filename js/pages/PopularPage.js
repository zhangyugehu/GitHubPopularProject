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
    ToastAndroid
} from 'react-native';
import NavigationBar from '../components/NavigationBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import ItemDetails from './popular/ItemDetails'

export default class PopularPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            languages:['Android', 'IOS', 'Java', 'React Native'],
        }
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                barTitle={this.props.tabTitle}
                search={true}
                menu={true}/>
            <ScrollableTabView
                tabBarBackgroundColor="#63b8ff"
                tabBarActiveTextColor="white"
                tabBarInactiveTextColor="#f5fffa"
                tabBarUnderlineStyle={{backgroundColor:'#e7e7e7', height:2}}
                >
                {
                    this.state.languages.map((tab, i) => {
                        return <PopularTab
                            key={tab + i}
                            tabLabel={tab}
                            navigator={this.props.navigator}/>
                    })
                }
            </ScrollableTabView>
        </View>
    }

    // ***
}

const BASE_URL = 'https://api.github.com/search/';

class PopularTab extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1, r2)=>r1!==r2}),
            isRefreshing:false
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
                refreshControl={this.renderRefreshController()}>

            </ListView>
        </View>
    }

    // **
    renderRow(item, id, position){
        return <TouchableOpacity activeOpacity={0.5} onPress={()=>{
            this.onItemClick(item, position);
        }}>
            <View style={styles.itemContainer}>
                <View>
                    <Image style={styles.itemIcon} source={{uri:`${item.owner.avatar_url}`}}/>
                </View>
                <View style={styles.contentWrapper}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemOwner}>{item.owner.login}</Text>
                </View>
            </View>
        </TouchableOpacity>
    }
    renderRefreshController=()=>{
        return <RefreshControl
            title="加载中..."
            onRefresh={this._onRefresh}
            colors={['blue', 'red', 'green']}
            refreshing={this.state.isRefreshing}/>
    }

    requireData(){
        this.setState({
            isRefreshing:true
        });
        let url = `${BASE_URL}repositories?q=${this.props.tabLabel}&sort=stars`;
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((json)=>{
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(json.items),
                    isRefreshing:false
                })
            })
            .catch((error)=>{
                console.log(error);
                ToastAndroid.show("网络错误！", ToastAndroid.SHORT);
                this.setState({
                    isRefreshing:false
                });
            })
            .done();
    }
    onItemClick(item, i){
        // ToastAndroid.show(item.full_name, ToastAndroid.SHORT);
        this.props.navigator.push({
            component:ItemDetails,
            passProps:{
                itemData:item
            }
        });
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