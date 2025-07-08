const STORAGE_KEY = 'dashboard_state';

export function saveDashboardState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getDashboardState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
}