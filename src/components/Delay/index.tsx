import React, { Suspense, useEffect, useState } from "react";
import Skeleton from "../Skeleton";
import "./Delay.scss";

interface DelayProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  loaderStyles?: React.CSSProperties;
}

const Delay: React.FC<DelayProps> = ({
  children,
  fallback,
  delay = 1000,
  loaderStyles = {},
}) => {
  const [showFallback, setShowFallback] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <>
      <Suspense
        fallback={
          showFallback ? fallback || <Skeleton styles={loaderStyles} /> : null
        }
      >
        {children}
      </Suspense>
    </>
  );
};

export default Delay;
