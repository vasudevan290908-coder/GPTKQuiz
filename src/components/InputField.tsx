import React, { useState } from 'react';

interface InputFieldProps {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  actionText?: string;
  onActionClick?: () => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  actionText,
  onActionClick
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const computedType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-xs font-bold tracking-wider text-gray-300">
            {label}
          </label>
          {actionText && (
            <button
              type="button"
              onClick={onActionClick}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 underline"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          type={computedType}
          required
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-3.5 px-4 pr-11 bg-white/[0.05] border border-white/15 rounded-[10px] font-medium text-sm text-white placeholder-slate-400/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.35),0_1px_1px_rgba(255,255,255,0.08)] transition-all duration-200 hover:bg-white/[0.08] hover:border-white/25 focus:outline-none focus:border-sky-400/60 focus:bg-white/[0.09] focus:shadow-[0_0_16px_rgba(56,189,248,0.25),inset_0_2px_4px_rgba(0,0,0,0.25)]"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password (block)" : "Show password (unblock)"}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 transition-all duration-150 active:scale-90"
          >
            {showPassword ? (
              // Unblocked / Visible: Open Eye icon
              <svg className="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              // Blocked / Hidden: Eye with diagonal slash (Exact image match)
              <svg className="w-5 h-5 text-gray-400 hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
