"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Video, ExternalLink } from "lucide-react";
import { videoItems, VideoItem } from "@/data/graphic-items";

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div className="space-y-10">
      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {videoItems.map((video, index) => (
          <motion.div
            key={video.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setSelectedVideo(video)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-ink/15 bg-paper p-4 shadow-notebook transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Thumbnail Frame */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Big Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-marker text-ink shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-paper">
                  <Play className="h-7 w-7 fill-current translate-x-0.5" />
                </div>
              </div>

              {/* Tag & Duration Badges */}
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-paper backdrop-blur-md">
                  <Video className="h-3.5 w-3.5 text-marker" />
                  {video.tag}
                </span>
              </div>
            </div>

            {/* Video Meta info */}
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                  {video.title}
                </h3>
                <p className="font-hand text-base text-ink-soft">{video.client}</p>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed line-clamp-2">
                  {video.summary}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-ink/15 bg-paper-deep px-3 py-1 text-xs font-bold text-ink">
                Watch
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-ink/20 bg-paper shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-ink/10 bg-paper-deep/60 px-5 py-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
                    {selectedVideo.title}
                  </h3>
                  <p className="font-hand text-sm text-ink-soft">
                    {selectedVideo.client} &bull; {selectedVideo.tag}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  aria-label="Close video modal"
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-marker"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* YouTube Iframe Player */}
              <div className="relative aspect-video w-full bg-black">
                {selectedVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-paper">
                    Video link loading...
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between border-t border-ink/10 bg-paper px-6 py-4">
                <p className="text-xs text-ink-soft">
                  Professional Video Editing &amp; Motion Graphics by KVai Solutions
                </p>
                {selectedVideo.youtubeId && (
                  <a
                    href={`https://youtu.be/${selectedVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-paper-deep px-4 py-2 text-xs font-bold text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Open on YouTube
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
