/**
 * Created by zhang on 2017/4/21.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import NavigationBar from '../components/NavigationBar'
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default class TendingPage extends Component{
    constructor(props){
        super(props);
        this.state={
            completed:false
        }
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                barTitle={this.props.pageTitle}
                search={true}
                menu={true}/>
            {
                this._renderScrollTabView()
            }

        </View>
    }
    _renderScrollTabView(){
        return this.state.completed?<ScrollableTabView
            ref="tabsRef"
            tabBarBackgroundColor="#63b8ff"
            tabBarActiveTextColor="white"
            tabBarInactiveTextColor="#f5fffa"
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7', height:2}} >
            {
                this._renderTabs()
            }
        </ScrollableTabView>:
        <View style={[styles.container,{justifyContent:'center', alignItems:'center'}]}>
            <Text style={{fontSize:20, color:'gray'}}>敬请期待~</Text>
        </View>
    }
    _renderTabs(){
        return <View>

        </View>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})