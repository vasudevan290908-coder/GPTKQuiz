import React, { useState, useEffect } from 'react';
import { GoogleButton } from './GoogleButton';
import { InputField } from './InputField';

interface StudentLoginProps {
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onGoogleAuth?: (role: 'student' | 'teacher') => void;
  registeredIdentifier?: string;
  loginNotification?: string;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ 
  onLoginSuccess, 
  onSwitchToRegister, 
  onGoogleAuth,
  registeredIdentifier,
  loginNotification
}) => {
  const [identifier, setIdentifier]   = useState('');
  const [password, setPassword]       = useState('');
  const [loginStatus, setLoginStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (registeredIdentifier) {
      setIdentifier(registeredIdentifier);
    }
  }, [registeredIdentifier]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const idTrim = identifier.trim();
    const passTrim = password.trim();

    let users: any[] = [];
    try {
      users = JSON.parse(localStorage.getItem('portal_registered_users') || '[]');
    } catch (err) {
      users = [];
    }

    const foundUser = users.find((u: any) => 
      (u.rollNo && u.rollNo.toLowerCase() === idTrim.toLowerCase()) ||
      (u.email && u.email.toLowerCase() === idTrim.toLowerCase()) ||
      (u.name && u.name.toLowerCase() === idTrim.toLowerCase())
    );

    if (foundUser) {
      if (foundUser.password === passTrim) {
        setLoginStatus({ type: 'success', text: `Welcome back, ${foundUser.name}! Logging you into the exam session...` });
        if (onLoginSuccess) onLoginSuccess();
        return;
      } else {
        setLoginStatus({ type: 'error', text: 'Incorrect password for this Register No. Please try again.' });
        return;
      }
    }

    // Demo fallback credentials
    if ((idTrim.toLowerCase() === 'student' || idTrim.toLowerCase() === '2026cs101') && passTrim === 'student123') {
      setLoginStatus({ type: 'success', text: 'Welcome, Demo Student! Access granted.' });
      if (onLoginSuccess) onLoginSuccess();
      return;
    }

    setLoginStatus({ type: 'error', text: 'Register No. or Password not recognized. If new, sign up first.' });
  };

  return (
    <section className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between h-full w-full flex-1">
      <div>
        <div className="text-center mb-6">
          <div 
            className="w-12 h-12 rounded-[14px] border border-sky-400/40 flex items-center justify-center mx-auto mb-3"
            style={{
              background: 'rgba(56, 189, 248, 0.12)',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <svg className="w-6 h-6 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            Student Sign In
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1.5 tracking-normal">
            Access your proctored examination
          </p>
        </div>

        {loginNotification && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{loginNotification}</span>
          </div>
        )}

        {loginStatus && (
          <div className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn ${
            loginStatus.type === 'success' 
              ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300' 
              : 'bg-rose-500/20 border border-rose-400/40 text-rose-300'
          }`}>
            {loginStatus.type === 'success' ? (
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{loginStatus.text}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="student-username"
            type="text"
            placeholder="Register No. / Student Roll ID"
            value={identifier}
            onChange={(v) => { setIdentifier(v); setLoginStatus(null); }}
          />

          <InputField
            id="student-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(v) => { setPassword(v); setLoginStatus(null); }}
          />

          <button
            type="submit"
            style={{
              boxShadow: '0 10px 30px -5px rgba(139, 92, 246, 0.55), 0 0 20px rgba(236, 72, 153, 0.2)'
            }}
            className="w-full mt-3 py-3.5 px-5 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-400 hover:via-purple-400 hover:to-pink-400 hover:shadow-[0_16px_36px_-4px_rgba(139,92,246,0.75),0_0_25px_rgba(236,72,153,0.35)] text-white font-bold text-sm rounded-full transition-all duration-200 active:scale-[0.98]"
          >
            Sign In to Exam
          </button>
        </form>

        <div className="relative flex items-center justify-center my-5">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute bg-slate-900/70 backdrop-blur-md px-3 text-xs font-medium text-slate-300">
            or continue with
          </span>
        </div>

        <GoogleButton
          label="Continue with Google"
          onClick={() => onGoogleAuth && onGoogleAuth('student')}
        />

        <div className="relative flex items-center justify-center mt-9 mb-4">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute bg-slate-900/80 backdrop-blur-md px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            — NEW STUDENT? —
          </span>
        </div>

        <button
          type="button"
          onClick={onSwitchToRegister}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
          }}
          className="w-full py-3.5 px-4 rounded-full border border-white/15 text-white font-bold text-sm transition-all duration-200 hover:bg-white/15 hover:border-white/35 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35),0_0_15px_rgba(255,255,255,0.12)] active:scale-[0.98]"
        >
          Sign Up New Student
        </button>
      </div>
    </section>
  );
};
