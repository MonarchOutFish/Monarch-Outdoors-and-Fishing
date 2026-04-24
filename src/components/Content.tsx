import { motion } from 'motion/react';
import { Play, Eye, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { VIDEOS, STATS, BRAND } from '../constants';
import { cn, getYoutubeThumbnail } from '../lib/utils';
import { VideoModal } from './VideoModal';
import { useYouTube } from '../context/YouTubeContext';

export function FeaturedVideo() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const { latestVideos, getFormattedViews, getFormattedDate } = useYouTube();

  const featuredVideo = latestVideos[0] || VIDEOS[0];

  return (
    <section id="latest" className="py-24 bg-[#0A1210]">
      <VideoModal 
        youtubeId={activeVideoId} 
        onClose={() => setActiveVideoId(null)} 
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-12 bg-orange-600" />
            <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm">Most Recent Adventure</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic">Featured Video</h3>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <div 
              onClick={() => setActiveVideoId(featuredVideo.youtubeId)}
              className="relative group rounded-3xl overflow-hidden aspect-video shadow-2xl bg-black cursor-pointer"
            >
              <img 
                src={getYoutubeThumbnail(featuredVideo.youtubeId)} 
                alt={featuredVideo.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  if (!img.src.includes('hqdefault')) {
                    img.src = `https://img.youtube.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`;
                  }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-orange-600/40 group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-sm font-bold text-white uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                Latest
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-3xl font-black text-white leading-tight uppercase underline decoration-orange-600 decoration-4 underline-offset-8">
              {featuredVideo.title}
            </h4>
            <p className="text-white/70 leading-relaxed text-lg italic">
              "{featuredVideo.description}"
            </p>
            <div className="flex items-center gap-6 py-4 border-y border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-white/50 uppercase">{getFormattedViews(featuredVideo.youtubeId, featuredVideo.views)} Views</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-white/50 uppercase">{getFormattedDate(featuredVideo.youtubeId, featuredVideo.publishedAt)}</span>
              </div>
            </div>
            <button 
              onClick={() => setActiveVideoId(featuredVideo.youtubeId)}
              className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              Watch Video
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ImageGallery() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const { latestVideos, getFormattedViews, getFormattedDate } = useYouTube();
  
  const galleryVideos = latestVideos.length > 1 ? latestVideos.slice(1) : VIDEOS.slice(1);
  const visibleVideos = galleryVideos.slice(0, visibleCount);
  const hasMore = visibleCount < galleryVideos.length;

  return (
    <section id="videos" className="py-24 bg-[#0A0F0D]">
      <VideoModal 
        youtubeId={activeVideoId} 
        onClose={() => setActiveVideoId(null)} 
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-12 bg-orange-600" />
              <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm">Video Library</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic">The Anchovy Archives</h3>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {visibleVideos.map((video, idx) => (
            <motion.div 
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setActiveVideoId(video.youtubeId)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-xl">
                <img 
                  src={getYoutubeThumbnail(video.youtubeId)} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.src.includes('hqdefault')) {
                      img.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }
                  }}
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-tighter">
                  {video.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-xs font-bold text-white">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors uppercase leading-tight">
                {video.title}
              </h4>
              <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <span>{getFormattedViews(video.youtubeId, video.views)} Views</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>{getFormattedDate(video.youtubeId, video.publishedAt)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          {hasMore ? (
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="border-2 border-white/20 hover:border-white text-white px-12 py-4 rounded-full font-bold uppercase transition-all tracking-widest text-sm"
            >
              Load More Adventures
            </button>
          ) : (
            galleryVideos.length > 4 && (
              <button 
                onClick={() => setVisibleCount(4)}
                className="border-2 border-white/20 hover:border-white text-white px-12 py-4 rounded-full font-bold uppercase transition-all tracking-widest text-sm"
              >
                Decrease
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { getFormattedStat } = useYouTube();

  return (
    <section id="about" className="py-24 bg-[#0A1210] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="relative z-10 aspect-[3/4] rounded-[40px] overflow-hidden border-8 border-white/5 shadow-2xl">
              <img 
                src={BRAND.portraitImage} 
                alt={BRAND.creatorName} 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decal Background */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-600/5 rounded-full blur-3xl" />
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[2px] w-12 bg-orange-600" />
                <h2 className="text-orange-500 font-bold uppercase tracking-widest text-sm">The Storyteller</h2>
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase italic leading-[0.8]">Meet <br /> <span className="text-orange-500">{BRAND.creatorName}</span></h3>
            </div>
            
            <p className="text-xl text-white/70 italic leading-relaxed">
              "I didn't start this channel just for gear reviews. I started it to show the mental side of the wild—the patience, the calm, and the lessons we learn when we step outside."
            </p>
            
            <div className="space-y-4">
              {[
                "100% Raw footage. No fake catches.",
                "Backcountry exploration.",
                "Sustainable fishing practices advocacy.",
                "Community driven adventure scouting."
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  <span className="text-white font-bold uppercase text-sm tracking-wide">{point}</span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
              {STATS.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-white uppercase italic">{getFormattedStat(stat.label, stat.value)}</div>
                  <div className="text-xs font-bold text-white/50 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
