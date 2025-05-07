/**
 * Feature flags for toggling between v1 and v2 features
 * This allows for gradual rollout of v2 features
 */

export type FeatureFlags = {
  useV2Components: boolean;
  useV2Pages: boolean;
  enableDataEnrichment: boolean;
  enableNetworkVisualization: boolean;
  enableSmartRecommendations: boolean;
  enableCrmIntegration: boolean;
};

// Default feature flags - can be overridden based on environment or user preferences
const defaultFeatureFlags: FeatureFlags = {
  useV2Components: false,
  useV2Pages: false,
  enableDataEnrichment: false,
  enableNetworkVisualization: false,
  enableSmartRecommendations: false,
  enableCrmIntegration: false,
};

// Function to get feature flags - can be extended to load from localStorage, API, etc.
export function getFeatureFlags(): FeatureFlags {
  // For development, you can override flags based on environment
  if (process.env.NODE_ENV === 'development') {
    // Check for v2 mode
    const isV2Mode = process.env.NEXT_PUBLIC_V2_MODE === 'true';
    
    if (isV2Mode) {
      return {
        ...defaultFeatureFlags,
        useV2Components: true,
        useV2Pages: true,
      };
    }
  }
  
  return defaultFeatureFlags;
}

// Hook for using feature flags in components
export function useFeatureFlags(): FeatureFlags {
  return getFeatureFlags();
}
