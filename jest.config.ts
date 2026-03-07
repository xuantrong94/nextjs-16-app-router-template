import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/lib/fetch/**/*.ts",
    "!src/lib/fetch/__tests__/**",
    "!src/lib/fetch/index.ts",
  ],
  coverageThreshold: {
    global: { lines: 80, functions: 80, branches: 80 },
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
