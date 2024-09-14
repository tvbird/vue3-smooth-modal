import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "node:path"
import { minify } from "terser"

function minifyBundles() {
    return {
        name: "minifyBundles",
        async generateBundle(options, bundle) {
            for (let key in bundle) {
                if (bundle[key].type === "chunk" && key.endsWith(".js")) {
                    const minifyCode = await minify(bundle[key].code, { sourceMap: false })
                    bundle[key].code = minifyCode.code
                }
            }
            return bundle
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), minifyBundles()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.js"),
            name: "SmoothModal",
            fileName: (format) => `smooth-modal.${format}.js`
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    }
})
