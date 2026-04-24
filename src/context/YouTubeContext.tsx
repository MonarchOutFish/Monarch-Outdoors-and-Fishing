import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchChannelStats, fetchVideosStats, fetchLatestVideos, ChannelStats, VideoStats, formatYouTubeNumber, formatRelativeDate, formatDuration } from '../services/youtubeService';
import { BRAND, VIDEOS } from '../constants';
import { Video } from '../types';

interface YouTubeContextType {
  channelStats: ChannelStats | null;
  videoStats: Record<string, VideoStats>;
  latestVideos: Video[];
  loading: boolean;
  getFormattedViews: (youtubeId: string, defaultValue: string) => string;
  getFormattedDate: (youtubeId: string, defaultValue: string) => string;
  getFormattedStat: (label: string, defaultValue: string) => string;
}

const YouTubeContext = createContext<YouTubeContextType | undefined>(undefined);

export const YouTubeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [channelStats, setChannelStats] = useState<ChannelStats | null>(null);
  const [videoStats, setVideoStats] = useState<Record<string, VideoStats>>({});
  const [latestVideos, setLatestVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Extract channel ID from URL
      const channelIdMatch = BRAND.youtubeUrl.match(/channel\/(UC[a-zA-Z0-9_-]+)/);
      const channelId = channelIdMatch ? channelIdMatch[1] : null;

      if (!channelId) {
        setLatestVideos(VIDEOS);
        setLoading(false);
        return;
      }

      const [cStats, latestVideoItems] = await Promise.all([
        fetchChannelStats(channelId),
        fetchLatestVideos(channelId),
      ]);

      const videoIds = latestVideoItems.map((item: any) => item.snippet.resourceId.videoId);
      
      let vStats: Record<string, VideoStats> = {};
      if (videoIds.length > 0) {
        vStats = await fetchVideosStats(videoIds);
      } else {
        // Fallback to static videos if no recent videos found
        vStats = await fetchVideosStats(VIDEOS.map(v => v.youtubeId));
      }

      const generatedVideos: Video[] = videoIds.map((id: string, index: number) => {
        const stats = vStats[id];
        return {
          id: String(index + 1),
          youtubeId: id,
          title: stats?.title || 'Unknown Video',
          views: stats ? formatYouTubeNumber(stats.viewCount) : '0',
          publishedAt: stats ? formatRelativeDate(stats.publishedAt) : 'Unknown Date',
          category: 'Latest', 
          description: stats?.description?.split('\n')[0] || 'Check out my latest video!',
          duration: stats ? formatDuration(stats.duration) : '0:00'
        };
      });

      setChannelStats(cStats);
      setVideoStats(vStats);
      setLatestVideos(generatedVideos.length > 0 ? generatedVideos : VIDEOS);
      setLoading(false);
    }

    loadData();
  }, []);

  const getFormattedViews = (youtubeId: string, defaultValue: string) => {
    const stats = videoStats[youtubeId];
    return stats ? formatYouTubeNumber(stats.viewCount) : defaultValue;
  };

  const getFormattedDate = (youtubeId: string, defaultValue: string) => {
    const stats = videoStats[youtubeId];
    return stats ? formatRelativeDate(stats.publishedAt) : (defaultValue || 'Recently');
  };

  const getFormattedStat = (label: string, defaultValue: string) => {
    if (!channelStats) return defaultValue;
    
    switch (label.toLowerCase()) {
      case 'subscribers':
        return formatYouTubeNumber(channelStats.subscriberCount);
      case 'total views':
        return formatYouTubeNumber(channelStats.viewCount);
      case 'videos':
        return formatYouTubeNumber(channelStats.videoCount);
      default:
        return defaultValue;
    }
  };

  return (
    <YouTubeContext.Provider value={{ channelStats, videoStats, latestVideos, loading, getFormattedViews, getFormattedDate, getFormattedStat }}>
      {children}
    </YouTubeContext.Provider>
  );
};

export const useYouTube = () => {
  const context = useContext(YouTubeContext);
  if (context === undefined) {
    throw new Error('useYouTube must be used within a YouTubeProvider');
  }
  return context;
};
