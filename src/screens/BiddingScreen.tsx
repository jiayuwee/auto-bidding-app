import React from 'react';
import { View, Text, FlatList } from 'react-native';

interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  deadline: string;
  createdBy: string;
  status: 'open' | 'closed';
};

const BiddingScreen = () => {
  return (
    <View>
      {/* 屏幕内容 */}
    </View>
  );
};

export default BiddingScreen;
