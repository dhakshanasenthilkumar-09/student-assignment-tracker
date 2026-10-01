/**
 * Date utility functions for TaskTrack
 */

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Adds days to today and returns YYYY-MM-DD
 */
export function getDateWithOffset(offsetDays) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a date string (YYYY-MM-DD) into readable format: "Oct 12, 2026"
 */
export function formatDate(dateString) {
  if (!dateString) return 'No due date';
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Checks if a given date string is overdue (strictly before today) and status is not 'Completed'
 */
export function isAssignmentOverdue(dueDateString, status) {
  if (!dueDateString || status === 'Completed') return false;
  const todayStr = getTodayDateString();
  return dueDateString < todayStr;
}

/**
 * Computes human-friendly due date status badge information
 */
export function getDueStatusInfo(dueDateString, status) {
  if (!dueDateString) {
    return {
      type: 'none',
      label: 'No due date',
      badgeClass: 'badge-neutral',
    };
  }

  if (status === 'Completed') {
    return {
      type: 'completed',
      label: 'Completed',
      badgeClass: 'badge-success',
    };
  }

  const todayStr = getTodayDateString();
  
  // Calculate difference in calendar days
  const [tY, tM, tD] = todayStr.split('-').map(Number);
  const [dY, dM, dD] = dueDateString.split('-').map(Number);
  
  const todayDate = new Date(tY, tM - 1, tD);
  const dueDate = new Date(dY, dM - 1, dD);
  
  const diffTime = dueDate.getTime() - todayDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueCount = Math.abs(diffDays);
    return {
      type: 'overdue',
      label: overdueCount === 1 ? 'Overdue by 1 day' : `Overdue by ${overdueCount} days`,
      badgeClass: 'badge-danger',
      days: diffDays,
    };
  } else if (diffDays === 0) {
    return {
      type: 'today',
      label: 'Due Today!',
      badgeClass: 'badge-warning',
      days: 0,
    };
  } else if (diffDays === 1) {
    return {
      type: 'tomorrow',
      label: 'Due Tomorrow',
      badgeClass: 'badge-warning-soft',
      days: 1,
    };
  } else if (diffDays <= 3) {
    return {
      type: 'soon',
      label: `Due in ${diffDays} days`,
      badgeClass: 'badge-info',
      days: diffDays,
    };
  } else {
    return {
      type: 'upcoming',
      label: `Due in ${diffDays} days`,
      badgeClass: 'badge-neutral',
      days: diffDays,
    };
  }
}
