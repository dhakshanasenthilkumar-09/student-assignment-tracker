import React from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function DashboardStats({ 
  stats, 
  currentStatusFilter, 
  onSelectStatusFilter 
}) {
  const { total, pending, completed, overdue } = stats;
  
  // Calculate completion percentage
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const statCards = [
    {
      id: 'all',
      title: 'Total Assignments',
      count: total,
      icon: BookOpen,
      colorClass: 'stat-total',
      filterKey: 'All',
      caption: total === 1 ? '1 trackable item' : `${total} trackable items`
    },
    {
      id: 'pending',
      title: 'Pending Tasks',
      count: pending,
      icon: Clock,
      colorClass: 'stat-pending',
      filterKey: 'Pending',
      caption: pending === 1 ? '1 task to finish' : `${pending} tasks to finish`
    },
    {
      id: 'completed',
      title: 'Completed Tasks',
      count: completed,
      icon: CheckCircle2,
      colorClass: 'stat-completed',
      filterKey: 'Completed',
      caption: `${completionRate}% completed`
    },
    {
      id: 'overdue',
      title: 'Overdue Tasks',
      count: overdue,
      icon: AlertTriangle,
      colorClass: 'stat-overdue',
      filterKey: 'Overdue',
      caption: overdue > 0 ? 'Requires attention!' : 'All clear!'
    }
  ];

  return (
    <section className="dashboard-stats-section" aria-label="Assignment Statistics">
      <div className="stats-grid">
        {statCards.map((card) => {
          const Icon = card.icon;
          const isActive = currentStatusFilter === card.filterKey;
          return (
            <div
              key={card.id}
              className={`stat-card ${card.colorClass} ${isActive ? 'stat-card-active' : ''}`}
              onClick={() => onSelectStatusFilter(card.filterKey)}
              role="button"
              tabIndex={0}
              title={`Click to filter by ${card.filterKey}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectStatusFilter(card.filterKey);
                }
              }}
            >
              <div className="stat-card-header">
                <span className="stat-card-title">{card.title}</span>
                <div className="stat-icon-wrapper">
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-card-body">
                <div className="stat-count">{card.count}</div>
                <div className="stat-caption">{card.caption}</div>
              </div>
              <div className="stat-card-footer">
                <span className="stat-filter-hint">
                  {isActive ? '✓ Active filter' : 'Filter by this'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress & Motivation Bar */}
      <div className="progress-banner-card">
        <div className="progress-banner-header">
          <div className="progress-title-group">
            <div className="progress-badge">
              <TrendingUp size={16} />
              <span>Overall Progress</span>
            </div>
            <h2 className="progress-percentage-label">
              {completionRate}% Complete
            </h2>
          </div>
          <div className="progress-motivation-text">
            {completionRate === 100 && total > 0 ? (
              <span className="motivation-success">
                <Sparkles size={16} /> Outstanding! All your assignments are completed!
              </span>
            ) : overdue > 0 ? (
              <span className="motivation-warning">
                <AlertTriangle size={16} /> You have {overdue} overdue {overdue === 1 ? 'task' : 'tasks'}. Finish them today!
              </span>
            ) : (
              <span className="motivation-info">
                {pending} {pending === 1 ? 'assignment' : 'assignments'} remaining. Keep up the good work!
              </span>
            )}
          </div>
        </div>

        <div className="progress-track" role="progressbar" aria-valuenow={completionRate} aria-valuemin="0" aria-valuemax="100">
          <div 
            className="progress-fill" 
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>
    </section>
  );
}
