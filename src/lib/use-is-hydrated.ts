import * as React from 'react';

function subscribe() {
  return () => {};
}

export function useIsHydrated() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
