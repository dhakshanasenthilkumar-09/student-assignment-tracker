import React from 'react';
import { 
  GraduationCap, 
  Plus, 
  Sun, 
  Moon, 
  RotateCcw,
  CalendarCheck
} from 'lucide-react';

export default function Navbar({ 
  onOpenAddModal, 
  theme, 
  onToggleTheme, 
  onResetData 
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <GraduationCap className="brand-icon" size={26} />
          </div>
          <div className="brand-text-group">
            <div className="brand-title-row">
              <h1 className="brand-title">TaskTrack</h1>
              <span className="brand-badge">Student Pro</span>
            </div>
            <p className="brand-subtitle">Assignment & Deadline Manager</p>
          </div>
        </div>

        {/* Current Date & Action Controls */}
        <div className="navbar-actions">
          <div className="date-chip" title="Today's Date">
            <CalendarCheck size={16} className="date-icon" />
            <span>{currentDate}</span>
          </div>

          {/* Reset Demo Data Button */}
          <button 
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onResetData}
            title="Reset to default sample assignments"
          >
            <RotateCcw size={15} />
            <span className="btn-label-desktop">Reset Demo</span>
          </button>

          {/* Theme Toggle Button */}
          <button 
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="theme-icon sun" />
            ) : (
              <Moon size={18} className="theme-icon moon" />
            )}
          </button>

          {/* Add Assignment Button */}
          <button 
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
          >
            <Plus size={18} />
            <span>Add Assignment</span>
          </button>
        </div>
      </div>
    </header>
  );
}
