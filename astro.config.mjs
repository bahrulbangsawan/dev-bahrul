// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Bahrul Bangsawan",
      customCss: ["./src/styles/custom.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Deployment",
          autogenerate: { directory: "deployment" },
        },
        // Nested Groups Example
        {
          label: "Projects",
          collapsed: false,
          items: [
            // Sub-group: Project 1
            {
              label: "Kesbangpol",
              collapsed: true,
              items: [
                { slug: "projects/kesbangpol/overview", label: "Overview" },
                { slug: "projects/kesbangpol/setup", label: "Setup Guide" },
                { slug: "projects/kesbangpol/deployment", label: "Deployment" },
              ],
            },
            // Sub-group: Project 2
            {
              label: "Digital Desa",
              collapsed: true,
              items: [
                { slug: "projects/digital-desa/overview", label: "Overview" },
                {
                  slug: "projects/digital-desa/architecture",
                  label: "Architecture",
                },
                {
                  slug: "projects/digital-desa/api-docs",
                  label: "API Documentation",
                },
              ],
            },
            // Sub-group: Project 3 (with deeper nesting)
            {
              label: "KYZN",
              collapsed: true,
              items: [
                {
                  slug: "projects/kyzn/term-form",
                  label: "Term Form",
                },
                // Even deeper nesting!
                {
                  label: "CRM",
                  collapsed: true,
                  items: [
                    {
                      slug: "projects/kyzn/crm/performance",
                      label: "Performance",
                    },
                    {
                      slug: "projects/kyzn/crm/security",
                      label: "Security",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],

  adapter: cloudflare(),
});
