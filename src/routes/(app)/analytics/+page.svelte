<script>
    import Topbar from '$lib/components/layout/Topbar.svelte';
  
    const summaryCards = [
      { label: 'Avg Temperature', value: '26.4°C', change: '+1.2%', tone: 'blue' },
      { label: 'Avg Humidity', value: '67%', change: '-0.8%', tone: 'green' },
      { label: 'Power Usage', value: '4.2 kWh', change: '+3.4%', tone: 'amber' },
      { label: 'Alert Events', value: '12', change: '-5.1%', tone: 'red' }
    ];
  
    const reports = [
      { name: 'Greenhouse Temperature Trend', period: 'Last 24 hours', status: 'Ready' },
      { name: 'Humidity Variance Summary', period: 'Last 7 days', status: 'Ready' },
      { name: 'Power Consumption Audit', period: 'Last 30 days', status: 'Queued' },
      { name: 'Battery Health Overview', period: 'Last 14 days', status: 'Ready' }
    ];
  </script>
  
  <Topbar />
  
  <section class="analytics-header">
    <div>
      <h1>Analytics</h1>
      <p>Track patterns, compare telemetry, and monitor performance trends across devices.</p>
    </div>
  
    <div class="header-actions">
      <button class="ghost-btn" type="button">Export Report</button>
      <button class="primary-btn" type="button">Create Analysis</button>
    </div>
  </section>
  
  <section class="summary-grid">
    {#each summaryCards as card}
      <article class="summary-card">
        <p>{card.label}</p>
        <h3>{card.value}</h3>
        <span class={`change ${card.tone}`}>{card.change}</span>
      </article>
    {/each}
  </section>
  
  <section class="panel-card">
    <div class="panel-header">
      <h3>Telemetry Performance</h3>
      <button class="panel-filter" type="button">Last 30 Days ▾</button>
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
          points="20,230 90,180 160,195 230,120 300,145 370,92 440,135 510,105 580,170 650,120 720,80 790,110 860,95 930,145 980,102"
        />
        <polygon
          fill="rgba(59,130,246,0.12)"
          points="20,230 90,180 160,195 230,120 300,145 370,92 440,135 510,105 580,170 650,120 720,80 790,110 860,95 930,145 980,102 980,320 20,320"
        />
      </svg>
    </div>
  </section>
  
  <section class="bottom-grid">
    <article class="panel-card">
      <div class="panel-header">
        <h3>Source Comparison</h3>
        <button class="panel-filter" type="button">Weekly ▾</button>
      </div>
  
      <div class="bar-list">
        <div class="bar-row">
          <span>Temperature Sensors</span>
          <div class="bar-track"><div class="bar-fill fill-1"></div></div>
          <strong>84%</strong>
        </div>
        <div class="bar-row">
          <span>Humidity Sensors</span>
          <div class="bar-track"><div class="bar-fill fill-2"></div></div>
          <strong>72%</strong>
        </div>
        <div class="bar-row">
          <span>Energy Meters</span>
          <div class="bar-track"><div class="bar-fill fill-3"></div></div>
          <strong>65%</strong>
        </div>
        <div class="bar-row">
          <span>Actuator Logs</span>
          <div class="bar-track"><div class="bar-fill fill-4"></div></div>
          <strong>48%</strong>
        </div>
      </div>
    </article>
  
    <article class="panel-card">
      <div class="panel-header">
        <h3>Saved Reports</h3>
        <button class="panel-filter" type="button">View All</button>
      </div>
  
      <div class="reports-list">
        {#each reports as report}
          <div class="report-row">
            <div>
              <p class="report-name">{report.name}</p>
              <span class="report-period">{report.period}</span>
            </div>
            <span class:queued={report.status === 'Queued'} class="report-status">
              {report.status}
            </span>
          </div>
        {/each}
      </div>
    </article>
  </section>
  
  <style>
    .analytics-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 24px;
    }
  
    .analytics-header h1 {
      margin: 0;
      font-size: 44px;
      color: #f8fafc;
    }
  
    .analytics-header p {
      margin: 10px 0 0;
      color: #94a3b8;
      font-size: 18px;
      max-width: 760px;
    }
  
    .header-actions {
      display: flex;
      gap: 12px;
    }
  
    .primary-btn,
    .ghost-btn,
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
  
    .ghost-btn {
      background: rgba(148, 163, 184, 0.14);
      color: #e2e8f0;
    }
  
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 22px;
      margin-bottom: 24px;
    }
  
    .summary-card,
    .panel-card {
      border-radius: 24px;
      padding: 22px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: linear-gradient(180deg, #1e293b, #111827);
      box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.35),
        0 0 18px rgba(59, 130, 246, 0.08);
    }
  
    .summary-card p {
      margin: 0 0 12px;
      color: #94a3b8;
      font-size: 14px;
    }
  
    .summary-card h3 {
      margin: 0 0 14px;
      font-size: 34px;
      color: #f8fafc;
    }
  
    .change {
      font-weight: 700;
      font-size: 14px;
    }
  
    .change.blue { color: #60a5fa; }
    .change.green { color: #10b981; }
    .change.amber { color: #f59e0b; }
    .change.red { color: #ef4444; }
  
    .panel-card {
      margin-bottom: 24px;
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
  
    .bar-list {
      display: grid;
      gap: 18px;
    }
  
    .bar-row {
      display: grid;
      grid-template-columns: 180px 1fr 60px;
      align-items: center;
      gap: 14px;
      color: #e2e8f0;
    }
  
    .bar-track {
      width: 100%;
      height: 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }
  
    .bar-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(135deg, #38bdf8, #1d4ed8);
    }
  
    .fill-1 { width: 84%; }
    .fill-2 { width: 72%; }
    .fill-3 { width: 65%; }
    .fill-4 { width: 48%; }
  
    .reports-list {
      display: grid;
      gap: 14px;
    }
  
    .report-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
  
    .report-name {
      margin: 0 0 6px;
      color: #f8fafc;
      font-weight: 600;
    }
  
    .report-period {
      color: #94a3b8;
      font-size: 13px;
    }
  
    .report-status {
      min-width: 72px;
      text-align: center;
      border-radius: 999px;
      padding: 8px 12px;
      background: #14b8a6;
      color: white;
      font-size: 12px;
      font-weight: 700;
    }
  
    .report-status.queued {
      background: #f59e0b;
    }
  
    @media (max-width: 1200px) {
      .summary-grid {
        grid-template-columns: repeat(2, 1fr);
      }
  
      .bottom-grid {
        grid-template-columns: 1fr;
      }
    }
  
    @media (max-width: 860px) {
      .analytics-header {
        flex-direction: column;
      }
  
      .summary-grid {
        grid-template-columns: 1fr;
      }
  
      .bar-row {
        grid-template-columns: 1fr;
      }
    }
  </style>