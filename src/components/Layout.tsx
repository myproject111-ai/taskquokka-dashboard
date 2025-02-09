
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Home, List, Calendar, BookOpen, User, MessageCircle, LogOut } from 'lucide-react';
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
    <div className="flex min-h-screen bg-gray-50">
      <motion.nav 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary mb-8">TaskMaster</h1>
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                    location.pathname === item.path
                      ? "bg-primary text-white"
                      : "hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-6">
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </motion.nav>

      <main className="flex-1 ml-64 p-8">
        {children}
      </main>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6"
      >
        <button className="bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-lg transition-colors">
          <MessageCircle className="w-6 h-6" />
        </button>
      </motion.div>
    </div>
  );
};

export default Layout;
