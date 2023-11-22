import { useLocation } from 'react-router-dom';

export const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div className="not-found">
      <p>Page is not found</p>
      <p data-testid="not-found">`path: {location.pathname}`</p>
    </div>
  );
};
