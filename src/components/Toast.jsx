import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="toast-icon success" size={20} />,
    error: <AlertCircle className="toast-icon error" size={20} />,
    info: <Info className="toast-icon info" size={20} />,
  };

  return (
    <div className={`toast-container ${toast.type || 'info'}`} role="status" aria-live="polite">
      <div className="toast-content">
        {iconMap[toast.type] || iconMap.info}
        <div className="toast-message-box">
          {toast.title && <div className="toast-title">{toast.title}</div>}
          <div className="toast-text">{toast.message}</div>
        </div>
      </div>
      <button 
        onClick={onClose} 
        className="toast-close-btn" 
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
