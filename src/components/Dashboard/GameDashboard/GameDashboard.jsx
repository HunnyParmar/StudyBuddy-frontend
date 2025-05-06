import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

// Example games
const games = [
  {
    name: "Memory Match",
    path: "/games/memory-match",
    image: "/memorymatch.png",
  },
  {
    name: "Reaction Speed",
    path: "/games/reaction-speed",
    image: "/reactionspeed.png",
  },
  {
    name: "Sequence Memory",
    path: "/games/sequence-memory",
    image: "/sequence.jpg",
  },
  {
    name: "Word Grid Hunt",
    path: "/games/Word-Grid-Hunt",
    image: "/wordgridhunt.png",
  },
  { name: "Sudoku", path: "/games/Sudoku", image: "/grid.png" },
  {
    name: "Typing Speed Test",
    path: "/games/typing-speed",
    image: "/typingspeed.png",
  },
  {
    name: "Avoid the Bombs",
    path: "/games/avoid-bombs",
    image: "/avoidbomb.png",
  },
];

export default function GameDashboard() {
  return (
    <div className="bg-[#0b0f1a] text-white min-h-screen">
      <Link to="/progress">
        <IoChevronBackSharp className="text-[#0B192C] bg-white/80 p-1 text-4xl border-1 rounded-full fixed top-2 left-2 z-10" />
      </Link>
      {/* Fullscreen Video Background Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Game Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, i) => (
            <motion.div
              key={game.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={game.path}>
                <div className="overflow-hidden bg-black shadow-2xl shadow-blue-500/40 hover:shadow-red-400 transition duration-300">
                  {/* Image Section */}
                  <div
                    className="w-[280px] h-[150px] bg-cover bg-center mx-auto mt-8 rounded-xl"
                    style={{ backgroundImage: `url(${game.image})` }}
                  >
                    <div className="w-full h-full rounded-xl" />
                  </div>

                  {/* Text Section */}
                  <div className="bg-[#1e293b] p-4 text-center">
                    <h3 className="text-xl font-semibold text-white">
                      {game.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}