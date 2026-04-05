<script>
    import Topbar from "$lib/components/layout/Topbar.svelte";

    const projects = [
        {
            id: 'proj_greenhouse',
            name: 'Greenhouse Monitoring',
            devices: 8,
            online: 6,
            updated: '2 min ago',
            description: 'Monitors temperature, humidity, and irrigation systems.'

        },
        {
            id: 'proj_warehouse',
            name: 'Warehouse Automation',
            devices: 5,
            online: 4,
            updated: '5 min ago',
            description: 'Tracks environment controls and storage conditions.'
        },
        {
            id: 'proj_energy',
            name: 'Energy Analytics',
            devices: 3,
            online: 3,
            updated: '1 min ago',
            description: 'Collects solar output and power consumption metrics.'
        }
    ];
    function openProject(projectId) {
    localStorage.setItem('selected_project_id', projectId);
    window.location.href = '/devices';
    }
</script>
<Topbar />

<section class="projects-header">
  <div>
    <h1>Projects</h1>
    <p>Manage your IoT workspaces, group devices, and organize monitoring environments.</p>
  </div>

  <div class="header-actions">
    <button class="ghost-btn" type="button">Import</button>
    <button class="primary-btn" type="button" onclick={() => (window.location.href = '/projects/add')}>
      + Create Project
    </button>
  </div>
</section>

<section class="project-grid">
  {#each projects as project}
    <article class="project-card">
      <div class="project-top">
        <div>
          <p class="project-id">{project.id}</p>
          <h3>{project.name}</h3>
        </div>

        <span class="status-pill">{project.online}/{project.devices} Online</span>
      </div>

      <p class="project-description">{project.description}</p>

      <div class="project-stats">
        <div class="stat-box">
          <span>Total Devices</span>
          <strong>{project.devices}</strong>
        </div>

        <div class="stat-box">
          <span>Online</span>
          <strong>{project.online}</strong>
        </div>

        <div class="stat-box">
          <span>Updated</span>
          <strong>{project.updated}</strong>
        </div>
      </div>

      <div class="project-actions">
        <button class="secondary-btn" type="button">Delete</button>
        <button class="view-btn" type="button" onclick={() => openProject(project.id)}>
          Open Project
        </button>
      </div>
    </article>
  {/each}
</section>

<style>
  .projects-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 24px;
  }

  .projects-header h1 {
    margin: 0;
    font-size: 44px;
    color: #f8fafc;
  }

  .projects-header p {
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
  .secondary-btn,
  .view-btn {
    border: 0;
    border-radius: 14px;
    padding: 12px 18px;
    cursor: pointer;
    font-weight: 700;
  }

  .primary-btn,
  .view-btn {
    background: linear-gradient(135deg, #38bdf8, #1d4ed8);
    color: white;
  }

  .ghost-btn,
  .secondary-btn {
    background: rgba(148, 163, 184, 0.14);
    color: #e2e8f0;
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }

  .project-card {
    border-radius: 24px;
    padding: 22px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    background: linear-gradient(180deg, #1e293b, #111827);
    box-shadow:
      0 10px 30px rgba(0, 0, 0, 0.35),
      0 0 18px rgba(59, 130, 246, 0.08);
  }

  .project-top {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .project-id {
    margin: 0 0 10px;
    color: #60a5fa;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .project-card h3 {
    margin: 0;
    color: #f8fafc;
    font-size: 26px;
    line-height: 1.2;
  }

  .status-pill {
    min-width: 116px;
    text-align: center;
    padding: 8px 12px;
    border-radius: 999px;
    background: #14b8a6;
    color: white;
    font-size: 13px;
    font-weight: 700;
  }

  .project-description {
    margin: 0 0 18px;
    color: #cbd5e1;
    font-size: 15px;
    line-height: 1.6;
  }

  .project-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 18px;
  }

  .stat-box {
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.04);
    padding: 14px;
  }

  .stat-box span {
    display: block;
    color: #94a3b8;
    font-size: 12px;
    margin-bottom: 8px;
  }

  .stat-box strong {
    color: #f8fafc;
    font-size: 18px;
  }

  .project-actions {
    display: flex;
    gap: 12px;
  }

  .secondary-btn,
  .view-btn {
    flex: 1;
  }

  @media (max-width: 1200px) {
    .project-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 860px) {
    .projects-header {
      flex-direction: column;
    }

    .project-grid,
    .project-stats {
      grid-template-columns: 1fr;
    }
  }
</style>