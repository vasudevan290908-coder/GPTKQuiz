import React, { useState, useEffect } from 'react';
import { GoogleButton } from './GoogleButton';

/* Floating Outlined Input Field (Matching user Image 3 style) */
interface OutlinedFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

const OutlinedField: React.FC<OutlinedFieldProps> = ({ id, label, type = 'text', placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPass = type === 'password';
  const inputType = isPass ? (show ? 'text' : 'password') : type;

  return (
    <div className="relative">
      <fieldset className={`border rounded-[14px] px-3.5 pt-1.5 pb-2.5 transition-all duration-200 ${focused ? 'border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.25)]' : 'border-white/20 hover:border-white/35'} bg-white/[0.02]`}>
        <legend className={`text-[11px] font-medium px-1.5 transition-colors duration-200 ${focused ? 'text-sky-400' : 'text-slate-300'}`}>
          {label}
        </legend>
        <div className="flex items-center">
          <input
            id={id}
            type={inputType}
            required
            placeholder={placeholder || ''}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-white font-medium text-sm outline-none placeholder-slate-500/50"
          />
          {isPass && (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="p-1 text-gray-400 hover:text-sky-300 transition-colors flex-shrink-0"
            >
              {show ? (
                <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          )}
        </div>
      </fieldset>
    </div>
  );
};

interface StudentRegisterProps {
  onRegisterSuccess?: (data: { identifier: string; message: string }) => void;
  onGoogleAuth?: (role: 'student' | 'teacher') => void;
  prefillData?: { name?: string; email?: string } | null;
}

export const StudentRegister: React.FC<StudentRegisterProps> = ({ 
  onRegisterSuccess,
  onGoogleAuth,
  prefillData
}) => {
  const [fullName, setFullName] = useState(prefillData?.name || '');
  const [rollNo, setRollNo]     = useState('');
  const [password, setPassword] = useState('');
  const [regError, setRegError] = useState('');

  useEffect(() => {
    if (prefillData) {
      if (prefillData.name) setFullName(prefillData.name);
    }
  }, [prefillData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fName = fullName.trim();
    const rNo = rollNo.trim();
    const pass = password.trim();

    if (!fName || !rNo || !pass) {
      setRegError('Please fill in all required fields.');
      return;
    }

    let existingUsers: any[] = [];
    try {
      existingUsers = JSON.parse(localStorage.getItem('portal_registered_users') || '[]');
    } catch (err) {
      existingUsers = [];
    }

    existingUsers = existingUsers.filter((u: any) => u.rollNo?.toLowerCase() !== rNo.toLowerCase());
    const newUser = {
      name: fName,
      rollNo: rNo,
      email: prefillData?.email || '',
      password: pass,
      registeredAt: new Date().toISOString()
    };
    existingUsers.push(newUser);
    localStorage.setItem('portal_registered_users', JSON.stringify(existingUsers));

    if (onRegisterSuccess) {
      onRegisterSuccess({
        identifier: rNo,
        message: `Account created for ${fName}! Please enter your password to sign in.`
      });
    }
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
            Create Account
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-normal mt-1.5 tracking-normal">
            Register your student examination profile
          </p>
        </div>

        {prefillData && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center gap-2.5 text-xs text-emerald-300 animate-fadeIn">
            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Google connected ({prefillData.email}). Enter your Register No. &amp; Password.</span>
          </div>
        )}

        {regError && (
          <div className="mb-3 p-2.5 rounded-lg bg-rose-500/20 border border-rose-400/40 text-xs text-rose-300">
            {regError}
          </div>
        )}

        {/* Floating Outlined Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <OutlinedField
            id="register-name"
            label="Full name"
            type="text"
            placeholder="e.g. Vasudevan"
            value={fullName}
            onChange={(v) => { setFullName(v); setRegError(''); }}
          />

          <OutlinedField
            id="register-roll"
            label="Register No. / Student Roll ID"
            type="text"
            placeholder="e.g. 2026CS101"
            value={rollNo}
            onChange={(v) => { setRollNo(v); setRegError(''); }}
          />

          <OutlinedField
            id="register-password"
            label="Create Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(v) => { setPassword(v); setRegError(''); }}
          />

          {/* Terms & Privacy Disclaimer */}
          <p className="text-[11px] text-slate-400 leading-relaxed text-center px-1 pt-1">
            By clicking &quot;Continue&quot;, you agree to our <a href="#" className="text-sky-400 hover:underline">Terms</a> and have read our <a href="#" className="text-sky-400 hover:underline">Privacy Policy</a>.
          </p>

          {/* Solid White Pill Continue Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-slate-200 text-black font-semibold text-sm transition-all duration-200 shadow-[0_6px_25px_rgba(255,255,255,0.25)] active:scale-[0.98]"
          >
            Continue
          </button>
        </form>

        <div className="relative flex items-center justify-center my-5">
          <div className="w-full border-t border-white/10"></div>
          <span className="absolute bg-[#111836]/80 backdrop-blur-md px-3 text-xs font-medium text-slate-300">
            or register with
          </span>
        </div>

        <GoogleButton
          label="Sign up with Google"
          onClick={() => onGoogleAuth && onGoogleAuth('student')}
        />
      </div>
    </section>
  );
};


