import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import Dashboard from "../Dashboard";
import { FiAward, FiBook, FiBarChart2 } from 'react-icons/fi';
import CountUp from 'react-countup';

const ProgressTracker = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get('/progress/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgress(res.data);
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [token]);


  if (loading) return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Dashboard />
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-[#3DAA93] border-r-[#007ACC] border-b-[#4FE5C1] border-l-[#0B192C] rounded-full"
        />
      </div>
    </div>
  );

  if (!progress) return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Dashboard />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Progress Found</h2>
          <p className="text-gray-600 mb-6">Start studying to track your learning journey!</p>
          <button className="bg-[#3DAA93] hover:bg-[#2D8A73] text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
            Begin Learning
          </button>
        </div>
      </div>
    </div>
  );

  const flashcardsCompleted = progress.flashcardsCompleted || 0;
  const quizzesTaken = progress.quizzesTaken || 0;
  const totalScore = progress.totalQuizScore || 0;
  const barPercentage = Math.min(100, Math.log(flashcardsCompleted + 1) * 25);
  const masteryLevel = Math.min(5, Math.floor(flashcardsCompleted / 20) + 1);
  const averageScore = quizzesTaken > 0 ? Math.round(totalScore / quizzesTaken) : 0;

  const COLORS = ['#3DAA93', '#007ACC', '#4FE5C1', '#0B192C'];

  const quizChartData = [
    { name: 'Quizzes Taken', value: progress.quizzesTaken || 0 },
    { name: 'Total Score', value: progress.totalQuizScore || 0 },
    { name: 'Time Spent (min)', value: Math.floor(progress.totalTimeSpent / 60) || 0 },
  ];

  const stats = [
    { 
      icon: <FiBook className="text-2xl" />, 
      label: "Flashcards Reviewed", 
      value: flashcardsCompleted, 
      color: COLORS[0],
      description: "Total flashcards you've mastered"
    },
    { 
      icon: <FiBarChart2 className="text-2xl" />, 
      label: "Quizzes Completed", 
      value: quizzesTaken, 
      color: COLORS[1],
      description: "Total quizzes attempted"
    },
    { 
      icon: <FiAward className="text-2xl" />, 
      label: "Average Score", 
      value: averageScore, 
      color: COLORS[2],
      description: "Your average quiz performance",
      suffix: "%"
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Dashboard />
      <div className="flex-1 overflow-auto p-6 pt-22">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center"
          >
            <div>
              <h1 className="text-4xl font-bold text-[#0B192C]">Your Learning Progress</h1>
              <p className="text-gray-600 mt-2">See how far you've come in your studies</p>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md">
              <span className="text-sm font-medium text-gray-600">Last updated: </span>
              <span className="text-sm font-semibold text-[#3DAA93]">
                {new Date(progress.lastUpdated).toLocaleString()}
              </span>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
                style={{ borderLeftColor: stat.color }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-800">
                        <CountUp end={stat.value} duration={1.5} />{stat.suffix || ''}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-auto">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Flashcard Mastery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3DAA93] via-[#007ACC] to-[#4FE5C1]"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-semibold text-[#0B192C] mb-2 flex items-center">
                  <FiBook className="mr-2" /> Flashcard Mastery
                </h2>
                <p className="text-gray-600">
                  {masteryLevel < 3 
                    ? "Keep practicing to level up your knowledge!" 
                    : masteryLevel < 5 
                      ? "Great progress! You're becoming an expert!" 
                      : "Master level achieved! Impressive work!"}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: i < masteryLevel ? [1, 1.2, 1] : 1,
                      opacity: i < masteryLevel ? 1 : 0.6
                    }}
                    transition={{ 
                      delay: i * 0.1,
                      duration: 0.5
                    }}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${i < masteryLevel ? 'bg-gradient-to-br from-[#3DAA93] to-[#4FE5C1] text-white' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {i + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Progress</span>
                <span className="text-sm font-semibold text-[#3DAA93]">
                  Level {masteryLevel} ({barPercentage.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-4 bg-gradient-to-r from-[#3DAA93] to-[#4FE5C1] rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="mt-4 flex justify-between">
                <span className="text-sm text-gray-500">Beginner</span>
                <span className="text-sm text-gray-500">Master</span>
              </div>
              <div className="mt-2 text-center">
                <span className="text-sm font-semibold text-gray-700">
                  <CountUp end={flashcardsCompleted} duration={2} /> flashcards reviewed
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quiz Performance */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-[#0B192C] mb-6 flex items-center">
              <FiBarChart2 className="mr-2" /> Quiz Performance
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizChartData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748B" 
                    tick={{ fill: '#64748B' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748B" 
                    tick={{ fill: '#64748B' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(255, 255, 255, 0.96)',
                      border: '1px solid #E2E8F0',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value, name) => name === 'Avg Score' ? [`${value}%`, name] : [value, name]}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    radius={[6, 6, 0, 0]}
                    animationDuration={2000}
                  >
                    {quizChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {quizzesTaken > 0 && (
              <div className={`mt-6 p-4 rounded-lg border text-center ${averageScore >= 70 ? 'bg-green-50 border-green-100 text-green-800' : 'bg-yellow-50 border-yellow-100 text-yellow-800'}`}>
                <p className="font-medium">
                  {averageScore >= 70 
                    ? "🎉 Excellent performance! Keep up the great work!" 
                    : "👍 Good effort! Review your flashcards to improve!"}
                </p>
              </div>
            )}
          </motion.div>

          {/* Motivational Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-[#3DAA93] to-[#007ACC] rounded-xl p-6 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Keep up the great work!</h3>
                <p className="mb-4">Consistent practice leads to mastery. You're making great progress in your learning journey!</p>
                <button className="bg-white text-[#3DAA93] font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                  Continue Studying
                </button>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <div className="text-5xl">
                  {masteryLevel >= 4 ? "🏆" : masteryLevel >= 2 ? "🚀" : "🌟"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;