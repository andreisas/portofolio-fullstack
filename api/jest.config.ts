export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 20000,
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
};
