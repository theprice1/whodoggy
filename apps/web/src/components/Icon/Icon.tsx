import React from 'react';

// Import SVGs from the correct paths in your assets folder
import HomeIcon from '../../../../../assets/raw/svg/icons/navigation/home.svg';
import SearchIcon from '../../../../../assets/raw/svg/icons/navigation/search.svg';
import ScanIcon from '../../../../../assets/raw/svg/icons/navigation/scan.svg';
import ProfileIcon from '../../../../../assets/raw/svg/icons/navigation/profile.svg';
import SettingsIcon from '../../../../../assets/raw/svg/icons/navigation/settings.svg';
import AddIcon from '../../../../../assets/raw/svg/icons/actions/add.svg';
import EditIcon from '../../../../../assets/raw/svg/icons/actions/edit.svg';
import DeleteIcon from '../../../../../assets/raw/svg/icons/actions/delete.svg';
import ShareIcon from '../../../../../assets/raw/svg/icons/actions/share.svg';
import SuccessIcon from '../../../../../assets/raw/svg/icons/status/success.svg';
import ErrorIcon from '../../../../../assets/raw/svg/icons/status/error.svg';
import WarningIcon from '../../../../../assets/raw/svg/icons/status/warning.svg';
import InfoIcon from '../../../../../assets/raw/svg/icons/status/info.svg';
import MicrochipIcon from '../../../../../assets/raw/svg/icons/dog/microchip.svg';

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
    return <div className={`w-4 h-4 bg-gray-300 ${className}`} />;
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
  const colorMap: Record<string, string> = {
    '#2D89EF': 'invert(42%) sepia(93%) saturate(1352%) hue-rotate(204deg) brightness(97%) contrast(103%)',
    '#F5A623': 'invert(64%) sepia(100%) saturate(1374%) hue-rotate(6deg) brightness(100%) contrast(98%)',
  };
  return colorMap[color] || '';
}

export default Icon;
