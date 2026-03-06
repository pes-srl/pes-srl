'use client'

import { useEffect } from 'react'
import { updatePresence } from '@/app/actions/presence'

export function PresencePing() {
    useEffect(() => {
        // Initial ping on mount
        updatePresence()

        // Send heartbeat every 20 seconds (20000 ms) for high precision
        const interval = setInterval(() => {
            updatePresence()
        }, 20000)

        // Best effort: try to ping on close (not always reliable in all browsers)
        const handleBeforeUnload = () => {
            updatePresence()
        }
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            clearInterval(interval)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [])

    // This component doesn't render anything
    return null
}
