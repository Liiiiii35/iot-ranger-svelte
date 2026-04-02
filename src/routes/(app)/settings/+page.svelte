<script>
    import Topbar from '$lib/components/layout/Topbar.svelte';
  
    let notifications = $state(true);
    let deviceSync = $state(true);
    let darkMode = $state(true);
    let autoRefresh = $state(true);
  </script>
  
  <Topbar />
  
  <section class="settings-header">
    <div>
      <h1>Settings</h1>
      <p>Manage platform preferences, notifications, display options, and account controls.</p>
    </div>
  
    <div class="header-actions">
      <button class="ghost-btn" type="button">Reset</button>
      <button class="primary-btn" type="button">Save Changes</button>
    </div>
  </section>
  
  <section class="settings-grid">
    <article class="panel-card">
      <div class="panel-header">
        <h3>Profile Settings</h3>
      </div>
  
      <div class="form-grid">
        <label class="field">
          <span>Full Name</span>
          <input type="text" value="John Snow" />
        </label>
  
        <label class="field">
          <span>Email Address</span>
          <input type="email" value="johnsnow@company.com" />
        </label>
  
        <label class="field">
          <span>Role</span>
          <input type="text" value="Operations Manager" />
        </label>
  
        <label class="field">
          <span>Organization</span>
          <input type="text" value="IoT Ranger Labs" />
        </label>
      </div>
    </article>
  
    <article class="panel-card">
      <div class="panel-header">
        <h3>System Preferences</h3>
      </div>
  
      <div class="toggle-list">
        <div class="toggle-row">
          <div>
            <p class="toggle-title">Email Notifications</p>
            <span class="toggle-text">Receive alerts and updates by email</span>
          </div>
          <button class:active={notifications} class="toggle-btn" type="button" onclick={() => (notifications = !notifications)}>
            {notifications ? 'On' : 'Off'}
          </button>
        </div>
  
        <div class="toggle-row">
          <div>
            <p class="toggle-title">Device Sync</p>
            <span class="toggle-text">Keep devices synced automatically</span>
          </div>
          <button class:active={deviceSync} class="toggle-btn" type="button" onclick={() => (deviceSync = !deviceSync)}>
            {deviceSync ? 'On' : 'Off'}
          </button>
        </div>
  
        <div class="toggle-row">
          <div>
            <p class="toggle-title">Dark Mode</p>
            <span class="toggle-text">Use dark theme across the platform</span>
          </div>
          <button class:active={darkMode} class="toggle-btn" type="button" onclick={() => (darkMode = !darkMode)}>
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>
  
        <div class="toggle-row">
          <div>
            <p class="toggle-title">Auto Refresh</p>
            <span class="toggle-text">Refresh dashboard data automatically</span>
          </div>
          <button class:active={autoRefresh} class="toggle-btn" type="button" onclick={() => (autoRefresh = !autoRefresh)}>
            {autoRefresh ? 'On' : 'Off'}
          </button>
        </div>
      </div>
    </article>
  </section>
  
  <section class="bottom-grid">
    <article class="panel-card">
      <div class="panel-header">
        <h3>Security</h3>
      </div>
  
      <div class="security-list">
        <div class="security-row">
          <div>
            <p class="security-title">Change Password</p>
            <span class="security-text">Update your current account password</span>
          </div>
          <button class="ghost-btn small" type="button">Update</button>
        </div>
  
        <div class="security-row">
          <div>
            <p class="security-title">Two-Factor Authentication</p>
            <span class="security-text">Add an extra layer of login security</span>
          </div>
          <button class="ghost-btn small" type="button">Enable</button>
        </div>
  
        <div class="security-row">
          <div>
            <p class="security-title">Active Sessions</p>
            <span class="security-text">Review devices currently signed in</span>
          </div>
          <button class="ghost-btn small" type="button">Review</button>
        </div>
      </div>
    </article>
  
    <article class="panel-card">
      <div class="panel-header">
        <h3>Platform Info</h3>
      </div>
  
      <div class="info-list">
        <div class="info-row">
          <span>Version</span>
          <strong>v1.0.0</strong>
        </div>
        <div class="info-row">
          <span>Environment</span>
          <strong>Production</strong>
        </div>
        <div class="info-row">
          <span>Region</span>
          <strong>Asia Pacific</strong>
        </div>
        <div class="info-row">
          <span>Last Updated</span>
          <strong>Today, 10:30 AM</strong>
        </div>
      </div>
    </article>
  </section>
  
  <style>
    .settings-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 24px;
    }
  
    .settings-header h1 {
      margin: 0;
      font-size: 44px;
      color: #f8fafc;
    }
  
    .settings-header p {
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
    .toggle-btn {
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
  
    .ghost-btn.small {
      padding: 10px 14px;
      border-radius: 12px;
    }
  
    .settings-grid,
    .bottom-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 22px;
      margin-bottom: 24px;
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
  
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
  
    .field {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .field span {
      color: #cbd5e1;
      font-size: 14px;
      font-weight: 600;
    }
  
    .field input {
      border: 0;
      outline: none;
      border-radius: 14px;
      padding: 14px 16px;
      background: rgba(255, 255, 255, 0.06);
      color: #f8fafc;
      font-size: 15px;
    }
  
    .toggle-list,
    .security-list,
    .info-list {
      display: grid;
      gap: 16px;
    }
  
    .toggle-row,
    .security-row,
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      padding-bottom: 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
  
    .toggle-title,
    .security-title {
      margin: 0 0 6px;
      color: #f8fafc;
      font-weight: 600;
    }
  
    .toggle-text,
    .security-text {
      color: #94a3b8;
      font-size: 13px;
    }
  
    .toggle-btn {
      min-width: 78px;
      background: rgba(148, 163, 184, 0.14);
      color: #e2e8f0;
    }
  
    .toggle-btn.active {
      background: linear-gradient(135deg, #38bdf8, #1d4ed8);
      color: white;
    }
  
    .info-row span {
      color: #94a3b8;
    }
  
    .info-row strong {
      color: #f8fafc;
    }
  
    @media (max-width: 1100px) {
      .settings-grid,
      .bottom-grid,
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  
    @media (max-width: 860px) {
      .settings-header {
        flex-direction: column;
      }
    }
  </style>