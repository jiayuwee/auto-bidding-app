"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
// 删除下面这个重复定义
// interface LoginScreenProps {
//   navigation: any;
// }
var LoginScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = (0, react_1.useState)(''), username = _b[0], setUsername = _b[1];
    var _c = (0, react_1.useState)(''), password = _c[0], setPassword = _c[1];
    var handleLogin = function () {
        // 登录逻辑
        navigation.navigate('Home');
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.TextInput style={styles.input} placeholder="用户名" value={username} onChangeText={setUsername}/>
      <react_native_1.TextInput style={styles.input} placeholder="密码" secureTextEntry value={password} onChangeText={setPassword}/>
      <react_native_1.Button title="登录" onPress={handleLogin} // 移除不必要的类型声明
    />
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff' // 添加背景色
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
    },
});
exports.default = LoginScreen;
