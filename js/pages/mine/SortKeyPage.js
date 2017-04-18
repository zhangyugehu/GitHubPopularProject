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
    Alert,
    AsyncStorage,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from '../../components/NavigationBar'
import SortableListView from 'react-native-sortable-listview'

const KEY_STORAGE = 'custom_key';
const KEY_REFRESH = 'key_refresh';
const DEF_DATA = require('../../../mock/default/def_languages.json');
let _languages = [];
let _unCheckedLanguages = [];

export default class SortKeyPage extends Component{
    constructor(props){
        super(props);
        this.state={
            data:_languages
        }
    }
    componentDidMount(){
        this._getStorageData();
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
                backPress={()=>this._onBack()}
                rightPress={()=>this._onSave()}
            />
            <SortableListView
                delayLongPress={500}
                data={this.state.data}
                order={Object.keys(this.state.data)}
                renderRow={row=><RowComponent data={row.name}/>}
                onRowMoved={e=> {
                    this.state.data.splice(e.to, 0, this.state.data.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
            />
        </View>
    }

    _getDefData(){
        this._reSetCache(DEF_DATA)
    }
    _getStorageData(){
        AsyncStorage.getItem(KEY_STORAGE)
            .then((value)=>{
                var data = JSON.parse(value)
                if(this._isNull(data)){
                    AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(DEF_DATA))
                        .catch();
                    this._getDefData();
                }else{
                    this._reSetCache(data)
                }
            })
            .catch((error)=>{
                this._getDefData();
            })
            .done()
    }
    _reSetCache(data){
        _languages = [];
        _unCheckedLanguages=[];
        data.forEach((item)=>{
            if(item.checked){
                _languages.push(item)
            }else{
                _unCheckedLanguages.push(item)
            }
        })
        this.setState({
            data:_languages
        })
    }
    _isNull(obj){
        return obj === undefined || obj === null;
    }
    _saveToStorage(func, fail){
        var allLanguages = this.state.data;
        _unCheckedLanguages.forEach((item)=>{
            allLanguages.push(item)
        })
        var value = JSON.stringify(allLanguages);
        AsyncStorage.setItem(KEY_STORAGE, value)
            .then(()=>func())
            .catch((e)=>fail(e))
            .done();
    }

    _onBack() {
        this.props.navigator.pop();
    }

    _onSave() {
        this._saveToStorage(()=>{
            DeviceEventEmitter.emit(KEY_REFRESH, '');
            this._onBack();
        },
        (error)=>{
            Alert.alert("错误", error);
        })
    }
}
class RowComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return <TouchableHighlight
            underlayColor={'white'}
            delayLongPress={200}
            {...this.props.sortHandlers}
            >
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
