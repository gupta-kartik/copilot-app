import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import stalls from '../src/data/stalls.json' with { type: 'json' };
import { parsePrice, searchStalls, sortStalls } from '../src/stalls.js';

describe('searchStalls', () => {
  it('searches by stall name', () => {
    const results = searchStalls(stalls, 'Ah Mei');
    assert.deepEqual(results.map((stall) => stall.name), ['Ah Mei Steam Rice']);
  });

  it('searches by cuisine case-insensitively', () => {
    const results = searchStalls(stalls, 'laksa');
    assert.deepEqual(results.map((stall) => stall.cuisine), ['Laksa']);
  });

  it('returns all stalls for an empty query', () => {
    assert.equal(searchStalls(stalls, '').length, stalls.length);
  });
});

describe('sortStalls', () => {
  it('sorts by rating descending', () => {
    const results = sortStalls(stalls, 'rating');
    assert.ok(results[0].rating >= results[1].rating);
    assert.equal(results[0].name, 'Chomp Chomp Prawn Noodles');
  });

  it('sorts by name ascending', () => {
    const results = sortStalls(stalls, 'name');
    assert.deepEqual(results.slice(0, 3).map((stall) => stall.name), [
      'Adam Road Lemak Corner',
      'Ah Mei Steam Rice',
      'Airport Road Wok House',
    ]);
  });

  // Regression: issue #1 — prices were compared as text, so S$10.00 sorted before S$3.80.
  it('sorts by price numerically, cheapest first', () => {
    const prices = sortStalls(stalls, 'price').map((stall) => stall.price);
    assert.equal(prices[0], 'S$3.80');
    assert.deepEqual(prices.slice(-3), ['S$10.00', 'S$11.50', 'S$12.00']);
    const numeric = prices.map(parsePrice);
    assert.deepEqual(numeric, [...numeric].sort((a, b) => a - b));
  });
});

describe('parsePrice', () => {
  it('parses S$ price strings into numbers', () => {
    assert.equal(parsePrice('S$3.80'), 3.8);
    assert.equal(parsePrice('S$12.00'), 12);
  });
});
