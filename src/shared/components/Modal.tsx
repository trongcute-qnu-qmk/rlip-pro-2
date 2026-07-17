import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--spacing-4)'
        }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'relative',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              width: '100%',
              maxWidth: '500px',
              padding: 'var(--spacing-6)',
              overflow: 'hidden'
            }}
          >
            {title && <h2 style={{ fontSize: 'var(--font-xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-4)', color: 'var(--color-text)' }}>{title}</h2>}
            <button 
              onClick={onClose} 
              style={{
                position: 'absolute', top: 'var(--spacing-4)', right: 'var(--spacing-4)',
                background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer'
              }}
            >
              ✕
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
