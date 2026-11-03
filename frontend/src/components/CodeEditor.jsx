import React, { useRef, useEffect } from 'react';
import { RotateCcw, Copy, Check, Code } from 'lucide-react';

export const CodeEditor = ({
  code,
  onChange,
  language = 'javascript',
  onLanguageChange,
  onReset
}) => {
  const textareaRef = useRef(null);
  const [copied, setCopied] = React.useState(false);

  const lines = code ? code.split('\n') : [''];
  const lineCount = lines.length;

  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }

    // Auto-close brackets & quotes
    const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
    if (pairs[e.key]) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (start === end) {
        e.preventDefault();
        const closing = pairs[e.key];
        const newCode = code.substring(0, start) + e.key + closing + code.substring(end);
        onChange(newCode);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        }, 0);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d121f] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Editor Header Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#111726] border-b border-slate-800 text-xs">
        
        {/* Language selector */}
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-blue-400" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="bg-[#0a0d14] text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="javascript">JavaScript (Node.js)</option>
            <option value="python">Python 3</option>
            <option value="cpp">C++ (GCC)</option>
            <option value="java">Java (OpenJDK)</option>
          </select>
        </div>

        {/* Toolbar actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset to starter template"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleCopy}
            title="Copy code"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Main Surface with Line Numbers */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-sm">
        
        {/* Line Numbers Gutter */}
        <div className="w-12 bg-[#090d16] text-slate-600 select-none py-3 text-right pr-3 font-mono text-xs border-r border-slate-800/80 overflow-hidden leading-6">
          {Array.from({ length: Math.max(lineCount, 15) }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea Area */}
        <div className="flex-1 relative overflow-auto">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            className="w-full h-full min-h-[350px] p-3 bg-transparent text-slate-100 font-mono text-xs md:text-sm resize-none focus:outline-none leading-6 selection:bg-blue-600/40 tab-4"
            placeholder="// Write your solution here..."
          />
        </div>
      </div>

      {/* Status Footer */}
      <div className="px-4 py-1.5 bg-[#090d16] border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
        <span>Lines: {lineCount} | Chars: {code.length}</span>
        <span className="capitalize">{language} Mode</span>
      </div>
    </div>
  );
};
