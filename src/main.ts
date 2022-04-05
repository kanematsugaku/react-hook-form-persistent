import { useEffect } from 'react';
import type {
  FieldValues,
  Path,
  PathValue,
  UnpackNestedValue,
  UseFormReturn,
} from 'react-hook-form';

const isBrowser = typeof window !== 'undefined';

/** Type guard */
function isValidRecord(arg: unknown): arg is Record<string, unknown> {
  return arg !== null && typeof arg === 'object';
}

export default function useFormPersist<T extends FieldValues>(useFormReturn: UseFormReturn<T>) {
  const { watch, setValue } = useFormReturn;

  const inputted = watch();

  const getStorage = () => window.sessionStorage;
  const getKey = () => window.location.pathname;

  // Retrieve data from a storage and set them to a form
  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    const storaged = getStorage().getItem(getKey());
    if (storaged === null) {
      return;
    }
    const parsed: unknown = JSON.parse(storaged);
    if (isValidRecord(parsed)) {
      Object.entries(parsed).forEach(([k, v]) => {
        // FIXME: Want to remove assertions
        setValue(k as Path<T>, v as UnpackNestedValue<PathValue<T, Path<T>>>);
      });
    }
  }, [setValue]);

  // Retrieve data from a form and set them to a storage
  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    const stringified = JSON.stringify(inputted);
    getStorage().setItem(getKey(), stringified);
  }, [inputted]);

  // Delete data in a storage when a component is unmounted
  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }
    const key = getKey();
    return () => {
      getStorage().removeItem(key);
    };
  }, []);

  return {
    ...useFormReturn,
  };
}
