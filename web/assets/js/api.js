(function() {
  const meta = document.querySelector('meta[name="api-base-url"]');
  const API_URL = meta ? meta.getAttribute('content') : '';

  async function apiFetch(path, options = {}) {
    const url = `${API_URL}${path}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text}`);
      }
      const ct = response.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (err) {
      console.error('API request failed', err);
      throw err;
    }
  }

  window.apiFetch = apiFetch;
})();
