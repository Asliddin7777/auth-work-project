import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-4">
      <div className="bg-white p-8 rounded-full shadow-lg mb-6 animate-bounce">
        <Ghost size={64} className="text-indigo-500" />
      </div>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-sm">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;