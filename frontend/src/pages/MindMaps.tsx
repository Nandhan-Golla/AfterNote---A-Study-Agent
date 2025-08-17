import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Plus, Share, Download, Sparkles } from 'lucide-react';

const MindMaps: React.FC = () => {
  const mockMindMaps = [
    {
      id: '1',
      title: 'Quantum Physics Concepts',
      nodeCount: 24,
      createdAt: '2024-01-15T10:30:00Z',
      isCollaborative: false,
      preview: 'Central: Quantum Physics → Wave-Particle Duality, Uncertainty Principle, Superposition...'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      nodeCount: 18,
      createdAt: '2024-01-14T14:20:00Z',
      isCollaborative: true,
      preview: 'Central: Organic Reactions → Substitution, Elimination, Addition, Mechanisms...'
    },
    {
      id: '3',
      title: 'Machine Learning Overview',
      nodeCount: 32,
      createdAt: '2024-01-13T09:15:00Z',
      isCollaborative: false,
      preview: 'Central: Machine Learning → Supervised, Unsupervised, Neural Networks, Algorithms...'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Mind Maps</h1>
          <p className="text-slate-300 mt-1">Visualize knowledge with AI-generated mind maps</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Mind Map
        </button>
      </div>

      {/* AI Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-500/30"
      >
        <div className="flex items-center mb-4">
          <Sparkles className="w-6 h-6 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">AI Mind Map Generation</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-slate-300">Auto-generate from notes & documents</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-slate-300">Interactive constellation view</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            <span className="text-slate-300">Real-time collaboration</span>
          </div>
        </div>
      </motion.div>

      {/* Mind Maps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMindMaps.map((mindMap, index) => (
          <motion.div
            key={mindMap.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            {/* Mind Map Preview */}
            <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Constellation-style preview */}
                <div className="relative w-full h-full">
                  {/* Central node */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Branch nodes */}
                  {[...Array(6)].map((_, i) => {
                    const angle = (i * 60) * (Math.PI / 180);
                    const radius = 60;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-80"
                        style={{
                          transform: `translate(${x - 16}px, ${y - 16}px)`
                        }}
                      />
                    );
                  })}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {[...Array(6)].map((_, i) => {
                      const angle = (i * 60) * (Math.PI / 180);
                      const radius = 60;
                      const x = Math.cos(angle) * radius + 96; // 96 = half width
                      const y = Math.sin(angle) * radius + 96; // 96 = half height
                      
                      return (
                        <line
                          key={i}
                          x1="96"
                          y1="96"
                          x2={x}
                          y2={y}
                          stroke="rgba(139, 92, 246, 0.3)"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {mindMap.title}
                </h3>
                {mindMap.isCollaborative && (
                  <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-500/30">
                    Collaborative
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {mindMap.preview}
              </p>

              <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                <span>{mindMap.nodeCount} nodes</span>
                <span>{new Date(mindMap.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-300">
                  Open
                </button>
                <button className="bg-gray-700 hover:bg-slate-600 text-slate-300 p-2 rounded-lg transition-colors">
                  <Share className="w-4 h-4" />
                </button>
                <button className="bg-gray-700 hover:bg-slate-600 text-slate-300 p-2 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create New Mind Map Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Create New Mind Map</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-left">
            <Brain className="w-6 h-6 mb-2" />
            <div className="font-semibold">From Notes</div>
            <div className="text-sm opacity-90">Generate from existing notes</div>
          </button>
          
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-left">
            <Plus className="w-6 h-6 mb-2" />
            <div className="font-semibold">From Scratch</div>
            <div className="text-sm opacity-90">Start with a blank canvas</div>
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-left">
            <Share className="w-6 h-6 mb-2" />
            <div className="font-semibold">Collaborative</div>
            <div className="text-sm opacity-90">Invite others to collaborate</div>
          </button>
        </div>
      </motion.div>

      {/* Empty State */}
      {mockMindMaps.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No mind maps yet</h3>
          <p className="text-slate-500 mb-6">
            Create your first mind map to visualize and organize your knowledge
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300">
            Create Your First Mind Map
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MindMaps;