
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: "Total Tasks",
    value: "12",
    icon: Target,
    change: "+2 from last week",
    color: "text-blue-600"
  },
  {
    title: "Completed",
    value: "8",
    icon: CheckCircle,
    change: "+5 this week",
    color: "text-green-600"
  },
  {
    title: "In Progress",
    value: "4",
    icon: Clock,
    change: "-3 from last week",
    color: "text-orange-600"
  },
  {
    title: "Productivity",
    value: "85%",
    icon: TrendingUp,
    change: "+12% this month",
    color: "text-purple-600"
  }
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your progress</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
