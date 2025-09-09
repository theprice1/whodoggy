// src/controllers/aggregateSearchController.ts
import express, { type Request, type Response } from "express";
import http from "http";
import https from "https";

const router: express.Router = express.Router();

// Define the expected structure of a registry response
interface RegistryResponse {
  success: boolean;
  registry: {
    name: string;
    website: string;
    country: string;
    note?: string;
  };
  microchip: {
    id: string;
    registeredTo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    pet: {
      name: string;
      breed: string;
      age: number;
      gender: string;
    };
    registration: {
      registeredAt: string;
      lastUpdated: string;
    };
  };
}

// Define the structure of each search result
interface SearchResult {
  success: boolean;
  source?: string;
  data?: RegistryResponse;
  error?: any;
}

// Real UK/Northern Ireland registry endpoints (ports 4101-4122)
const registryEndpoints: string[] = Array.from(
  { length: 22 },
  (_, i) => `http://127.0.0.1:${4101 + i}/search`,
);

/**
 * Helper function to make HTTP requests using Node.js built-in http module
 */
function makeHttpRequest(url: string, timeout: number = 5000): Promise<{ ok: boolean, status: number, data?: any }> {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const httpModule = isHttps ? https : http;

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'WhoDoggy-Search/1.0'
      },
      timeout
    };

    const req = httpModule.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const statusCode = res.statusCode || 0;
          const ok = statusCode >= 200 && statusCode < 300;

          if (ok && data) {
            const jsonData = JSON.parse(data);
            resolve({ ok: true, status: statusCode, data: jsonData });
          } else {
            resolve({ ok: false, status: statusCode });
          }
        } catch (parseError) {
          resolve({ ok: false, status: res.statusCode || 0 });
        }
      });
    });

    req.on('error', () => {
      resolve({ ok: false, status: 0 });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, status: 0 });
    });

    req.setTimeout(timeout);
    req.end();
  });
}

/**
 * Search across all UK/Northern Ireland microchip registries
 * This endpoint aggregates searches across all 22 DEFRA-approved databases
 */
router.get("/search/:microchipId", async (req: Request, res: Response) => {
  const { microchipId } = req.params;

  if (!microchipId) {
    return res.status(400).json({
      error: "Microchip ID is required",
      message: "Please provide a valid microchip ID to search"
    });
  }

  try {
    console.log(`Searching for microchip ${microchipId} across ${registryEndpoints.length} UK registries...`);

    // Prepare requests to all UK registries
    const searchPromises: Promise<SearchResult>[] = registryEndpoints.map(
      (url: string) =>
        new Promise<SearchResult>(async (resolve) => {
          try {
            const response = await makeHttpRequest(`${url}/${microchipId}`, 5000);

            if (response.ok && response.data) {
              resolve({
                success: true,
                source: url,
                data: response.data as RegistryResponse,
              });
            } else {
              resolve({
                success: false,
                source: url,
                error: response.status
              });
            }
          } catch (error: any) {
            resolve({
              success: false,
              source: url,
              error: 'CONNECTION_ERROR'
            });
          }
        }),
    );

    // Execute all search requests in parallel
    const results: SearchResult[] = await Promise.all(searchPromises);

    // Find the first successful result with microchip data
    const match = results.find(
      (result) => result.success && result.data?.microchip,
    );

    if (match?.data) {
      console.log(`Microchip ${microchipId} found in ${match.data.registry.name}`);

      return res.status(200).json({
        source: match.source,
        success: true,
        registry: match.data.registry,
        microchip: match.data.microchip,
        searchStats: {
          totalRegistriesSearched: registryEndpoints.length,
          foundIn: match.data.registry.name,
          searchTime: new Date().toISOString()
        }
      });
    } else {
      console.log(`Microchip ${microchipId} not found in any UK registry`);

      const registryStats = results.reduce((acc, result) => {
        if (result.success === false) {
          if (result.error === 404) acc.notFound++;
          else acc.errors++;
        }
        return acc;
      }, { notFound: 0, errors: 0 });

      return res.status(404).json({
        success: false,
        message: "Dog not found in any registry.",
        microchipId,
        searchStats: {
          totalRegistriesSearched: registryEndpoints.length,
          registriesWithNoMatch: registryStats.notFound,
          registriesWithErrors: registryStats.errors,
          searchTime: new Date().toISOString()
        }
      });
    }
  } catch (error: any) {
    console.error("Aggregate search error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error during search",
      message: "Failed to search across UK microchip registries",
      microchipId
    });
  }
});

/**
 * Get status of all UK registry services
 */
router.get("/registries", async (req: Request, res: Response) => {
  try {
    const statusPromises = registryEndpoints.map(async (url: string) => {
      try {
        const response = await makeHttpRequest(url.replace('/search', ''), 3000);

        if (response.ok && response.data) {
          return {
            url,
            ...response.data,
            serviceStatus: 'operational' // Use serviceStatus to avoid conflicts
          };
        } else {
          return {
            url,
            serviceStatus: 'error',
            error: `HTTP ${response.status}`
          };
        }
      } catch (error: any) {
        return {
          url,
          serviceStatus: 'error',
          error: error.message
        };
      }
    });

    const statuses = await Promise.all(statusPromises);

    const operational = statuses.filter(s => s.serviceStatus === 'operational').length;
    const total = statuses.length;

    res.json({
      totalRegistries: total,
      operationalRegistries: operational,
      systemStatus: operational === total ? 'fully_operational' : 'partial_service',
      registries: statuses,
      lastChecked: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("Registry status check error:", error);
    res.status(500).json({
      error: "Failed to check registry status",
      message: "Unable to verify UK microchip database connectivity"
    });
  }
});

export { router as aggregateSearchRouter };
export default router;
