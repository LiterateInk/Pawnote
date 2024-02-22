import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://literateink.github.io",
  base: "/Pawnote",

  integrations: [
    starlight({
      title: "Pawnote",

      social: {
        github: "https://github.com/LiterateInk/Pawnote"
      },

      editLink: {
        baseUrl: "https://github.com/LiterateInk/Pawnote/edit/main/docs/"
      },

      sidebar: [
        {
          label: "Guides",
          autogenerate: {
            directory: "guides"
          }
        }
      ],

      defaultLocale: "root",
      locales: {
        root: {
          lang: "en",
          label: "English"
        },
        fr: {
          lang: "fr",
          label: "Français"
        }
      },

      customCss: [
        "@fontsource/comfortaa/400.css",
        "@fontsource/comfortaa/600.css",
        "./src/styles/tailwind.css"
      ]
    }),

    tailwind({
      applyBaseStyles: false
    })
  ]
});
