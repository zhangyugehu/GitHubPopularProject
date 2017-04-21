/**
 * Created by hth on 2017/4/20.
 */
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    TouchableOpacity
} from 'react-native';

export default class ItemComponent extends Component{
    static defaultProps={
        avatar:'https://assets-cdn.github.com/images/modules/open_graph/github-mark.png',
        name:'name',
        author:'author',
        start:'99',
        favorite:false
    }
    constructor(props){
        super(props);

    }
    render(){
        return <View style={styles.container}>
            <Image style={styles.itemIcon} source={{uri:`${this.props.avatar}`}}/>
            <View style={styles.rightWrapperStyle}>
                <View style={styles.topStyle}>
                    <Text style={styles.itemTitle}>{this.props.name}</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>{this.props.favoritePress()}}>
                    <Image style={styles.favoriteStyle} source={require('../../res/images/ic_favorite@2x.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomStyle}>
                    <Text style={styles.itemAuthor}>{this.props.author}</Text>
                </View>
            </View>
        </View>
    }
    _favoritePress(){
        console.log("_favoritePress...");
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row'
    },
    itemIcon:{
        width:55,
        height:55,
        margin:5
    },
    rightWrapperStyle:{
        flex:1,
        justifyContent:'center',
    },
    topStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    itemTitle:{
        fontSize:18,
        color:'black'
    },
    favoriteStyle:{
        width:20,
        height:20,
        marginRight:20
    },
    bottomStyle:{
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    itemAuthor:{
        fontSize:16,
        color:'gray',
        marginTop:5
    }
})