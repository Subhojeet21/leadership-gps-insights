
import React from 'react';
import { 
  Sidebar as SidebarPrimitive, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  Bell,
  LogOut,
  User,
  Brain
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: "Dashboard",
    icon: Users,
    url: "/",
  },
  {
    title: "Manager Toolkit",
    icon: Brain,
    url: "/manager-toolkit"
  },
  {
    title: "Team Profiles",
    icon: MessageSquare,
    url: "/team-profiles"
  },
  {
    title: "Team Feedback",
    icon: MessageSquare,
    url: "/feedback"
  },
  {
    title: "Notifications",
    icon: Bell,
    url: "/notifications"
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings"
  }
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <SidebarPrimitive className="border-r border-slate-200 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="border-b border-slate-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MM</span>
          </div>
          <div>
            <h1 className="font-semibold text-slate-900">Manager Mentor</h1>
            <p className="text-xs text-slate-500">AI-Powered Insights</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-slate-500 mb-2">
            MAIN MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`w-full justify-start space-x-3 rounded-lg transition-all ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center">
                        <IconComponent size={18} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize truncate">
                {user?.role} • {user?.department}
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={logout}
            className="w-full justify-start space-x-2"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
