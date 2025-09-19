import type { Module } from "./types";

/**
 * Mock data for testing modules and their predefined steps.
 */
export const mockModules: Array<Module> = [
  {
    id: "web-module",
    name: "Web Application",
    description: "Testing for web applications",
    predefinedSteps: [
      { id: "web-1", description: "Open the browser", moduleId: "web-module" },
      { id: "web-2", description: "Navigate to the application URL", moduleId: "web-module" },
      { id: "web-3", description: "Login with valid credentials", moduleId: "web-module" },
      { id: "web-4", description: "Verify the dashboard is displayed", moduleId: "web-module" },
      { id: "web-5", description: "Navigate to a specific page", moduleId: "web-module" },
      { id: "web-6", description: "Fill out the form", moduleId: "web-module" },
      { id: "web-7", description: "Submit the form", moduleId: "web-module" },
      { id: "web-8", description: "Verify success message", moduleId: "web-module" },
      { id: "web-9", description: "Logout from the application", moduleId: "web-module" },
      { id: "web-10", description: "Close the browser", moduleId: "web-module" },
    ],
  },
  {
    id: "api-module",
    name: "API Testing",
    description: "Testing for REST and GraphQL APIs",
    predefinedSteps: [
      { id: "api-1", description: "Set up the request headers", moduleId: "api-module" },
      { id: "api-2", description: "Prepare request payload", moduleId: "api-module" },
      { id: "api-3", description: "Send the request to the endpoint", moduleId: "api-module" },
      { id: "api-4", description: "Verify status code is correct", moduleId: "api-module" },
      { id: "api-5", description: "Validate response structure", moduleId: "api-module" },
      { id: "api-6", description: "Verify response data is correct", moduleId: "api-module" },
      { id: "api-7", description: "Check response time is within limits", moduleId: "api-module" },
      { id: "api-8", description: "Verify error handling behavior", moduleId: "api-module" },
    ],
  },
  {
    id: "mobile-module",
    name: "Mobile Application",
    description: "Testing for iOS and Android applications",
    predefinedSteps: [
      { id: "mobile-1", description: "Launch the mobile application", moduleId: "mobile-module" },
      { id: "mobile-2", description: "Navigate to the login screen", moduleId: "mobile-module" },
      { id: "mobile-3", description: "Enter valid credentials", moduleId: "mobile-module" },
      { id: "mobile-4", description: "Tap the login button", moduleId: "mobile-module" },
      { id: "mobile-5", description: "Verify home screen is displayed", moduleId: "mobile-module" },
      { id: "mobile-6", description: "Navigate to a specific screen", moduleId: "mobile-module" },
      { id: "mobile-7", description: "Perform a swipe action", moduleId: "mobile-module" },
      { id: "mobile-8", description: "Rotate the device", moduleId: "mobile-module" },
      { id: "mobile-9", description: "Put the app in background", moduleId: "mobile-module" },
      { id: "mobile-10", description: "Close the application", moduleId: "mobile-module" },
    ],
  },
  {
    id: "database-module",
    name: "Database Testing",
    description: "Testing for database operations and integrity",
    predefinedSteps: [
      { id: "db-1", description: "Connect to the database", moduleId: "database-module" },
      { id: "db-2", description: "Execute the query", moduleId: "database-module" },
      { id: "db-3", description: "Verify records count", moduleId: "database-module" },
      { id: "db-4", description: "Validate data integrity", moduleId: "database-module" },
      { id: "db-5", description: "Verify stored procedure execution", moduleId: "database-module" },
      { id: "db-6", description: "Check index performance", moduleId: "database-module" },
      { id: "db-7", description: "Test transaction rollback", moduleId: "database-module" },
      { id: "db-8", description: "Disconnect from database", moduleId: "database-module" },
    ],
  },
];

/**
 * Get a module by its ID.
 */
export function getModuleById(moduleId: string): Module | undefined {
  return mockModules.find((module) => module.id === moduleId);
}

/**
 * Generate a unique ID for new entities.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Format a date string to YYYY-MM-DD format.
 */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}