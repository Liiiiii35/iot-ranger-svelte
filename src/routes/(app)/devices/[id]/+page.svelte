<script>
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import Topbar from '$lib/components/layout/Topbar.svelte';
  import { apiFetch } from '$lib/api';

  const deviceId = page.params.id;

  let loading = true;
  let error = '';

  let device = {
    id: deviceId,
    name: 'Loading...',
    type: 'Device',
    location: 'Unknown',
    status: 'Unknown',
    battery: '--',
    signal: '--',
    firmware: '--',
    lastSeen: '--',
    ip: '--',
    mac: '--'
  };

  const telemetry = [
    { label: 'Temperature', value: '--', tone: 'blue' },
    { label: 'Humidity', value: '--', tone: 'green' },
    { label: 'Battery', value: '--', tone: 'amber' },
    { label: 'Signal', value: '--', tone: 'purple' }
  ];

  const events = [
    { time: '--', event: 'Waiting for backend data', severity: 'normal' }
  ];

  onMount(async () => {
    try {
      const result = await Promise.race([
        apiFetch(`/devices/${deviceId}/status`),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 8000)
        )
      ]);

      device = {
        ...device,
        id: result.device_id || deviceId,
        name: result.name || `Device ${deviceId}`,
        status: result.online ? 'Online' : 'Offline',
        lastSeen: result.last_seen || '--'
      };
    } catch (err) {
      console.error('Device status load error:', err);
      error = err.message || 'Failed to load device status';
    } finally {
      loading = false;
    }
  });
</script>

<Topbar />

<section class="details-header">
  <div>
    <p class="eyebrow">Device Details</p>
    <h1>{device.name}</h1>
    <p class="subtext">{device.type} • {device.location} • ID: {device.id}</p>
  </div>

  <div class="header-actions">
    <button class="ghost-btn" type="button">Restart</button>
    <button class="primary-btn" type="button">Edit Device</button>
  </div>
</section>

