<script>
    import Topbar from '$lib/components/layout/Topbar.svelte';
  
    let activeTab = $state('All');
  
    const tabs = [
      { label: 'All', count: 12 },
      { label: 'Online', count: 9 },
      { label: 'Offline', count: 2 },
      { label: 'Alerts', count: 1 }
    ];
  
    const devices = [
      {
        name: 'Greenhouse Sensor A1',
        type: 'Temperature / Humidity',
        location: 'Zone 01',
        status: 'Online',
        battery: '92%',
        signal: 'Strong',
        lastSeen: '2 min ago',
        value: '26°C'
      },
      {
        name: 'Warehouse Node B4',
        type: 'Air Quality',
        location: 'Zone 03',
        status: 'Online',
        battery: '78%',
        signal: 'Good',
        lastSeen: '5 min ago',
        value: '412 ppm'
      },
      {
        name: 'Pump Controller C2',
        type: 'Actuator',
        location: 'Basement',
        status: 'Alert',
        battery: '65%',
        signal: 'Moderate',
        lastSeen: '12 min ago',
        value: 'Pressure spike'
      },
      {
        name: 'Cold Storage D7',
        type: 'Temperature',
        location: 'Storage Room',
        status: 'Offline',
        battery: '14%',
        signal: 'Lost',
        lastSeen: '42 min ago',
        value: '--'
      },
      {
        name: 'Solar Monitor E5',
        type: 'Energy Meter',
        location: 'Roof',
        status: 'Online',
        battery: '100%',
        signal: 'Strong',
        lastSeen: '1 min ago',
        value: '4.2 kWh'
      },
      {
        name: 'Water Tank F2',
        type: 'Level Sensor',
        location: 'Pump House',
        status: 'Online',
        battery: '81%',
        signal: 'Good',
        lastSeen: '4 min ago',
        value: '68%'
      }
    ];
  
    const filteredDevices = $derived(
      activeTab === 'All'
        ? devices
        : devices.filter((device) => {
            if (activeTab === 'Online') return device.status === 'Online';
            if (activeTab === 'Offline') return device.status === 'Offline';
            if (activeTab === 'Alerts') return device.status === 'Alert';
            return true;
          })
    );
  
    function openDevice(name) {
      const slug = encodeURIComponent(name.toLowerCase().replaceAll(' ', '-'));
      window.location.href = `/devices/${slug}`;
    }
  </script>
  
  <Topbar />
  
  <section class="devices-header">
    <div>
      <h1>Devices</h1>
      <p>Monitor, filter, and manage all connected IoT devices in one place.</p>
    </div>
  
    <div class="devices-actions">
      <button class="secondary-btn" type="button">Export</button>
      <button class="primary-btn" type="button">+ Add Device</button>
    </div>
  </section>
  
  <section class="filter-strip">
    {#each tabs as tab}
      <button
        type="button"
        class="filter-pill"
        class:active={activeTab === tab.label}
        onclick={() => (activeTab = tab.label)}
      >
        <span>{tab.label}</span>
        <span class="pill-count">{tab.count}</span>
      </button>
    {/each}
  </section>
  
  <section class="devices-grid">
    {#each filteredDevices as device}
      <article class="device-card">
        <div class="device-card-top">
          <div>
            <p class="device-type">{device.type}</p>
            <h3>{device.name}</h3>
            <p class="device-location">{device.location}</p>
          </div>
  
          <span
            class="status-chip"
            class:online={device.status === 'Online'}
            class:offline={device.status === 'Offline'}
            class:alert={device.status === 'Alert'}
          >
            {device.status}
          </span>
        </div>
  
        <div class="device-main-value">
          {device.value}
        </div>
  
        <div class="device-stats">
          <div class="stat-row">
            <span>Battery</span>
            <strong>{device.battery}</strong>
          </div>
          <div class="stat-row">
            <span>Signal</span>
            <strong>{device.signal}</strong>
          </div>
          <div class="stat-row">
            <span>Last seen</span>
            <strong>{device.lastSeen}</strong>
          </div>
        </div>
  
        <div class="device-actions">
          <button class="ghost-btn" type="button">Toggle</button>
          <button class="view-btn" type="button" onclick={() => openDevice(device.name)}>
            View Details
          </button>
        </div>
      </article>
    {/each}
  </section>
  
  <style>
    .devices-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 24px;
    }
  
    .devices-header h1 {
      margin: 0;
      font-size: 44px;
      color: #f8fafc;
    }
  
    .devices-header p {
      margin: 10px 0 0;
      color: #94a3b8;
      font-size: 18px;
      max-width: 720px;
    }
  
    .devices-actions {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }
  
    .primary-btn,
    .secondary-btn,
    .ghost-btn,
    .view-btn {
      border: 0;
      border-radius: 14px;
      padding: 12px 18px;
      cursor: pointer;
      font-weight: 700;
    }
  
    .primary-btn {
      background: linear-gradient(135deg, #38bdf8, #1d4ed8);
      color: white;
    }
  
    .secondary-btn {
      background: rgba(148, 163, 184, 0.14);
      color: #e2e8f0;
    }
  
    .filter-strip {
      display: flex;
      gap: 14px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
  
    .filter-pill {
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(15, 23, 42, 0.75);
      color: #cbd5e1;
      border-radius: 18px;
      padding: 12px 16px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 16px;
      transition: 0.2s ease;
    }
  
    .filter-pill.active {
      background: rgba(59, 130, 246, 0.18);
      color: #ffffff;
      box-shadow: 0 0 18px rgba(59, 130, 246, 0.18);
    }
  
    .pill-count {
      min-width: 28px;
      height: 28px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: rgba(255, 255, 255, 0.08);
      font-size: 14px;
      font-weight: 700;
    }
  
    .devices-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 22px;
    }
  
    .device-card {
      border-radius: 24px;
      padding: 22px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: linear-gradient(180deg, #1e293b, #111827);
      box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.35),
        0 0 18px rgba(59, 130, 246, 0.08);
    }
  
    .device-card-top {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 18px;
    }
  
    .device-type {
      margin: 0 0 8px;
      color: #60a5fa;
      font-size: 14px;
      font-weight: 600;
    }
  
    .device-card h3 {
      margin: 0;
      color: #f8fafc;
      font-size: 24px;
      line-height: 1.2;
    }
  
    .device-location {
      margin: 8px 0 0;
      color: #94a3b8;
      font-size: 15px;
    }
  
    .status-chip {
      min-width: 84px;
      padding: 8px 12px;
      border-radius: 999px;
      text-align: center;
      font-size: 13px;
      font-weight: 700;
      color: white;
    }
  
    .status-chip.online {
      background: #14b8a6;
    }
  
    .status-chip.offline {
      background: #64748b;
    }
  
    .status-chip.alert {
      background: #f59e0b;
    }
  
    .device-main-value {
      font-size: 34px;
      font-weight: 800;
      color: #f8fafc;
      margin-bottom: 18px;
    }
  
    .device-stats {
      display: grid;
      gap: 10px;
      margin-bottom: 18px;
    }
  
    .stat-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: #cbd5e1;
      font-size: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
  
    .stat-row strong {
      color: #f8fafc;
      font-weight: 700;
    }
  
    .device-actions {
      display: flex;
      gap: 12px;
    }
  
    .ghost-btn {
      background: rgba(148, 163, 184, 0.12);
      color: #e2e8f0;
      flex: 1;
    }
  
    .view-btn {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      flex: 1;
    }
  
    @media (max-width: 1200px) {
      .devices-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  
    @media (max-width: 860px) {
      .devices-header {
        flex-direction: column;
      }
  
      .devices-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>