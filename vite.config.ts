import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const base = process.env.PREFIX_PATHS ? '/test-message-feed/' : undefined;

// https://vitejs.dev/config/
export default defineConfig({
    base,
    build: {
        outDir: 'public',
    },
    plugins: [tsconfigPaths(), react()],
});
