/**
 * Created by hth on 2017/4/12.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Navigator
} from 'react-native';

import HomePage from './pages/HomePage'

export default function setup() {
    class Root extends Component {
        render() {
            return <Navigator
                initialRoute={{
                    name:'HomePage',
                    component: HomePage
                }}
                renderScene={(route, navigator)=>this._renderScene(route, navigator)}
                configureScene={route=>Navigator.SceneConfigs.PushFromRight}
            />
        }

        _renderScene(route, navigator){
            let Target = route.component;
            return <Target {...route.params} navigator={navigator}/>
        }
    }

    return <Root />
}