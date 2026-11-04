
import React from 'react';

function App() {
  const navItems = ['Dashboard', 'Layanan', 'Portofolio', 'Tentang Kami', 'Galeri', 'Kontak'];

  return (
    <div style={styles.container}>
      {/* Sidebar Navigasi (20% Lebar Layar) */}
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>NAVIGASI</h2>
        <nav>
          <ul style={styles.navList}>
            {navItems.map((item, index) => (
              <li key={index} style={styles.navItem}>
                <a href={`#${item}`} style={styles.navLink}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Konten Utama (Mengisi Sisa 80% Lebar Layar) */}
      <main style={styles.mainContent}>
        {/* Banner Utama */}
        <section style={styles.banner}>
          <h1 style={styles.bannerTitle}>LOREM IPSUM DOLOR SIT AMET</h1>
          <p style={styles.bannerSub}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </section>

        {/* Section Konten */}
        <div style={styles.contentBody}>
          <h2 style={styles.sectionTitle}>LOREM IPSUM DOLOR</h2>

          <div style={styles.grid}>
            {[1, 2, 3].map((num) => (
              <div key={num} style={styles.card}>
                <h3 style={styles.cardTitle}>
                  LOREM IPSUM {num}
                </h3>

                <p style={styles.cardText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <button style={styles.button}>
                  SELENGKAPNYA
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#fff7ed',
    color: '#431407',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '20vw',
    height: '100vh',
    backgroundColor: '#ea580c',
    color: '#ffffff',
    overflowY: 'auto',
    padding: '24px 16px',
    boxSizing: 'border-box',
    borderRight: '4px solid #ca8a04',
  },
  sidebarTitle: {
    margin: '0 0 24px 0',
    fontSize: '1.2rem',
    color: '#fef08a',
    borderBottom: '2px solid #f97316',
    paddingBottom: '12px',
    borderRadius: 0,
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: '8px',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'block',
    padding: '10px 14px',
    fontWeight: '600',
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  mainContent: {
    marginLeft: '20vw',
    width: '80vw',
    minHeight: '100vh',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },
  banner: {
    backgroundColor: '#c2410c',
    backgroundImage: 'linear-gradient(135deg, #ea580c 0%, #ca8a04 100%)',
    color: '#ffffff',
    padding: '60px 40px',
    boxSizing: 'border-box',
    borderRadius: 0,
  },
  bannerTitle: {
    margin: 0,
    fontSize: '2.2rem',
    color: '#fef08a',
  },
  bannerSub: {
    marginTop: '10px',
    fontSize: '1.1rem',
    color: '#ffedd5',
  },
  contentBody: {
    padding: '40px',
  },
  sectionTitle: {
    fontSize: '1.6rem',
    color: '#9a3412',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
    gap: '20px',
    boxSizing: 'border-box',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: 0,
    borderLeft: '6px solid #eab308',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
  },
  cardTitle: {
    margin: '0 0 12px 0',
    color: '#c2410c',
  },
  cardText: {
    lineHeight: '1.6',
    color: '#571c0c',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#eab308',
    color: '#451a03',
    border: 'none',
    padding: '10px 18px',
    borderRadius: 0,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default App;
