/**
 * Created by hth on 2017/4/12.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid,
    AsyncStorage
} from 'react-native';

import CheckBox from 'react-native-check-box';
import EasyToast from 'react-native-easy-toast';
import Dimensions from 'Dimensions';

import NavigationBar from '../../components/NavigationBar'

const ScreenWidth = Dimensions.get('window').width;
const KEY_STORAGE = 'custom_key';
const DEF_DATA = require('../../../mock/default/def_languages.json');

export default class CustomTabPage extends Component{
    constructor(props){
        super(props);

        this.state={
            data:DEF_DATA
        }
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                barTitle='自定义标签'
                search={false}
                menu={false}
                right={true}
                rightText="保存"
                left={true}
                backPress={this.backPress.bind(this)}
                rightPress={this.rightPress.bind(this)}
            />
            <View style={styles.checkboxsWrapperStyle}>
                <View>
                    {this.renderLeftCheckBoxs()}
                </View>

                <View >
                    {this.renderRightCheckBoxs()}
                </View>
            </View>
            <EasyToast ref="toastRef"/>
        </View>
    }
    componentDidMount(){
        AsyncStorage.getItem(KEY_STORAGE)
            .then((res)=>{
            if(res !== undefined && res !== null) {
                this.setState({
                    data: JSON.parse(res)
                });
            }
            })
            .catch(()=>{
                this.toast("加载失败");
            });
    }
    // render
    renderLeftCheckBoxs=()=>{
        return this.state.data.map((item,i)=>{
            return i%2===0?this.renderCheckBox(item, i):null;
        });
    }
    renderRightCheckBoxs=()=>{
        return this.state.data.map((item,i)=>{
            return i%2===0?null:this.renderCheckBox(item, i);
        });
    }
    renderCheckBox = (item, i)=>{
        return <View
                key={'checkbox_' + i}
                style={styles.checkBoxWrapperStyle}>
                <CheckBox
                    rightTextStyle={{fontSize:18}}
                    onClick={()=>this.handleCheckClick(item)}
                    rightText={item.name}
                    isChecked={item.checked}
                    unCheckedImage={this.renderCkeckImage(false)}
                    checkedImage={this.renderCkeckImage(true)}
                />
            </View>
    }
    renderCkeckImage=(checked)=>{
        return <Image
            style={styles.checkboxImgStyle}
            source={checked?
                require('../../../res/images/ic_check_box.png'):
                require('../../../res/images/ic_check_box_outline_blank.png')}
        />
    }

    // func
    backPress=()=>{
        this.props.navigator.pop();
    }
    rightPress=()=>{
        AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(this.state.data))
            .then(()=>{
                // this.toast('saved')
                this.backPress();
            })
            .catch(()=>{
                this.toast('saved error')
            })
    }
    handleCheckClick=(item)=>{
        item.checked = !item.checked;
    }
    toast=(msg)=>{
        this.refs.toastRef.show(msg, 2000);
    }

}

const styles = StyleSheet.create({
   container:{
       flex:1,
   },
    checkboxImgStyle:{
       tintColor:'#63b8ff'
    },
    checkboxsWrapperStyle:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    checkBoxWrapperStyle:{
        height:20,
        width:(ScreenWidth/2 - 20),
        margin:10
    },
    checkBoxLeftStyle:{
        width:80,
        height:20,
        alignItems:'flex-start'
    },
    checkBoxRightStyle:{
        width:80,
        height:20,
        alignItems:'flex-end'
    },
});