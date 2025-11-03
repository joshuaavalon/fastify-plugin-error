export function toIdentifier(input: string): string {
  return input
    .split(" ")
    .map(token => token.slice(0, 1).toUpperCase() + token.slice(1))
    .join("")
    .replace(/[^ _0-9a-z]/giu, "");
}
