
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gradient-dark">
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-sm px-6 flex items-center">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white hover:text-primary" />
            <div className="text-xl font-bold gradient-text">
              IntelliEstate
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
