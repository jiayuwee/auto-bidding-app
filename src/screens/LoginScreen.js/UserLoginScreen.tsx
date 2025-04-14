import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button } from 'react-native-elements';

export interface LoginResponse {
    success: boolean;
    message?: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: data.success, message: data.message };
    } catch (error) {
        console.error('登录服务错误:', error);
        throw error;
    }
};

interface LoginScreenProps {
    navigation: {
        navigate: (screen: string) => void;
    };
}

export default function LoginScreen({ navigation }: LoginScreenProps): JSX.Element {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (): Promise<void> => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('错误', '用户名和密码不能为空');
            return;
        }

        if (username.length < 3 || password.length < 6) {
            Alert.alert('错误', '用户名或密码长度不符合要求');
            return;
        }

        setLoading(true);
        try {
            const response = await loginUser(username.trim(), password.trim());
            if (response.success) {
                navigation.navigate('Projects');
            } else {
                Alert.alert('登录失败', response.message || '请检查用户名或密码');
            }
        } catch (error) {
            console.error('登录错误:', error);
            Alert.alert('错误', '无法连接到服务器，请稍后再试');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>登录</Text>
            <TextInput
                style={styles.input}
                placeholder="用户名"
                value={username}
                onChangeText={(text: string) => setUsername(text)}
                accessibilityHint="输入用户名"
            />
            <TextInput
                style={styles.input}
                placeholder="密码"
                secureTextEntry
                value={password}
                onChangeText={(text: string) => setPassword(text)}
                accessibilityLabel="输入密码"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button
                    title={loading ? '登录中...' : '登录'}
                    onPress={handleLogin}
                    disabled={loading} // 禁用按钮以防止重复提交
                />
            )}
            <Button
                title="忘记密码？"
                type="clear"
                onPress={() => Alert.alert('提示', '请联系管理员重置密码')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
    input: { borderBottomWidth: 1, marginBottom: 10, padding: 8, fontSize: 16 },
});
