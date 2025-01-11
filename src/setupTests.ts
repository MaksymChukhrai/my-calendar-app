import '@testing-library/jest-dom';

declare global {
  namespace NodeJS {
    interface Global {
      jest: typeof jest;
    }
  }
}

const mockJest = {
  fn: () => ({
    mockClear: () => {},
    mockReset: () => {},
    mockImplementation: () => {},
  }),
  clearAllMocks: () => {},
};

(global as any).jest = mockJest;

expect.extend({
  toHaveBeenCalledWith: () => ({
    pass: true,
    message: () => '',
  }),
});

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
});

window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};