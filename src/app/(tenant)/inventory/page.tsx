"use client";

import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function Inventory() {
  const products = useStore(state => state.products);
  const addProduct = useStore(state => state.addProduct);
  const updateStock = useStore(state => state.updateStock);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scanMode, setScanMode] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '', sku: '', price: 0, stock: 0,
    location: { aisle: '', rack: '', shelf: '', bin: '' }
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      status: newProduct.stock === 0 ? 'Out of Stock' : newProduct.stock < 10 ? 'Low Stock' : 'In Stock'
    });
    setIsAddModalOpen(false);
  };

  const simulateScan = () => {
    setNewProduct({
      ...newProduct,
      name: 'Wireless Mouse',
      sku: 'WM-200',
      price: 49.99
    });
    setScanMode(false);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Inventory Management</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your products, track stock levels, and assign locations.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => { setScanMode(true); setIsAddModalOpen(true); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="10" height="10"></rect></svg>
            Scan Product
          </button>
          <button className="btn btn-primary" onClick={() => { setScanMode(false); setIsAddModalOpen(true); }}>+ Add Product</button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '300px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }}><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><rect x="7" y="7" width="10" height="10"></rect></svg>
            <input 
              type="text" 
              className="input" 
              placeholder="Quick Scan SKU (Press Enter)..." 
              style={{ width: '100%', paddingLeft: '2.5rem', borderColor: 'var(--primary)', borderWidth: '2px', backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const sku = e.currentTarget.value;
                  const found = products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
                  if (found) {
                    updateStock(found.id, 1);
                    e.currentTarget.value = '';
                  } else {
                    alert('SKU not found. Please add it first.');
                  }
                }
              }}
            />
          </div>
          <input type="text" className="input" placeholder="Search inventory by name or SKU..." style={{ flex: '2', minWidth: '250px' }} />
          <button className="btn btn-outline">Filter</button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem' }}>Product Name</th>
                <th style={{ padding: '1rem' }}>SKU</th>
                <th style={{ padding: '1rem' }}>Stock</th>
                <th style={{ padding: '1rem' }}>Bin Location</th>
                <th style={{ padding: '1rem' }}>Price</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: product.stock === 0 ? 'rgba(239, 68, 68, 0.05)' : product.stock < product.minStock ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                }}>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{product.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{product.sku}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem' }} onClick={() => updateStock(product.id, -1)}>-</button>
                      <span style={{ minWidth: '2ch', textAlign: 'center' }}>{product.stock}</span>
                      <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem' }} onClick={() => updateStock(product.id, 1)}>+</button>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', background: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                      Aisle {product.location.aisle} &bull; Rack {product.location.rack} &bull; Shelf {product.location.shelf}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>${product.price.toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.875rem',
                      backgroundColor: product.status === 'In Stock' ? 'rgba(34, 197, 94, 0.1)' : product.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: product.status === 'In Stock' ? 'hsl(var(--success))' : product.status === 'Low Stock' ? 'hsl(var(--warning))' : 'hsl(var(--danger))',
                      fontWeight: 600
                    }}>
                      {product.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Edit</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No products found in inventory.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>{scanMode ? 'Scan Product Barcode' : 'Add New Product'}</h2>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsAddModalOpen(false)}>✕</button>
            </div>

            {scanMode ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '200px', height: '150px', border: '2px dashed var(--primary)', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Camera Viewfinder Active</span>
                </div>
                <button className="btn btn-primary" onClick={simulateScan}>Simulate Successful Scan</button>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Or type manually instead</p>
                <button className="btn btn-outline" style={{ marginTop: '0.5rem' }} onClick={() => setScanMode(false)}>Switch to Manual Entry</button>
              </div>
            ) : (
              <form onSubmit={handleAddSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Product Name</label>
                    <input required type="text" className="input" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>SKU / Barcode</label>
                    <input required type="text" className="input" value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Price ($)</label>
                    <input required type="number" step="0.01" className="input" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Initial Stock Quantity</label>
                    <input required type="number" className="input" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} />
                  </div>
                </div>

                <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Location Mapping (Bin/Rack)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Aisle</label>
                    <input required type="text" className="input" placeholder="e.g. A1" value={newProduct.location.aisle} onChange={e => setNewProduct({...newProduct, location: {...newProduct.location, aisle: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Rack</label>
                    <input required type="text" className="input" placeholder="e.g. R5" value={newProduct.location.rack} onChange={e => setNewProduct({...newProduct, location: {...newProduct.location, rack: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Shelf</label>
                    <input required type="text" className="input" placeholder="e.g. S2" value={newProduct.location.shelf} onChange={e => setNewProduct({...newProduct, location: {...newProduct.location, shelf: e.target.value}})} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Bin</label>
                    <input required type="text" className="input" placeholder="e.g. B12" value={newProduct.location.bin} onChange={e => setNewProduct({...newProduct, location: {...newProduct.location, bin: e.target.value}})} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Product</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
