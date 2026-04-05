<script>
    import { apiFetch } from '$lib/api';
    import Topbar from '$lib/components/layout/Topbar.svelte';
  
    let projectName = $state('');
    let loading = $state(false);
    let error = $state('');
    let success = $state('');
    let createdProject = $state(null);
  
    async function createProject() {
      error = '';
      success = '';
      createdProject = null;
  
      const trimmedName = projectName.trim();
  
      if (!trimmedName) {
        error = 'Project name is required.';
        return;
      }
  
      try {
        loading = true;
  
        const result = await apiFetch('/projects', {
          method: 'POST',
          body: JSON.stringify({
            name: trimmedName
          })
        });
  
        createdProject = {
          id: result?.id || result?.project_id || null,
          name: result?.name || trimmedName
        };
  
        if (createdProject.id) {
          localStorage.setItem('selected_project_id', createdProject.id);
        }
  
        success = 'Project created successfully.';
        projectName = '';
      } catch (err) {
        console.error(err);
        error = err?.message || 'Failed to create project.';
      } finally {
        loading = false;
      }
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      createProject();
    }
  
    function goToProjects() {
      window.location.href = '/projects';
    }
  
    function goToAddDevice() {
      if (createdProject?.id) {
        localStorage.setItem('selected_project_id', createdProject.id);
      }
      window.location.href = '/devices/add';
    }
  </script>
  
  <Topbar />
  
  <section class="page-header">
    <div>
      <p class="eyebrow">Projects</p>
      <h1>Add Project</h1>
      <p class="subtext">Create a new project workspace before adding devices.</p>
    </div>
  
    <button class="ghost-btn" type="button" onclick={goToProjects}>
      Back to Projects
    </button>
  </section>
  
  <section class="content-grid">
    <article class="panel-card form-card">
      <div class="panel-header">
        <h3>Project Information</h3>
      </div>
  
      <form onsubmit={handleSubmit}>
        <div class="form-group">
          <label for="projectName">Project Name</label>
          <input
            id="projectName"
            type="text"
            placeholder="Enter project name"
            bind:value={projectName}
            autocomplete="off"
          />
        </div>
  
        {#if error}
          <div class="message error">{error}</div>
        {/if}
  
        {#if success}
          <div class="message success">{success}</div>
        {/if}
  
        <div class="form-actions">
          <button class="secondary-btn" type="button" onclick={goToProjects}>
            Cancel
          </button>
  
          <button class="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </article>
  
    <article class="panel-card info-card">
      <div class="panel-header">
        <h3>What happens next</h3>
      </div>
  
      <div class="steps-list">
        <div class="step-item">
          <span class="step-number">1</span>
          <div>
            <strong>Create project</strong>
            <p>Your workspace is created in the backend.</p>
          </div>
        </div>
  
        <div class="step-item">
          <span class="step-number">2</span>
          <div>
            <strong>Add devices</strong>
            <p>Attach one or more devices under this project.</p>
          </div>
        </div>
  
        <div class="step-item">
          <span class="step-number">3</span>
          <div>
            <strong>Get MQTT credentials</strong>
            <p>Each created device will return MQTT username, password, and topic.</p>
          </div>
        </div>
      </div>
  
      {#if createdProject}
        <div class="created-card">
          <p class="created-label">Created Project</p>
          <h4>{createdProject.name}</h4>
          <p class="created-id">
            ID: {createdProject.id ? createdProject.id : 'Pending backend response'}
          </p>
  
          <div class="created-actions">
            <button class="secondary-btn" type="button" onclick={goToProjects}>
              View Projects
            </button>
  
            <button class="primary-btn" type="button" onclick={goToAddDevice}>
              Add Device
            </button>
          </div>
        </div>
      {/if}
    </article>
  </section>
  
  <style>
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 24px;
    }
  
    .eyebrow {
      margin: 0 0 8px;
      color: #60a5fa;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  
    .page-header h1 {
      margin: 0;
      font-size: 44px;
      color: #f8fafc;
    }
  
    .subtext {
      margin: 10px 0 0;
      color: #94a3b8;
      font-size: 18px;
    }
  
    .content-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
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
      margin-bottom: 18px;
    }
  
    .panel-header h3 {
      margin: 0;
      font-size: 28px;
      color: #f8fafc;
    }
  
    .form-group {
      display: grid;
      gap: 10px;
      margin-bottom: 18px;
    }
  
    .form-group label {
      color: #cbd5e1;
      font-size: 14px;
      font-weight: 600;
    }
  
    .form-group input {
      border: 0;
      outline: none;
      border-radius: 14px;
      padding: 14px 16px;
      background: rgba(255, 255, 255, 0.06);
      color: #f8fafc;
      font-size: 15px;
      width: 100%;
      box-sizing: border-box;
    }
  
    .message {
      border-radius: 14px;
      padding: 12px 14px;
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: 600;
    }
  
    .message.error {
      background: rgba(239, 68, 68, 0.16);
      color: #fecaca;
    }
  
    .message.success {
      background: rgba(16, 185, 129, 0.16);
      color: #bbf7d0;
    }
  
    .form-actions,
    .created-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
  
    .primary-btn,
    .secondary-btn,
    .ghost-btn {
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
  
    .secondary-btn,
    .ghost-btn {
      background: rgba(148, 163, 184, 0.14);
      color: #e2e8f0;
    }
  
    .primary-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  
    .steps-list {
      display: grid;
      gap: 16px;
    }
  
    .step-item {
      display: flex;
      gap: 14px;
      align-items: flex-start;
    }
  
    .step-number {
      width: 30px;
      height: 30px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: rgba(59, 130, 246, 0.18);
      color: #bfdbfe;
      font-size: 14px;
      font-weight: 700;
      flex-shrink: 0;
    }
  
    .step-item strong {
      display: block;
      color: #f8fafc;
      margin-bottom: 4px;
    }
  
    .step-item p {
      margin: 0;
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.5;
    }
  
    .created-card {
      margin-top: 22px;
      border-radius: 18px;
      padding: 18px;
      background: rgba(255, 255, 255, 0.04);
    }
  
    .created-label {
      margin: 0 0 10px;
      color: #60a5fa;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  
    .created-card h4 {
      margin: 0 0 10px;
      color: #f8fafc;
      font-size: 22px;
    }
  
    .created-id {
      margin: 0 0 16px;
      color: #94a3b8;
      font-size: 14px;
    }
  
    @media (max-width: 980px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  
    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
      }
  
      .page-header h1 {
        font-size: 34px;
      }
    }
  </style>