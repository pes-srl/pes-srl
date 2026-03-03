"use client";

import { useEffect } from "react";
import { pingUserActivity } from "@/app/actions/userActivity";

export function ActivityTracker() {
    useEffect(() => {
        // Ping immediately on mount
        pingUserActivity();

        // Then ping every 3 minutes (180000ms)
        const intervalId = setInterval(() => {
            pingUserActivity();
        }, 180000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // This is a silent, renderless component
    return null;
}
