import React from 'react';

// Import SVGs with default imports (not ReactComponent)
import HomeIcon from '../assets/icons/home.svg';
import SearchIcon from '../assets/icons/search.svg';
import ScanIcon from '../assets/icons/scan.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import SettingsIcon from '../assets/icons/settings.svg';
import AddIcon from '../assets/icons/add.svg';
import EditIcon from '../assets/icons/edit.svg';
import DeleteIcon from '../assets/icons/delete.svg';
import ShareIcon from '../assets/icons/share.svg';
import SuccessIcon from '../assets/icons/success.svg';
import ErrorIcon from '../assets/icons/error.svg';
import WarningIcon from '../assets/icons/warning.svg';
import InfoIcon from '../assets/icons/info.svg';
import MicrochipIcon from '../assets/icons/microchip.svg';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const iconMap = {
  home: HomeIcon,
  search: SearchIcon,
  scan: ScanIcon,
  profile: ProfileIcon,
  settings: SettingsIcon,
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  share: ShareIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
  microchip: MicrochipIcon,
} as const;

type IconName = keyof typeof iconMap;

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className = ''
}) => {
  const iconSrc = iconMap[name as IconName];

  if (!iconSrc) {
    return <div className="w-4 h-4 bg-gray-300" />;
  }

  return (
    <img
      src={iconSrc}
      alt={`${name} icon`}
      width={size}
      height={size}
      className={className}
      style={{
        filter: color !== 'currentColor' ? getColorFilter(color) : undefined
      }}
    />
  );
};

// Helper function to apply color filters to SVG images
function getColorFilter(color: string): string {
  // This is a simplified approach - for production you'd want a more robust solution
  const colorMap: Record<string, string> = {
    '#2D89EF': 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(204deg) brightness(97%) contrast(103%)',
    '#F5A623': 'invert(64%) sepia(100%) saturate(1374%) hue-rotate(6deg) brightness(100%) contrast(98%)',
  };
  return colorMap[color] || '';
}

export default Icon;
