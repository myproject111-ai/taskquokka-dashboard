
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Home, List, Calendar, BookOpen, User, MessageCircle, LogOut, Search, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: List, label: 'To-Do List', path: '/todo' },
  { icon: Calendar, label: 'Timetable', path: '/timetable' },
  { icon: BookOpen, label: 'Quiz', path: '/quiz' },
  { icon: User, label: 'Profile', path: '/profile' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.nav 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-0 left-0 h-full w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg z-50 border-r border-gray-200 dark:border-gray-700"
      >
        <div className="p-6">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-8"
          >
            TaskMaster
          </motion.h1>
          <div className="space-y-2">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  key={item.path}
                >
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      location.pathname === item.path
                        ? "bg-primary text-white shadow-md"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-6">
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </motion.nav>

      <div className="flex-1 ml-64">
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 right-0 left-64 z-40">
          <div className="flex items-center justify-between h-full px-8">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none ml-2 w-64"
              />
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </motion.button>
            </div>
          </div>
        </header>

        <main className="pt-24 p-8">
          {children}
        </main>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6"
      >
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Layout;
