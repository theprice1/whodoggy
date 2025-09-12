// Core application types for WhoDoggy
export interface Dog {
	id: string;
	microchipId: string;
	name: string;
	breed?: string;
	color?: string;
	age?: number;
	weight?: number;
	description?: string;
	ownerId: string;
	registryId: string;
	isLost?: boolean;
	lastSeen?: Date;
	imageUrl?: string;
}

export interface Owner {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
		country: string;
	};
}

export interface Registry {
	id: string;
	name: string;
	apiEndpoint: string;
	isActive: boolean;
	country: string;
	supportedFeatures: string[];
}

export interface MicrochipScanResult {
	microchipId: string;
	found: boolean;
	dog?: Dog;
	owner?: Owner;
	registry?: Registry;
	lastUpdated: Date;
}

export interface SearchParams {
	microchipId?: string;
	dogName?: string;
	ownerName?: string;
	registryIds?: string[];
}

// API Response types
export interface ApiResponse<T> {
	success: boolean;
	data: T;
	message?: string;
	error?: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	pageSize: number;
	hasNext: boolean;
}
