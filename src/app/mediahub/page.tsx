"use client";

import React from "react";

// AUDIO & VIDEO MOCK (Fissi come prima)
const MOCK_DATA = {
    newsAudio: {
        title: "Aggiornamento Sviluppo: Fase 2",
        date: "10 Marzo 2026",
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    videos: [
        {
            id: 1,
            title: "Presentazione Progetto Alpha",
            youtubeId: "dQw4w9WgXcQ",
        },
    ],
};

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface Articolo {
    id: string;
    titolo: string;
    immagine_copertina: string | null;
    contenuto: string;
    created_at: string;
}

export default function MediaHub() {
    const supabase = createClient();
    const [articoli, setArticoli] = useState<Articolo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticoli = async () => {
            const { data, error } = await supabase
                .from("articoli")
                .select("*")
                .eq("status", "published")
                .order("created_at", { ascending: false });

            if (data) {
                setArticoli(data);
            }
            setIsLoading(false);
        };

        fetchArticoli();
    }, [supabase]);

    return (
        <div style={styles.pageContainer}>
            <header style={styles.header}>
                <h1 style={styles.mainTitle}>MediaHub</h1>
                <p style={styles.subtitle}>
                    Esplora i nostri contenuti in modalità read-only
                </p>
            </header>

            <main style={styles.mainContent}>
                {/* Sezione News Audio */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <span style={styles.icon}>🎙️</span> News Audio
                    </h2>
                    <div style={styles.audioCard}>
                        <div style={styles.audioInfo}>
                            <h3 style={styles.audioTitle}>{MOCK_DATA.newsAudio.title}</h3>
                            <p style={styles.audioDate}>{MOCK_DATA.newsAudio.date}</p>
                        </div>
                        <audio controls style={styles.audioPlayer}>
                            <source src={MOCK_DATA.newsAudio.audioSrc} type="audio/mpeg" />
                            Il tuo browser non supporta l'elemento audio.
                        </audio>
                    </div>
                </section>

                {/* Sezione Blog/Articoli */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <span style={styles.icon}>📰</span> Ultimi Articoli
                    </h2>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-fuchsia-500" />
                        </div>
                    ) : articoli.length === 0 ? (
                        <div className="text-center py-12 text-zinc-500 bg-zinc-950/50 rounded-xl border border-white/5">
                            <p>Nessun articolo pubblicato al momento.</p>
                        </div>
                    ) : (
                        <div style={styles.grid}>
                            {articoli.map((article) => (
                                <Link
                                    href={`/mediahub/${article.id}`}
                                    key={article.id}
                                    style={{ textDecoration: 'none', display: 'block' }}
                                >
                                    <div
                                        className="article-card"
                                        style={styles.card}
                                    >
                                        {article.immagine_copertina && (
                                            <div style={styles.imageOverflow}>
                                                <img
                                                    src={article.immagine_copertina}
                                                    alt={article.titolo}
                                                    style={styles.cardImage}
                                                    className="card-img"
                                                />
                                            </div>
                                        )}
                                        <div style={styles.cardContent}>
                                            <p style={styles.articleDate}>
                                                {new Date(article.created_at).toLocaleDateString('it-IT')}
                                            </p>
                                            <h3 style={styles.cardTitle}>{article.titolo}</h3>
                                            {/* Utilizziamo dangerouslySetInnerHTML perché Tiptap salva in HTML */}
                                            {/* In un caso reale, dovremmo limitare i caratteri (es. estratto di 100 char) e sanitizzare l'HTML */}
                                            <div
                                                style={styles.cardText}
                                                className="line-clamp-3 overflow-hidden prose-sm prose-invert"
                                                dangerouslySetInnerHTML={{ __html: article.contenuto }}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* Sezione Video */}
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        <span style={styles.icon}>📺</span> Video In Evidenza
                    </h2>
                    <div style={styles.videoContainer}>
                        {MOCK_DATA.videos.map((video) => (
                            <div key={video.id} style={styles.videoWrapper}>
                                <iframe
                                    style={styles.iframe}
                                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                    title={video.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Stili CSS interattivi isolati */}
            <style>{`
        .article-card {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border-color: #6366f1;
        }
        .article-card:hover .card-img {
          transform: scale(1.08);
        }
        .card-img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Custom Audio Player resets for Webkit */
        audio::-webkit-media-controls-panel {
          background-color: #f1f5f9;
        }
        
        /* Utility styles for article preview */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .prose-invert p {
          margin: 0;
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.5;
        }
      `}</style>
        </div>
    );
}

// Inline Styles (Vanilla CSS object)
const styles = {
    pageContainer: {
        fontFamily: "'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#030712", // Very dark sleek background
        color: "#f8fafc",
        minHeight: "100vh",
        padding: "60px 20px",
    },
    header: {
        textAlign: "center" as const,
        marginBottom: "50px",
    },
    mainTitle: {
        fontSize: "3.5rem",
        fontWeight: "900",
        margin: "0 0 10px 0",
        letterSpacing: "-0.02em",
        background: "linear-gradient(135deg, #a855f7, #3b82f6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#94a3b8",
        margin: 0,
        fontWeight: "400",
    },
    mainContent: {
        maxWidth: "1000px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column" as const,
        gap: "60px",
    },
    section: {
        backgroundColor: "#0f172a",
        borderRadius: "20px",
        padding: "35px",
        border: "1px solid #1e293b",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
    },
    sectionTitle: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "1.8rem",
        fontWeight: "700",
        margin: "0 0 25px 0",
        paddingBottom: "15px",
        borderBottom: "1px solid #1e293b",
        color: "#f8fafc",
    },
    icon: {
        fontSize: "2rem",
    },
    audioCard: {
        backgroundColor: "#1e293b",
        borderRadius: "16px",
        padding: "25px",
        border: "1px solid #334155",
        display: "flex",
        flexDirection: "column" as const,
        gap: "15px",
    },
    audioInfo: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "4px",
    },
    audioTitle: {
        margin: 0,
        fontSize: "1.3rem",
        fontWeight: "600",
        color: "#f1f5f9",
    },
    audioDate: {
        margin: 0,
        fontSize: "0.9rem",
        color: "#94a3b8",
    },
    audioPlayer: {
        width: "100%",
        marginTop: "5px",
        outline: "none",
        borderRadius: "8px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px",
    },
    card: {
        backgroundColor: "#1e293b",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #334155",
        cursor: "pointer", // Ora sono cliccabili
        display: "flex",
        flexDirection: "column" as const,
        height: "100%", // Fa sì che le card abbiano altezza uniforme
    },
    imageOverflow: {
        width: "100%",
        height: "180px",
        overflow: "hidden", // Contiene l'ingrandimento dell'immagine
    },
    cardImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
        display: "block",
    },
    cardContent: {
        padding: "25px",
        flexGrow: 1, // Spinge l'eventuale contenuto vuoto in fondo
        display: "flex",
        flexDirection: "column" as const,
        gap: "10px",
    },
    cardTitle: {
        fontSize: "1.25rem",
        fontWeight: "700",
        margin: "0 0 5px 0",
        color: "#f1f5f9",
        lineHeight: "1.4",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
    },
    articleDate: {
        fontSize: "0.75rem",
        color: "#a855f7",
        fontWeight: "600",
        margin: 0,
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
    },
    cardText: {
        fontSize: "1rem",
        lineHeight: "1.6",
        color: "#94a3b8",
        margin: 0,
    },
    videoContainer: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "20px",
    },
    videoWrapper: {
        position: "relative" as const,
        paddingBottom: "56.25%", /* Formato 16:9 */
        height: 0,
        overflow: "hidden",
        borderRadius: "16px",
        backgroundColor: "#000",
        border: "1px solid #334155",
    },
    iframe: {
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
};
