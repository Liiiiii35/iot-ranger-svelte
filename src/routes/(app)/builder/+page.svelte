<script>
    import Topbar from '$lib/components/layout/Topbar.svelte';
  
    const widgets = [
      { name: 'Temperature Chart', type: 'Chart', status: 'Active' },
      { name: 'Humidity Gauge', type: 'Gauge', status: 'Active' },
      { name: 'Power Usage Table', type: 'Table', status: 'Draft' },
      { name: 'Alert Feed', type: 'Feed', status: 'Active' }
    ];
  
    const canvasWidgets = [
      {
        title: 'Live Temperature',
        size: 'Large',
        description: 'Realtime line chart for greenhouse temperature trends.'
      },
      {
        title: 'Device Health',
        size: 'Medium',
        description: 'Shows battery, signal, and online status summary.'
      },
      {
        title: 'Alerts Overview',
        size: 'Medium',
        description: 'Displays recent warnings and critical events.'
      },
      {
        title: 'Water Level',
        size: 'Small',
        description: 'Quick level snapshot for tank sensors.'
      }
    ];
  </script>
  
  <Topbar />
  
  <section class="builder-header">
    <div>
      <h1>Dashboard Builder</h1>
      <p>Create, arrange, and manage custom widgets for your IoT monitoring workspace.</p>
    </div>
  
    <div class="header-actions">
      <button class="ghost-btn" type="button">Preview</button>
      <button class="primary-btn" type="button">Save Layout</button>
    </div>
  </section>
  
  <section class="builder-grid">
    <aside class="panel-card sidebar-panel">
      <div class="panel-header">
        <h3>Widget Library</h3>
      </div>
  
      <div class="widget-list">
        {#each widgets as widget}
          <div class="widget-item">
            <div>
              <p class="widget-name">{widget.name}</p>
              <span class="widget-type">{widget.type}</span>
            </div>
  
            <span class:draft={widget.status === 'Draft'} class="widget-status">
              {widget.status}
            </span>
          </div>
        {/each}
      </div>
  
      <button class="add-widget-btn" type="button">+ Add New Widget</button>
    </aside>
  
    <section class="panel-card canvas-panel">
      <div class="panel-header">
        <h3>Canvas Layout</h3>
        <button class="panel-filter" type="button">Desktop View ▾</button>
      </div>
  
      <div class="canvas-grid">
        {#each canvasWidgets as widget}
          <article class="canvas-widget">
            <div class="canvas-top">
              <div>
                <p class="canvas-size">{widget.size}</p>
                <h4>{widget.title}</h4>
              </div>
              <button class="mini-btn" type="button">⋮</button>
            </div>
  
            <p class="canvas-description">{widget.description}</p>
  
            <div class="widget-preview">
              <div class="preview-line short"></div>
              <div class="preview-line"></div>
              <div class="preview-line medium"></div>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </section>
  
  <section class="bottom-grid">
    <article class="panel-card">
      <div class="panel-header">
        <h3>Layout Presets</h3>
      </div>
  
      <div class="preset-grid">
        <div class="preset-card">
          <strong>Monitoring View</strong>
          <span>Optimized for live device tracking</span>
        </div>
        <div class="preset-card">
          <strong>Analytics View</strong>
          <span>Focused on charts and historical trends</span>
        </div>
        <div class="preset-card">
          <strong>Operations View</strong>
          <span>Highlights alerts and quick controls</span>
        </div>
      </div>
    </article>
  
    <article class="panel-card">
      <div class="panel-header">
        <h3>Recent Changes</h3>
      </div>
  
      <div class="changes-list">
        <div class="change-row">
          <div>
            <p class="change-title">Temperature Chart resized</p>
            <span class="change-time">10 min ago</span>
          </div>
          <span class="change-badge">Updated</span>
        </div>
  
        <div class="change-row">
          <div>
            <p class="change-title">Alert Feed moved to top row</p>
            <span class="change-time">28 min ago</span>
          </div>
          <span class="change-badge">Updated</span>
        </div>
  
        <div class="change-row">
          <div>
            <p class="change-title">New Water Level widget added</p>
            <span class="change-time">1 hr ago</span>
          </div>
          <span class="change-badge added">Added</span>
        </div>
      </div>
    </article>
  </section>
  
  <style>
    .builder-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 24px;
    }
  
    .builder-header h1 {
      margin: 0;
      font-size: 44px;
      color: #f8fafc;
    }
  
    .builder-header p {
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
    .panel-filter,
    .add-widget-btn,
    .mini-btn {
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
    .add-widget-btn {
      background: rgba(148, 163, 184, 0.14);
      color: #e2e8f0;
    }
  
    .builder-grid,
    .bottom-grid {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 22px;
      margin-bottom: 24px;
    }
  
    .bottom-grid {
      grid-template-columns: 1fr 1fr;
    }
  
    .panel-card {
      border-radius: 24px;
      padding: 22px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background: linear-gradient(180deg, #1e293b, #111827);
      box-shadow:
        0 10px 30px rgba(0, 0, 0, 0.35),
        0 0 18px rgba(59, 130, 246, 0.08);
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
  
    .widget-list,
    .changes-list {
      display: grid;
      gap: 14px;
    }
  
    .widget-item,
    .change-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
  
    .widget-name,
    .change-title {
      margin: 0 0 6px;
      color: #f8fafc;
      font-weight: 600;
    }
  
    .widget-type,
    .change-time {
      color: #94a3b8;
      font-size: 13px;
    }
  
    .widget-status,
    .change-badge {
      min-width: 72px;
      text-align: center;
      border-radius: 999px;
      padding: 8px 12px;
      background: #14b8a6;
      color: white;
      font-size: 12px;
      font-weight: 700;
    }
  
    .widget-status.draft {
      background: #64748b;
    }
  
    .change-badge.added {
      background: #2563eb;
    }
  
    .add-widget-btn {
      width: 100%;
      margin-top: 20px;
    }
  
    .canvas-grid,
    .preset-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }
  
    .canvas-widget,
    .preset-card {
      border-radius: 20px;
      padding: 18px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
  
    .canvas-top {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 12px;
    }
  
    .canvas-size {
      margin: 0 0 8px;
      color: #60a5fa;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
  
    .canvas-widget h4 {
      margin: 0;
      color: #f8fafc;
      font-size: 22px;
    }
  
    .canvas-description,
    .preset-card span {
      margin: 0;
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.5;
    }
  
    .mini-btn {
      min-width: 44px;
      padding: 10px 12px;
      background: rgba(148, 163, 184, 0.14);
      color: #e2e8f0;
    }
  
    .widget-preview {
      margin-top: 16px;
      display: grid;
      gap: 10px;
    }
  
    .preview-line {
      height: 12px;
      border-radius: 999px;
      background: linear-gradient(135deg, rgba(56, 189, 248, 0.7), rgba(29, 78, 216, 0.7));
    }
  
    .preview-line.short {
      width: 55%;
    }
  
    .preview-line.medium {
      width: 75%;
    }
  
    .preset-card strong {
      display: block;
      margin-bottom: 8px;
      color: #f8fafc;
      font-size: 18px;
    }
  
    @media (max-width: 1200px) {
      .builder-grid,
      .bottom-grid,
      .canvas-grid,
      .preset-grid {
        grid-template-columns: 1fr;
      }
    }
  
    @media (max-width: 860px) {
      .builder-header {
        flex-direction: column;
      }
    }
  </style>