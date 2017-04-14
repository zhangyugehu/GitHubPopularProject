/**
 * Created by hth on 2017/4/12.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
export default class ItemDetails extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <View style={{flex:1, height:40, backgroundColor:'red'}}>
            <Text onPress={()=>{this.props.navigator.pop()}}>
                {`eewfsfs
                    sdfsfa
fsafsa`}
            </Text>
        </View>
    }
}