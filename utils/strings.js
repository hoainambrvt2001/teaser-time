export function toSlug(str) {
  // Convert to lowercase
  str = str.toLowerCase();

  // Remove accents
  str = str
    .normalize('NFD') // Convert string to Unicode normalization form
    .replace(/[\u0300-\u036f]/g, ''); // Remove accent characters after decomposition

  // Replace characters đĐ
  str = str.replace(/[đĐ]/g, 'd');

  // Remove special characters
  str = str.replace(/([^0-9a-z-\s])/g, '');

  // Remove consecutive hyphens
  str = str.replace(/-+/g, '-');

  // Remove leading & trailing hyphens
  str = str.replace(/^-+|-+$/g, '');

  return str;
}
