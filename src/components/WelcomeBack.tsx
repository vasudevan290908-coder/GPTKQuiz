import React from 'react';

interface WelcomeBackProps {
  onReturnToLogin: () => void;
}

export const WelcomeBack: React.FC<WelcomeBackProps> = ({ onReturnToLogin }) => {
  return (
    <section className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center items-center text-center h-full w-full flex-1">
      <div className="max-w-sm space-y-5">
        {/* Clickable Badge Icon → Return to Login */}
        <button
          type="button"
          onClick={onReturnToLogin}
          className="w-14 h-14 rounded-[14px] border border-sky-400/40 flex items-center justify-center mx-auto transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(56, 189, 248, 0.12)',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          <svg className="w-7 h-7 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
          Welcome Back!
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-300 font-normal leading-relaxed px-2">
          Already registered your student account? Sign in with your roll number and password to start.
        </p>

        {/* Return to Login Button — Full-width gradient */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onReturnToLogin}
            style={{
              boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4), 0 0 20px rgba(56, 189, 248, 0.15)'
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 hover:shadow-[0_16px_36px_-4px_rgba(56,189,248,0.7),0_0_25px_rgba(56,189,248,0.35)] border border-sky-400/30 rounded-full text-white font-bold text-sm transition-all duration-200 active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Login</span>
          </button>
        </div>
      </div>
    </section>
  );
};
