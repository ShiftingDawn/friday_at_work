import adapter from "@sveltejs/adapter-node";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  compilerOptions: {
    // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
    runes: ({filename,}) => filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
    experimental: {async: true,},
  },
  experimental: {remoteFunctions: true,},
  adapter: adapter(),
  typescript: {
    config: (config) => {
      config.include.push("../prisma.config.ts");
    },
  },
  alias: {
    "$comp/*": "./src/lib/components/*",
    "$icon/*": "./src/lib/icon/*",
    "$lib/*": "./src/lib/*",
    "@/*": "./src/*",
  },
};

export default config;
