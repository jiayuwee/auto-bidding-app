import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// 此错误通常是由于未安装 @react-navigation/stack 包导致的。
// 请在项目根目录下执行以下命令来安装该包及其类型声明：
// npm install @react-navigation/stack @types/react-navigation-stack
// 或者使用 yarn：
// yarn add @react-navigation/stack @types/react-navigation-stack
import { createStackNavigator } from '@react-navigation/stack';

// 定义路由参数类型
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Bidding: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={require('./screens/LoginScreen').default} />
          <Stack.Screen name="Home" component={require('./screens/HomeScreen').default} />
          <Stack.Screen name="Bidding" component={require('./screens/BiddingScreen').default} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;