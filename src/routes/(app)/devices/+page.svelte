<script>
  import { apiFetch } from '$lib/api';
  import Topbar from '$lib/components/layout/Topbar.svelte';

  let projectId = $state('');
  let deviceName = $state('');
  let loading = $state(false);
  let error = $state('');
  let success = $state('');
  let createdDevice = $state(null);

  if (typeof window !== 'undefined') {
    projectId = localStorage.getItem('selected_project_id') || '';
  }

  async function createDevice() {
    error = '';
    success = '';
    createdDevice = null;

    const trimmedName = deviceName.trim();

    if (!projectId) {
      error = 'Please select a project first.';
      return;
    }

    if (!trimmedName) {
      error = 'Device name is required.';
      return;
    }

    try {
      loading = true;

      const result = await apiFetch(`/projects/${projectId}/devices`, {
        method: 'POST',
        body: JSON.stringify({
          name: trimmedName
        })
      });

      createdDevice = {
        id: result?.id || null,
        name: result?.name || trimmedName,
        project_id: result?.project_id || projectId,
        mqtt_username: result?.mqtt_username || '',
        mqtt_password: result?.mqtt_password || '',
        mqtt_topic: result?.mqtt_topic || '',
        status: 'Created'
      };

      success = 'Device created successfully.';
      deviceName = '';
    } catch (err) {
      console.error(err);
      error = err?.message || 'Failed to create device.';
    } finally {
      loading = false;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    createDevice();
  }

  function goToProjects() {
    window.location.href = '/projects';
  }

  function goToDevices() {
    window.location.href = '/devices';
  }

  function goToDeviceDetails() {
    if (createdDevice?.id) {
      window.location.href = `/devices/${createdDevice.id}`;
    }
  }

  async function copyText(value) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }
</script>

<Topbar />

<section class="page-header">
  <div>
    <p class="eyebrow">Devices</p>
    <h1>Add Device</h1>
    <p class="subtext">Create a device under the selected project and get MQTT credentials instantly.</p>
  </div>

  <div class="header-actions">
    <button class="ghost-btn" type="button" onclick={goToProjects}>
      Back to Projects
    </button>
    <button class="ghost-btn" type="button" onclick={goToDevices}>
      Back to Devices
    </button>
  </div>
</section>

<section class="content-grid">
  <article class="panel-card form-card">
    <div class="panel-header">
      <h3>Device Information</h3>
    </div>

    <form onsubmit={handleSubmit}>
      <div class="form-group">
        <label for="projectId">Selected Project ID</label>
        <input
          id="projectId"
          type="text"
          bind:value={projectId}
          readonly
        />
      </div>

      <div class="form-group">
        <label for="deviceName">Device Name</label>
        <input
          id="deviceName"
          type="text"
          placeholder="Enter device name"
          bind:value={deviceName}
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
        <button class="secondary-btn" type="button" onclick={goToDevices}>
          Cancel
        </button>

        <button class="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Device'}
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
          <strong>Create device</strong>
          <p>The device is attached to the selected project in the backend.</p>
        </div>
      </div>

      <div class="step-item">
        <span class="step-number">2</span>
        <div>
          <strong>Receive MQTT credentials</strong>
          <p>The backend returns MQTT username, password, and topic.</p>
        </div>
      </div>

      <div class="step-item">
        <span class="step-number">3</span>
        <div>
          <strong>Configure your board</strong>
          <p>Use the credentials in your ESP32 or other IoT device firmware.</p>
        </div>
      </div>
    </div>

    {#if createdDevice}
      <div class="created-card">
        <p class="created-label">Created Device</p>
        <h4>{createdDevice.name}</h4>
        <p class="created-id">Device ID: {createdDevice.id || 'Pending backend response'}</p>

        <div class="credentials-grid">
          <div class="credential-item">
            <span>MQTT Username</span>
            <strong>{createdDevice.mqtt_username || 'Not returned'}</strong>
            <button class="mini-btn" type="button" onclick={() => copyText(createdDevice.mqtt_username)}>
              Copy
            </button>
          </div>

          <div class="credential-item">
            <span>MQTT Password</span>
            <strong class="credential-secret">{createdDevice.mqtt_password || 'Not returned'}</strong>
            <button class="mini-btn" type="button" onclick={() => copyText(createdDevice.mqtt_password)}>
              Copy
            </button>
          </div>

          <div class="credential-item">
            <span>MQTT Topic</span>
            <strong>{createdDevice.mqtt_topic || 'Not returned'}</strong>
            <button class="mini-btn" type="button" onclick={() => copyText(createdDevice.mqtt_topic)}>
              Copy
            </button>
          </div>

          <div class="credential-item">
            <span>Status</span>
            <strong>{createdDevice.status}</strong>
          </div>
        </div>

        <div class="created-actions">
          <button class="secondary-btn" type="button" onclick={goToDevices}>
            View Devices
          </button>

          <button class="primary-btn" type="button" onclick={goToDeviceDetails}>
            Device Details
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

  .header-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .content-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
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

  form {
    display: block;
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

  .form-group input[readonly] {
    opacity: 0.8;
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
  .ghost-btn,
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

  .secondary-btn,
  .ghost-btn,
  .mini-btn {
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

  .credentials-grid {
    display: grid;
    gap: 14px;
    margin-bottom: 18px;
  }

  .credential-item {
    display: grid;
    gap: 8px;
    padding: 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.04);
  }

  .credential-item span {
    color: #94a3b8;
    font-size: 13px;
  }

  .credential-item strong {
    color: #f8fafc;
    font-size: 15px;
    word-break: break-all;
  }

  .credential-secret {
    letter-spacing: 0.02em;
  }

  .mini-btn {
    width: fit-content;
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 12px;
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