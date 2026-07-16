// Fork of https://github.com/pacocoursey/next-themes to support Next 16
// MIT License - Copyright (c) 2022 Paco Coursey
import { ThemeContext } from "./context";
import * as React from 'react';
import type { UseThemeProps } from "./types";

export const defaultContext: UseThemeProps = { setTheme: () => {}, themes: [] };

export function useTheme() {
	return React.useContext(ThemeContext) ?? defaultContext;
}
