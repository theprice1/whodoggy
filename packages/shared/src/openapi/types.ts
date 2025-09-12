export interface paths {
	"/api/search": {
		post: {
			requestBody: {
				content: {
					"application/json": {
						microchipId: string;
					};
				};
			};
			responses: {
				200: {
					content: {
						"application/json": {
							success: boolean;
							data: SearchResult;
						};
					};
				};
				400: {
					content: {
						"application/json": {
							error: string;
						};
					};
				};
			};
		};
	};

	"/dogs/{microchipId}": {
		get: {
			parameters: {
				path: {
					microchipId: string;
				};
			};
			responses: {
				200: {
					content: {
						"application/json": Dog;
					};
				};
			};
		};
	};

	"/dogs": {
		post: {
			requestBody: {
				content: {
					"application/json": CreateDogRequest;
				};
			};
			responses: {
				201: {
					content: {
						"application/json": Dog;
					};
				};
			};
		};
	};

	"/api/dogs": {
		get: {
			responses: {
				200: {
					content: {
						"application/json": Dog[];
					};
				};
			};
		};
		post: {
			requestBody: {
				content: {
					"application/json": CreateDogRequest;
				};
			};
			responses: {
				201: {
					content: {
						"application/json": Dog;
					};
				};
			};
		};
	};
}

export interface SearchResult {
	name: string;
	breed: string;
	owner?: string;
	microchipId: string;
	registryId: string;
}

export interface Dog {
	id: string;
	name: string;
	breed: string;
	microchipId: string;
	ownerId?: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateDogRequest {
	name: string;
	breed: string;
	microchipId: string;
	ownerId?: string;
}
