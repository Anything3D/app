"use client";

import { useStore } from '@/store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

export default function Dashboard() {
  const products = useStore(state => state.products);

  const totalRevenue = products.reduce((acc, p) => acc + (p.cost * p.stock), 0);
  const totalItems = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockItems = products.filter(p => p.stock < p.minStock);
  const lowStockCount = lowStockItems.length;

  // Chart Data: Stock value by department
  const departmentData = products.reduce((acc: { name: string, value: number }[], product) => {
    const dept = product.department || 'Unassigned';
    const existing = acc.find(item => item.name === dept);
    if (existing) {
      existing.value += product.cost * product.stock;
    } else {
      acc.push({ name: dept, value: product.cost * product.stock });
    }
    return acc;
  }, []);

  // Chart Data: Top 5 machines by inventory value
  const machineValueMap = products.reduce((acc: Record<string, number>, product) => {
    const mac = product.machine || 'General';
    acc[mac] = (acc[mac] || 0) + (product.cost * product.stock);
    return acc;
  }, {});
  
  const topMachinesData = Object.entries(machineValueMap)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([name, value]) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      value
    }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--danger))'];

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back to StoreSync Pro. Here&apos;s what&apos;s happening today.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Inventory Value</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>Calculated from current stock</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Items in Stock</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{totalItems}</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>Across {products.length} unique products</p>
        </div>
        <div className="card" style={{ borderLeft: lowStockCount > 0 ? '4px solid hsl(var(--danger))' : 'none' }}>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Low Stock Alerts</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: lowStockCount > 0 ? 'hsl(var(--danger))' : 'inherit' }}>{lowStockCount}</p>
          <p style={{ fontSize: '0.75rem', color: lowStockCount > 0 ? 'hsl(var(--danger))' : 'hsl(var(--success))', marginTop: '0.5rem' }}>
            {lowStockCount > 0 ? 'Requires immediate attention' : 'Inventory levels healthy'}
          </p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ minHeight: '350px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Inventory Value by Machine (Top 5)</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topMachinesData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickMargin={10} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(val) => '$' + val} />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                  cursor={{ fill: 'var(--bg-surface-hover)', opacity: 0.4 }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card" style={{ minHeight: '350px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Inventory Value by Department</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {lowStockCount > 0 && (
        <div className="card" style={{ border: '1px solid hsl(var(--danger))', backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
          <h2 style={{ color: 'hsl(var(--danger))', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Action Required: Low Stock Items
          </h2>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {lowStockItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div>
                  <p style={{ fontWeight: 600 }}>{item.name} <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>({item.sku})</span></p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Current Stock: <span style={{ color: 'hsl(var(--danger))', fontWeight: 'bold' }}>{item.stock}</span> (Minimum: {item.minStock})</p>
                </div>
                <Link href="/orders" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                  Create PO
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
