import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            /* '/api/': {
                target: "https://quiz-app-server-nine.vercel.app/",
                changeOrigin: true
            } */
        }
    }
})
