import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';

export default function RecommendedProjectsScreen() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/bids/recommended');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('获取推荐项目失败:', error);
      setError('获取推荐项目失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchProjects();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>预算: {item.budget} 元</Text>
      <Text style={styles.deadline}>截止日期: {new Date(item.deadline).toLocaleDateString()}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>加载中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="重试" onPress={fetchProjects} />
      </View>
    );
  }

  if (projects.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>暂无推荐项目</Text>
        <Button title="刷新" onPress={fetchProjects} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>推荐项目</Text>
      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        initialNumToRender={10} // 优化初始渲染性能
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  item: { backgroundColor: '#f5f5f5', padding: 15, marginBottom: 10, borderRadius: 5 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  description: { fontSize: 14, marginBottom: 5, color: '#666' },
  price: { fontSize: 16, color: 'green', marginBottom: 5 },
  deadline: { fontSize: 14, color: '#999' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 16, color: 'red' },
  empty: { fontSize: 16, color: '#666' },
});