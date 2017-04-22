/**
 * Created by hth on 2017/4/6.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage'
import TendingPage from './TendingPage'
import FavoritePage from './FavoritePage'
import MyPage from './MyPage'

const TAB_POPULAR = 'popular';
const TITLE_POPULAR = '最热';
const TAB_TRENDING = 'trending';
const TITLE_TRENDING = '趋势';
const TAB_FAVORITE = 'favorite';
const TITLE_FAVORITE = '收藏';
const TAB_MY = 'my';
const TITLE_MY = '我的';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectTab: TAB_POPULAR
        };
    }

    render() {
        return <View style={styles.container}>
            <TabNavigator tabBarStyle={{opacity:0.8 }} sceneStyle={{paddingBottom :0}}>
                <TabNavigator.Item
                    title={TITLE_POPULAR}
                    selected={this.state.selectTab === TAB_POPULAR}
                    renderIcon={() => <Image style={styles.iconStyle}
                                             source={require('../../res/images/ic_popular.png')}/>}
                    renderSelectedIcon={()=><Image style={[styles.iconStyle, {tintColor:'#f00'}]}
                                                   source={require('../../res/images/ic_popular.png')}/>}
                    selectedTitleStyle={{color:'red'}}
                    onPress={() => {
                        this.setState({selectTab: TAB_POPULAR})
                    }}>
                    <PopularPage tabTitle={TITLE_POPULAR} navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={TITLE_TRENDING}
                    selected={this.state.selectTab === TAB_TRENDING}
                    renderIcon={() => <Image style={styles.iconStyle}
                                             source={require('../../res/images/ic_trending.png')}/>}
                    onPress={() => {
                        this.setState({selectTab: TAB_TRENDING})
                    }}>
                    <TendingPage pageTitle={TITLE_TRENDING} navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={TITLE_FAVORITE}
                    selected={this.state.selectTab === TAB_FAVORITE}
                    renderIcon={() => <Image style={styles.iconStyle}
                                             source={require('../../res/images/ic_favorite.png')}/>}
                    onPress={() => {
                        this.setState({selectTab: TAB_FAVORITE})
                    }}>
                    <FavoritePage pageTitle={TITLE_FAVORITE} navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={TITLE_MY}
                    selected={this.state.selectTab === TAB_MY}
                    renderIcon={() => <Image style={styles.iconStyle}
                                             source={require('../../res/images/ic_my.png')}/>}
                    onPress={() => {
                        this.setState({selectTab: TAB_MY})
                    }}>
                    <MyPage pageTitle={TITLE_MY} navigator={this.props.navigator}/>
                </TabNavigator.Item>
            </TabNavigator>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    iconStyle: {
        width: 26,
        height: 26
    },
});

module.exports = HomePage;