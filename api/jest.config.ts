import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/e2e-tests/**/*.e2e.test.ts'],
};

export default config;
