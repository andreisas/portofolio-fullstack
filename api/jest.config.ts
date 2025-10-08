export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 20000,
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  // Load .env.test before running tests
  setupFiles: ["<rootDir>/tests/jest.env.ts"],
};
