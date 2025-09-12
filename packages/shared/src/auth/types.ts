// packages/shared/src/auth/types.ts
export interface User {
	id: string;
	email: string;
	name: string;
	role?: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}
