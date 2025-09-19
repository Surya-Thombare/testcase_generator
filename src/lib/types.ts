// Types for the test case management platform

/**
 * Represents a testing module in the system.
 * Each module can have its own set of predefined steps.
 */
export interface Module {
  id: string;
  name: string;
  description?: string;
  predefinedSteps: Array<PredefinedStep>;
}

/**
 * Represents a predefined step that can be used in test cases.
 */
export interface PredefinedStep {
  id: string;
  description: string;
  moduleId: string;
}

/**
 * Represents a step in a test case.
 * Can be either a predefined step or a custom step.
 */
export interface TestStep {
  id: string;
  description: string;
  isPredefined: boolean;
  predefinedStepId?: string;
  order: number;
}

/**
 * Represents a test case.
 */
export interface TestCase {
  id: string;
  testerName: string;
  name: string;
  moduleId: string;
  steps: Array<TestStep>;
  startDate: string;
  endDate: string;
  completionDate?: string;
  status: TestCaseStatus;
  createdAt: string;
  updatedAt: string;
  priority?: TestCasePriority;
  environment?: string;
  version?: string;
  notes?: string;
}

/**
 * Possible statuses for a test case.
 */
export enum TestCaseStatus {
  Draft = "draft",
  Ready = "ready",
  InProgress = "inProgress",
  Completed = "completed",
  Failed = "failed"
}

/**
 * Priority levels for test cases.
 */
export enum TestCasePriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical"
}

/**
 * Form data structure for creating/editing a test case
 */
export interface TestCaseFormData {
  testerName: string;
  name: string;
  moduleId: string;
  steps: Array<TestStep>;
  startDate: string;
  endDate: string;
  completionDate?: string;
  priority?: TestCasePriority;
  environment?: string;
  version?: string;
  notes?: string;
}