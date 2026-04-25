import { Video, GearItem } from './types';

// --- BRAND ASSETS ---
// To use your own files:
// 1. Upload your files (e.g., logo.png, portrait.jpg) to the /public directory
// 2. Change the values below to match your filenames (e.g., logo: '/logo.png')
export const BRAND = {
  logo: '/logo.png',
  fullName: 'Monarch Outdoors & Fishing Adventures',
  creatorName: 'Angler, Prabhas Dulam',
  portraitImage: '/me.jpg',
  youtubeUrl: 'https://www.youtube.com/channel/UC_syrnwhGv2E7pc7LGI25hQ', // Update this to your actual YouTube channel URL
  heroBackground: '/background.jpg',
  instagramUrl: 'https://www.instagram.com/monarch_outdoors_and_fishing?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', // Update this
  twitterUrl: 'https://x.com/MonarchOutFish', // Update this
  facebookUrl: 'https://www.facebook.com/profile.php?id=61588114403734&sk=about', // Update this
};

// --- CHANNEL STATISTICS ---
// Update these numbers whenever they change on YouTube
export const STATS = [
  { label: 'Subscribers', value: '20+' },
  { label: 'Total Views', value: '330+' },
  { label: 'Videos', value: '5+' },
  { label: 'Countries', value: '2' },
  { label: 'impressions', value: '4.3K' }
];

// --- VIDEO LIBRARY ---
// To add a new video:
// 1. Find the video on YouTube
// 2. Copy the ID after 'v=' in the URL (e.g. dQw4w9WgXcQ)
// 3. Paste it in 'youtubeId'
export const VIDEOS: Video[] = [
  {
    id: '1',
    youtubeId: 'MPLLzdV724g',
    title: 'Simple Trip',
    views: '46',
    publishedAt: '1 day ago',
    category: 'Big Catches',
    description: 'A 5-hour journey for brook trout that became a lesson in patience and calm. More than just a video—it is about waiting for the right opportunity.',
    duration: '23:17'
  },
  {
    id: '2',
    youtubeId: 'niASY5Dy1tw',
    title: 'Basement Camping After Ice Hockey Game',
    views: '50',
    publishedAt: '4 week ago',
    category: 'Camping',
    description: 'Camoing Outdoors?,does it really need to be outside?',
    duration: '25:10'
  },
  {
    id: '3',
    youtubeId: 'myaPy3QnPD0',
    title: 'The Go-To Ice Fishing Rig For Winter Hake | Atlantic Canada 🇨🇦🎣❄️',
    views: '37',
    publishedAt: '6 weeks ago',
    category: 'Fishing Rigs',
    description: 'The best rig for hake fishing, winter',
    duration: '9:01'
  },
  
  {
    id: '4',
    youtubeId: 'csPI23-N6mI',
    title: 'A Perfect Winter Day: Ice Fishing With The Community 🎣❄️, Saint john, Dominion Park Beach.',
    views: '200',
    publishedAt: '2 months ago',
    category: 'Family Day',
    description: 'We spent the day out on the ice for the ice fishing Family Day, surrounded by good food, great people, and some winter fishing. 🎣❄️🪝',
    duration: '11:43'
  },
  {
    id: '5',
    youtubeId: 'c1zEQYapKhA',
    title: 'Baby Winter Flounder',
    views: '38',
    publishedAt: '6 weeks ago',
    category: 'Weird Catches',
    description: 'Flounders are one of the most weird looking, but fasinating fish in the world',
    duration: '00:14'
  },
  {
    id: '6',
    youtubeId: 'MPLLzdV724g', // Reusing first ID as a placeholder
    title: 'Catching the BIG ONE',
    views: '102',
    publishedAt: '3 months ago',
    category: 'Big Catches',
    description: 'An epic day on the water where the line almost snapped.',
    duration: '18:22'
  }
];

// --- GEAR VAULT ---
export const GEAR_ITEMS: GearItem[] = [];

// --- FULL GEAR VAULT PAGE INVENTORY ---
export const FULL_GEAR_LIST: GearItem[] = []; // Currently empty to trigger the "Nothing Listed" view
