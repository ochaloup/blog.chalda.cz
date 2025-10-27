import type { Theme } from "../use-theme";

const useTheme = (): readonly [Theme, () => void] => {
  const theme: Theme = { mode: "light" };
  const toggle = () => {};
  return [theme, toggle] as const;
};

export { useTheme };
export default useTheme;
