<script>
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  let { children } = $props();
</script>

<div class="app-shell">
  <Sidebar />
  <main class="main-shell">
    {@render children()}
  </main>
</div>