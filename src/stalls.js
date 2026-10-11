export function searchStalls(stalls, query) {
  if (!query) {
    return stalls;
  }

  const matcher = new RegExp(query, 'i');
  return stalls.filter((stall) =>
    matcher.test(stall.name) ||
    matcher.test(stall.centre) ||
    matcher.test(stall.cuisine)
  );
}

export function sortStalls(stalls, key) {
  const sorted = [...stalls];

  if (key === 'rating') {
    return sorted.sort((a, b) => b.rating - a.rating);
  }

  if (key === 'name') {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (key === 'price') {
    return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  }

  return sorted;
}

export function parsePrice(price) {
  return Number.parseFloat(String(price).replace(/[^0-9.]/g, ''));
}
