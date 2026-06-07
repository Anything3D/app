import Link from 'next/link';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}></div>
        <span>Platform Admin</span>
      </div>
      <nav className={styles.nav}>
        <Link href="/admin" className={styles.navLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Overview
        </Link>
        <Link href="/admin/tenants" className={styles.navLink}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Companies
        </Link>
        <Link href="/" className={styles.navLink} style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Switch to Customer View
        </Link>
      </nav>
      <div className={styles.footer}>
        <div className={styles.tenant}>
          <div className={styles.avatar}>S</div>
          <div className={styles.tenantInfo}>
            <p className={styles.tenantName}>Super Admin</p>
            <p className={styles.tenantRole}>Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
