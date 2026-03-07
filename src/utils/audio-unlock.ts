/**
 * Utility to unlock the audio context for mobile browsers (especially iOS Safari).
 * By attempting to play the audio element inside a direct user interaction event (like click),
 * we satisfy the browser's autoplay policies for subsequent audio playback.
 */
export function unlockAudioContext(audioElement: HTMLAudioElement | null) {
    if (!audioElement) return;

    try {
        // Attempt to play the audio element to unlock it.
        // Since this is called synchronously during a user gesture (onClick), 
        // it registers the user intent to the browser.
        const playPromise = audioElement.play();

        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                // We expect an error if the src isn't fully loaded or is interrupted 
                // by subsequent play/pause commands from the global audio player.
                // It's safe to ignore as the context is still unlocked by the attempt.
                console.debug("Audio unlock interaction caught (expected):", error);
            });
        }
    } catch (e) {
        console.error("Audio context unlock failed:", e);
    }
}
