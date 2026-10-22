# Stud Math

Wall stud and plate arithmetic. The 26 ft of wall at 16 inches takes 21 studs, plus 6 extra, 27 studs in all.

## Named constants

One: 12 inches in a foot.

## What it computes

- **The studs truth** - studs: the wall (1 to 100000 ft) in inches over the spacing (1 to 48 inches), rounded up, plus 1, plus the extra studs (0 to 100000).
- **The plates truth** - plate boards: the wall times the plates (1 to 10) over the board length (1 to 50 ft), rounded up, with the feet left.
- **The boards truth** - cost: the studs plus the plate boards, at the board price (0.01 to 10000 dollars).
- **The bundles truth** - bundles: the boards (1 to 1000000) over the bundle size (1 to 1000), rounded up, with the boards left.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any wall and does not know the local code, the corners, the openings or the framing plan, and it gives no verdict that a count is enough or that a wall is built to hold. Every other number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/studmath/
Repo: https://github.com/iLanis-agent/studmath
