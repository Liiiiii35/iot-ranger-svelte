<script lang="ts">
  import { registerWithEmail, loginWithEmail, loginWithGoogle, resetPassword } from '$lib/authService';

  // Regex patterns
  const lettersRegex = /[a-zA-Z]/;
  const numbersRegex = /\d/;

  let isLogin = $state(true);
  let isForgotPassword = $state(false);
  let loading = $state(false);
  let error = $state('');
  let successMessage = $state('');

  // Login form
  let loginEmail = $state('');
  let loginPassword = $state('');

  // Register form
  let registerUsername = $state('');
  let registerEmail = $state('');
  let registerPassword = $state('');
  let registerPasswordConfirm = $state('');

  // Forgot password
  let resetEmail = $state('');

  function toggleMode() {
    isLogin = !isLogin;
    isForgotPassword = false;
    error = '';
    successMessage = '';
  }

  function showForgotPassword() {
    isForgotPassword = true;
    error = '';
    successMessage = '';
  }

  function backToLogin() {
    isForgotPassword = false;
    error = '';
    successMessage = '';
  }

  async function handleLogin(e) {
    e.preventDefault();
    error = '';

    if (!loginEmail || !loginPassword) {
      error = 'Please fill in all fields';
      return;
    }

    loading = true;
    try {
      await loginWithEmail(loginEmail, loginPassword);
      window.location.href = '/dashboard';
    } catch (err) {
      error = err?.message || 'Login failed. Please try again.';
    } finally {
      loading = false;
    }
  }

  async function handleGoogleLogin() {
    error = '';
    loading = true;
    try {
      await loginWithGoogle();
      window.location.href = '/dashboard';
    } catch (err) {
      error = err?.message || 'Google login failed. Please try again.';
    } finally {
      loading = false;
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    error = '';
    successMessage = '';

    if (!resetEmail) {
      error = 'Please enter your email';
      return;
    }

    loading = true;
    try {
      await resetPassword(resetEmail);
      successMessage = 'Reset email sent — check your inbox';
      resetEmail = '';
    } catch (err) {
      error = err?.message || 'Failed to send reset email.';
    } finally {
      loading = false;
    }
  }

  // Validation functions
  function isValidUsername(username) {
    return /^[a-zA-Z]{4,}$/.test(username);
  }

  function isValidPassword(password) {
    return /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(password);
  }

  const hasValidUsername = $derived(registerUsername.length > 0 && /^[a-zA-Z]{4,}$/.test(registerUsername));
  const hasValidPassword = $derived(registerPassword.length > 0 && /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(registerPassword));
  const passwordsMatch = $derived(registerPassword === registerPasswordConfirm && registerPasswordConfirm.length > 0);
  const hasValidEmail = $derived(registerEmail.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail));
  const isFormValid = $derived(hasValidUsername && hasValidEmail && hasValidPassword && passwordsMatch);

  async function handleRegister(e) {
    e.preventDefault();
    error = '';

    if (!registerUsername || !registerEmail || !registerPassword || !registerPasswordConfirm) {
      error = 'Please fill in all fields';
      return;
    }

    if (!isValidUsername(registerUsername)) {
      error = 'Username must contain only letters and be at least 4 characters';
      return;
    }

    if (!isValidPassword(registerPassword)) {
      error = 'Password must be at least 8 characters with letters and numbers';
      return;
    }

    if (registerPassword !== registerPasswordConfirm) {
      error = 'Passwords do not match';
      return;
    }

    loading = true;
    try {
      await registerWithEmail(registerEmail, registerPassword);
      error = '';
      isLogin = true;
      loginEmail = registerEmail;
      loginPassword = '';
      registerUsername = registerUsername;
      registerEmail = '';
      registerPassword = '';
      registerPasswordConfirm = '';
    } catch (err) {
      error = err?.message || 'Registration failed. Please try again.';
    } finally {
      loading = false;
    }
  }
</script>

