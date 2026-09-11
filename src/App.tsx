import React, { useState } from 'react';
import { StudentLogin } from './components/StudentLogin';
import { LecturerLogin } from './components/LecturerLogin';
import { StudentRegister } from './components/StudentRegister';
import { WelcomeBack } from './components/WelcomeBack';

/* Google OAuth Authentication Modal Component */
interface GoogleAuthModalProps {
  isOpen: boolean;
  role: 'student' | 'teacher';
  onClose: () => void;
  onAuthSuccess: (userData: { name: string; email: string; role: 'student' | 'teacher' }) => void;
}

const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ isOpen, role, onClose, onAuthSuccess }) => {
  const [isLoading, setIsLoading]   = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  if (!isOpen) return null;

  const studentAccounts = [
    { name: 'Rahul Sharma', email: 'rahul.sharma2026@gmail.com', avatarBg: 'bg-emerald-500' },
    { name: 'Priya Patel', email: 'priya.patel@student.university.edu', avatarBg: 'bg-indigo-500' }
  ];

  const facultyAccounts = [
    { name: 'Dr. Rajesh Kumar', email: 'dr.rajesh@faculty.university.edu', avatarBg: 'bg-purple-600' },
    { name: 'Prof. Ananya Sen', email: 'ananya.sen@cse.university.edu', avatarBg: 'bg-pink-600' }
  ];

  const accounts = role === 'teacher' ? facultyAccounts : studentAccounts;

  const handleSelect = (account: { name: string; email: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: account.name,
        email: account.email,
        role: role
      });
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        name: customName.trim(),
        email: customEmail.trim(),
        role: role
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div 
        style={{
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(30px)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
        className="w-full max-w-md p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Close Button */}
        <button 
          type="button" 
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-lg">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Sign in with Google</h3>
          <p className="text-xs text-slate-300 mt-1">
            Choose an account to continue to <span className="text-sky-300 font-semibold">University Portal</span>
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-10 h-10 border-3 border-sky-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-semibold text-sky-300 animate-pulse">
              Authenticating with Google &amp; Redirecting...
            </p>
          </div>
        ) : customMode ? (
          /* Custom Account Form */
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-white/5 border border-white/15 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Google Email</label>
              <input
                type="email"
                required
                placeholder="you@gmail.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-white/5 border border-white/15 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCustomMode(false)}
                className="w-1/2 py-2.5 rounded-full border border-white/20 text-xs font-bold text-white hover:bg-white/10 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-xs font-bold text-white shadow-lg transition-all"
              >
                Authenticate
              </button>
            </div>
          </form>
        ) : (
          /* Account List */
          <div className="space-y-2.5">
            {accounts.map((acc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(acc)}
                className="w-full flex items-center gap-3.5 p-3 rounded-xl border border-white/10 hover:border-sky-400/50 bg-white/[0.04] hover:bg-white/[0.09] transition-all text-left group"
              >
                <div className={`w-9 h-9 rounded-full ${acc.avatarBg} text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow`}>
                  {acc.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate group-hover:text-sky-300 transition-colors">
                    {acc.name}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {acc.email}
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}

            {/* Use Another Account Button */}
            <button
              type="button"
              onClick={() => setCustomMode(true)}
              className="w-full flex items-center gap-3.5 p-3 rounded-xl border border-dashed border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.06] transition-all text-left text-slate-300 hover:text-white"
            >
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-xs font-semibold">Use another account</span>
            </button>
          </div>
        )}

        {/* Privacy Note */}
        <p className="mt-5 text-[11px] text-center text-slate-500 leading-relaxed">
          Google will share your name and email with University Portal for authentication.
        </p>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [isRegisterMode, setIsRegisterMode]         = useState(false);
  const [registerType, setRegisterType]             = useState<'student' | 'teacher'>('student');
  const [googleModal, setGoogleModal]               = useState<{ isOpen: boolean; role: 'student' | 'teacher' }>({ isOpen: false, role: 'student' });
  const [prefillData, setPrefillData]               = useState<{ name?: string; email?: string } | null>(null);
  const [registeredStudentId, setRegisteredStudentId] = useState('');
  const [registeredTeacherId, setRegisteredTeacherId] = useState('');
  const [studentNotice, setStudentNotice]           = useState('');
  const [teacherNotice, setTeacherNotice]           = useState('');

  const handleOpenGoogle = (role: 'student' | 'teacher') => {
    setGoogleModal({ isOpen: true, role });
  };

  const handleGoogleAuthSuccess = (userData: { name: string; email: string; role: 'student' | 'teacher' }) => {
    setPrefillData(userData);
    setRegisterType(userData.role);
    setGoogleModal({ isOpen: false, role: userData.role });
    // Automatically slide to registration view to fill remaining profile info!
    setIsRegisterMode(true);
  };

  const handleStudentRegisterSuccess = ({ identifier, message }: { identifier: string; message: string }) => {
    setRegisteredStudentId(identifier);
    setStudentNotice(message);
    setIsRegisterMode(false);
  };

  const handleTeacherRegisterSuccess = ({ identifier, message }: { identifier: string; message: string }) => {
    setRegisteredTeacherId(identifier);
    setTeacherNotice(message);
    setIsRegisterMode(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#060B18] text-white overflow-hidden selection:bg-white selection:text-black">

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={googleModal.isOpen}
        role={googleModal.role}
        onClose={() => setGoogleModal({ isOpen: false, role: 'student' })}
        onAuthSuccess={handleGoogleAuthSuccess}
      />

      {/* Subtle dark grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'bgMotion 25s linear infinite'
        }}
      />

      {/* Ambient glowing orbs — vibrant backdrop for glass refraction */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute top-10 right-1/3 w-72 h-72 bg-sky-500/15 rounded-full blur-[90px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Main Card — Florin Pop Double Slider (Matching GPTK-QUIZ) */}
      <main className={`slider-main-container ${isRegisterMode ? 'right-panel-active' : ''}`}>
        
        {/* 1. STUDENT SIGN IN FORM (LEFT 50% BY DEFAULT) */}
        <div className="form-container sign-in-container flex flex-col justify-between h-full bg-slate-900/35 overflow-y-auto">
          <StudentLogin 
            onSwitchToRegister={() => {
              setRegisterType('student');
              setIsRegisterMode(true);
            }} 
            onGoogleAuth={handleOpenGoogle}
            registeredIdentifier={registeredStudentId}
            loginNotification={studentNotice}
          />
        </div>

        {/* 2. REGISTRATION FORM (SLIDES IN FROM RIGHT UNDER OVERLAY) */}
        <div className="form-container sign-up-container flex flex-col justify-between h-full bg-[#111836]/35 overflow-y-auto">
          <StudentRegister 
            onRegisterSuccess={handleStudentRegisterSuccess}
            onGoogleAuth={handleOpenGoogle}
            prefillData={prefillData}
          />
        </div>

        {/* 3. SLIDING OVERLAY CONTAINER */}
        <div className="overlay-container">
          <div className="overlay">

            {/* OVERLAY LEFT: Shown when Registration mode is active */}
            <div className="overlay-panel overlay-left overflow-y-auto">
              <WelcomeBack onReturnToLogin={() => setIsRegisterMode(false)} />
            </div>

            {/* OVERLAY RIGHT: Shown by default (Teacher Portal Part) */}
            <div className="overlay-panel overlay-right overflow-y-auto">
              <LecturerLogin 
                onSwitchToTeacherRegister={() => {
                  setRegisterType('teacher');
                  setIsRegisterMode(true);
                }} 
                onGoogleAuth={handleOpenGoogle}
              />
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs font-medium text-gray-500 flex flex-wrap items-center justify-center gap-4 relative z-10">
        <span>© 2026 University Network</span>
        <span>•</span>
        <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
        <span>•</span>
        <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
        <span>•</span>
        <a href="#" className="hover:text-gray-300 transition-colors">Campus IT Help</a>
      </footer>
    </div>
  );
};

export default App;


