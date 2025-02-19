import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', 
  preview: {
    // Asegura que el servidor se exponga en todas las interfaces
    host: true,
    // Agrega el host asignado por Railway a la lista de hosts permitidos
    allowedHosts: ['interfaces-proyecto-r-production.up.railway.app']
  }
})
