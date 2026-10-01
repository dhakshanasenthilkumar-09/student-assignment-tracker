import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  assignment,
  onClose,
  onConfirm
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !assignment) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-icon-badge">
          <AlertTriangle size={32} />
        </div>

        <h2 className="delete-modal-title">Delete Assignment?</h2>
        <p className="delete-modal-desc">
          Are you sure you want to delete this assignment? This action is permanent and cannot be undone.
        </p>

        <div className="delete-preview-box">
          <div className="delete-preview-subject">{assignment.subject}</div>
          <div className="delete-preview-title">{assignment.title}</div>
          {assignment.dueDate && (
            <div className="delete-preview-due">Due: {assignment.dueDate}</div>
          )}
        </div>

        <div className="modal-footer delete-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onConfirm(assignment.id)}
          >
            <Trash2 size={16} />
            <span>Yes, Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
