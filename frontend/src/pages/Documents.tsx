import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, MessageCircle, Brain, Zap } from 'lucide-react';

const Documents: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload
    console.log('Files dropped:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const mockDocuments = [
    {
      id: '1',
      filename: 'Physics_Textbook_Ch5.pdf',
      originalFilename: 'Physics Textbook Chapter 5.pdf',
      fileType: 'application/pdf',
      fileSize: 2048576,
      aiSummary: 'Chapter covers electromagnetic waves, light properties, and optical phenomena.',
      aiTags: ['physics', 'electromagnetic', 'optics', 'waves'],
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      filename: 'Chemistry_Lab_Report.docx',
      originalFilename: 'Organic Chemistry Lab Report.docx',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      fileSize: 1024000,
      aiSummary: 'Lab report on synthesis of aspirin, including methodology and results analysis.',
      aiTags: ['chemistry', 'lab', 'synthesis', 'aspirin'],
      createdAt: '2024-01-14T14:20:00Z'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Documents</h1>
        <p className="text-slate-300 mt-1">Upload and chat with your study materials</p>
      </div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl border border-gray-700"
      >
        <div
          {...getRootProps()}
          className={`p-8 text-center cursor-pointer transition-all duration-300 rounded-xl ${
            isDragActive 
              ? 'border-2 border-dashed border-purple-400 bg-purple-500/10' 
              : 'border-2 border-dashed border-gray-600 hover:border-slate-500'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragActive ? 'text-purple-400' : 'text-slate-400'}`} />
          <h3 className="text-xl font-semibold text-white mb-2">
            {isDragActive ? 'Drop files here' : 'Upload your documents'}
          </h3>
          <p className="text-slate-300 mb-4">
            Drag & drop files or click to browse
          </p>
          <p className="text-sm text-slate-400">
            Supports PDF, DOCX, PPT, PPTX, images, and text files (max 50MB)
          </p>
        </div>
      </motion.div>

      {/* AI Features Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600"
      >
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">AI-Powered Document Analysis</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-slate-300">Auto-generate summaries</span>
          </div>
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">Chat with documents</span>
          </div>
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-green-400" />
            <span className="text-slate-300">Extract key concepts</span>
          </div>
        </div>
      </motion.div>

      {/* Documents List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Your Documents</h2>
        
        {mockDocuments.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">
                    {doc.originalFilename}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    {(doc.fileSize / 1024 / 1024).toFixed(1)} MB • {new Date(doc.createdAt).toLocaleDateString()}
                  </p>
                  
                  {/* AI Summary */}
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-3">
                    <div className="flex items-center mb-2">
                      <Brain className="w-4 h-4 text-purple-400 mr-1" />
                      <span className="text-xs text-purple-300 font-medium">AI Summary</span>
                    </div>
                    <p className="text-sm text-slate-300">{doc.aiSummary}</p>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {doc.aiTags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-700 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 ml-4">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </button>
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300">
                  Flashcards
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300">
                  Quiz
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {mockDocuments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No documents uploaded</h3>
          <p className="text-slate-500">
            Upload your first document to start chatting with AI and generating study materials
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Documents;