# GitHubPopularProject
> react-native练手项目

# 笔记

## Flex布局
`flexDirection`
> 定义主轴方向

`justifyContent`
> 定义容器中内容沿主轴方向对其方式

````
justify-content: flex-start|flex-end|center|space-between|space-around|initial|inherit
````

`alignItems`
> 定义容器中内容沿主轴方向对其方式

````
align-items: stretch|center|flex-start|flex-end|baseline|initial|inherit;
````

## props 
> 组件的属性：用于父控件给子控件穿传递数据

### 默认属性 `defaultProps`
> 给组件添加默认属性

````
static defaultProps={
    prop1:value,
    prop2:value
}
````

### 属性检查 `propTypes`
> 对传入的属性进行属性检查，需要导入 `PropsTypes` 

````
static propsTypes={
    prop1:PropTypes.string,
    prop2:PropsTypes.int
}
````

## ref使用
> 通过给组件设置特定的ref值，从而在代码中可以通过ref获取组件对象


## `CheckBox`组件
#### 安装
````
npm install react-native-check-box --save
````
#### 使用
````
// 引入
import CheckBox from 'react-native-check-box'
````

### Bug
> 第二次设置checked时没有反应，因为checkbox内部使用的是state中的参数进行判断

**解决办法**
````ecmascript 5
// checkbox index.js中添加生命周期函数
// 该函数当组件接受到新的属性值是被调用
componentWillReceiveProps(nextProps){
       
}
````

## AsyncStorage
> AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的。它用来代替LocalStorage。
  我们推荐您在AsyncStorage的基础上做一层抽象封装，而不是直接使用AsyncStorage。

## Easy Toast
> 

```
// 安装
npm i react-native-easy-toast --save
```

