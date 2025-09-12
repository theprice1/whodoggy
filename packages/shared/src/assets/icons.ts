// packages/shared/src/assets/icons.ts
export const ICON_NAMES = [
	"home",
	"search",
	"scan",
	"profile",
	"settings",
	"microchip",
	"vaccination",
	"location",
	"phone",
	"email",
	"back",
	"menu",
	"notification",
	"success",
	"error",
	"warning",
	"info",
	"male",
	"female",
	"verified",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps {
	name: IconName;
	size?: number;
	color?: string;
	style?: any;
}
