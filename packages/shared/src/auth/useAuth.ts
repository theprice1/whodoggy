// Placeholder useAuth hook
export const useAuth = () => ({
	user: null,
	loading: false,
	signIn: () => Promise.resolve(),
	signOut: () => Promise.resolve(),
});
