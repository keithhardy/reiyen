import { type ClassValue,clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function PathMatch(basePath: string, targetPath: string, excludeFirstChild?: string) {
  if (excludeFirstChild && basePath === excludeFirstChild) {
    return basePath === targetPath;
  }

  return targetPath.startsWith(basePath) && (basePath === targetPath || targetPath[basePath.length] === '/');
}