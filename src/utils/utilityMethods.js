export function formatJobType(type) {
  if (!type) return "";

  return type
    .toLowerCase()
    .replace("_", "-")
    .replace(/(^\w|\-\w)/g, (match) => match.toUpperCase());
}
