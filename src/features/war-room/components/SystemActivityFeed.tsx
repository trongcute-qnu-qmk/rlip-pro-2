import React, { useState, useEffect } from 'react';

interface Log {
  id: number;
  time: string;
  message: string;
}

const INITIAL_LOGS: Log[] = [
  { id: 1, time: '10:42', message: 'Market data synchronized' },
  { id: 2, time: '10:43', message: 'Risk engine completed baseline check' },
];

export const SystemActivityFeed: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>(INITIAL_LOGS);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLogs(prev => [...prev, { id: 3, time: '10:44', message: 'Buffett AI finished fundamental analysis' }]);
    }, 3000);

    const timer2 = setTimeout(() => {
      setLogs(prev => [...prev, { id: 4, time: '10:45', message: 'Portfolio strategy dynamically optimized' }]);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-black bg-opacity-40 backdrop-blur-md border border-white border-opacity-10 rounded-lg p-4 shadow-2xl z-50">
      <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" style={{ animation: 'aiPulse 3s infinite' }}></span>
        System Activity
      </h4>
      <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
        {logs.map((log) => (
          <div key={log.id} className="text-xs flex gap-3 animate-fade-in-up">
            <span className="text-secondary opacity-70 whitespace-nowrap">{log.time}</span>
            <span className="text-primary opacity-90"><span className="text-signal-bull mr-1">✓</span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
