import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { Nav } from '@/components/nav';
import { TopNav } from '@/components/top-nav';
import { Overview } from '@/components/overview';
import { Complaints } from '@/components/complaints';
import { Feedback } from '@/components/feedback';
import { Schemes } from '@/components/schemes';
import { Users } from '@/components/users';
import { Analytics } from '@/components/analytics';
import { Settings } from '@/components/settings';

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vidhik-theme">
        <div className="min-h-screen flex flex-col">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <TopNav />
          </div>
          <div className="flex-1 flex overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel
                defaultSize={15}
                collapsible={true}
                minSize={5}
                maxSize={20}
                onCollapse={() => setIsCollapsed(true)}
                onExpand={() => setIsCollapsed(false)}
                className={cn(
                  isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out"
                )}
              >
                <Nav isCollapsed={isCollapsed} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={85}>
                <div className="h-[calc(100vh-4rem)] overflow-y-auto">
                  <div className="container mx-auto p-6">
                    <Routes>
                      <Route path="/" element={<Overview />} />
                      <Route path="/complaints" element={<Complaints />} />
                      <Route path="/feedback" element={<Feedback />} />
                      <Route path="/schemes" element={<Schemes />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </Router>
  );
}