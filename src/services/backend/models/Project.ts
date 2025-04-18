interface IProject {
  _id: string;
  name: string;
  bids: IBid[];
  // 补充其他字段
}

interface IBid {
  userId: string;
  amount: number;
  timestamp: Date;
}