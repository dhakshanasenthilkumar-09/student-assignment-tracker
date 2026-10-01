import React from 'react';
import AssignmentCard from './AssignmentCard';
import { 
  ClipboardList, 
  SearchX, 
  Plus, 
  RotateCcw 
} from 'lucide-react';

export default function AssignmentList({
  assignments,
  viewMode,
  onToggleStatus,
  onEdit,
  onDelete,
  onOpenAddModal,
  onClearFilters,
  isFiltered
}) {
  if (assignments.length === 0) {
    if (isFiltered) {
      return (
        <div className="empty-state-card">
          <div className="empty-state-icon-wrapper search-empty">
            <SearchX size={44} />
          </div>
          <h3 className="empty-state-title">No matching assignments</h3>
          <p className="empty-state-desc">
            No assignments match your current search query or filter selection.
          </p>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onClearFilters}
          >
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      );
    }

    return (
      <div className="empty-state-card">
        <div className="empty-state-icon-wrapper">
          <ClipboardList size={48} />
        </div>
        <h3 className="empty-state-title">No assignments tracked yet</h3>
        <p className="empty-state-desc">
          Stay on top of your coursework, lab submissions, and exams by adding your first assignment.
        </p>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={onOpenAddModal}
        >
          <Plus size={18} />
          <span>Add Your First Assignment</span>
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="assignments-table-wrapper">
        <div className="table-header-row">
          <div className="th-col th-check">Status</div>
          <div className="th-col th-main">Assignment & Subject</div>
          <div className="th-col th-priority">Priority</div>
          <div className="th-col th-date">Due Date</div>
          <div className="th-col th-actions">Actions</div>
        </div>
        <div className="assignments-list-container">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
              layout="list"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="assignments-grid">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          layout="grid"
        />
      ))}
    </div>
  );
}
