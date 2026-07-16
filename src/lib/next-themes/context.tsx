'use client';
// Fork of https://github.com/pacocoursey/next-themes to support Next 16
// MIT License - Copyright (c) 2022 Paco Coursey
import type { UseThemeProps } from './types';
import * as React from 'react';

const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
ThemeContext.displayName = 'ThemeContext';

export { ThemeContext };
