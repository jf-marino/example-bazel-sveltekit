import { fileURLToPath } from 'url';
import { dirname as pathDirname } from 'path';

export const dirname = (importMetaUrl) => {
  const __filename = fileURLToPath(importMetaUrl)
  return pathDirname(__filename)
}