<div class="auth-container">
  <div class="auth-card">
    {#if isForgotPassword}
      <!-- Forgot Password Form -->
      <div class="form-wrapper">
        <div class="header">
          <h1>Reset Password</h1>
          <p>Enter your email and we'll send you a reset link</p>
        </div>

        {#if error}
          <div class="error-message">{error}</div>
        {/if}

        {#if successMessage}
          <div class="success-message">{successMessage}</div>
        {/if}

        <form onsubmit={handleForgotPassword}>
          <div class="form-group">
            <label for="reset-email">Email Address</label>
            <input
              id="reset-email"
              type="email"
              placeholder="you@example.com"
              bind:value={resetEmail}
              disabled={loading}
            />
          </div>

          <button type="submit" class="submit-btn" disabled={loading}>
            {#if loading}
              <span class="loader"></span> Sending...
            {:else}
              Send Reset Link
            {/if}
          </button>
        </form>

        <div class="divider"><span>Remembered your password?</span></div>
        <button type="button" class="toggle-btn" onclick={backToLogin} disabled={loading}>
          Back to Sign In
        </button>
      </div>

    {:else if isLogin}
      <!-- Login Form -->
      <div class="form-wrapper">
        <div class="header">
          <h1>Welcome Back</h1>
          <p>Sign in to your IoT Ranger account</p>
        </div>

        {#if error}
          <div class="error-message">{error}</div>
        {/if}

        <form onsubmit={handleLogin}>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              bind:value={loginEmail}
              disabled={loading}
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              bind:value={loginPassword}
              disabled={loading}
            />
            <button type="button" class="forgot-link" onclick={showForgotPassword}>
              Forgot password?
            </button>
          </div>

          <button type="submit" class="submit-btn" disabled={loading}>
            {#if loading}
              <span class="loader"></span> Signing in...
            {:else}
              Sign In
            {/if}
          </button>
        </form>

        <div class="divider"><span>or</span></div>

        <button type="button" class="google-btn" onclick={handleGoogleLogin} disabled={loading}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.48A4.8 4.8 0 0 1 4.5 7.5V5.43H1.83a8 8 0 0 0 0 7.12z"/>
            <path fill="#EA4335" d="M8.98 3.58c1.32 0 2.5.45 3.44 1.35l2.56-2.56A8 8 0 0 0 1.83 5.43L4.5 7.5a4.77 4.77 0 0 1 4.48-3.92z"/>
          </svg>
          Continue with Google
        </button>

        <div class="divider"><span>Don't have an account?</span></div>
        <button type="button" class="toggle-btn" onclick={toggleMode} disabled={loading}>
          Create Account
        </button>
      </div>

    {:else}
      <!-- Register Form — unchanged from your original -->
      <div class="form-wrapper">
        <div class="header">
          <h1>Create Account</h1>
          <p>Join IoT Ranger and start managing your devices</p>
        </div>

        {#if error}
          <div class="error-message">{error}</div>
        {/if}

        <form onsubmit={handleRegister}>
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Your name" bind:value={registerUsername} disabled={loading} />
            {#if registerUsername.length > 0}
              <div class="validation-rules">
                <div class="rule" class:valid={hasValidUsername}>
                  <span class="rule-icon">{hasValidUsername ? '✓' : '✗'}</span>
                  Only letters (a-z, A-Z)
                </div>
                <div class="rule" class:valid={registerUsername.length >= 4}>
                  <span class="rule-icon">{registerUsername.length >= 4 ? '✓' : '✗'}</span>
                  At least 4 characters
                </div>
              </div>
            {/if}
          </div>

          <div class="form-group">
            <label for="register-email">Email Address</label>
            <input id="register-email" type="email" placeholder="you@example.com" bind:value={registerEmail} disabled={loading} />
          </div>

          <div class="form-group">
            <label for="register-password">Password</label>
            <input id="register-password" type="password" placeholder="••••••••" bind:value={registerPassword} disabled={loading} />
            {#if registerPassword.length > 0}
              <div class="validation-rules">
                <div class="rule" class:valid={registerPassword.length >= 8}>
                  <span class="rule-icon">{registerPassword.length >= 8 ? '✓' : '✗'}</span>
                  At least 8 characters
                </div>
                <div class="rule" class:valid={lettersRegex.test(registerPassword)}>
                  <span class="rule-icon">{lettersRegex.test(registerPassword) ? '✓' : '✗'}</span>
                  Contains letters
                </div>
                <div class="rule" class:valid={numbersRegex.test(registerPassword)}>
                  <span class="rule-icon">{numbersRegex.test(registerPassword) ? '✓' : '✗'}</span>
                  Contains numbers
                </div>
              </div>
            {/if}
          </div>

          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input id="confirm-password" type="password" placeholder="••••••••" bind:value={registerPasswordConfirm} disabled={loading} />
            {#if registerPasswordConfirm.length > 0}
              <div class="validation-rules">
                <div class="rule" class:valid={registerPassword === registerPasswordConfirm}>
                  <span class="rule-icon">{registerPassword === registerPasswordConfirm ? '✓' : '✗'}</span>
                  Passwords match
                </div>
              </div>
            {/if}
          </div>

          <button type="submit" class="submit-btn" disabled={loading || !isFormValid}>
            {#if loading}
              <span class="loader"></span> Creating account...
            {:else}
              Create Account
            {/if}
          </button>
        </form>

        <div class="divider"><span>Already have an account?</span></div>
        <button type="button" class="toggle-btn" onclick={toggleMode} disabled={loading}>
          Sign In
        </button>
      </div>
    {/if}
  </div>

  <!-- Branding Section — unchanged -->
  <div class="branding">
    <div class="brand-content">
      <h2>IoT Ranger</h2>
      <p>Manage and monitor your IoT devices with ease</p>
      <ul class="features">
        <li>✓ Real-time device monitoring</li>
        <li>✓ Advanced analytics & insights</li>
        <li>✓ Secure data management</li>
      </ul>
    </div>
  </div>
</div>

<style>
  .google-btn {
    width: 100%;
    padding: 12px 16px;
    background-color: #1e293b;
    color: #f1f5f9;
    border: 1px solid #334155;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .google-btn:hover:not(:disabled) {
    background-color: #0f172a;
    border-color: #3b82f6;
  }

  .forgot-link {
    background: none;
    border: none;
    color: #3b82f6;
    font-size: 12px;
    cursor: pointer;
    text-align: right;
    padding: 0;
    margin-top: 4px;
    align-self: flex-end;
  }

  .success-message {
    background-color: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #86efac;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  .auth-container {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: linear-gradient(135deg, #020617 0%, #0b1220 100%);
  }

  .auth-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  .form-wrapper {
    width: 100%;
    max-width: 420px;
  }

  .header {
    margin-bottom: 32px;
    text-align: center;
  }

  .header h1 {
    font-size: 28px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 8px;
  }

  .header p {
    font-size: 14px;
    color: #94a3b8;
    margin: 0;
  }

  .error-message {
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-size: 13px;
    font-weight: 600;
    color: #d1d5db;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  input {
    padding: 12px 16px;
    background-color: #1e293b;
    border: 1px solid #334155;
    border-radius: 8px;
    color: #f1f5f9;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #0f172a;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input::placeholder {
    color: #64748b;
  }

  .submit-btn {
    padding: 12px 16px;
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .loader {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .divider {
    text-align: center;
    margin: 24px 0;
  }

  .divider span {
    font-size: 13px;
    color: #94a3b8;
  }

  .toggle-btn {
    width: 100%;
    padding: 12px 16px;
    background-color: #1e293b;
    color: #3b82f6;
    border: 1px solid #334155;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-btn:hover:not(:disabled) {
    background-color: #0f172a;
    border-color: #3b82f6;
  }

  .toggle-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .branding {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    border-left: 1px solid #334155;
  }

  .brand-content {
    text-align: center;
    max-width: 320px;
  }

  .brand-content h2 {
    font-size: 32px;
    font-weight: 800;
    color: #f1f5f9;
    margin: 0 0 16px;
    background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .brand-content p {
    font-size: 16px;
    color: #94a3b8;
    margin: 0 0 32px;
  }

  .features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .features li {
    font-size: 14px;
    color: #cbd5e1;
    text-align: left;
  }

  .validation-rules {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 8px;
    padding: 8px 12px;
    background-color: rgba(15, 23, 42, 0.5);
    border-radius: 6px;
    border: 1px solid #334155;
  }

  .rule {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #94a3b8;
    transition: color 0.2s ease;
  }

  .rule.valid {
    color: #10b981;
  }

  .rule-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-weight: 700;
    font-size: 10px;
  }

  .rule:not(.valid) .rule-icon {
    background-color: rgba(239, 68, 68, 0.2);
    color: #fca5a5;
  }

  .rule.valid .rule-icon {
    background-color: rgba(16, 185, 129, 0.2);
    color: #86efac;
  }

  @media (max-width: 768px) {
    .auth-container {
      grid-template-columns: 1fr;
    }

    .branding {
      display: none;
    }

    .auth-card {
      padding: 20px;
    }
  }
</style>