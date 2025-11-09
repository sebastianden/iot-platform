import { useEffect } from 'react';

/**
 * Prevents hydration mismatch by applying the correct theme class
 * before React hydrates the page
 */
export const ThemeScript = () => {
  useEffect(() => {
    // This script runs before hydration to prevent flash
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        function getThemePreference() {
          if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
          }
          return 'system';
        }

        function applyTheme(theme) {
          const root = document.documentElement;
          const isDark = theme === 'dark' ||
            (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

          if (isDark) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }

        const theme = getThemePreference();
        applyTheme(theme);
      })();
    `;

    // Insert script as early as possible
    if (document.head.firstChild) {
      document.head.insertBefore(script, document.head.firstChild);
    } else {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};