<script>
  function goToDashboard() {
    window.location.href = '/dashboard';
  }

  let email = '';
  let password = '';
</script>

<div class="login-container">
  <h1>Welcome Back</h1>

  <input
    type="email"
    placeholder="Enter your email"
    bind:value={email}
  />

  <input
    type="password"
    placeholder="Enter your password"
    bind:value={password}
  />

  <button type="button" onclick={goToDashboard}>
    Login
  </button>
</div>

<style>
  .login-container {
    max-width: 400px;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  input {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  button {
    padding: 12px;
    border-radius: 8px;
    background: #2563eb;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>