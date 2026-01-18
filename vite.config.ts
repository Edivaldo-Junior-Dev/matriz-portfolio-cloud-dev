
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    base: './', // IMPORTANTE: Permite que o site rode em subpastas ou S3 buckets sem domínio raiz
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './')
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env': {} 
    },
    server: {
      port: 5173
    }
  }
})
