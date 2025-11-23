import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Para oseiasdfarias.github.io, o base deve ser apenas '/'
  base: '/',
});