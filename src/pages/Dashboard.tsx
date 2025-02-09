
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target, TrendingUp, ArrowUp, ArrowDown, Bell, Brain, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const productivityData = [
  { day: 'Mon', tasks: 4, completion: 75 },
  { day: 'Tue', tasks: 6, completion: 85 },
  { day: 'Wed', tasks: 5, completion: 90 },
  { day: 'Thu', tasks: 7, completion: 80 },
  { day: 'Fri', tasks: 8, completion: 95 },
  { day: 'Sat', tasks: 3, completion: 100 },
  { day: 'Sun', tasks: 4, completion: 88 },
];

const stats = [
  {
    title: "Total Tasks",
    value: "12",
    icon: Target,
    change: "+2 from last week",
    trend: "up",
    color: "text-blue-600",
    percentage: "+16%",
    bgGradient: "from-blue-500/20 to-blue-600/10"
  },
  {
    title: "Completed",
    value: "8",
    icon: CheckCircle,
    change: "+5 this week",
    trend: "up",
    color: "text-green-600",
    percentage: "+24%",
    bgGradient: "from-green-500/20 to-green-600/10"
  },
  {
    title: "In Progress",
    value: "4",
    icon: Clock,
    change: "-3 from last week",
    trend: "down",
    color: "text-orange-600",
    percentage: "-12%",
    bgGradient: "from-orange-500/20 to-orange-600/10"
  },
  {
    title: "Productivity",
    value: "85%",
    icon: TrendingUp,
    change: "+12% this month",
    trend: "up",
    color: "text-purple-600",
    percentage: "+8%",
    bgGradient: "from-purple-500/20 to-purple-600/10"
  }
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Here's your progress for today</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex space-x-4"
          >
            <Card className="p-2 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bell className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Notifications</span>
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">3</span>
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn(
                "hover:shadow-lg transition-all duration-200 backdrop-blur-lg bg-gradient-to-br",
                stat.bgGradient,
                "border border-gray-200 dark:border-gray-700"
              )}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={cn("h-4 w-4", stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={cn(
                      "text-xs flex items-center",
                      stat.trend === "up" ? "text-green-500" : "text-red-500"
                    )}>
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 mr-1" />
                      )}
                      {stat.percentage}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Weekly Progress</CardTitle>
              <Brain className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Recent Activity</span>
                  <Zap className="h-5 w-5 text-yellow-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : 'bg-orange-500'
                      )} />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Task {i + 1} completed</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700"
                      >
                        View
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">Important Task {i + 1}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Due in 2 days</p>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        High Priority
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
