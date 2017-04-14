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
            return (
                <Navigator
                    initialRoute={{component: HomePage}}
                    renderScene={(route, navigator)=>this.renderScene(route, navigator)}
                    configureScene={route=>Navigator.SceneConfigs.FadeAndroid}
                />
            );
        }
        renderScene(route, navigator){
            let Component = route.component;
            return <Component navigator={navigator}/>
        }
    }

    return <Root/>
}