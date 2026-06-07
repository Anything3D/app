import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layoutWrapper">
      <Sidebar />
      <div className="mainContent">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
