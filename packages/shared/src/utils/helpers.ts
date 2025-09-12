export const formatDate = (date: Date): string => {
	return date.toISOString().split("T")[0]!; // Non-null assertion since split will always have [0]
};
