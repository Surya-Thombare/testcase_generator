// Dark mode detection script that runs before React loads
// This prevents dark mode flash
(function() {
  // Check if the user has a preference saved in localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Check if the user's system prefers dark mode
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply dark mode if the user has explicitly set it or if the system prefers it
  if (isDarkMode === true || (isDarkMode === null && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
})();