export interface StoredConfig {
  name: string;
  savedAt: number; // Unix epoch in ms
  device: string;
  data: any;
}

const CONFIGS_KEY = "savedConfigs";
const ACTIVE_CONFIG_KEY = "activeConfigName";

function getSavedConfigs(): StoredConfig[] {
  const raw = localStorage.getItem(CONFIGS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse saved configs", e);
    return [];
  }
}

function setSavedConfigs(configs: StoredConfig[]) {
  localStorage.setItem(CONFIGS_KEY, JSON.stringify(configs));
}

export function saveConfig(name: string, data: any): StoredConfig {
  const device = navigator.userAgent;
  const savedAt = Date.now();
  const configs = getSavedConfigs();
  // Remove any existing with same name
  const filtered = configs.filter((c) => c.name !== name);
  const newConfig: StoredConfig = {
    name,
    savedAt,
    device,
    data,
  };
  filtered.push(newConfig);
  setSavedConfigs(filtered);
  // Mark as active
  localStorage.setItem(ACTIVE_CONFIG_KEY, name);
  return newConfig;
}

export function loadConfig(name: string): StoredConfig | null {
  const configs = getSavedConfigs();
  const c = configs.find((cfg) => cfg.name === name) || null;
  if (c) {
    localStorage.setItem(ACTIVE_CONFIG_KEY, name);
  }
  return c;
}

export function deleteConfig(name: string): void {
  const configs = getSavedConfigs().filter((c) => c.name !== name);
  setSavedConfigs(configs);
  const active = localStorage.getItem(ACTIVE_CONFIG_KEY);
  if (active === name) {
    localStorage.removeItem(ACTIVE_CONFIG_KEY);
  }
}

export function getActiveConfigName(): string | null {
  return localStorage.getItem(ACTIVE_CONFIG_KEY);
}

export function listConfigNames(): string[] {
  return getSavedConfigs().map((c) => c.name);
}