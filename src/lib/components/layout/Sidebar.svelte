<script>
    import { page } from '$app/state';
  
    const items = [
    { label: 'Dashboard', href: '/dashboard', icon: '▦' },
    { label: 'Projects', href: '/projects', icon: '◩' },
    { label: 'Devices', href: '/devices', icon: '⌁' },
    { label: 'Analytics', href: '/analytics', icon: '◫' },
    { label: 'Builder', href: '/builder', icon: '◧' },
    { label: 'Settings', href: '/settings', icon: '⚙' }
  ];
  </script>
  
  <aside class="sidebar">
    <div class="sidebar-brand">
      <img src="/iot-ranger-logo.png" alt="IoT Ranger logo" class="sidebar-logo-image" />
  
      <div class="sidebar-brand-text">
        <h2>IoT Ranger</h2>
        <p>Monitor Smarter</p>
      </div>
    </div>
  
    <nav class="sidebar-nav">
      {#each items as item}
        <a
          href={item.href}
          class="sidebar-link"
          class:active={page.url.pathname === item.href}
        >
          <span class="sidebar-icon">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>
  </aside>
  
  <style>
    .sidebar {
      width: 240px;
      min-height: 100vh;
      padding: 28px 20px;
      border-right: 1px solid rgba(255, 255, 255, 0.05);
      background: linear-gradient(180deg, #0f172a, #020617);
    }
  
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 36px;
    }
  
    .sidebar-logo-image {
      width: 52px;
      height: 52px;
      object-fit: contain;
      flex-shrink: 0;
    }
  
    .sidebar-brand-text h2 {
      margin: 0;
      font-size: 24px;
      color: #f8fafc;
    }
  
    .sidebar-brand-text p {
      margin: 4px 0 0;
      color: #94a3b8;
      font-size: 14px;
    }
  
    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  
    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 16px;
      color: #cbd5e1;
      text-decoration: none;
      transition: 0.2s ease;
    }
  
    .sidebar-link:hover,
    .sidebar-link.active {
      background: rgba(59, 130, 246, 0.15);
      box-shadow: 0 0 16px rgba(59, 130, 246, 0.2);
      color: #ffffff;
    }
  
    .sidebar-icon {
      width: 22px;
      display: inline-flex;
      justify-content: center;
    }
  </style>