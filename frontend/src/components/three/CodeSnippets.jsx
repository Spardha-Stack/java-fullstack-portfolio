import React from 'react';

const SNIPPETS = [
  { text: 'public class Main {', top: '12%', left: '4%', delay: 0 },
  { text: 'const [state, setState] = useState();', top: '22%', left: '68%', delay: 1.2 },
  { text: '@RestController', top: '68%', left: '6%', delay: 2.1 },
  { text: 'SELECT * FROM projects;', top: '78%', left: '62%', delay: 0.6 },
  { text: 'def predict(model, X):', top: '48%', left: '80%', delay: 1.8 },
];

export default function CodeSnippets() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block z-[1]">
      {SNIPPETS.map((s, i) => (
        <span
          key={i}
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
          className="absolute font-mono text-[11px] text-neon-cyan/25 whitespace-nowrap animate-[floatSnippet_9s_ease-in-out_infinite]"
        >
          {s.text}
        </span>
      ))}
      <style>{`
        @keyframes floatSnippet {
          0%, 100% { transform: translateY(0px); opacity: 0.25; }
          50% { transform: translateY(-18px); opacity: 0.55; }
        }
      `}</style>
    </div>
  );
}
