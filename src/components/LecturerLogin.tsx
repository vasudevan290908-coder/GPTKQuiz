import React, { useState } from 'react';
import { GoogleButton } from './GoogleButton';
import { InputField } from './InputField';

interface LecturerLoginProps {
  onLoginSuccess?: () => void;
  onSwitchToTeacherRegister?: () => void;
  onGoogleAuth?: (role: 'student' | 'teacher') => void;
}

export const LecturerLogin: React.FC<LecturerLoginProps> = ({ 
  onLoginSuccess, 
  onSwitchToTeacherRegister,
  onGoogleAuth
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    if ((cleanUser === 'admin' || cleanUser === 'admin@faculty.edu') && password === 'CSE@2026') {
      setErrorMessage('');
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <section className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full w-full flex-1">
      <div>
        <div className="text-center mb-6">
          {/* Centered Faculty Icon Badge — Transparent Frosted Glass */}
          <div 
            className="w-12 h-12 rounded-[14px] border border-violet-400/40 flex items-center justify-center mx-auto mb-3"
            style={{
              background: 'rgba(168, 85, 247, 0.12)',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <svg className="w-6 h-6 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/>
            </svg>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            Teacher Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1.5 tracking-normal">
            Faculty &amp; Course Supervisors
          </p>
        </div>

        {/* Lecturer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="lecturer-username"
            type="text"
            placeholder="Teacher Username"
            value={username}
            onChange={(val) => {
              setUsername(val);
              if (errorMessage) setErrorMessage('');
            }}
          />

          <InputField
            id="lecturer-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(val) => {
              setPassword(val);
              if (errorMessage) setErrorMessage('');
            }}
          />

          {errorMessage && (
            <p className="text-xs font-semibold text-red-400 tracking-wide">
              {errorMessage}
            </p>
          )}

          {/* Gradient Login Button */}
          <button
            type="submit"
            style={{
              boxShadow: '0 10px 30px -5px rgba(139, 92, 246, 0.55), 0 0 20px rgba(236, 72, 153, 0.2)'
            }}
            className="w-full mt-3 py-3.5 px-5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-400 hover:via-purple-400 hover:to-pink-400 hover:shadow-[0_16px_36px_-4px_rgba(139,92,246,0.75),0_0_25px_rgba(236,72,153,0.35)] text-white font-bold text-sm rounded-full transition-all duration-200 active:scale-[0.98]"
          >
            Teacher Login
          </button>
        </form>

        {/* Minimalist Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute bg-slate-900/70 backdrop-blur-md px-3 text-xs font-medium text-slate-300">
            or continue with
          </span>
        </div>

        {/* Google SSO with Faculty Gmail */}
        <GoogleButton
          label="Continue with Faculty Google"
          onClick={() => onGoogleAuth && onGoogleAuth('teacher')}
        />

        {/* Divider — New Teacher? */}
        <div className="relative flex items-center justify-center mt-9 mb-4">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute bg-[#111836]/80 backdrop-blur-md px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            — NEW TEACHER? —
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSwitchToTeacherRegister && onSwitchToTeacherRegister()}
          style={{
            background: 'rgba(168, 85, 247, 0.05)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(168, 85, 247, 0.08)'
          }}
          className="w-full py-3.5 px-4 rounded-full border border-violet-400/20 text-white font-bold text-sm transition-all duration-200 hover:bg-violet-500/10 hover:border-violet-400/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35),0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.98]"
        >
          Sign Up as Teacher
        </button>
      </div>
    </section>
  );
};

