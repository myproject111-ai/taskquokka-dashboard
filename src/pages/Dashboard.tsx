import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Target, TrendingUp, ArrowUp, ArrowDown, Bell, Brain, Zap, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

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
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Welcome back!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 dark:text-gray-400 mt-2"
            >
              Here's your progress for today
            </motion.p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex space-x-4"
          >
            <Card className="p-2 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 dark:hover:bg-gray-700/50"
              >
                <Bell className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Notifications</span>
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full"
                >
                  3
                </motion.span>
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
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Card className={cn(
                "hover:shadow-xl transition-all duration-300 backdrop-blur-xl bg-gradient-to-br",
                stat.bgGradient,
                "border border-white/20 dark:border-gray-700/50"
              )}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className={cn("h-4 w-4", stat.color)} />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="flex items-center space-x-2 mt-1">
                    <motion.span 
                      whileHover={{ y: -2 }}
                      className={cn(
                        "text-xs flex items-center",
                        stat.trend === "up" ? "text-green-500" : "text-red-500"
                      )}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 mr-1" />
                      )}
                      {stat.percentage}
                    </motion.span>
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
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                Weekly Progress
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </motion.div>
              </CardTitle>
              <Brain className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={productivityData}>
                    <defs>
                      <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="completion"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      fill="url(#colorCompletion)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Recent Activity</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </motion.div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-500' : 'bg-orange-500'
                          )} 
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">Task {i + 1} completed</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 dark:bg-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-600/50 transition-colors"
                        >
                          View
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Upcoming Tasks</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="h-5 w-5 text-blue-500" />
                  </motion.div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/10 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-sm font-medium">Important Task {i + 1}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Due in 2 days</p>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-xs font-medium px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        >
                          High Priority
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Dashboard;
