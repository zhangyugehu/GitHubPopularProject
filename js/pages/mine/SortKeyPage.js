/**
 * Created by zhang on 2017/4/18.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid,
    AsyncStorage,
    TouchableHighlight
} from 'react-native';
import NavigationBar from '../../components/NavigationBar'
import SortableListView from 'react-native-sortable-listview'

const KEY_STORAGE = 'custom_key';
const DEF_DATA = require('../../../mock/default/def_languages.json');
let _languages = [];

export default class SortKeyPage extends Component{
    constructor(props){
        super(props);
        DEF_DATA.forEach((item)=>{
            if(item.checked) _languages.push(item.name)
        })
        this.state={
            data:_languages
        }
    }
    componentDidMount(){
        _languages = []
        AsyncStorage.getItem(KEY_STORAGE)
            .then((value)=>{
                JSON.parse(value).forEach((item)=>{
                    if(item.checked) _languages.push(item.name)
                })
                this.setState({
                    data:_languages
                })
            })
            .catch((error)=>{
                JSON.parse(DEF_DATA).forEach((item)=>{
                    if(item.checked) _languages.push(item.name)
                })
            })
            .then(()=>{
                this.setState({
                    data:_languages
                })
            })
            .done()
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar
                barTitle='标签排序'
                search={false}
                menu={false}
                right={true}
                rightText="保存"
                left={true}
                backPress={()=>this.onBack()}
                rightPress={()=>this.onSave()}
            />
            <SortableListView
                data={this.state.data}
                order={Object.keys(this.state.data)}
                renderRow={row=><RowComponent data={row}/>}
            />
        </View>
    }

    onBack() {
        this.props.navigator.pop();
    }

    onSave() {

    }
}
class RowComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return  <TouchableHighlight>
            <View style={styles.itemWrapperStyle}>
                <Image source={require('../../../res/images/ic_sort.png')} style={styles.itemImageStyle}/>
                <Text style={styles.itemTextStyle}>{this.props.data}</Text>
            </View>
        </TouchableHighlight>
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    itemWrapperStyle:{
        marginLeft:10,
        height:50,
        alignItems:'center',
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:1,
        flexDirection:'row'
    },
    itemTextStyle:{
        fontSize:18
    },
    itemImageStyle:{
        tintColor:'#63b8ff',
        width:20,
        height:20,
        marginRight:10
    },
})
