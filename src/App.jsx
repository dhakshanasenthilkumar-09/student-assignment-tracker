import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import FilterBar from './components/FilterBar';
import AssignmentList from './components/AssignmentList';
import AssignmentModal from './components/AssignmentModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { 
  loadAssignments, 
  saveAssignments, 
  resetSampleAssignments, 
  getSavedTheme, 
  saveTheme 
} from './utils/storage';
import { defaultSubjects } from './data/initialData';
import { isAssignmentOverdue } from './utils/dateUtils';
import './App.css';

export default function App() {
  // Persistence state
  const [assignments, setAssignments] = useState(() => loadAssignments());
  const [theme, setTheme] = useState(() => getSavedTheme());

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');
  const [viewMode, setViewMode] = useState('grid');

  // Modals state
  const [assignmentModal, setAssignmentModal] = useState({
    isOpen: false,
    assignment: null, // null for Add, object for Edit
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    assignment: null,
  });

  // Notification Toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', title = '') => {
    setToast({ message, type, title });
  };

  // Sync theme to root attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  // Keep localStorage updated when assignments change
  const updateAssignments = (newAssignments) => {
    setAssignments(newAssignments);
    saveAssignments(newAssignments);
  };

  // Compute available unique subjects
  const availableSubjects = useMemo(() => {
    const existing = assignments.map(a => a.subject).filter(Boolean);
    const combined = Array.from(new Set([...defaultSubjects, ...existing]));
    return combined.sort();
  }, [assignments]);

  // Compute stats for dashboard
  const stats = useMemo(() => {
    const total = assignments.length;
    const completed = assignments.filter(a => a.status === 'Completed').length;
    const pending = assignments.filter(a => a.status === 'Pending').length;
    const overdue = assignments.filter(a => isAssignmentOverdue(a.dueDate, a.status)).length;

    return { total, pending, completed, overdue };
  }, [assignments]);

  // Filter and Sort assignments
  const filteredAssignments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return assignments
      .filter((item) => {
        // Search text matching
        if (query) {
          const matchTitle = item.title?.toLowerCase().includes(query);
          const matchSubject = item.subject?.toLowerCase().includes(query);
          const matchDesc = item.description?.toLowerCase().includes(query);
          if (!matchTitle && !matchSubject && !matchDesc) {
            return false;
          }
        }

        // Subject filter
        if (selectedSubject !== 'All' && item.subject !== selectedSubject) {
          return false;
        }

        // Priority filter
        if (selectedPriority !== 'All' && item.priority !== selectedPriority) {
          return false;
        }

        // Status filter
        if (selectedStatus === 'Completed') {
          if (item.status !== 'Completed') return false;
        } else if (selectedStatus === 'Pending') {
          if (item.status !== 'Pending') return false;
        } else if (selectedStatus === 'Overdue') {
          if (!isAssignmentOverdue(item.dueDate, item.status)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDateAsc') {
          return (a.dueDate || '9999').localeCompare(b.dueDate || '9999');
        }
        if (sortBy === 'dueDateDesc') {
          return (b.dueDate || '0000').localeCompare(a.dueDate || '0000');
        }
        if (sortBy === 'priority') {
          const rank = { High: 3, Medium: 2, Low: 1 };
          return (rank[b.priority] || 0) - (rank[a.priority] || 0);
        }
        if (sortBy === 'titleAsc') {
          return (a.title || '').localeCompare(b.title || '');
        }
        if (sortBy === 'createdDesc') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        return 0;
      });
  }, [assignments, searchQuery, selectedSubject, selectedPriority, selectedStatus, sortBy]);

  // Handlers
  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleStatus = (id) => {
    const target = assignments.find(a => a.id === id);
    if (!target) return;

    const newStatus = target.status === 'Completed' ? 'Pending' : 'Completed';
    const updated = assignments.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    );

    updateAssignments(updated);

    if (newStatus === 'Completed') {
      showToast(`"${target.title}" marked as completed! 🎉`, 'success', 'Great Job!');
    } else {
      showToast(`"${target.title}" moved back to pending.`, 'info');
    }
  };

  const handleOpenAddModal = () => {
    setAssignmentModal({ isOpen: true, assignment: null });
  };

  const handleOpenEditModal = (assignment) => {
    setAssignmentModal({ isOpen: true, assignment });
  };

  const handleCloseAssignmentModal = () => {
    setAssignmentModal({ isOpen: false, assignment: null });
  };

  const handleSaveAssignment = (payload) => {
    if (payload.id) {
      // Editing existing assignment
      const updated = assignments.map(a => 
        a.id === payload.id ? { ...payload, updatedAt: new Date().toISOString() } : a
      );
      updateAssignments(updated);
      showToast(`Updated "${payload.title}" successfully.`, 'success', 'Assignment Saved');
    } else {
      // Adding new assignment
      const newAssignment = {
        ...payload,
        id: `asg-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      updateAssignments([newAssignment, ...assignments]);
      showToast(`Added "${newAssignment.title}" to tracker.`, 'success', 'Assignment Created');
    }
    handleCloseAssignmentModal();
  };

  const handleOpenDeleteModal = (assignment) => {
    setDeleteModal({ isOpen: true, assignment });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ isOpen: false, assignment: null });
  };

  const handleConfirmDelete = (id) => {
    const target = assignments.find(a => a.id === id);
    const updated = assignments.filter(a => a.id !== id);
    updateAssignments(updated);
    handleCloseDeleteModal();
    showToast(
      target ? `Deleted "${target.title}".` : 'Assignment deleted.',
      'info',
      'Assignment Removed'
    );
  };

  const handleResetData = () => {
    if (window.confirm('Reset all assignments back to initial sample demo data? Any custom items will be overwritten.')) {
      const resetData = resetSampleAssignments();
      setAssignments(resetData);
      setSearchQuery('');
      setSelectedSubject('All');
      setSelectedPriority('All');
      setSelectedStatus('All');
      showToast('Restored default demo assignments.', 'info', 'Reset Complete');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
  };

  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <Navbar
        onOpenAddModal={handleOpenAddModal}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onResetData={handleResetData}
      />

      <main className="main-content-container">
        {/* Metric Cards & Progress Banner */}
        <DashboardStats
          stats={stats}
          currentStatusFilter={selectedStatus}
          onSelectStatusFilter={(status) => {
            setSelectedStatus(status);
          }}
        />

        {/* Search, Filter & Controls Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          selectedPriority={selectedPriority}
          onPriorityChange={setSelectedPriority}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          availableSubjects={availableSubjects}
          onClearFilters={handleClearFilters}
          totalCount={assignments.length}
          filteredCount={filteredAssignments.length}
        />

        {/* Assignment Grid or List Cards */}
        <AssignmentList
          assignments={filteredAssignments}
          viewMode={viewMode}
          onToggleStatus={handleToggleStatus}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onOpenAddModal={handleOpenAddModal}
          onClearFilters={handleClearFilters}
          isFiltered={
            searchQuery.trim() !== '' ||
            selectedSubject !== 'All' ||
            selectedPriority !== 'All' ||
            selectedStatus !== 'All'
          }
        />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          <strong>TaskTrack</strong> – Student Assignment Tracker &bull; Built with React & Vite
        </p>
      </footer>

      {/* Assignment Add / Edit Modal */}
      <AssignmentModal
        isOpen={assignmentModal.isOpen}
        onClose={handleCloseAssignmentModal}
        onSubmit={handleSaveAssignment}
        initialData={assignmentModal.assignment}
        availableSubjects={availableSubjects}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        assignment={deleteModal.assignment}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
