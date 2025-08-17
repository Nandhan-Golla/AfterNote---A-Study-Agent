import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Clock, Trophy, Zap, Play, BarChart3 } from 'lucide-react';

const ExamPrep: React.FC = () => {
  const mockExams = [
    {
      id: '1',
      title: 'Physics Midterm Practice',
      subject: 'Physics',
      difficulty: 'Medium',
      questionCount: 25,
      timeLimit: 90,
      bestScore: 85,
      attempts: 3,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Organic Chemistry Quiz',
      subject: 'Chemistry',
      difficulty: 'Hard',
      questionCount: 15,
      timeLimit: 45,
      bestScore: 92,
      attempts: 2,
      createdAt: '2024-01-14T14:20:00Z'
    }
  ];

  const studyStats = [
    { label: 'Questions Answered', value: '1,247', change: '+12%' },
    { label: 'Average Score', value: '87%', change: '+5%' },
    { label: 'Study Streak', value: '15 days', change: '+3 days' },
    { label: 'Weak Topics', value: '3', change: '-2' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Exam Prep</h1>
          <p className="text-slate-300 mt-1">AI-powered exam preparation and practice</p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center">
          <Zap className="w-4 h-4 mr-2" />
          Generate Exam
        </button>
      </div>

      {/* Study Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {studyStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{stat.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.change.startsWith('+') 
                  ? 'bg-green-500/20 text-green-300' 
                  : stat.change.startsWith('-') 
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-blue-500/20 text-blue-300'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Target className="w-5 h-5 mr-2 text-orange-400" />
          Quick Practice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-left">
            <Play className="w-6 h-6 mb-2" />
            <div className="font-semibold">Quick Quiz</div>
            <div className="text-sm opacity-90">5 random questions</div>
          </button>
          
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-left">
            <Clock className="w-6 h-6 mb-2" />
            <div className="font-semibold">Timed Practice</div>
            <div className="text-sm opacity-90">Beat the clock</div>
          </button>
          
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-left">
            <BarChart3 className="w-6 h-6 mb-2" />
            <div className="font-semibold">Weak Topics</div>
            <div className="text-sm opacity-90">Focus on problem areas</div>
          </button>
        </div>
      </motion.div>

      {/* Practice Exams */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Practice Exams</h2>
        
        {mockExams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {exam.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-3">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {exam.subject}
                    </span>
                    <span className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        exam.difficulty === 'Easy' ? 'bg-green-400' :
                        exam.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></span>
                      {exam.difficulty}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {exam.timeLimit} min
                    </span>
                    <span className="flex items-center">
                      <Target className="w-3 h-3 mr-1" />
                      {exam.questionCount} questions
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-slate-300">Best: {exam.bestScore}%</span>
                    </div>
                    <div className="text-slate-400">
                      {exam.attempts} attempts
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </button>
                <button className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
                  Review
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Exam Generator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
      >
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">AI Exam Generator</h3>
        </div>
        <p className="text-slate-300 mb-6">
          Upload your syllabus or past papers, and our AI will generate personalized practice exams 
          tailored to your learning level and weak areas.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
            Upload Syllabus
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
            Generate from Notes
          </button>
        </div>
      </motion.div>

      {/* Empty State */}
      {mockExams.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <GraduationCap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No practice exams yet</h3>
          <p className="text-slate-500 mb-6">
            Generate your first practice exam to start preparing for your tests
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300">
            Generate First Exam
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ExamPrep;