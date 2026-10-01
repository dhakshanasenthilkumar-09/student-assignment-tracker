import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Calendar, 
  Tag, 
  AlertCircle, 
  Check, 
  Plus, 
  Flame, 
  Clock, 
  FileText,
  Sparkles
} from 'lucide-react';
import { getTodayDateString } from '../utils/dateUtils';

export default function AssignmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  availableSubjects = []
}) {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    customSubject: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isCustomSubject, setIsCustomSubject] = useState(false);

  // Sync state whenever modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        const isExistingSubject = availableSubjects.includes(initialData.subject);
        setFormData({
          title: initialData.title || '',
          subject: isExistingSubject ? initialData.subject : 'CUSTOM',
          customSubject: isExistingSubject ? '' : initialData.subject || '',
          dueDate: initialData.dueDate || '',
          priority: initialData.priority || 'Medium',
          status: initialData.status || 'Pending',
          description: initialData.description || '',
        });
        setIsCustomSubject(!isExistingSubject);
      } else {
        // Reset to fresh form
        setFormData({
          title: '',
          subject: availableSubjects[0] || 'Database Systems',
          customSubject: '',
          dueDate: getTodayDateString(),
          priority: 'Medium',
          status: 'Pending',
          description: '',
        });
        setIsCustomSubject(false);
      }
      setErrors({});
    }
  }, [isOpen, initialData, availableSubjects]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Assignment title is required.';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title should be at least 3 characters long.';
    }

    // Subject validation
    const resolvedSubject = isCustomSubject 
      ? formData.customSubject.trim() 
      : formData.subject;

    if (!resolvedSubject) {
      newErrors.subject = 'Please select or enter a subject.';
    }

    // Due Date validation
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    // Priority validation
    if (!['Low', 'Medium', 'High'].includes(formData.priority)) {
      newErrors.priority = 'Please select a valid priority.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const resolvedSubject = isCustomSubject 
      ? formData.customSubject.trim() 
      : formData.subject;

    const submissionPayload = {
      ...(initialData || {}),
      title: formData.title.trim(),
      subject: resolvedSubject,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
      description: formData.description.trim(),
    };

    onSubmit(submissionPayload);
  };

  const handleSubjectSelectChange = (e) => {
    const val = e.target.value;
    if (val === 'CUSTOM') {
      setIsCustomSubject(true);
      setFormData(prev => ({ ...prev, subject: 'CUSTOM' }));
    } else {
      setIsCustomSubject(false);
      setFormData(prev => ({ ...prev, subject: val }));
    }
    if (errors.subject) {
      setErrors(prev => ({ ...prev, subject: null }));
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-title-group">
            <div className="modal-icon-badge">
              {isEditMode ? <FileText size={20} /> : <Plus size={20} />}
            </div>
            <div>
              <h2 className="modal-title">
                {isEditMode ? 'Edit Assignment' : 'Add New Assignment'}
              </h2>
              <p className="modal-subtitle">
                {isEditMode 
                  ? 'Update deadline, priority, or status details' 
                  : 'Track a new coursework task or project milestone'}
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {/* Assignment Title */}
          <div className="form-group">
            <label htmlFor="assignment-title" className="form-label required">
              Assignment Title
            </label>
            <input
              id="assignment-title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder="e.g., Computer Architecture Cache Lab Report"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: null });
              }}
              autoFocus
            />
            {errors.title && (
              <div className="form-error-message">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Subject Row */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="assignment-subject" className="form-label required">
                Subject / Course
              </label>
              <select
                id="assignment-subject"
                className={`form-select ${errors.subject ? 'input-error' : ''}`}
                value={isCustomSubject ? 'CUSTOM' : formData.subject}
                onChange={handleSubjectSelectChange}
              >
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
                <option value="CUSTOM">+ Add New Subject...</option>
              </select>
            </div>

            {/* Custom Subject text input if chosen */}
            {isCustomSubject && (
              <div className="form-group flex-1">
                <label htmlFor="custom-subject" className="form-label required">
                  New Subject Name
                </label>
                <input
                  id="custom-subject"
                  type="text"
                  className={`form-input ${errors.subject ? 'input-error' : ''}`}
                  placeholder="e.g., Machine Learning"
                  value={formData.customSubject}
                  onChange={(e) => {
                    setFormData({ ...formData, customSubject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: null });
                  }}
                />
              </div>
            )}
          </div>
          {errors.subject && (
            <div className="form-error-message">
              <AlertCircle size={14} />
              <span>{errors.subject}</span>
            </div>
          )}

          {/* Due Date & Status Row */}
          <div className="form-row">
            {/* Due Date */}
            <div className="form-group flex-1">
              <label htmlFor="assignment-due-date" className="form-label required">
                Due Date
              </label>
              <div className="date-input-wrapper">
                <input
                  id="assignment-due-date"
                  type="date"
                  className={`form-input date-picker-input ${errors.dueDate ? 'input-error' : ''}`}
                  value={formData.dueDate}
                  onChange={(e) => {
                    setFormData({ ...formData, dueDate: e.target.value });
                    if (errors.dueDate) setErrors({ ...errors, dueDate: null });
                  }}
                />
              </div>
              {errors.dueDate && (
                <div className="form-error-message">
                  <AlertCircle size={14} />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>

            {/* Status (Pending / Completed) */}
            <div className="form-group flex-1">
              <label className="form-label">Status</label>
              <div className="status-selector-group">
                <button
                  type="button"
                  className={`status-selector-btn ${formData.status === 'Pending' ? 'active pending' : ''}`}
                  onClick={() => setFormData({ ...formData, status: 'Pending' })}
                >
                  <Clock size={15} />
                  <span>Pending</span>
                </button>
                <button
                  type="button"
                  className={`status-selector-btn ${formData.status === 'Completed' ? 'active completed' : ''}`}
                  onClick={() => setFormData({ ...formData, status: 'Completed' })}
                >
                  <Check size={15} />
                  <span>Completed</span>
                </button>
              </div>
            </div>
          </div>

          {/* Priority Selection */}
          <div className="form-group">
            <label className="form-label required">Priority Level</label>
            <div className="priority-button-group">
              {[
                { level: 'High', icon: Flame, class: 'priority-btn-high', desc: 'Urgent' },
                { level: 'Medium', icon: Clock, class: 'priority-btn-medium', desc: 'Standard' },
                { level: 'Low', icon: Check, class: 'priority-btn-low', desc: 'Relaxed' },
              ].map(({ level, icon: Icon, class: btnClass, desc }) => (
                <button
                  key={level}
                  type="button"
                  className={`priority-select-btn ${btnClass} ${formData.priority === level ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, priority: level })}
                >
                  <Icon size={16} />
                  <span className="priority-btn-title">{level}</span>
                  <span className="priority-btn-desc">{desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="assignment-desc" className="form-label">
              Description / Notes (Optional)
            </label>
            <textarea
              id="assignment-desc"
              rows={3}
              className="form-textarea"
              placeholder="Add key requirements, submission guidelines, links or rubric notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
