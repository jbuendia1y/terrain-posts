export function readFile(
  file: File,
  options: { readAs: 'DataURL' | 'Text' | 'BinaryString' } = {
    readAs: 'DataURL',
  }
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    (reader as any)['readAs' + options.readAs](file);
  });
}
