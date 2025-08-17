import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles, Volume2, BookOpen, Lightbulb } from 'lucide-react';

const StudyBuddy: React.FC = () => {
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState('intermediate');

  const mockConversation = [
    {
      id: '1',
      type: 'user',
      message: 'Can you explain quantum entanglement?',
      timestamp: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      type: 'ai',
      message: 'Quantum entanglement is a fascinating phenomenon where two particles become connected in such a way that measuring one instantly affects the other, regardless of distance. Think of it like having two magical coins that always land on opposite sides - when one shows heads, the other will always show tails, even if they\'re on different planets! This "spooky action at a distance" as Einstein called it, is fundamental to quantum mechanics.',
      timestamp: '2024-01-15T14:30:15Z'
    },
    {
      id: '3',
      type: 'user',
      message: 'That\'s helpful! Can you give me a more advanced explanation?',
      timestamp: '2024-01-15T14:31:00Z'
    },
    {
      id: '4',
      type: 'ai',
      message: 'Certainly! Quantum entanglement occurs when particles interact in ways such that the quantum state of each particle cannot be described independently. The system exists in a superposition of correlated states. When you measure the spin of one entangled particle along any axis, you instantly know the spin of its partner along the same axis - they\'ll be perfectly anti-correlated. This violates Bell\'s inequalities and demonstrates non-locality in quantum mechanics.',
      timestamp: '2024-01-15T14:31:20Z'
    }
  ];

  const quickActions = [
    { icon: BookOpen, label: 'Explain Concept', color: 'from-blue-500 to-cyan-500' },
    { icon: Lightbulb, label: 'Study Tips', color: 'from-green-500 to-emerald-500' },
    { icon: MessageCircle, label: 'Quiz Me', color: 'from-purple-500 to-pink-500' },
    { icon: Volume2, label: 'Audio Mode', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Study Buddy</h1>
          <p className="text-slate-300 mt-1">Your AI-powered learning companion</p>
        </div>
        
        {/* Learning Level Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400">Level:</span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="beginner">Beginner (ELI5)</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* AI Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
      >
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">AI Study Features</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`bg-gradient-to-r ${action.color} hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm flex flex-col items-center`}
            >
              <action.icon className="w-5 h-5 mb-1" />
              {action.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {mockConversation.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
                <div className={`text-xs text-slate-400 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === 'user' ? 'order-1 ml-3 bg-purple-500' : 'order-2 mr-3 bg-gradient-to-r from-blue-500 to-cyan-500'
              }`}>
                {msg.type === 'user' ? (
                  <span className="text-white text-sm font-medium">U</span>
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-slate-700">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything about your studies..."
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Handle send message
                    setMessage('');
                  }
                }}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-purple-400 transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setMessage('')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              'Explain photosynthesis',
              'Help with calculus',
              'Quiz me on history',
              'Study motivation'
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm px-3 py-1 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Study Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700 text-center">
          <div className="text-2xl font-bold text-white">247</div>
          <div className="text-sm text-slate-400">Questions Asked</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700 text-center">
          <div className="text-2xl font-bold text-white">89%</div>
          <div className="text-sm text-slate-400">Concepts Understood</div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700 text-center">
          <div className="text-2xl font-bold text-white">15</div>
          <div className="text-sm text-slate-400">Study Sessions</div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyBuddy;