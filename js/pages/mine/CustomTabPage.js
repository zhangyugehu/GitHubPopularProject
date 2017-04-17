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
    ToastAndroid
} from 'react-native';

import CheckBox from 'react-native-check-box'
import Dimensions from 'Dimensions'

import NavigationBar from '../../components/NavigationBar'

const ScreenWidth = Dimensions.get('window').width;

export default class CustomTabPage extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[{name:'Android', checked:true},
                {name:'IOS', checked:false},
                {name:'React', checked:false},
                {name:'JavaScript', checked:true},
                {name:'Java', checked:true}
            ]
        }
    }
    render(){
        return <View style={styles.container}>
            <NavigationBar
                barTitle="自定义标签"
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
        </View>
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
                    onClick={this.handleCheckClick}
                    rightText={item.name}
                    isChecked={item.checked}
                    unCheckedImage={this.renderCkeckImage(false)}
                    checkedImage={this.renderCkeckImage(true)}
                />
            </View>
    }
    renderCkeckImage=(checked)=>{
        return <Image
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
        this.toast('rightPress');
    }
    handleCheckClick=()=>{
        this.toast('handleCheckClick ');
    }
    toast=(msg)=>{
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

}

const styles = StyleSheet.create({
   container:{
       flex:1,
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