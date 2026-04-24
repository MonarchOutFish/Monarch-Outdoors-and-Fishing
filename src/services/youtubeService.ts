export interface ChannelStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

export interface VideoStats {
  viewCount: string;
  publishedAt: string;
  duration: string;
  title: string;
  description: string;
}

export async function fetchChannelStats(channelId: string): Promise<ChannelStats | null> {
  try {
    const response = await fetch(`/api/youtube/channel/${channelId}`);
    if (!response.ok) throw new Error("Failed to fetch channel stats");
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      return {
        subscriberCount: stats.subscriberCount,
        viewCount: stats.viewCount,
        videoCount: stats.videoCount,
      };
    }
    return null;
  } catch (error) {
    console.error("fetchChannelStats error:", error);
    return null;
  }
}

export async function fetchVideosStats(videoIds: string[]): Promise<Record<string, VideoStats>> {
  try {
    const ids = videoIds.join(",");
    const response = await fetch(`/api/youtube/videos?ids=${ids}`);
    if (!response.ok) throw new Error("Failed to fetch videos stats");
    const data = await response.json();
    
    const statsMap: Record<string, VideoStats> = {};
    if (data.items) {
      data.items.forEach((item: any) => {
        statsMap[item.id] = {
          viewCount: item.statistics.viewCount,
          publishedAt: item.snippet.publishedAt,
          duration: item.contentDetails.duration,
          title: item.snippet.title,
          description: item.snippet.description,
        };
      });
    }
    return statsMap;
  } catch (error) {
    console.error("fetchVideosStats error:", error);
    return {};
  }
}

export async function fetchLatestVideos(channelId: string) {
  try {
    const response = await fetch(`/api/youtube/latest-videos/${channelId}`);
    if (!response.ok) throw new Error("Failed to fetch latest videos");
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("fetchLatestVideos error:", error);
    return [];
  }
}

export function formatYouTubeNumber(numStr: string): string {
  const num = parseInt(numStr, 10);
  if (isNaN(num)) return numStr;
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatRelativeDate(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'week', seconds: 604800 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'minute', seconds: 60 }
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.name}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

export function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return duration;
  
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  
  let result = '';
  if (hours > 0) result += hours + ':';
  
  result += (hours > 0 ? minutes.toString().padStart(2, '0') : minutes) + ':';
  result += seconds.toString().padStart(2, '0');
  
  return result;
}

