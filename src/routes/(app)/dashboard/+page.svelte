<script>
  import { onMount } from 'svelte';
  import Topbar from '$lib/components/layout/Topbar.svelte';
  import { apiFetch } from '$lib/api';

  let projects = [];
  let loading = true;
  let error = '';

  const metricCards = [
    {
      title: 'Devices Online',
      value: '--',
      change: '--',
      note: 'Waiting for live data',
      icon: '◉',
      iconClass: 'blue'
    },
    {
      title: 'Total Devices',
      value: '--',
      change: '--',
      note: 'Waiting for live data',
      icon: '✳',
      iconClass: 'amber'
    },
    {
      title: 'Avg Temperature',
      value: '--',
      change: '--',
      note: 'Waiting for live data',
      icon: '│',
      iconClass: 'green'
    },
    {
      title: 'Alerts / Warning',
      value: '--',
      change: '--',
      note: 'Waiting for live data',
      icon: '⚠',
      iconClass: 'red'
    }
  ];

  const devices = [];

  onMount(async () => {
    try {
      const result = await Promise.race([
        apiFetch('/projects'),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 8000)
        )
      ]);

      projects = Array.isArray(result) ? result : [];
    } catch (err) {
      console.error('Projects load error:', err);
      error = err.message || 'Failed to load projects';
    } finally {
      loading = false;
    }
  });
</script>