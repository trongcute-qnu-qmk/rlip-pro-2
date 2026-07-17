import React, { useState, useEffect } from 'react';

interface Log {
  id: number;
  time: string;
  message: string;
}

const INITIAL_LOGS: Log[] = [
  { id: 1, time: '10:42:01', message: 'System boot sequence initiated' },
  { id: 2, time: '10:42:05', message: 'AI Agent Council online' },
];

export const ActivityFeed: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>(INITIAL_LOGS);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLogs(prev => [...prev, { id: 3, time: '10:42:15', message: 'Market data stream synchronized' }]);
    }, 3000);

    const timer2 = setTimeout(() => {
      setLogs(prev => [...prev, { id: 4, time: '10:42:22', message: 'Awaiting target ticker input...' }]);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed bottom-[var(--space-3)] right-[var(--space-3)] w-80 bg-black bg-opacity-60 backdrop-blur-md border border-[var(--color-border)] rounded p-[var(--space-2)] shadow-2xl z-50">
      <div className="text-[10px] font-bold text-white opacity-50 uppercase tracking-widest mb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-purple)] animate-pulse-status"></span>
        System Log
      </div>
      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-2 custom-scrollbar font-mono">
        {logs.map((log) => (
          <div key={log.id} className="text-[10px] flex gap-2 animate-fade-in-up">
            <span className="text-white opacity-30 whitespace-nowrap">[{log.time}]</span>
            <span className="text-[var(--color-ai-cyan)] opacity-80">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
