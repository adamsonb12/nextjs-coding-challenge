import { join } from "path";

/**
 * generates full path to file based on process.cwd() safe.
 * https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
 */
export function fsPathJoin(...parts: string[]) {
  return join(process.cwd(), ...parts);
}
