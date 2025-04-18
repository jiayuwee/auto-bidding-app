import * as React from 'react';
import { useState } from 'react';
import { View, TextInput, Button, StyleSheet, NativeSyntheticEvent, NativeTouchEvent } from 'react-native';

// 删除重复的LoginScreenProps接口定义
type LoginScreenProps = {
  navigation: {
    navigate: (route: string, params?: object) => void;
  };
};

// 删除下面这个重复定义
// interface LoginScreenProps {
//   navigation: any;
// }

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 登录逻辑
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button 
        title="登录" 
        onPress={handleLogin}  // 移除不必要的类型声明
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'  // 添加背景色
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default LoginScreen;