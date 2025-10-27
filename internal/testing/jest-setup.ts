jest.mock("gatsby", () => jest.requireActual("./__mocks__/gatsby").default);

jest.mock("@/utils/get-default-color-mode", () => ({
  getDefaultColorMode: () => "light",
}));

jest.mock("@/hooks/use-theme", () => ({
  useTheme: () => {
    const theme = { mode: "light" };
    const toggle = () => {};
    return [theme, toggle];
  },
}));
