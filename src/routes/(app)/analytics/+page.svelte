<script>
  import Topbar from '$lib/components/layout/Topbar.svelte';

  let projectId = '';

  if (typeof window !== 'undefined') {
    projectId = localStorage.getItem('selected_project_id') || '';
  }

  const metrics = [
    { label: 'Avg Temperature', value: '26°C' },
    { label: 'Avg Humidity', value: '68%' },
    { label: 'Peak Value', value: '32°C' },
    { label: 'Lowest Value', value: '18°C' }
  ];
</script>

<Topbar />

<section class="analytics-header">
  <div>
    <h1>Analytics</h1>
    <p>Visualize and monitor device telemetry trends.</p>
  </div>

  <div class="actions">
    <button class="filter-btn">24 Hours ▾</button>
  </div>
</section>

{#if !projectId}
  <p class="message">Please select a project first.</p>

{:else}
  <section class="metrics-grid">
    {#each metrics as metric}
      <div class="metric-card">
        <p>{metric.label}</p>
        <h3>{metric.value}</h3>
      </div>
    {/each}
  </section>

  <section class="chart-section">
    <h3>Temperature Trend</h3>

    <div class="chart-placeholder">
      Chart will connect to backend telemetry
    </div>
  </section>
{/if}

<style>
  .analytics-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .analytics-header h1 {
    color: #fff;
    font-size: 42px;
  }

  .analytics-header p {
    color: #94a3b8;
  }

  .filter-btn {
    padding: 10px 16px;
    border-radius: 10px;
    background: white;
    border: none;
    cursor: pointer;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .metric-card {
    background: #1e293b;
    padding: 20px;
    border-radius: 16px;
    color: white;
  }

  .chart-section {
    background: #111827;
    padding: 24px;
    border-radius: 16px;
    color: white;
  }

  .chart-placeholder {
    height: 300px;
    display: grid;
    place-items: center;
    color: #94a3b8;
    background: rgba(59, 130, 246, 0.08);
    border-radius: 12px;
    margin-top: 12px;
  }

  .message {
    color: #cbd5e1;
  }

  @media (max-width: 768px) {
    .metrics-grid {
      grid-template-columns: 1fr;
    }
  }
</style>