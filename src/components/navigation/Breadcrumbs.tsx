import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/manager-toolkit': 'Manager Toolkit',
  '/team-profiles': 'Team Profiles',
  '/feedback': 'Team Feedback',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/team-sentiment': 'Team Sentiment',
  '/action-items': 'Action Items',
  '/reports': 'Reports'
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/', isActive: location.pathname === '/' }
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    breadcrumbs.push({
      label: routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
      path: currentPath,
      isActive: isLast
    });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-4">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
          {crumb.isActive ? (
            <span className="font-medium text-slate-900">{crumb.label}</span>
          ) : (
            <Link 
              to={crumb.path} 
              className="hover:text-slate-900 transition-colors"
            >
              {index === 0 ? (
                <Home className="w-4 h-4" />
              ) : (
                crumb.label
              )}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}