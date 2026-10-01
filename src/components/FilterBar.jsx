import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  ArrowUpDown, 
  RotateCcw,
  LayoutGrid,
  List
} from 'lucide-react';

export default function FilterBar({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  selectedPriority,
  onPriorityChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  availableSubjects,
  onClearFilters,
  totalCount,
  filteredCount
}) {
  const isFiltered = 
    searchQuery.trim() !== '' || 
    selectedSubject !== 'All' || 
    selectedPriority !== 'All' || 
    selectedStatus !== 'All';

  const statusOptions = ['All', 'Pending', 'Completed', 'Overdue'];
  const priorityOptions = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className="filter-panel-card">
      {/* Top Row: Search Input + Sort + View Mode */}
      <div className="filter-top-row">
        {/* Search Bar */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, subject, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="assignment-search-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="search-clear-btn" 
              onClick={() => onSearchChange('')}
              title="Clear search"
              aria-label="Clear search text"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sort-label">
            <ArrowUpDown size={15} />
            <span className="sort-label-text">Sort by:</span>
          </label>
          <select
            id="sort-select"
            className="form-select sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="dueDateAsc">Due Date (Earliest First)</option>
            <option value="dueDateDesc">Due Date (Latest First)</option>
            <option value="priority">Priority (High to Low)</option>
            <option value="titleAsc">Title (A to Z)</option>
            <option value="createdDesc">Recently Added</option>
          </select>
        </div>

        {/* View Mode Toggle: Grid vs List */}
        <div className="view-mode-toggle" role="group" aria-label="View layout switch">
          <button
            type="button"
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid View"
            aria-label="Switch to Grid View"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List View"
            aria-label="Switch to List View"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Row: Filter Dropdowns & Pills */}
      <div className="filter-bottom-row">
        <div className="filter-controls-group">
          {/* Status Pills */}
          <div className="filter-pill-group">
            <span className="filter-group-label">Status:</span>
            {statusOptions.map((st) => (
              <button
                key={st}
                type="button"
                className={`filter-pill ${selectedStatus === st ? 'active' : ''}`}
                onClick={() => onStatusChange(st)}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="filter-divider" />

          {/* Subject Dropdown */}
          <div className="dropdown-filter-item">
            <label htmlFor="subject-filter" className="dropdown-filter-label">
              Subject:
            </label>
            <select
              id="subject-filter"
              className="form-select filter-select"
              value={selectedSubject}
              onChange={(e) => onSubjectChange(e.target.value)}
            >
              <option value="All">All Subjects</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Dropdown / Pill */}
          <div className="dropdown-filter-item">
            <label htmlFor="priority-filter" className="dropdown-filter-label">
              Priority:
            </label>
            <select
              id="priority-filter"
              className="form-select filter-select"
              value={selectedPriority}
              onChange={(e) => onPriorityChange(e.target.value)}
            >
              {priorityOptions.map((pr) => (
                <option key={pr} value={pr}>
                  {pr === 'All' ? 'All Priorities' : pr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Stats & Reset */}
        <div className="filter-summary-group">
          <span className="results-count-text">
            Showing <strong>{filteredCount}</strong> of {totalCount}
          </span>
          {isFiltered && (
            <button
              type="button"
              className="btn btn-ghost btn-sm reset-filter-btn"
              onClick={onClearFilters}
              title="Reset all search and filter criteria"
            >
              <RotateCcw size={14} />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
