export const slugify = (title?: string): string => {
  if (!title) return ""; // Handle undefined or empty titles
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};
