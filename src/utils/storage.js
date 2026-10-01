import { initialAssignments } from '../data/initialData';

const STORAGE_KEY = 'tasktrack_assignments_v1';
const THEME_KEY = 'tasktrack_theme_v1';

/**
 * Load assignments from localStorage.
 * If no assignments are saved yet, initializes with sample data.
 */
export function loadAssignments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveAssignments(initialAssignments);
      return initialAssignments;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return initialAssignments;
  } catch (error) {
    console.error('Error reading assignments from localStorage:', error);
    return initialAssignments;
  }
}

/**
 * Save assignments array to localStorage
 */
export function saveAssignments(assignments) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
  } catch (error) {
    console.error('Error saving assignments to localStorage:', error);
  }
}

/**
 * Reset localStorage data back to sample assignments
 */
export function resetSampleAssignments() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAssignments));
    return initialAssignments;
  } catch (error) {
    console.error('Error resetting sample assignments:', error);
    return initialAssignments;
  }
}

/**
 * Get preferred theme ('dark' | 'light')
 */
export function getSavedTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to 'dark' for modern sleek aesthetic
    return 'dark';
  } catch {
    return 'dark';
  }
}

/**
 * Save preferred theme
 */
export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme preference:', error);
  }
}
