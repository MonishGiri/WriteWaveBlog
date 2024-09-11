import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const defaultTitle = 'Write Wave'; // Set your default title here

    if (location.pathname === '/') {
      document.title = defaultTitle;
    } else {
      // Customize the title based on the route
      const routeTitle = location.pathname.replace(/^\//, '').replace(/-/g, ' '); // Remove leading slash and replace hyphens with spaces
      document.title = `${routeTitle} | ${defaultTitle}`;
    }
  }, [location]);

  return null; // This component doesn't render anything
}
export default DynamicTitle;