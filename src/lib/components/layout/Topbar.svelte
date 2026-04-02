<header class="topbar">
  <div class="searchbar">
    <span class="search-icon">⌕</span>
    <input type="text" placeholder="Search" />
  </div>

  <div class="topbar-right">
    <button class="icon-button" type="button">🔔</button>

    <div class="user-chip">
      <div class="avatar">JS</div>
      <span>John Snow</span>
    </div>
  </div>
</header>

<style>
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 28px;
    gap: 20px;
  }

  .searchbar {
    width: 560px;
    max-width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 12px;
  }

  .searchbar input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: none;
    color: white;
    font-size: 18px;
  }

  .searchbar input::placeholder {
    color: #94a3b8;
  }

  .search-icon {
    color: #94a3b8;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .icon-button {
    background: transparent;
    border: 0;
    color: white;
    font-size: 22px;
    cursor: pointer;
  }

  .user-chip {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #f8fafc;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #1d4ed8, #38bdf8);
    color: white;
    font-weight: 700;
  }
</style>