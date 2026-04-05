<script>
  import Topbar from '$lib/components/layout/Topbar.svelte';

  let availableWidgets = $state([
    {
      id: 'w1',
      name: 'Temperature Chart',
      type: 'chart',
      description: 'Shows live temperature trend'
    },
    {
      id: 'w2',
      name: 'Humidity Gauge',
      type: 'gauge',
      description: 'Displays current humidity level'
    },
    {
      id: 'w3',
      name: 'Device Status',
      type: 'status',
      description: 'Lists online and offline devices'
    },
    {
      id: 'w4',
      name: 'Alerts Feed',
      type: 'feed',
      description: 'Shows latest platform alerts'
    }
  ]);

  let canvasWidgets = $state([
    {
      id: 'c1',
      name: 'Temperature Chart',
      type: 'chart',
      description: 'Shows live temperature trend'
    },
    {
      id: 'c2',
      name: 'Device Status',
      type: 'status',
      description: 'Lists online and offline devices'
    }
  ]);

  let draggedWidget = $state(null);
  let draggedFrom = $state('');

  function startDrag(widget, source) {
    draggedWidget = widget;
    draggedFrom = source;
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  function dropOnCanvas() {
    if (!draggedWidget) return;

    if (draggedFrom === 'library') {
      const alreadyExists = canvasWidgets.some((item) => item.id === draggedWidget.id);
      if (!alreadyExists) {
        canvasWidgets = [...canvasWidgets, { ...draggedWidget }];
      }
    }

    draggedWidget = null;
    draggedFrom = '';
  }

  function removeWidget(widgetId) {
    canvasWidgets = canvasWidgets.filter((item) => item.id !== widgetId);
  }

  function moveUp(index) {
    if (index === 0) return;
    const updated = [...canvasWidgets];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    canvasWidgets = updated;
  }

  function moveDown(index) {
    if (index === canvasWidgets.length - 1) return;
    const updated = [...canvasWidgets];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    canvasWidgets = updated;
  }
</script>

<Topbar />

<section class="builder-header">
  <div>
    <h1>Dashboard Builder</h1>
    <p>Drag widgets from the library into your dashboard canvas and arrange them the way you want.</p>
  </div>

  <div class="builder-actions">
    <button class="ghost-btn" type="button">Preview</button>
    <button class="primary-btn" type="button">Save Layout</button>
  </div>
</section>

<section class="builder-layout">
  <aside class="panel-card library-panel">
    <div class="panel-header">
      <h3>Widget Library</h3>
    </div>

    <div class="widget-library">
      {#each availableWidgets as widget}
        <div
          class="library-widget"
          draggable="true"
          ondragstart={() => startDrag(widget, 'library')}
        >
          <div>
            <p class="widget-type">{widget.type}</p>
            <h4>{widget.name}</h4>
            <span>{widget.description}</span>
          </div>
          <div class="drag-handle">⋮⋮</div>
        </div>
      {/each}
    </div>
  </aside>

  <section
    class="panel-card canvas-panel"
    ondragover={allowDrop}
    ondrop={dropOnCanvas}
  >
    <div class="panel-header">
      <h3>Canvas</h3>
      <button class="canvas-badge" type="button">
        {canvasWidgets.length} Widgets
      </button>
    </div>

    {#if canvasWidgets.length === 0}
      <div class="empty-state">
        <p>Drop widgets here to build your dashboard.</p>
      </div>
    {:else}
      <div class="canvas-grid">
        {#each canvasWidgets as widget, index}
          <article class="canvas-widget">
            <div class="canvas-top">
              <div>
                <p class="widget-type">{widget.type}</p>
                <h4>{widget.name}</h4>
                <span>{widget.description}</span>
              </div>

              <div class="widget-controls">
                <button class="mini-btn" type="button" onclick={() => moveUp(index)}>↑</button>
                <button class="mini-btn" type="button" onclick={() => moveDown(index)}>↓</button>
                <button class="mini-btn danger" type="button" onclick={() => removeWidget(widget.id)}>✕</button>
              </div>
            </div>

            <div class="widget-preview">
              {#if widget.type === 'chart'}
                <div class="preview-chart">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              {:else if widget.type === 'gauge'}
                <div class="preview-gauge">
                  <div class="gauge-ring"></div>
                  <strong>68%</strong>
                </div>
              {:else if widget.type === 'status'}
                <div class="preview-status">
                  <div><span class="dot online"></span> Online Devices</div>
                  <strong>12</strong>
                </div>
              {:else}
                <div class="preview-feed">
                  <div class="feed-line"></div>
                  <div class="feed-line short"></div>
                  <div class="feed-line medium"></div>
                </div>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    {/if}
  </section>
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

  .builder-actions {
    display: flex;
    gap: 12px;
  }

  .primary-btn,
  .ghost-btn,
  .canvas-badge,
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
  .canvas-badge {
    background: rgba(148, 163, 184, 0.14);
    color: #e2e8f0;
  }

  .builder-layout {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 22px;
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

  .widget-library {
    display: grid;
    gap: 14px;
  }

  .library-widget,
  .canvas-widget {
    border-radius: 18px;
    padding: 18px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .library-widget {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 14px;
    cursor: grab;
  }

  .widget-type {
    margin: 0 0 8px;
    color: #60a5fa;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .library-widget h4,
  .canvas-widget h4 {
    margin: 0 0 8px;
    color: #f8fafc;
    font-size: 20px;
  }

  .library-widget span,
  .canvas-widget span {
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.5;
  }

  .drag-handle {
    color: #94a3b8;
    font-size: 18px;
    line-height: 1;
    padding-top: 6px;
  }

  .canvas-panel {
    min-height: 520px;
  }

  .empty-state {
    min-height: 420px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    border: 2px dashed rgba(148, 163, 184, 0.25);
    color: #94a3b8;
    background: rgba(255, 255, 255, 0.02);
  }

  .canvas-grid {
    display: grid;
    gap: 16px;
  }

  .canvas-top {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .widget-controls {
    display: flex;
    gap: 8px;
  }

  .mini-btn {
    min-width: 42px;
    padding: 10px 12px;
    background: rgba(148, 163, 184, 0.14);
    color: #e2e8f0;
  }

  .mini-btn.danger {
    background: rgba(239, 68, 68, 0.18);
    color: #fecaca;
  }

  .widget-preview {
    border-radius: 16px;
    padding: 16px;
    background: rgba(15, 23, 42, 0.7);
    min-height: 120px;
    display: grid;
    place-items: center;
  }

  .preview-chart {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: end;
    gap: 10px;
  }

  .preview-chart span {
    flex: 1;
    border-radius: 999px 999px 6px 6px;
    background: linear-gradient(180deg, #38bdf8, #1d4ed8);
  }

  .preview-chart span:nth-child(1) { height: 45%; }
  .preview-chart span:nth-child(2) { height: 70%; }
  .preview-chart span:nth-child(3) { height: 55%; }
  .preview-chart span:nth-child(4) { height: 88%; }
  .preview-chart span:nth-child(5) { height: 62%; }

  .preview-gauge {
    display: grid;
    place-items: center;
    gap: 10px;
  }

  .gauge-ring {
    width: 72px;
    height: 72px;
    border-radius: 999px;
    border: 8px solid rgba(59, 130, 246, 0.25);
    border-top-color: #38bdf8;
  }

  .preview-gauge strong,
  .preview-status strong {
    color: #f8fafc;
    font-size: 22px;
  }

  .preview-status {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #cbd5e1;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    display: inline-block;
    margin-right: 8px;
  }

  .dot.online {
    background: #10b981;
  }

  .preview-feed {
    width: 100%;
    display: grid;
    gap: 10px;
  }

  .feed-line {
    height: 12px;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.25);
  }

  .feed-line.short {
    width: 55%;
  }

  .feed-line.medium {
    width: 75%;
  }

  @media (max-width: 1100px) {
    .builder-layout {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .builder-header {
      flex-direction: column;
    }
  }
</style>