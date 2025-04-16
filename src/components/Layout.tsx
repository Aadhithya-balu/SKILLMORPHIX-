
import Header from "./Header";
import Navbar from "./Navbar";
import OfflineAlert from "./OfflineAlert";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <div className="w-20">
          <Navbar />
        </div>
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
      <OfflineAlert />
    </div>
  );
};

export default Layout;
