import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Share, MessageCircle, Star, Zap, Crown } from 'lucide-react';

const Community: React.FC = () => {
  const leaderboard = [
    { username: 'StudyMaster', xp: 2500, streak: 15, avatar: '🎓', rank: 1 },
    { username: 'NoteNinja', xp: 2200, streak: 12, avatar: '📚', rank: 2 },
    { username: 'QuizQueen', xp: 1800, streak: 8, avatar: '👑', rank: 3 },
    { username: 'MindMapper', xp: 1650, streak: 10, avatar: '🧠', rank: 4 },
    { username: 'You', xp: 1450, streak: 15, avatar: '⭐', rank: 5 }
  ];

  const studyGroups = [
    {
      id: '1',
      name: 'Physics Masters',
      members: 24,
      subject: 'Physics',
      description: 'Advanced physics concepts and problem solving',
      isActive: true
    },
    {
      id: '2',
      name: 'Chemistry Lab',
      members: 18,
      subject: 'Chemistry',
      description: 'Organic chemistry reactions and mechanisms',
      isActive: true
    },
    {
      id: '3',
      name: 'Math Wizards',
      members: 31,
      subject: 'Mathematics',
      description: 'Calculus, algebra, and advanced mathematics',
      isActive: false
    }
  ];

  const sharedNotes = [
    {
      id: '1',
      title: 'Quantum Mechanics Summary',
      author: 'StudyMaster',
      subject: 'Physics',
      likes: 42,
      downloads: 128,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions Map',
      author: 'NoteNinja',
      subject: 'Chemistry',
      likes: 38,
      downloads: 95,
      createdAt: '2024-01-14T14:20:00Z'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Community</h1>
          <p className="text-slate-300 mt-1">Connect, share, and learn together</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center">
          <Share className="w-4 h-4 mr-2" />
          Share Content
        </button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Students', value: '12,847', icon: Users, color: 'from-blue-500 to-cyan-500' },
          { label: 'Shared Notes', value: '3,429', icon: Share, color: 'from-green-500 to-emerald-500' },
          { label: 'Study Groups', value: '156', icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
          { label: 'Total XP', value: '2.4M', icon: Zap, color: 'from-orange-500 to-red-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            XP Leaderboard
          </h2>
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div
                key={user.username}
                className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                  user.username === 'You' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
                    : 'hover:bg-slate-700/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                  user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                  user.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                  user.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-yellow-600' :
                  'bg-slate-600'
                }`}>
                  {user.rank <= 3 ? <Crown className="w-4 h-4 text-white" /> : user.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-medium ${user.username === 'You' ? 'text-purple-300' : 'text-white'}`}>
                      {user.username}
                    </span>
                    {user.rank <= 3 && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                        #{user.rank}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-400">
                    {user.streak} day streak
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-semibold">{user.xp.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">XP</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Study Groups */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-400" />
            Study Groups
          </h2>
          <div className="space-y-4">
            {studyGroups.map((group) => (
              <div
                key={group.id}
                className="p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-white">{group.name}</h3>
                    <p className="text-sm text-slate-400">{group.description}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${group.isActive ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span>{group.members} members</span>
                    <span className="bg-slate-700 px-2 py-1 rounded-full text-xs">{group.subject}</span>
                  </div>
                  <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-medium py-1 px-3 rounded-lg transition-all duration-300">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300">
            Create Study Group
          </button>
        </motion.div>
      </div>

      {/* Shared Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Share className="w-5 h-5 mr-2 text-green-400" />
          Community Shared Notes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sharedNotes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <h3 className="font-semibold text-white mb-2">{note.title}</h3>
              <p className="text-sm text-slate-400 mb-3">by {note.author}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{note.likes}</span>
                  </div>
                  <span>{note.downloads} downloads</span>
                  <span className="bg-slate-700 px-2 py-1 rounded-full text-xs">{note.subject}</span>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium py-1 px-3 rounded-lg transition-all duration-300">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Gamification Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
      >
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Achievements & Badges</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Note Master', icon: '📝', earned: true },
            { name: 'Quiz Champion', icon: '🏆', earned: true },
            { name: 'Study Streak', icon: '🔥', earned: true },
            { name: 'Community Helper', icon: '🤝', earned: false }
          ].map((badge, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg text-center transition-all duration-300 ${
                badge.earned 
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30' 
                  : 'bg-slate-700/50 border border-slate-600 opacity-50'
              }`}
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className={`text-sm font-medium ${badge.earned ? 'text-yellow-300' : 'text-slate-400'}`}>
                {badge.name}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Community;