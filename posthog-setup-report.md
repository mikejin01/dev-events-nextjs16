# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js 16 App Router project. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog on the client side using the Next.js 15.3+ instrumentation hook. Enables exception capture and debug mode in development.
- **`next.config.ts`** (updated): Added reverse proxy rewrites for PostHog ingestion (`/ingest/*`) to avoid ad blockers, plus `skipTrailingSlashRedirect: true`.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture('explore_clicked')` to the existing `onClick` handler.
- **`components/EventCard.tsx`** (updated): Converted to a client component (`'use client'`) and added `posthog.capture('event_card_clicked', { title, slug, location, date })` on link click.
- **`.env.local`** (new): Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event | Description | File |
|---|---|---|
| `explore_clicked` | User clicks the "Explore Events" button to scroll to the events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card to navigate to the event detail page (includes title, slug, location, date properties) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/378426/dashboard/1457105)
- **Insight**: [Explore & Event Card Clicks Over Time](https://us.posthog.com/project/378426/insights/5420UupD)
- **Insight**: [Event Discovery Funnel](https://us.posthog.com/project/378426/insights/u2L5nUgB)
- **Insight**: [Most Popular Events by Clicks](https://us.posthog.com/project/378426/insights/oLJW61sr)
- **Insight**: [Unique Users Exploring Events](https://us.posthog.com/project/378426/insights/ltg41Zrs)
- **Insight**: [Event Card Clicks by Location](https://us.posthog.com/project/378426/insights/hvZIZk4Z)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
