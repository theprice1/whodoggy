// apps/mobile/src/components/Icon/Icon.tsx
import React from 'react';
import { ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

// Import all SVG icons (update paths as needed)
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
import VaccinationIcon from '../assets/icons/vaccination.svg';
import GenderMaleIcon from '../assets/icons/gender-male.svg';
import GenderFemaleIcon from '../assets/icons/gender-female.svg';

// Map icon names to components
const ICON_MAP = {
  // Navigation
  home: HomeIcon,
  search: SearchIcon,
  scan: ScanIcon,
  profile: ProfileIcon,
  settings: SettingsIcon,

  // Actions
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  share: ShareIcon,

  // Status
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,

  // Dog-specific
  microchip: MicrochipIcon,
  vaccination: VaccinationIcon,
  'gender-male': GenderMaleIcon,
  'gender-female': GenderFemaleIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;

interface IconProps extends Omit<SvgProps, 'width' | 'height'> {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#2C3E50', // Default text color
  style,
  ...props
}) => {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`[WhoDoggy] Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      fill={color}
      style={style}
      {...props}
    />
  );
};

export default Icon;
