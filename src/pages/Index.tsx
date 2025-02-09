
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-light via-white to-secondary-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-8"
      >
        <h1 className="text-6xl font-bold text-gray-900">
          Welcome to <span className="text-primary">TaskMaster</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-lg">
          Your all-in-one solution for managing tasks, schedules, and learning materials.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/login">
            <Button
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 text-lg"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
