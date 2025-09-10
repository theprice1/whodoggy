// apps/web/src/components/AppLayout.tsx
import React from 'react';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      {children}
    </div>
  );
};

// Add to your CSS:
// .app-layout {
//   min-height: 100vh;
//   padding: 16px;
//   background-color: #fff;
// }
