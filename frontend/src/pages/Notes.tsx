import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Tag, Calendar, Sparkles } from 'lucide-react';

const Notes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockNotes = [
    {
      id: '1',
      title: 'Quantum Physics Fundamentals',
      content: 'Introduction to quantum mechanics and wave-particle duality...',
      aiSummary: 'Covers basic quantum principles, uncertainty principle, and wave functions.',
      aiTags: ['physics', 'quantum', 'mechanics', 'waves'],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      content: 'Key organic chemistry reactions and mechanisms...',
      aiSummary: 'Overview of substitution, elimination, and addition reactions.',
      aiTags: ['chemistry', 'organic', 'reactions', 'mechanisms'],
      createdAt: '2024-01-14T09:15:00Z',
      updatedAt: '2024-01-14T16:45:00Z'
    },
    {
      id: '3',
      title: 'Machine Learning Algorithms',
      content: 'Supervised and unsupervised learning techniques...',
      aiSummary: 'Comparison of ML algorithms including neural networks and decision trees.',
      aiTags: ['machine learning', 'AI', 'algorithms', 'data science'],
      createdAt: '2024-01-13T11:00:00Z',
      updatedAt: '2024-01-13T17:30:00Z'
    }
  ];

  const filteredNotes = mockNotes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.aiTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Notes</h1>
          <p className="text-slate-300 mt-1">Organize your thoughts with AI-powered insights</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search notes, tags, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-slate-400">AI Enhanced</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {note.title}
            </h3>

            <p className="text-slate-300 text-sm mb-4 line-clamp-3">
              {note.content}
            </p>

            {/* AI Summary */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-4">
              <div className="flex items-center mb-2">
                <Sparkles className="w-3 h-3 text-purple-400 mr-1" />
                <span className="text-xs text-purple-300 font-medium">AI Summary</span>
              </div>
              <p className="text-xs text-slate-300">{note.aiSummary}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {note.aiTags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700 text-slate-300"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {note.aiTags.length > 3 && (
                <span className="text-xs text-slate-400">+{note.aiTags.length - 3} more</span>
              )}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
              <span>
                {Math.floor(Math.random() * 5) + 1} min read
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            {searchTerm ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="text-slate-500 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Create your first note to get started with AI-powered studying'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
            >
              Create Your First Note
            </button>
          )}
        </motion.div>
      )}

      {/* Create Note Modal - Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Create New Note</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Note title..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Start writing your note... AI will automatically generate tags and summary!"
                rows={8}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300">
                Create Note
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Notes;