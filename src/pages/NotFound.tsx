import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 text-5xl md:text-7xl">
          This scene was <em>cut.</em>
        </h1>
        <p className="mt-6 text-mist">There is nothing at this address.</p>
        <a href="/" className="btn-ghost mt-8">
          Back to the start
        </a>
      </div>
    </div>
  );
};

export default NotFound;
