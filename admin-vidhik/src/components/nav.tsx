import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Building2,
  FileText,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavProps {
  isCollapsed: boolean;
}

export function Nav({ isCollapsed }: NavProps) {
  const links = [
    {
      title: "Dashboard",
      label: "",
      icon: LayoutDashboard,
      variant: "default",
      href: "/"
    },
    {
      title: "Complaints",
      label: "12",
      icon: MessageSquare,
      variant: "ghost",
      href: "/complaints"
    },
    {
      title: "Feedback",
      label: "9",
      icon: FileText,
      variant: "ghost",
      href: "/feedback"
    },
    {
      title: "Schemes",
      label: "",
      icon: Building2,
      variant: "ghost",
      href: "/schemes"
    },
    {
      title: "Users",
      label: "",
      icon: Users,
      variant: "ghost",
      href: "/users"
    },
    {
      title: "Analytics",
      label: "",
      icon: BarChart3,
      variant: "ghost",
      href: "/analytics"
    },
    {
      title: "Settings",
      label: "",
      icon: Settings,
      variant: "ghost",
      href: "/settings"
    }
  ];

  return (
    <div className="h-full flex flex-col gap-2 bg-muted/5">
      <div className="flex h-[60px] items-center px-4 border-b">
        <Home className="h-6 w-6 text-primary" />
        {!isCollapsed && <span className="ml-2 text-xl font-semibold">Vidhik</span>}
      </div>
      <div className="flex-1 px-2">
        <nav className="space-y-1">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between">
                  <span>{link.title}</span>
                  {link.label && (
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {link.label}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="sticky bottom-0 p-2 bg-muted/5 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start"
          onClick={() => document.documentElement.classList.toggle('dark')}
        >
          <Settings className="h-4 w-4 mr-2" />
          {!isCollapsed && "Theme"}
        </Button>
      </div>
    </div>
  );
}