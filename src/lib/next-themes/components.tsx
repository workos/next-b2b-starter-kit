'use client';
// Fork of https://github.com/pacocoursey/next-themes to support Next 16
// MIT License - Copyright (c) 2022 Paco Coursey
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import type { Attribute, ThemeProviderProps, UseThemeProps, ValueObject } from './types';
import { ThemeContext } from './context';
import { useIsHydrated } from '../use-is-hydrated';

const script = (
  attribute: Attribute | Attribute[],
  storageKey: string,
  defaultTheme: string,
  forcedTheme: string | undefined,
  themes: string[],
  value: ValueObject | undefined,
  enableSystem: boolean,
  enableColorScheme: boolean,
) => {
  const el = document.documentElement;
  const systemThemes = ['light', 'dark'];

  function updateDOM(theme: string) {
    const attributes = Array.isArray(attribute) ? attribute : [attribute];

    attributes.forEach((attr) => {
      const isClass = attr === 'class';
      const classes = isClass && value ? themes.map((t) => value[t] || t) : themes;
      if (isClass) {
        el.classList.remove(...classes);
        el.classList.add(value && value[theme] ? value[theme] : theme);
      } else {
        el.setAttribute(attr, theme);
      }
    });

    setColorScheme(theme);
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme;
    }
  }

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  if (forcedTheme) {
    updateDOM(forcedTheme);
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme;
      const isSystem = enableSystem && themeName === 'system';
      const theme = isSystem ? getSystemTheme() : themeName;
      updateDOM(theme);
    } catch {}
  }
};

const colorSchemes = ['light', 'dark'];
const MEDIA = '(prefers-color-scheme: dark)';
const isServer = typeof window === 'undefined';

function saveToLocalStorage(storageKey: string, value: string | undefined) {
  try {
    localStorage.setItem(storageKey, value!);
  } catch {}
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const context = React.useContext(ThemeContext);
  // Ignore nested context providers, just passthrough children
  if (context) {
    return props.children;
  }
  return <Theme {...props} />;
};

const defaultThemes = ['light', 'dark'];

const Theme = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = 'theme',
  themes = defaultThemes,
  defaultTheme = enableSystem ? 'system' : 'light',
  attribute = 'data-theme',
  value,
  children,
  nonce,
  scriptProps,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = React.useState(() => getTheme(storageKey, defaultTheme));
  const [resolvedTheme, setResolvedTheme] = React.useState(() => (theme === 'system' ? getSystemTheme() : theme));
  const attrs = !value ? themes : Object.values(value);

  const applyTheme = React.useCallback(
    (theme: string | undefined) => {
      let resolved = theme;
      if (!resolved) {
        return;
      }

      // If theme is system, resolve it before setting theme
      if (theme === 'system' && enableSystem) {
        resolved = getSystemTheme();
      }

      const name = value ? value[resolved] : resolved;
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
      const d = document.documentElement;

      function handleAttribute(attr: Attribute) {
        if (attr === 'class') {
          d.classList.remove(...attrs);
          if (name) d.classList.add(name);
        } else if (attr.startsWith('data-')) {
          if (name) {
            d.setAttribute(attr, name);
          } else {
            d.removeAttribute(attr);
          }
        }
      }

      if (Array.isArray(attribute)) {
        attribute.forEach(handleAttribute);
      } else {
        handleAttribute(attribute);
      }

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme) ? defaultTheme : null;
        const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
        d.style.colorScheme = colorScheme ?? '';
      }

      enable?.();
    },
    [nonce],
  );

  const setTheme = React.useCallback<React.Dispatch<React.SetStateAction<string | undefined>>>((value) => {
    if (typeof value === 'function') {
      setThemeState((prevTheme) => {
        const newTheme = value(prevTheme);
        saveToLocalStorage(storageKey, newTheme);
        return newTheme;
      });
    } else {
      setThemeState(value);
      saveToLocalStorage(storageKey, value);
    }
  }, []);

  const handleMediaQuery = React.useEffectEvent((event: MediaQueryListEvent | MediaQueryList) => {
    const resolved = getSystemTheme(event);
    setResolvedTheme(resolved);
    if (theme === 'system' && enableSystem && !forcedTheme) {
      applyTheme('system');
    }
  });

  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    const media = window.matchMedia(MEDIA);
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      handleMediaQuery(media);
    }
    media.addEventListener('change', handleMediaQuery);
    return () => media.removeEventListener('change', handleMediaQuery);
  }, []);

  React.useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== storageKey) {
        return;
      }

      // If default theme set, use it if localstorage === null (happens on local
      // storage manual deletion)
      if (!event.newValue) {
        setTheme(defaultTheme);
      } else {
        setThemeState(event.newValue); // Direct state update to avoid loops
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [setTheme]);

  // Whenever theme or forcedTheme changes, apply it
  React.useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme]);

  const providerValue = React.useMemo(
    () =>
      ({
        theme,
        setTheme,
        forcedTheme,
        resolvedTheme: theme === 'system' ? resolvedTheme : theme,
        themes: enableSystem ? [...themes, 'system'] : themes,
        systemTheme: (enableSystem ? resolvedTheme : undefined) as 'light' | 'dark' | undefined,
      }) satisfies UseThemeProps,
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes],
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        forcedTheme={forcedTheme}
        storageKey={storageKey}
        attribute={attribute}
        enableSystem={enableSystem}
        enableColorScheme={enableColorScheme}
        defaultTheme={defaultTheme}
        value={value}
        themes={themes}
        nonce={nonce}
        scriptProps={scriptProps}
      />

      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeScript = React.memo(function ThemeScript({
  forcedTheme,
  storageKey,
  attribute,
  enableSystem,
  enableColorScheme,
  defaultTheme,
  value,
  themes,
  nonce,
  scriptProps,
}: Omit<ThemeProviderProps, 'children'> & { defaultTheme: string }) {
  const isHydrated = useIsHydrated();
  if (isHydrated) {
    return null;
  }

  const scriptArgs = JSON.stringify([
    attribute,
    storageKey,
    defaultTheme,
    forcedTheme,
    themes,
    value,
    enableSystem,
    enableColorScheme,
  ]).slice(1, -1);

  return (
    <script
      {...scriptProps}
      suppressHydrationWarning
      nonce={typeof window === 'undefined' ? nonce : ''}
      dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${scriptArgs})` }}
    />
  );
});

// Helpers
function getTheme(key: string, fallback?: string) {
  if (isServer) {
    return undefined;
  }

  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch {}
  return theme || fallback;
}

function disableAnimation(nonce?: string) {
  const css = document.createElement('style');
  if (nonce) css.setAttribute('nonce', nonce);
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

function getSystemTheme(event?: MediaQueryList | MediaQueryListEvent) {
  if (!event) {
    event = window.matchMedia(MEDIA);
  }
  const isDark = event.matches;
  const systemTheme = isDark ? 'dark' : 'light';
  return systemTheme;
}