{#if loading}
  <section class="panel-card">
    <p class="message">Loading device status...</p>
  </section>
{:else if error}
  <section class="panel-card">
    <p class="message error">Error: {error}</p>
  </section>
{/if}

<section class="hero-grid">
  <article class="hero-card main-card">
    <div class="hero-top">
      <div>
        <p class="card-label">Current Status</p>
        <h3>{device.status}</h3>
      </div>

      <span
        class="status-chip"
        class:online={device.status === 'Online'}
        class:offline={device.status === 'Offline'}
      >
        {device.status}
      </span>
    </div>

    <div class="stat-grid">
      <div class="stat-box">
        <span>Battery</span>
        <strong>{device.battery}</strong>
      </div>
      <div class="stat-box">
        <span>Signal</span>
        <strong>{device.signal}</strong>
      </div>
      <div class="stat-box">
        <span>Firmware</span>
        <strong>{device.firmware}</strong>
      </div>
      <div class="stat-box">
        <span>Last seen</span>
        <strong>{device.lastSeen}</strong>
      </div>
    </div>
  </article>

  <article class="hero-card side-card">
    <p class="card-label">Device Info</p>
    <div class="info-list">
      <div><span>IP Address</span><strong>{device.ip}</strong></div>
      <div><span>MAC Address</span><strong>{device.mac}</strong></div>
      <div><span>Location</span><strong>{device.location}</strong></div>
      <div><span>Type</span><strong>{device.type}</strong></div>
    </div>
  </article>
</section>

<section class="telemetry-grid">
  {#each telemetry as item}
    <article class="telemetry-card">
      <p>{item.label}</p>
      <h3>{item.value}</h3>
      <div class={`telemetry-accent ${item.tone}`}></div>
    </article>
  {/each}
</section>

<section class="panel-card">
  <div class="panel-header">
    <h3>Sensor Trend</h3>
    <button class="panel-filter" type="button">24 Hours ▾</button>
  </div>

  <div class="chart-area">
    <div class="chart-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <svg class="chart-svg" viewBox="0 0 1000 320" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="#3b82f6"
        stroke-width="4"
        points="20,240 100,210 180,150 260,170 340,90 420,110 500,145 580,120 660,180 740,130 820,95 900,150 980,115"
      />
      <polygon
        fill="rgba(59,130,246,0.12)"
        points="20,240 100,210 180,150 260,170 340,90 420,110 500,145 580,120 660,180 740,130 820,95 900,150 980,115 980,320 20,320"
      />
    </svg>
  </div>
</section>

<section class="bottom-grid">
  <article class="panel-card">
    <div class="panel-header">
      <h3>Quick Controls</h3>
    </div>

    <div class="controls-grid">
      <button class="control-btn" type="button">Turn On</button>
      <button class="control-btn" type="button">Turn Off</button>
      <button class="control-btn" type="button">Set Auto Mode</button>
      <button class="control-btn" type="button">Run Diagnostics</button>
    </div>
  </article>

  <article class="panel-card">
    <div class="panel-header">
      <h3>Recent Events</h3>
    </div>

    <div class="events-list">
      {#each events as item}
        <div class="event-row">
          <div>
            <p class="event-title">{item.event}</p>
            <span class="event-time">{item.time}</span>
          </div>
          <span class={`event-badge ${item.severity}`}>{item.severity}</span>
        </div>
      {/each}
    </div>
  </article>
</section>

<style>
  .details-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 24px;
  }

  .eyebrow {
    margin: 0 0 8px;
    color: #60a5fa;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .details-header h1 {
    margin: 0;
    font-size: 42px;
    color: #f8fafc;
  }

  .subtext {
    margin: 10px 0 0;
    color: #94a3b8;
    font-size: 18px;
  }

  .header-actions {
    display: flex;
    gap: 12px;
  }

  .primary-btn,
  .ghost-btn,
  .control-btn,
  .panel-filter {
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

  .ghost-btn,
  .control-btn {
    background: rgba(148, 163, 184, 0.14);
    color: #e2e8f0;
  }

  .message {
    color: #cbd5e1;
    font-size: 16px;
    margin: 0;
  }

  .message.error {
    color: #fca5a5;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 22px;
    margin-bottom: 22px;
  }

  .hero-card,
  .panel-card,
  .telemetry-card {
    border-radius: 24px;
    padding: 22px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    background: linear-gradient(180deg, #1e293b, #111827);
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.35),
      0 0 18px rgba(59, 130, 246, 0.08);
  }

  .hero-top {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  .card-label {
    margin: 0 0 10px;
    color: #94a3b8;
    font-size: 14px;
  }

  .hero-top h3 {
    margin: 0;
    font-size: 34px;
    color: #f8fafc;
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

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .stat-box {
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.04);
    padding: 16px;
  }

  .stat-box span {
    display: block;
    color: #94a3b8;
    font-size: 13px;
    margin-bottom: 8px;
  }

  .stat-box strong {
    color: #f8fafc;
    font-size: 18px;
  }

  .info-list {
    display: grid;
    gap: 14px;
  }

  .info-list div {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .info-list span {
    color: #94a3b8;
    font-size: 13px;
  }

  .info-list strong {
    color: #f8fafc;
    font-size: 15px;
    font-weight: 700;
  }

  .telemetry-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
    margin-bottom: 22px;
  }

  .telemetry-card {
    position: relative;
    overflow: hidden;
  }

  .telemetry-card p {
    margin: 0 0 10px;
    color: #94a3b8;
  }

  .telemetry-card h3 {
    margin: 0;
    font-size: 32px;
    color: #f8fafc;
  }

  .telemetry-accent {
    position: absolute;
    right: 18px;
    top: 18px;
    width: 14px;
    height: 52px;
    border-radius: 999px;
  }

  .telemetry-accent.blue { background: #3b82f6; }
  .telemetry-accent.green { background: #10b981; }
  .telemetry-accent.amber { background: #f59e0b; }
  .telemetry-accent.purple { background: #8b5cf6; }

  .panel-card {
    margin-bottom: 22px;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .panel-header h3 {
    margin: 0;
    font-size: 28px;
    color: #f8fafc;
  }

  .panel-filter {
    background: white;
    color: #475569;
  }

  .chart-area {
    position: relative;
    height: 340px;
    border-radius: 18px;
    overflow: hidden;
    background: rgba(59, 130, 246, 0.05);
  }

  .chart-grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
  }

  .chart-grid span {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .chart-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .controls-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .events-list {
    display: grid;
    gap: 14px;
  }

  .event-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: center;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .event-title {
    margin: 0 0 6px;
    color: #f8fafc;
    font-weight: 600;
  }

  .event-time {
    color: #94a3b8;
    font-size: 13px;
  }

  .event-badge {
    min-width: 82px;
    text-align: center;
    border-radius: 999px;
    padding: 8px 12px;
    color: white;
    font-size: 12px;
    font-weight: 700;
    text-transform: capitalize;
  }

  .event-badge.normal { background: #64748b; }
  .event-badge.success { background: #14b8a6; }
  .event-badge.warning { background: #f59e0b; }

  @media (max-width: 1200px) {
    .hero-grid,
    .bottom-grid,
    .telemetry-grid {
      grid-template-columns: 1fr;
    }

    .stat-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>