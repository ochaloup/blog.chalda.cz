# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby-based static blog site that uses **AsciiDoc** (`.adoc` files) instead of Markdown for content authoring. The site is built on the [gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen) template and has been customized to work with the `gatsby-transformer-asciidoc` plugin.

Key characteristics:
- TypeScript-based Gatsby site
- React components with SCSS styling
- AsciiDoc for blog posts and pages
- Deployed to GitHub Pages via GitHub Actions
- Custom domain: https://blog.chalda.cz

## Development Commands

### Starting Development Server
```bash
npm start
# or
yarn start
```
This cleans the cache and starts the Gatsby development server in verbose mode at http://localhost:8000/

### Building for Production
```bash
npm run build
# or
yarn build
```
Cleans the cache and builds the static site to the `public/` directory.

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```
Tests are configured with Jest using SWC for transformation. Test configuration is in `internal/testing/jest-config.ts`.

### Linting and Formatting
```bash
# Check linting (TypeScript + SCSS)
npm run lint

# Auto-fix formatting
npm run format

# Individual commands
npm run lint:ts      # Check TypeScript/TSX files
npm run lint:scss    # Check SCSS files
npm run format:ts    # Format TypeScript files
npm run format:scss  # Format SCSS files
```

### Serving Production Build
```bash
npm run serve
```
Serves the production build locally for testing.

## Architecture

### Content System

Content is stored in the `content/` directory:
- **Posts**: `content/posts/*.adoc` - Blog articles with frontmatter metadata
- **Pages**: `content/pages/**/*.adoc` - Static pages (e.g., Links page)
- **Config**: `content/config.json` - Site metadata, author info, menu structure

#### AsciiDoc Frontmatter Format
Posts and pages use AsciiDoc document attributes for metadata:
```asciidoc
= Title of the Article
chalda <ondrej.chaloupka@proton.me>
1.0, 2022-10-01

:page-template: post
:page-draft: true
:page-slug: perfecting-the-art-of-programming
:page-category: Programming
:page-tags: Rust, Java
:page-description: About the page.
:page-socialImage: /images/articles/notebook.jpg
```

Key attributes:
- `:page-template:` - Either `post` or `page`
- `:page-draft:` - Set to `true` to exclude from builds
- `:page-slug:` - Custom URL slug (optional)
- `:page-category:` - Single category for the post
- `:page-tags:` - Comma-separated list of tags
- Social images should be placed in `/static/images/articles/`

### Gatsby Build System

The Gatsby configuration is split across multiple files:

**gatsby-config.ts**: Plugin configuration including:
- `gatsby-transformer-asciidoc` for processing `.adoc` files
- Image optimization (sharp)
- RSS feed generation
- Google Analytics
- Sentry error tracking
- PWA/offline support

**gatsby-node.ts**: Exports three core functions:
- `createPages` (from `internal/gatsby/create-pages.ts`) - Generates pages and pagination
- `onCreateNode` (from `internal/gatsby/on-create-node.ts`) - Processes Asciidoc nodes, creates slug fields
- `onCreateWebpackConfig` - Webpack customization

### Code Organization

```
src/
├── components/         # React components (Layout, Post, Sidebar, Feed, etc.)
├── templates/          # Gatsby page templates (PostTemplate, IndexTemplate, etc.)
├── hooks/              # Custom React hooks (use-site-metadata, use-tags-list, etc.)
├── utils/              # Utility functions (to-kebab-case, get-icon, etc.)
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── assets/             # SCSS and images

internal/
├── gatsby/
│   ├── queries/        # GraphQL queries for data fetching
│   ├── constants/      # Gatsby-specific constants (routes, templates)
│   ├── utils/          # Build-time utilities
│   ├── types/          # Gatsby node types
│   └── *.ts            # Gatsby API implementations
└── testing/            # Jest configuration and mocks
```

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:
- `@/components` → `src/components`
- `@/hooks` → `src/hooks`
- `@/utils` → `src/utils`
- `@/types` → `src/types`
- `@/constants` → `src/constants`
- `@/internal/*` → `internal/*`
- `@/mocks` → `internal/testing/__mocks__`

Always use these aliases when importing across the codebase.

### Page Generation Logic

Pages are dynamically created in `internal/gatsby/create-pages.ts`:

1. **Static routes**: 404, tags list, categories list
2. **Content pages**: Individual posts and pages from Asciidoc files
3. **Paginated indexes**:
   - Main index (`/`)
   - Category archives (`/category/{name}/page/{n}`)
   - Tag archives (`/tag/{name}/page/{n}`)

Pagination limit is configured via `postsLimit` in `content/config.json` (currently 6 posts per page).

### Slug Generation

In `internal/gatsby/on-create-node.ts`:
- If `:page-slug:` is specified in frontmatter, uses that as the slug
- Otherwise, generates slug from file path
- Category slugs: `/category/{kebab-case-name}/`
- Tag slugs: `/tag/{kebab-case-name}/`

### Component Structure

Components follow a consistent pattern:
- Each component in its own directory with `index.ts` barrel export
- Styles in co-located `.module.scss` files
- Tests in `.test.tsx` files next to the component
- TypeScript for all component definitions

### Testing Infrastructure

Tests use:
- **Jest** with **@swc/jest** for fast TypeScript transformation
- **react-test-renderer** for component testing
- **jsdom** environment
- Mock data in `internal/testing/__mocks__/`

Mock utilities include: `site-metadata`, `edges`, `page-context`, `author`, `gatsby` node mocks, etc.

## Deployment

The site deploys automatically to GitHub Pages via `.github/workflows/gatsby.yml`:
- Triggers on pushes to the `gatsby` branch
- Uses Node 20 and yarn/npm auto-detection
- Caches `public/` and `.cache/` directories for faster builds
- Deploys to https://blog.chalda.cz (configured in `CNAME` file)

To deploy changes, push to the `gatsby` branch.

## Important Notes

- All content files must use `.adoc` extension (not `.md`)
- Images referenced in posts should be in `/static/images/`
- The main branch for this repo is `gatsby` (not `main` or `master`)
- Disqus comments are disabled (empty `disqusShortname` in config.json)
- Site uses custom Sentry DSN via environment variable `SENTRY_DSN`
