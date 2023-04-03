import { resolve } from 'path'

export const sass = aliases => {
  return url => {
    for (const [alias, aliasPath] of Object.entries(aliases)) {
      if (url.indexOf(alias) === 0) {
        return {
          file: url.replace(alias, aliasPath),
        };
      }
    }
    return url;
  };
}

export const monorepoAlias = (others) => {
  return ({
    ...others,
    '@packages': resolve(process.cwd(), '../')
  })
}