import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
      "^.+\\.ts?$": "ts-jest",
    },
    testMatch: ["**/*.test.ts"],
    globals: {
      "ts-jest": {},
    },
    modulePaths: ["<rootDir>/src"],
    coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
    coverageReporters: ["json", "lcov", "text", "text-summary"],
    coverageThreshold: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  };
};
