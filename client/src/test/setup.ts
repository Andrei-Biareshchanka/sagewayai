/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import '../i18n';

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
