import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sitemap = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This will be handled by the Vite plugin in development
    // In production, the static file will be served directly
    fetch('/sitemap.xml')
      .then(response => response.text())
      .then(() => {
        // This is just a fallback, the Vite plugin should handle it
        console.log('Sitemap loaded successfully');
      })
      .catch(error => {
        console.error('Error loading sitemap:', error);
      });
  }, [navigate]);

  return null;
};

export default Sitemap;
