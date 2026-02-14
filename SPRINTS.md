# WP Admin SPA - Sprint Plan

## Overview

A production-grade Angular application for managing WordPress content through the REST API. Built with Angular Material, deployed initially on SharePoint with plans to migrate to a dedicated hosting solution.

## Architecture

- **Framework:** Angular 21 with standalone components
- **UI Library:** Angular Material (Material 3)
- **State Management:** Angular Signals with services
- **Rich Text Editor:** ngx-quill
- **Authentication:** WordPress Application Passwords via HTTP interceptors
- **Theming:** Light/dark mode using Angular Material system variables

---

## Sprint 1 - Foundation and Theming

**Branch:** `sprint-1/foundation`

**Goal:** Refactor the POC into a production-ready foundation with proper theming, global services, and a polished app shell.

### Tasks

- [x] Project scaffolding and folder structure
- [x] Environment configuration
- [x] TypeScript models for WordPress entities
- [x] WordPress API service layer
- [x] Auth service and HTTP interceptor
- [x] Auth guard for protected routes
- [x] Lazy-loaded routing
- [x] Settings page with connection test
- [x] Basic create post page with rich text editor and media picker
- [ ] App shell refactor with responsive sidebar layout
- [ ] Light/dark mode theming with ThemeService
- [ ] Global utility styles (page headers, status messages)
- [ ] Global notification service (snackbar)
- [ ] Global loading interceptor
- [ ] Shared confirm dialog component
- [ ] Dark mode support for Quill editor
- [ ] UI polish pass on settings and create post pages

---

## Sprint 2 - Post Management

**Branch:** `sprint-2/post-management`

**Goal:** Full CRUD operations for posts with a searchable, filterable post list.

### Tasks

- [ ] Post list page with table/card layout
- [ ] Search and filtering (by status, category, date)
- [ ] Pagination for post list
- [ ] Edit post page (reuse create post form)
- [ ] Delete post with confirmation dialog
- [ ] Post status management (draft, publish, pending)
- [ ] Improve create post form validation and UX
- [ ] Post preview functionality

---

## Sprint 3 - Media and Categories

**Branch:** `sprint-3/media-categories`

**Goal:** Standalone media library and category management pages.

### Tasks

- [ ] Standalone media library page (browse, upload, delete)
- [ ] Reusable media picker component (shared between post creation and media page)
- [ ] Media search and filtering
- [ ] Category management page (create, edit, delete)
- [ ] Tag management
- [ ] Frequently used media section (hardcoded initially, later managed via SharePoint list)

---

## Sprint 4 - Dashboard and Polish

**Branch:** `sprint-4/dashboard-polish`

**Goal:** Analytics dashboard, user role display, and final polish.

### Tasks

- [ ] Analytics dashboard (post counts, recent activity, category breakdown)
- [ ] Dashboard charts and visualizations
- [ ] User role display and management
- [ ] Responsive design polish across all pages
- [ ] Accessibility audit and fixes
- [ ] Performance optimization
- [ ] Error handling improvements

---

## Stage 2 - AI Integration and Advanced Features

**Branch:** `stage-2/ai-integration`

**Goal:** Integrate Claude API for AI-assisted content generation and advanced features.

### Tasks

- [ ] Anthropic API service layer
- [ ] Backend proxy for API key security
- [ ] AI assist sidebar panel on create post page (quick headline and description generation)
- [ ] Dedicated AI drafting page (paste source material, get multiple drafts, refine, push to post form)
- [ ] Frequently used media management via SharePoint list (JSON config)
- [ ] SharePoint deployment configuration
- [ ] Migration plan for dedicated hosting

---

## Deployment

### Local Development

```
ng serve
```

### Production Build

```
ng build --configuration production
```

### SharePoint Deployment

1. Enable custom scripting on SharePoint site
2. Configure base-href for SharePoint path
3. Upload dist folder contents to document library
4. Access via document library URL or embed web part