export function formatDate(date) {
  const fmt = date.split("-").reverse();

  if (fmt[2].split("").length === 4)
    fmt[2] = fmt[2].split("").slice(2).join("");

  return fmt.join(".");
}

export function toStringDate(time) {
  const date = new Date(time);

  return [
    String(date.getFullYear()),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}
