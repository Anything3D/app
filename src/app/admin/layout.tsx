import AdminSidebar from "@/components/AdminSidebar";
import Header from "@/components/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layoutWrapper">
      <AdminSidebar />
      <div className="mainContent">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
}
