// packages/shared/src/types/common.ts
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
}
