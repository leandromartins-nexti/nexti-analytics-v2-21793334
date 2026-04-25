import { defineConfig, mergeConfig } from 'vite';
import originalConfigOrFn from './vite.config.nexti-original.ts';

export default defineConfig(async (env) => {
  const resolved = typeof originalConfigOrFn === 'function'
    ? await originalConfigOrFn(env)
    : originalConfigOrFn;
  return mergeConfig(resolved, {
    server: { allowedHosts: true, host: '0.0.0.0' },
  });
});
