import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="label !text-redpen">p.404</p>
        <h1 className="headline mt-4 text-5xl md:text-7xl">
          This page was <em>torn out.</em>
        </h1>
        <p className="lede mt-6">There is nothing at this address.</p>
        <a href="/" className="btn-stamp mt-8">
          Back to the notebook
        </a>
      </div>
    </div>
  );
};

export default NotFound;
