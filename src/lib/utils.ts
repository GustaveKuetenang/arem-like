import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function usernameValidator(username: string) {
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const reservedUsernames = ["admin", "root", "system"];

  if (reservedUsernames.includes(username.toLowerCase())) {
    return false;
  }

  if (!usernameRegex.test(username)) {
    return false;
  }

  return true;
}
