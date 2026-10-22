// Stud Math engine: the studs a wall takes at a spacing, the plate boards, the cost of the boards, and the bundles. Exact integers, half-up on display only. Named constant: 12 inches in a foot. Every other number is the owner's own entry.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _WALL = "the wall must be from 1 to 100000 ft with no decimal places";
var _SP = "the spacing must be from 1 to 48 inches with no decimal places";
var _EX = "the extra studs must be from 0 to 100000 with no decimal places";
var _PL = "the plate count must be from 1 to 10 with no decimal places";
var _BD = "the board length must be from 1 to 50 ft with no decimal places";
var _NS = "the stud count must be from 1 to 1000000 with no decimal places";
var _NB = "the plate board count must be from 1 to 100000 with no decimal places";
var _BO = "the board count must be from 1 to 1000000 with no decimal places";
var _BU = "the bundle size must be from 1 to 1000 with no decimal places";
var _PRICE = "the price must be from 0.01 to 10000 dollars with at most two decimal places";
function _dec(v, places) {
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _money(c) { return Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0"); }
function _pl(n, one, many) { return n + (n === 1 ? one : many); }

function studsTruth(wall, spacing, extra) {
  var w = _i(wall, _WALL, 6, 1, 100000), sp = _i(spacing, _SP, 2, 1, 48), ex = _i(extra, _EX, 6, 0, 100000);
  var base = Math.floor((w * 12 + sp - 1) / sp) + 1;
  return "The " + w + " ft of wall at " + sp + " inches takes " + _pl(base, " stud", " studs") + ", plus " + ex + " extra, " + _pl(base + ex, " stud", " studs") + " in all.";
}
function platesTruth(wall, plates, board) {
  var w = _i(wall, _WALL, 6, 1, 100000), pl = _i(plates, _PL, 2, 1, 10), b = _i(board, _BD, 2, 1, 50);
  var n = Math.floor((w * pl + b - 1) / b), left = n * b - w * pl;
  return "The " + _pl(pl, " plate", " plates") + " of " + w + " ft in " + b + " ft boards take " + _pl(n, " board", " boards") + ", leaving " + left + " ft.";
}
function boardsTruth(studs, pboards, price) {
  var s = _i(studs, _NS, 7, 1, 1000000), pb = _i(pboards, _NB, 6, 1, 100000), p = _p(price, _PRICE, 5, 2, 1, 1000000);
  var t = s + pb;
  return "The " + _pl(s, " stud", " studs") + " and " + _pl(pb, " plate board", " plate boards") + " are " + _pl(t, " board", " boards") + ", at $" + _dec(p, 2) + " cost $" + _money(t * p) + ".";
}
function bundlesTruth(boards, size) {
  var n = _i(boards, _BO, 7, 1, 1000000), z = _i(size, _BU, 4, 1, 1000);
  var k = Math.floor((n + z - 1) / z), left = k * z - n;
  return "The " + _pl(n, " board", " boards") + " in bundles of " + z + " take " + _pl(k, " bundle", " bundles") + ", leaving " + _pl(left, " board", " boards") + ".";
}
