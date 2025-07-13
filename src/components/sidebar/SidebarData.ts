// src/components/sidebar/SidebarData.ts
import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LinkIcon from '@mui/icons-material/Link';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import BookIcon from '@mui/icons-material/Book';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import PersonIcon from '@mui/icons-material/Person';

const SidebarData = [
  {
    section: 'Platform',
    items: [
      { label: 'API Explorer', icon: SearchIcon, path: '/api-explorer' },
      { label: 'Logs', icon: ListAltIcon, path: '/logs' },
      { label: 'Webhooks', icon: LinkIcon, path: '/webhooks' },
    ],
  },
  {
    section: 'Setup & Integrations',
    items: [
      { label: 'Meeting Bot Setup', icon: MeetingRoomIcon, path: '/meeting-bot-setup' },
      { label: 'Calendar Integration', icon: CalendarTodayIcon, path: '/calendar-integration' },
      { label: 'Transcription', icon: DescriptionIcon, path: '/transcription' },
      { label: 'Desktop Recording', icon: DesktopWindowsIcon, path: '/desktop-recording', badge: 'New' },
    ],
  },
  {
    section: '',
    items: [
      { label: 'Read the Docs', icon: BookIcon, path: '/docs' },
      { label: 'Pricing', icon: MonetizationOnIcon, path: '/pricing' },
      { label: 'Upgrade Plan', icon: UpgradeIcon, path: '/upgrade' },
    ],
  },
  {
    section: '',
    items: [
      { label: 'harsh.srivastav@clickpe.ai', icon: PersonIcon, path: '/profile', subLabel: '$4.93' },
    ],
  },
];

export default SidebarData;