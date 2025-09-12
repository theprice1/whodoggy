// packages/shared/src/utils/imageLoader.ts
export class ImageLoader {
	private static cache = new Map<string, Promise<void>>();

	static preload(urls: string[]): Promise<void[]> {
		return Promise.all(
			urls.map((url) => {
				if (!ImageLoader.cache.has(url)) {
					ImageLoader.cache.set(
						url,
						new Promise((resolve, reject) => {
							const img = new Image();
							img.onload = () => resolve();
							img.onerror = reject;
							img.src = url;
						}),
					);
				}
				return ImageLoader.cache.get(url)!;
			}),
		);
	}

	static async preloadCriticalAssets() {
		const criticalAssets = [
			"/images/logo.svg",
			"/images/icons/scan.svg",
			"/images/splash.png",
			"/images/placeholders/dog-placeholder.png",
		];

		await ImageLoader.preload(criticalAssets);
	}
}
