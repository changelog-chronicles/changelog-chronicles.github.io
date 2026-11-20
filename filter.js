// Filters a release list by kind (breaking, feature, ...); ?kind= keeps it in the URL.
for (const bar of document.querySelectorAll(".filters")) {
  const items = bar.nextElementSibling.querySelectorAll("li");
  const buttons = bar.querySelectorAll("button");
  const show = (kind) => {
    for (const b of buttons) b.setAttribute("aria-pressed", b.dataset.kind === kind);
    for (const li of items) li.hidden = kind !== "" && li.dataset.kind !== kind;
    const url = new URL(location);
    if (kind) url.searchParams.set("kind", kind); else url.searchParams.delete("kind");
    history.replaceState(null, "", url);
  };
  for (const b of buttons) {
    b.addEventListener("click", () => show(b.getAttribute("aria-pressed") === "true" ? "" : b.dataset.kind));
  }
  const asked = new URLSearchParams(location.search).get("kind") || "";
  show([...buttons].some((b) => b.dataset.kind === asked) ? asked : "");
  bar.hidden = false;
}
