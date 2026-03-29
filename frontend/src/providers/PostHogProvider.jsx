import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Initialize PostHog
if (typeof window !== 'undefined' && import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,  // We handle this manually below
    capture_pageleave: true,
  })
}

// Tracks page views on every route change
function PageViewTracker() {
  const location = useLocation()

  useEffect(() => {
    if (import.meta.env.VITE_POSTHOG_KEY) {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
      })
    }
  }, [location])

  return null
}

export default function PostHogProvider({ children }) {
  if (!import.meta.env.VITE_POSTHOG_KEY) {
    return children
  }

  return (
    <PHProvider client={posthog}>
      <PageViewTracker />
      {children}
    </PHProvider>
  )
}
