'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import styles from '../inventory/Inventory.module.css'; // Reusing inventory styles for standard table layout

export default function SuppliersPage() {
  const { suppliers, addSupplier } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Supplier Form State
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [leadTimeDays, setLeadTimeDays] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSupplier({
      name,
      contactEmail,
      phone,
      leadTimeDays,
      status: 'Active'
    });
    setIsModalOpen(false);
    // Reset form
    setName('');
    setContactEmail('');
    setPhone('');
    setLeadTimeDays(7);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Supplier Management</h1>
          <p className={styles.subtitle}>Manage your wholesale distributors and manufacturers</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
            + Add Supplier
          </button>
        </div>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Supplier Name</th>
              <th>Contact Email</th>
              <th>Phone</th>
              <th>Avg Lead Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map(supplier => (
              <tr key={supplier.id}>
                <td className={styles.productName}>{supplier.name}</td>
                <td>{supplier.contactEmail}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.leadTimeDays} days</td>
                <td>
                  <span className={`${styles.badge} ${supplier.status === 'Active' ? styles.badgeSuccess : styles.badgeDanger}`}>
                    {supplier.status}
                  </span>
                </td>
                <td>
                  <button className={styles.secondaryBtn} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Add New Supplier</h2>
              <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Supplier Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  className={styles.input}
                  placeholder="e.g. Acme Wholesale"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Contact Email</label>
                <input 
                  type="email" 
                  value={contactEmail} 
                  onChange={e => setContactEmail(e.target.value)} 
                  required 
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  required 
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Lead Time (Days)</label>
                <input 
                  type="number" 
                  min="1" 
                  value={leadTimeDays} 
                  onChange={e => setLeadTimeDays(Number(e.target.value))} 
                  required 
                  className={styles.input}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className={styles.primaryBtn}>Save Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
