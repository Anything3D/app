'use client';

import { useStore } from '@/store/useStore';
import Barcode from 'react-barcode';

export default function BarcodesPage() {
  const products = useStore(state => state.products);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #print-area, #print-area * {
              visibility: visible;
            }
            #print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        `
      }} />

      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Print Barcodes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Generate and print SKU labels for your products</p>
        </div>
        <button className="btn btn-primary" onClick={handlePrint}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print All Labels
        </button>
      </div>

      <div id="print-area" className="card">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
          gap: '2rem',
          justifyItems: 'center'
        }}>
          {products.map(product => (
            <div key={product.id} style={{
              padding: '1rem',
              border: '1px dashed var(--border-color)',
              borderRadius: '8px',
              textAlign: 'center',
              backgroundColor: 'white',
              color: 'black' // Ensuring barcodes look good
            }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1rem' }}>{product.name}</p>
              <Barcode 
                value={product.sku} 
                width={1.5} 
                height={50} 
                fontSize={14} 
                background="#ffffff" 
                lineColor="#000000" 
              />
              <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                Loc: {product.location.aisle}-{product.location.rack}-{product.location.shelf}-{product.location.bin}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
