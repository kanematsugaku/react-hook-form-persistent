/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect } from 'react';
import type { Path, PathValue, UnpackNestedValue, UseFormReturn } from 'react-hook-form';

const isBrowser = typeof window !== 'undefined';

function isRecord(arg: unknown): arg is Record<string, unknown> {
  return arg !== null && typeof arg === 'object';
}

function parseFromJson(data: string): unknown {
  try {
    return JSON.parse(data);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return {};
  }
}

/**
 * Custom hook for React Hook Form to persist state to storage.
 *
 * @param option.storage Where to store persistent data. default is "sessionStorage".
 * @return UseFormReturn.
 */
export default function useFormPersist<T>(
  useFormReturn: UseFormReturn<T>,
  optionalStorage?: Storage,
): UseFormReturn<T, any> {
  const { watch, setValue } = useFormReturn;

  const inputted = watch();

  const getKey = () => window.location.pathname;
  const getStorage = useCallback(() => optionalStorage ?? window.sessionStorage, [optionalStorage]);

  // Retrieve data from a storage and set them to a form
  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    const storaged = getStorage().getItem(getKey());
    if (storaged === null) {
      return;
    }
    const parsed = parseFromJson(storaged);
    if (isRecord(parsed)) {
      Object.entries(parsed).forEach(([k, v]) => {
        // FIXME: Want to remove assertions
        setValue(k as Path<T>, v as UnpackNestedValue<PathValue<T, Path<T>>>);
      });
    }
  }, [getStorage, setValue]);

  // Retrieve data from a form and set them to a storage
  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    const stringified = JSON.stringify(inputted);
    getStorage().setItem(getKey(), stringified);
  }, [getStorage, inputted]);

  // Delete data in a storage when a component is unmounted
  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }
    const key = getKey();
    return () => {
      getStorage().removeItem(key);
    };
  }, [getStorage]);

  return useFormReturn;
}
