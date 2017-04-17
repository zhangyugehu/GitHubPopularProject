# GitHubPopularProject
> react-native练手项目

# 笔记

### props 
> 组件的属性：用于父控件给子控件穿传递数据

#### 默认属性 `defaultProps`
> 给组件添加默认属性

````
static defaultProps={
    prop1:value,
    prop2:value
}
````

#### 属性检查 `propTypes`
> 对传入的属性进行属性检查，需要导入 `PropsTypes` 

````
static propsTypes={
    prop1:PropTypes.string,
    prop2:PropsTypes.int
}
````

### ref使用
> 通过给组件设置特定的ref值，从而在代码中可以通过ref获取组件对象


## lsn14
### `CheckBox`组件
#### 安装
````
npm install react-native-check-box --save
````
#### 使用
````
// 引入
import CheckBox from 'react-native-check-box'

````