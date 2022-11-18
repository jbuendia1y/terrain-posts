import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export function readFile<T = string | ArrayBuffer | null>(
  file: File,
  options: { readAs: 'DataURL' | 'Text' | 'BinaryString' } = {
    readAs: 'DataURL',
  }
): Promise<T> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as any);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    (reader as any)['readAs' + options.readAs](file);
  });
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const getIcon = async (icon: string): Promise<IconDefinition> => {
  const m = await import('@fortawesome/free-solid-svg-icons');
  return (m as any)[icon];
};

export const listIcons = async (
  page = 1,
  limit = 5
): Promise<{ value: IconDefinition; key: string }[]> => {
  const m = await import('@fortawesome/free-solid-svg-icons');
  const icons = [];
  const keys = Object.keys(m);
  const total = keys.length;
  const itemsPerPage = Math.round(total / limit);
  const currentPage = (page - 1) * itemsPerPage;

  for (const k of keys.slice(currentPage, currentPage + itemsPerPage)) {
    if (!k.startsWith('fa')) continue;
    if (k === 'fas') continue;
    icons.push({
      value: (m as any)[k],
      key: k,
    });
  }
  return icons;
};
