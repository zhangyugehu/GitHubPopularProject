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

export default class TendingPage extends Component{
    render(){
        return <View style={styles.container}>

            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
                <Text style={{fontSize:25}}>{`TITLE_TRENDING`}</Text>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})