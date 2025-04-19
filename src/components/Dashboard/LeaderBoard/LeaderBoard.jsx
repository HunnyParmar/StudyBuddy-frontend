import React from "react";
import { FaMedal } from "react-icons/fa";
import Dashboard from "../Dashboard";

// Dummy data (you'll replace this with real data later)
const leaderboardData = [
  { name: "Sophia Nguyen", xp: 1250, online: true },
  { name: "Jane Wilson", xp: 1200, online: true },
  { name: "Oliver Johnson", xp: 1100, online: true },
  { name: "Mia Rodriguez", xp: 1050, online: true },
  { name: "Maame Aba Crentsil", xp: 1100, online: true },
  { name: "Noah Brown", xp: 1050, online: true },
  { name: "Liam Martinez", xp: 1000, online: true },
  { name: "Liam Martinez", xp: 1000, online: true },
  { name: "Liam Martinez", xp: 1000, online: true },
  { name: "Liam Martinez", xp: 1000, online: true },
];

export const LeaderBoard = () => {
  return (
    <div className="flex h-screen">
      <Dashboard />
      <div className="flex-1 p-6 overflow-auto bg-gray-50 pt-20">
        <h2 className="text-3xl font-bold mx-25 text-left text-teal-700 mb-8">Leaderboard</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {leaderboardData.map((user, index) => {
            const initials = user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {/* Rank + Medal */}
                <div className="w-6 text-center font-bold text-gray-700">
                  {index === 0 ? (
                    <FaMedal className="text-yellow-400 text-lg" />
                  ) : index === 1 ? (
                    <FaMedal className="text-gray-400 text-lg" />
                  ) : index === 2 ? (
                    <FaMedal className="text-amber-600 text-lg" />
                  ) : (
                    <span className="text-lg">{index + 1}</span>
                  )}
                </div>

                {/* Avatar + Name */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center">
                      {initials}
                    </div>
                    
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                  </div>
                </div>

                {/* Score */}
                <div className="text-teal-700 font-semibold text-sm">{user.xp} XP</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
