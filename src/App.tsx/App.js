"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_1 = require("@react-navigation/native");
// 此错误通常是由于未安装 @react-navigation/stack 包导致的。
// 请在项目根目录下执行以下命令来安装该包及其类型声明：
// npm install @react-navigation/stack @types/react-navigation-stack
// 或者使用 yarn：
// yarn add @react-navigation/stack @types/react-navigation-stack
var stack_1 = require("@react-navigation/stack");
var Stack = (0, stack_1.createStackNavigator)();
var App = function () {
    return (<react_native_1.SafeAreaView style={styles.container}>
      <react_native_1.StatusBar barStyle="dark-content"/>
      <native_1.NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={require('./screens/LoginScreen').default}/>
          <Stack.Screen name="Home" component={require('./screens/HomeScreen').default}/>
          <Stack.Screen name="Bidding" component={require('./screens/BiddingScreen').default}/>
        </Stack.Navigator>
      </native_1.NavigationContainer>
    </react_native_1.SafeAreaView>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
exports.default = App;
