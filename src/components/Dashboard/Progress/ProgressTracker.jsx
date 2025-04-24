import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Dashboard from "../Dashboard";

const COLORS = ['#3DAA93', '#0B154C', '#94A3B8', '#CBD5E1']; // teal, navy blue, light gray, slate gray

const ProgressTracker = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get('http://localhost:7000/progress/', {
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

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading progress...</p>;
  if (!progress) return <p className="text-center mt-10 text-gray-500">No progress found.</p>;

  const flashcardChartData = [
    { name: 'Reviewed', value: progress.flashcardsCompleted || 0 },
    { name: 'Remaining', value: (progress.totalFlashcards || 50) - (progress.flashcardsCompleted || 0) },
  ];

  const quizChartData = [
    { name: 'Quizzes Taken', value: progress.quizzesTaken || 0 },
    { name: 'Total Score', value: progress.totalQuizScore || 0 },
    { name: 'Time Spent (min)', value: Math.floor(progress.totalTimeSpent / 60) || 0 },
  ];

  return (
    <div className="flex h-screen bg-white">
      <Dashboard />
      <div className="flex-1 overflow-auto p-6 pt-10 bg-gray-100">
        <div className="max-w-5xl mt-12 mx-auto space-y-10">
          <h1 className="text-3xl font-bold text-left text-black">Study Progress Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-[#0B192C] mb-4">Flashcard Progress</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={flashcardChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {flashcardChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-[#0B192C] mb-4">Quiz Progress</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={quizChartData}>
                  <XAxis dataKey="name" stroke="#0B192C" />
                  <YAxis stroke="#0B192C" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3DAA93" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-[#0B192C]">🕒 Last Updated</h2>
            <p className="text-sm text-gray-600 mt-2">{new Date(progress.lastUpdated).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;