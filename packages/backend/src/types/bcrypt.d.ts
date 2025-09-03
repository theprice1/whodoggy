declare module "bcrypt" {
	// Minimal typings - expand if needed
	export function hash(
		data: string | Buffer,
		saltOrRounds: number | string,
	): Promise<string>;

	export function compare(
		data: string | Buffer,
		encrypted: string,
	): Promise<boolean>;

	export function genSalt(rounds?: number): Promise<string>;
}
