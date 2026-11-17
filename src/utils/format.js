export function formatDate(date) {
  const fmt = date.split("-").reverse();

  if (fmt[2].split("").length === 4)
    fmt[2] = fmt[2].split("").slice(2).join("");

  return fmt.join(".");
}
