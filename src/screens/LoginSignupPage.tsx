import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const LoginSignupPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true); // 切换登录和注册
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 注册时确认密码

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('错误', '用户名和密码不能为空');
      return;
    }
    console.log('登录成功:', { username, password });
    Alert.alert('登录成功', `欢迎回来，${username}`);
  };

  const handleSignup = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('错误', '所有字段均为必填项');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('错误', '两次输入的密码不一致');
      return;
    }
    console.log('注册成功:', { username, password });
    Alert.alert('注册成功', `欢迎加入，${username}`);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? '登录' : '注册'}</Text>
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="确认密码"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
      )}
      <TouchableOpacity
        onPress={isLogin ? handleLogin : handleSignup}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{isLogin ? '登录' : '注册'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleForm} style={styles.switchButton}>
        <Text style={styles.switchButtonText}>
          {isLogin ? '没有账号？注册' : '已有账号？登录'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 15,
  },
  switchButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginSignupPage;
