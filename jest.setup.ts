import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (k: string) => k,
    i18n: {
      changeLanguage: jest.fn(),
      language: "en",
    },
  }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: "3rdParty",
    init: jest.fn(),
  },
}));

jest.mock("i18next-browser-languagedetector", () => ({
  __esModule: true,
  default: {
    type: "languageDetector",
    init: jest.fn(),
    detect: jest.fn(() => "en"),
    cacheUserLanguage: jest.fn(),
  },
}));

jest.mock("@react-pdf/renderer", () => ({
  Document: ({ children }: { children: React.ReactNode }) => children,
  Page: ({ children }: { children: React.ReactNode }) => children,
  Text: ({ children }: { children: React.ReactNode }) => children,
  View: ({ children }: { children: React.ReactNode }) => children,
  StyleSheet: {
    create: <T extends Record<string, unknown>>(styles: T) => styles,
  },
  Font: {
    register: jest.fn(),
  },
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
