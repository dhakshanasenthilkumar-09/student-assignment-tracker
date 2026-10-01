import React, { useState } from 'react';
import { 
  Calendar, 
  Check, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Trash2, 
  Flame, 
  Tag, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { formatDate, getDueStatusInfo } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

export default function AssignmentCard({ 
  assignment, 
  onToggleStatus, 
  onEdit, 
  onDelete,
  layout = 'grid'
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = assignment.status === 'Completed';
  const dueStatus = getDueStatusInfo(assignment.dueDate, assignment.status);

  // Trigger celebratory confetti when completing
  const handleToggle = () => {
    if (!isCompleted) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899']
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }
    }
    onToggleStatus(assignment.id);
  };

  const priorityMeta = {
    High: {
      label: 'High Priority',
      badgeClass: 'priority-high',
      icon: Flame,
    },
    Medium: {
      label: 'Medium Priority',
      badgeClass: 'priority-medium',
      icon: Clock,
    },
    Low: {
      label: 'Low Priority',
      badgeClass: 'priority-low',
      icon: Check,
    },
  };

  const currentPriority = priorityMeta[assignment.priority] || priorityMeta.Medium;
  const PriorityIcon = currentPriority.icon;

  if (layout === 'list') {
    return (
      <div className={`assignment-row ${isCompleted ? 'assignment-completed' : ''} ${dueStatus.type === 'overdue' ? 'assignment-overdue-border' : ''}`}>
        {/* Toggle Checkbox */}
        <div className="row-col row-check">
          <button
            type="button"
            className={`checkbox-circle ${isCompleted ? 'checked' : ''}`}
            onClick={handleToggle}
            title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            aria-label={`Mark ${assignment.title} as ${isCompleted ? 'pending' : 'completed'}`}
          >
            {isCompleted && <Check size={14} className="check-icon" />}
          </button>
        </div>

        {/* Title & Subject */}
        <div className="row-col row-main">
          <div className="row-title-line">
            <span className={`assignment-title ${isCompleted ? 'title-completed' : ''}`}>
              {assignment.title}
            </span>
            <span className="subject-chip">
              <Tag size={12} />
              {assignment.subject}
            </span>
          </div>
          {assignment.description && (
            <p className="row-description">{assignment.description}</p>
          )}
        </div>

        {/* Priority Badge */}
        <div className="row-col row-priority">
          <span className={`priority-pill ${currentPriority.badgeClass}`}>
            <PriorityIcon size={12} />
            {assignment.priority}
          </span>
        </div>

        {/* Due Date & Urgency */}
        <div className="row-col row-date">
          <div className="due-date-container">
            <span className="due-date-text">
              <Calendar size={13} />
              {formatDate(assignment.dueDate)}
            </span>
            <span className={`due-status-pill ${dueStatus.badgeClass}`}>
              {dueStatus.label}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="row-col row-actions">
          <button
            type="button"
            className="action-btn edit-btn"
            onClick={() => onEdit(assignment)}
            title="Edit Assignment"
            aria-label="Edit assignment"
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            className="action-btn delete-btn"
            onClick={() => onDelete(assignment)}
            title="Delete Assignment"
            aria-label="Delete assignment"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Grid Card Layout
  return (
    <article 
      className={`assignment-card ${isCompleted ? 'assignment-completed' : ''} ${dueStatus.type === 'overdue' ? 'assignment-overdue-border' : ''}`}
    >
      {/* Top Header: Subject & Priority */}
      <div className="card-top-header">
        <span className="subject-chip" title={`Subject: ${assignment.subject}`}>
          <Tag size={12} />
          <span>{assignment.subject}</span>
        </span>
        <span className={`priority-pill ${currentPriority.badgeClass}`}>
          <PriorityIcon size={12} />
          <span>{assignment.priority}</span>
        </span>
      </div>

      {/* Main Body: Title & Description */}
      <div className="card-body">
        <h3 className={`assignment-title ${isCompleted ? 'title-completed' : ''}`}>
          {assignment.title}
        </h3>

        {assignment.description && (
          <div className="description-container">
            <p className={`card-description ${isExpanded ? 'expanded' : 'collapsed'}`}>
              {assignment.description}
            </p>
            {assignment.description.length > 90 && (
              <button
                type="button"
                className="expand-toggle-btn"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp size={13} /></>
                ) : (
                  <>Read More <ChevronDown size={13} /></>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Due Date Indicator */}
      <div className="card-due-section">
        <div className="due-calendar-info">
          <Calendar size={15} className="calendar-icon" />
          <span className="due-calendar-label">Due: {formatDate(assignment.dueDate)}</span>
        </div>
        <span className={`due-status-pill ${dueStatus.badgeClass}`}>
          {dueStatus.label}
        </span>
      </div>

      {/* Card Footer: Status Toggle & Action Buttons */}
      <div className="card-footer">
        <button
          type="button"
          className={`status-toggle-btn ${isCompleted ? 'btn-mark-pending' : 'btn-mark-complete'}`}
          onClick={handleToggle}
          title={isCompleted ? 'Click to mark as Pending' : 'Click to mark as Completed'}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 size={16} />
              <span>Completed</span>
            </>
          ) : (
            <>
              <Clock size={16} />
              <span>Mark Done</span>
            </>
          )}
        </button>

        <div className="card-action-btns">
          <button
            type="button"
            className="action-icon-btn edit-icon-btn"
            onClick={() => onEdit(assignment)}
            title="Edit this assignment"
            aria-label="Edit assignment"
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            className="action-icon-btn delete-icon-btn"
            onClick={() => onDelete(assignment)}
            title="Delete this assignment"
            aria-label="Delete assignment"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
