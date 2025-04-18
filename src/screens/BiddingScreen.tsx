import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

type ProjectItem = {
  _id: string;
  name: string;
  description: string;
  budget: number;
  deadline: string;
  createdBy: string;
  status: 'open' | 'closed';
};

interface ProjectItem {
  _id: string;
  name: string;
  description: string;
  budget: number;
  deadline: string;
}

const RecommendedProjectsScreen: React.FC<{ projects: ProjectItem[] }> = ({ projects }) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  const renderItem = ({ item }: { item: ProjectItem }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>预算: {item.budget} 元</Text>
      <Text style={styles.deadline}>截止日期: {new Date(item.deadline).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <FlatList<ProjectItem>
      data={projects}
      renderItem={renderItem}
      keyExtractor={(item: ProjectItem) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#2ecc71',
  },
  deadline: {
    fontSize: 14,
    color: '#e74c3c',
  },
});

export default RecommendedProjectsScreen;
const API_BASE_URL = "https://api.example.com";

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const fetchProjectById = async (id: number): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }
  return response.json();
};
