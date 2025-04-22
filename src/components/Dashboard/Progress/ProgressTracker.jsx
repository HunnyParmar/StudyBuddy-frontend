import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Dashboard from "../Dashboard";
const COLORS = ['#4ade80', '#f87171', '#60a5fa', '#fbbf24'];

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

  if (loading) return <p className="text-center mt-10">Loading progress...</p>;
  if (!progress) return <p className="text-center mt-10">No progress found.</p>;

  // Flashcard Chart Data
  const flashcardChartData = [
    { name: 'Reviewed', value: progress.flashcardsCompleted || 0 },
    { name: 'Remaining', value: (progress.totalFlashcards || 50) - (progress.flashcardsCompleted || 0) },
  ];

  // Quiz Chart Data
  const quizChartData = [
    { name: 'Quizzes Taken', value: progress.quizzesTaken || 0 },
    { name: 'Total Score', value: progress.totalQuizScore || 0 },
    { name: 'Time Spent (min)', value: Math.floor(progress.totalTimeSpent / 60) || 0 },  // Converting time to minutes
  ];

  return (
    <div className="flex h-screen">
          <Dashboard />
          <div className="flex-1 flex flex-col mt-15 bg-teal-100/20 overflow-auto p-6 pt-5 md:pt-10 ">
            
    {/* <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md space-y-10"> */}
      <h1 className="text-3xl font-bold text-center text-blue-600">📈 Study Progress Overview</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Flashcard Pie Chart */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Flashcard Progress</h2>
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

        {/* Quiz Bar Chart */}
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Quiz Progress</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={quizChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Info Section */}
      <div>
        <h2 className="text-xl font-bold mt-8">📝 Recently Reviewed Flashcards</h2>
        {progress.flashcards && progress.flashcards.length === 0 ? (
          <p className="text-gray-500">No flashcards reviewed yet.</p>
        ) : (
          <ul className="list-disc list-inside mt-2">
            {progress.flashcards && progress.flashcards.map((card) => (
              <li key={card._id} className="text-sm">
                <strong>ID:</strong> {card.flashcardId} – <strong>Reviewed:</strong>{' '}
                {new Date(card.lastReviewed).toLocaleString()} – <strong>Count:</strong>{' '}
                {card.reviewCount}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mt-6">🕒 Last Updated</h2>
        <p className="text-sm text-gray-600">{new Date(progress.lastUpdated).toLocaleString()}</p>
      </div>
    </div>
    </div>
    // </div>
  );
};

export default ProgressTracker;
