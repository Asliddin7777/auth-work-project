import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Clock, Fingerprint, Activity } from 'lucide-react';
import { api } from '../services/mockBackend';
import { useToast } from '../components/Toast';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const testApi = async () => {
    setApiStatus('loading');
    try {
      const res = await api.test();
      if (res.success) {
        setApiStatus('success');
        addToast('success', res.message);
      }
    } catch (e) {
      setApiStatus('error');
      addToast('error', 'API connection failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-slate-500">Welcome back, {user?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Account Role</p>
            <p className="font-semibold capitalize text-slate-800">{user?.role}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-lg text-green-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-semibold text-slate-800">Active</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">Member Since</p>
            <p className="font-semibold text-slate-800">
              {new Date(user?.createdAt || '').toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
            <Fingerprint size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500">User ID</p>
            <p className="font-semibold text-slate-800 font-mono text-xs">
              {user?.id.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-lg mb-4">Profile Information</h3>
          <div className="space-y-4">
             <div className="flex justify-between py-3 border-b border-slate-50">
               <span className="text-slate-500">Full Name</span>
               <span className="font-medium">{user?.name}</span>
             </div>
             <div className="flex justify-between py-3 border-b border-slate-50">
               <span className="text-slate-500">Email Address</span>
               <span className="font-medium">{user?.email}</span>
             </div>
             <div className="flex justify-between py-3 border-b border-slate-50">
               <span className="text-slate-500">Security</span>
               <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded">2FA Enabled</span>
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-lg mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-600 mb-3">
                Verify backend connectivity by testing the API endpoint.
              </p>
              <button
                onClick={testApi}
                disabled={apiStatus === 'loading'}
                className="text-sm bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {apiStatus === 'loading' ? 'Connecting...' : 'Test API Connection'}
              </button>
              {apiStatus === 'success' && (
                <div className="mt-3 text-sm text-green-600 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-600"></div>
                   Connection established: 200 OK
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;