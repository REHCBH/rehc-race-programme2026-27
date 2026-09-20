import { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, Filter, ChevronDown, X, Clock, Sparkles, Award, LayoutGrid, List, Crown, Flag, Download, Printer, Share2, Copy, Check, CalendarPlus, FileDown, Trophy, ExternalLink } from 'lucide-react';

// =================================================================
// DATA — REHC 2026/27
// =================================================================
const PROGRAMME = [
  // ============ IMPORTED ============
  { p: 'I', m: 1, d: '2026-10-30', races: [
    { dist: 1000, text: '0-90', field: null },
    { dist: 1400, text: 'Late HH Sh Rashid Bin Isa Al Khalifa Cup — Domestic Grade 2', field: null },
    { dist: 1600, text: '4th & Maiden', field: null },
    { dist: 1800, text: '0-80', field: null }
  ]},
  { p: 'I', m: 2, d: '2026-11-06', races: [
    { dist: 1200, text: '0-85', field: null },
    { dist: 1400, text: 'Maiden', field: null },
    { dist: 1600, text: '0-65', field: null },
    { dist: 1800, text: '0-80 — Fillies & Mares', field: null },
    { dist: 2000, text: '0-95', field: null }
  ]},
  { p: 'I', m: 3, d: '2026-11-13', races: [
    { dist: 1000, text: 'Domestic Grade 1', field: null },
    { dist: 1200, text: '0-90', field: null },
    { dist: 1600, text: 'Open Handicap', field: null },
    { dist: 2000, text: 'Bahrain International Trophy — Group 1', field: null },
    { dist: 2800, text: 'Gulf of Bahrain Cup (Open Handicap)', field: null }
  ]},
  { p: 'I', m: 4, d: '2026-11-20', races: [
    { dist: 1400, text: '4th & Maiden', field: null },
    { dist: 1600, text: '0-75', field: null },
    { dist: 2000, text: '0-85', field: null }
  ]},
  { p: 'I', m: 5, d: '2026-11-26', races: [
    { dist: 1000, text: '0-75', field: null },
    { dist: 1200, text: 'Domestic Grade 2', field: null },
    { dist: 1400, text: '0-70', field: null },
    { dist: 2000, text: 'Domestic Grade 2', field: null },
    { dist: 2200, text: '0-75', field: null }
  ]},
  { p: 'I', m: 6, d: '2026-11-27', races: [
    { dist: 1000, text: '0-90', field: null },
    { dist: 1400, text: '0-90', field: null },
    { dist: 1600, text: 'Domestic Grade 2', field: null },
    { dist: 1800, text: '0-95', field: null }
  ]},
  { p: 'I', m: 7, d: '2026-12-04', races: [
    { dist: 1400, text: 'Fillies & Mares (TBC)', field: null },
    { dist: 1600, text: '0-80', field: null },
    { dist: 2000, text: '0-80', field: null },
    { dist: 2400, text: '0-75', field: null }
  ]},
  { p: 'I', m: 8, d: '2026-12-11', races: [
    { dist: 1200, text: '0-85', field: null },
    { dist: 1800, text: '4th & Maiden', field: null },
    { dist: 2200, text: '0-90', field: null }
  ]},
  { p: 'I', m: 9, d: '2026-12-17', races: [
    { dist: 1200, text: 'Domestic Grade 2 *', field: null },
    { dist: 1400, text: '0-80', field: null },
    { dist: 1400, text: '4th & Maiden (2yo)', field: null },
    { dist: 1600, text: '0-90', field: null },
    { dist: 2400, text: 'National Day Cup — Domestic Grade 1', field: null }
  ]},
  { p: 'I', m: 10, d: '2026-12-18', races: [
    { dist: 1000, text: 'Al Manama Cup — Turf Series 84-100', field: null },
    { dist: 1600, text: 'HH Sh Khalid Bin Hamad Al Khalifa Cup — Listed', field: null },
    { dist: 1600, text: 'Al Jasra Cup — Turf Series 84-100', field: null },
    { dist: 2000, text: 'Al Muharraq Cup — Turf Series 84-100', field: null }
  ]},
  { p: 'I', m: 11, d: '2026-12-24', races: [
    { dist: 1000, text: '0-90', field: null },
    { dist: 1200, text: '0-75 **', field: null },
    { dist: 1400, text: '0-90', field: null },
    { dist: 2000, text: 'Domestic Grade 2', field: null }
  ]},
  { p: 'I', m: 12, d: '2027-01-02', races: [
    { dist: 1000, text: '4th & Maiden', field: null },
    { dist: 1200, text: 'Al Riffa Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 1600, text: 'Al Seef Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 2000, text: 'Al Dana Cup — Turf Series (4yo+) 80-100', field: null }
  ]},
  { p: 'I', m: 13, d: '2027-01-08', races: [
    { dist: 1200, text: '0-90 (APP)', field: null },
    { dist: 1400, text: '0-70', field: null },
    { dist: 1800, text: '4th & Maiden', field: null },
    { dist: 2400, text: '0-75', field: null }
  ]},
  { p: 'I', m: 14, d: '2027-01-15', races: [
    { dist: 1000, text: 'Al Wasmiya Cup (4yo+) — Domestic Grade 1', field: null },
    { dist: 1400, text: 'Southern Governorate Cup (4yo+) — Domestic Grade 1', field: null },
    { dist: 1800, text: 'Al Adiyat Cup (4yo+) — Listed', field: null },
    { dist: 2000, text: '0-85', field: null }
  ]},
  { p: 'I', m: 15, d: '2027-01-22', races: [
    { dist: 1200, text: '4th & Maiden (3yo)', field: null },
    { dist: 1200, text: '0-75 **', field: null },
    { dist: 1400, text: '4th & Maiden (APP)', field: null },
    { dist: 1600, text: '0-90', field: null },
    { dist: 2200, text: '0-80', field: null }
  ]},
  { p: 'I', m: 16, d: '2027-01-28', races: [
    { dist: 1200, text: 'The Hawar Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 1600, text: 'Bahrain Bay Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 2000, text: 'The Anchorman Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 2400, text: 'Open Handicap', field: null }
  ]},
  { p: 'I', m: 17, d: '2027-01-29', races: [
    { dist: 1000, text: '0-80', field: null },
    { dist: 1200, text: 'Domestic Grade 2', field: null },
    { dist: 1600, text: 'Bahrain Mile (4yo+) — Domestic Grade 1', field: null },
    { dist: 2000, text: "HRH The Crown Prince's Cup (4yo+) — Group 3", field: null }
  ]},
  { p: 'I', m: 18, d: '2027-02-05', races: [
    { dist: 1200, text: '0-70 (APP)', field: null },
    { dist: 1600, text: '0-75', field: null },
    { dist: 2000, text: '4th & Maiden', field: null },
    { dist: 2400, text: '0-85', field: null }
  ]},
  { p: 'I', m: 19, d: '2027-02-11', races: [
    { dist: 1200, text: '0-85', field: null },
    { dist: 1400, text: '4th & Maiden (3yo)', field: null },
    { dist: 2000, text: '0-75 **', field: null },
    { dist: 2200, text: '0-95', field: null }
  ]},
  { p: 'I', m: 20, d: '2027-02-18', races: [
    { dist: 1000, text: 'Al Sakhir Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 1400, text: 'HH Sheema Bint Nasser Bin Hamad Al Khalifa Cup (4yo+) — Domestic Grade 1', field: null },
    { dist: 1800, text: 'Bahrain Vision Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 2200, text: 'HH Sh Nasser Bin Hamad Al Khalifa Cup — Listed', field: null }
  ]},
  { p: 'I', m: 21, d: '2027-02-25', races: [
    { dist: 1000, text: '0-75', field: null },
    { dist: 1200, text: 'Domestic Grade 2', field: null },
    { dist: 1400, text: '0-75 **', field: null },
    { dist: 2000, text: '0-80', field: null },
    { dist: 2400, text: '0-90', field: null }
  ]},
  { p: 'I', m: 22, d: '2027-03-04', races: [
    { dist: 1200, text: 'Al Fateh Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 1400, text: 'Maiden', field: null },
    { dist: 1600, text: 'Golden Jubilee Cup — Turf Series (4yo+) 80-100', field: null },
    { dist: 2000, text: 'The International Handicap — Turf Series (4yo+) 80-100', field: null }
  ]},
  { p: 'I', m: 23, d: '2027-03-05', races: [
    { dist: 1000, text: "Chairman's Cup (4yo+) — Domestic Grade 1", field: null },
    { dist: 1600, text: 'Al Methaq Mile (4yo+) — Listed', field: null },
    { dist: 2000, text: '0-90', field: null },
    { dist: 2400, text: "HM The King's Cup (4yo+) — Group 3", field: null }
  ]},
  { p: 'I', m: 24, d: '2027-03-12', races: [
    { dist: 1200, text: '4th & Maiden', field: null },
    { dist: 1400, text: '0-85', field: null },
    { dist: 1600, text: '4th & Maiden', field: null },
    { dist: 2200, text: '0-75', field: null }
  ]},
  { p: 'I', m: 25, d: '2027-03-19', races: [
    { dist: 1200, text: 'Domestic Grade 2', field: null },
    { dist: 1600, text: '0-75 (APP)', field: null },
    { dist: 1800, text: '0-95', field: null },
    { dist: 2400, text: '0-90', field: null }
  ]},
  { p: 'I', m: 26, d: '2027-03-26', races: [
    { dist: 1200, text: '0-75', field: null },
    { dist: 1400, text: 'Domestic Grade 1', field: null },
    { dist: 1600, text: '4th & Maiden (3yo)', field: null },
    { dist: 2000, text: 'Domestic Grade 2', field: null }
  ]},
  { p: 'I', m: 27, d: '2027-04-02', races: [
    { dist: 1200, text: '0-95', field: null },
    { dist: 1600, text: '0-95', field: null },
    { dist: 2200, text: '0-65', field: null }
  ]},
  { p: 'I', m: 28, d: '2027-04-08', races: [
    { dist: 1000, text: '0-65 (APP)', field: null },
    { dist: 1400, text: '0-75', field: null },
    { dist: 1800, text: '0-85', field: null }
  ]},
  { p: 'I', m: 29, d: '2027-04-15', races: [
    { dist: 1200, text: '0-85', field: null },
    { dist: 1400, text: '4th & Maiden', field: null },
    { dist: 2200, text: '0-95', field: null }
  ]},
  { p: 'I', m: 30, d: '2027-04-16', races: [
    { dist: 1200, text: 'Champions Sprint Cup — Domestic Grade 1', field: null },
    { dist: 1600, text: 'REHC Mile Cup — Domestic Grade 1', field: null },
    { dist: 2000, text: 'Bahrain Gold Cup — Domestic Grade 1', field: null },
    { dist: 2400, text: 'Stewards Cup — Domestic Grade 2', field: null }
  ]},
  // ============ BAHRAIN BRED ============
  { p: 'B', m: 1, d: '2026-10-30', races: [
    { dist: 1200, text: 'All Classes', field: null },
    { dist: 1600, text: 'Maiden', field: null },
    { dist: 1800, text: '0-35', field: null }
  ]},
  { p: 'B', m: 2, d: '2026-11-06', races: [
    { dist: 1200, text: '0-40', field: null },
    { dist: 1400, text: 'Maiden (Fillies & Mares)', field: null },
    { dist: 2200, text: '0-45', field: null }
  ]},
  { p: 'B', m: 3, d: '2026-11-13', races: [
    { dist: 1000, text: '0-60', field: null },
    { dist: 1400, text: 'All Classes', field: null },
    { dist: 1800, text: 'Domestic Grade 1', field: null }
  ]},
  { p: 'B', m: 4, d: '2026-11-20', races: [
    { dist: 1000, text: '0-40', field: null },
    { dist: 1400, text: '0-45', field: null },
    { dist: 1600, text: '0-35 (APP)', field: null },
    { dist: 1600, text: '4th & Maiden (4yo+)', field: null },
    { dist: 2200, text: '0-35', field: null }
  ]},
  { p: 'B', m: 5, d: '2026-11-26', races: [
    { dist: 1200, text: '4th & Maiden (4yo+)', field: null },
    { dist: 1600, text: 'Domestic Grade 2', field: null },
    { dist: 2200, text: '0-60', field: null }
  ]},
  { p: 'B', m: 6, d: '2026-11-27', races: [
    { dist: 1200, text: 'Domestic Grade 2', field: null },
    { dist: 1800, text: 'Maiden (4yo+)', field: null },
    { dist: 2000, text: '0-40', field: null }
  ]},
  { p: 'B', m: 7, d: '2026-12-04', races: [
    { dist: 1000, text: 'Maiden', field: null },
    { dist: 1400, text: '0-35', field: null },
    { dist: 1600, text: '0-55', field: null },
    { dist: 2000, text: '4th & Maiden', field: null }
  ]},
  { p: 'B', m: 8, d: '2026-12-11', races: [
    { dist: 1200, text: '0-45 *', field: null },
    { dist: 1400, text: '4th & Maiden (APP)', field: null },
    { dist: 1600, text: '0-40', field: null },
    { dist: 2200, text: '0-50', field: null }
  ]},
  { p: 'B', m: 9, d: '2026-12-17', races: [
    { dist: 1600, text: 'Maiden (4yo+) (Fillies & Mares)', field: null },
    { dist: 1800, text: '4th & Maiden', field: null }
  ]},
  { p: 'B', m: 10, d: '2026-12-18', races: [
    { dist: 1000, text: 'Domestic Grade 2', field: null },
    { dist: 1400, text: '0-65', field: null },
    { dist: 2000, text: 'Domestic Grade 2', field: null }
  ]},
  { p: 'B', m: 11, d: '2026-12-24', races: [
    { dist: 1200, text: 'Maiden (Fillies & Mares) (4yo+)', field: null },
    { dist: 1400, text: '0-35', field: null },
    { dist: 1800, text: '0-45', field: null }
  ]},
  { p: 'B', m: 12, d: '2027-01-02', races: [
    { dist: 1000, text: '4th & Maiden', field: null },
    { dist: 1800, text: 'Domestic Grade 2 (4yo)', field: null },
    { dist: 1800, text: 'Domestic Grade 2 (4yoF)', field: null },
    { dist: 2000, text: 'All Classes (5yo+)', field: null },
    { dist: 2000, text: 'Maiden (4yo+)', field: null }
  ]},
  { p: 'B', m: 13, d: '2027-01-08', races: [
    { dist: 1200, text: '0-35', field: null },
    { dist: 1200, text: 'Maiden (3yo)', field: null },
    { dist: 2200, text: '0-35', field: null }
  ]},
  { p: 'B', m: 14, d: '2027-01-15', races: [
    { dist: 1200, text: '4th & Maiden', field: null },
    { dist: 1600, text: '4th & Maiden', field: null },
    { dist: 2400, text: '0-45', field: null }
  ]},
  { p: 'B', m: 15, d: '2027-01-22', races: [
    { dist: 1400, text: 'Domestic Grade 2', field: null },
    { dist: 2000, text: '0-35', field: null },
    { dist: 2200, text: '0-60', field: null }
  ]},
  { p: 'B', m: 16, d: '2027-01-28', races: [
    { dist: 1000, text: '0-55', field: null },
    { dist: 1400, text: '4th & Maiden', field: null },
    { dist: 1800, text: 'Bahrain Oaks (4yoF) — Domestic Grade 1', field: null },
    { dist: 2200, text: '0-50', field: null }
  ]},
  { p: 'B', m: 17, d: '2027-01-29', races: [
    { dist: 1000, text: 'Domestic Grade 1', field: null },
    { dist: 2000, text: "The Crown Prince's Cup — Domestic Grade 1", field: null },
    { dist: 2000, text: 'Bahrain Derby (4yo) — Domestic Grade 1', field: null }
  ]},
  { p: 'B', m: 18, d: '2027-02-05', races: [
    { dist: 1000, text: 'Maiden (3yo)', field: null },
    { dist: 1200, text: '0-40', field: null },
    { dist: 1600, text: '0-60', field: null },
    { dist: 2000, text: '0-40', field: null }
  ]},
  { p: 'B', m: 19, d: '2027-02-11', races: [
    { dist: 1400, text: '0-45', field: null },
    { dist: 1800, text: 'Maiden (4yo+) (APP)', field: null },
    { dist: 2200, text: 'Domestic Grade 2', field: null }
  ]},
  { p: 'B', m: 20, d: '2027-02-18', races: [
    { dist: 1200, text: 'Open Handicap', field: null },
    { dist: 1400, text: '4th & Maiden (3yo)', field: null },
    { dist: 1600, text: 'Domestic Grade 2', field: null },
    { dist: 1600, text: 'Maiden (4yo+)', field: null }
  ]},
  { p: 'B', m: 21, d: '2027-02-25', races: [
    { dist: 1200, text: '0-45* (APP)', field: null },
    { dist: 1800, text: 'Maiden (Fillies & Mares)', field: null },
    { dist: 2200, text: '0-35', field: null }
  ]},
  { p: 'B', m: 22, d: '2027-03-04', races: [
    { dist: 1000, text: '0-40', field: null },
    { dist: 1200, text: '4th & Maiden', field: null },
    { dist: 1800, text: '0-55', field: null }
  ]},
  { p: 'B', m: 23, d: '2027-03-05', races: [
    { dist: 1400, text: 'Domestic Grade 2', field: null },
    { dist: 1600, text: '4th & Maiden', field: null },
    { dist: 2400, text: "The King's Cup — Domestic Grade 1", field: null }
  ]},
  { p: 'B', m: 24, d: '2027-03-12', races: [
    { dist: 1000, text: '3rd/4th & Maiden (3yo) — Challenge Series', field: null },
    { dist: 1400, text: '3rd/4th & Maiden (3yo) — Challenge Series', field: null },
    { dist: 2000, text: '0-35 **', field: null }
  ]},
  { p: 'B', m: 25, d: '2027-03-19', races: [
    { dist: 1000, text: '0-65', field: null },
    { dist: 1200, text: '0-35', field: null },
    { dist: 1600, text: 'Maiden (4yo+)', field: null },
    { dist: 2200, text: '0-60', field: null }
  ]},
  { p: 'B', m: 26, d: '2027-03-26', races: [
    { dist: 1200, text: '4th & Maiden (3yo) — Challenge Series', field: null },
    { dist: 1400, text: '0-40', field: null },
    { dist: 1600, text: '4th & Maiden (3yo) — Challenge Series', field: null },
    { dist: 1600, text: 'Open Handicap', field: null }
  ]},
  { p: 'B', m: 27, d: '2027-04-02', races: [
    { dist: 1000, text: '0-40', field: null },
    { dist: 1200, text: '4th & Maiden', field: null },
    { dist: 1600, text: '0-35', field: null },
    { dist: 2000, text: '0-55', field: null },
    { dist: 2400, text: '0-40', field: null }
  ]},
  { p: 'B', m: 28, d: '2027-04-08', races: [
    { dist: 1200, text: '0-55', field: null },
    { dist: 1400, text: 'Maiden (4yo+)', field: null },
    { dist: 1600, text: '0-50', field: null },
    { dist: 2000, text: '0-35', field: null }
  ]},
  { p: 'B', m: 29, d: '2027-04-15', races: [
    { dist: 1000, text: '0-35 (APP)', field: null },
    { dist: 1000, text: 'All Classes (3yo) (Series Final)', field: null },
    { dist: 1200, text: 'All Classes (3yoF) (Series Final)', field: null },
    { dist: 1600, text: 'All Classes (3yo) (Series Final)', field: null },
    { dist: 2200, text: '0-55', field: null }
  ]},
  { p: 'B', m: 30, d: '2027-04-16', races: [
    { dist: 1200, text: 'Domestic Grade 1', field: null },
    { dist: 1400, text: '0-55 (4yo+)', field: null },
    { dist: 1600, text: 'Domestic Grade 1', field: null },
    { dist: 2000, text: 'Owners Cup — Domestic Grade 1', field: null }
  ]},
  // ============ WAHO (Arabian Horses) ============
  { p: 'W', m: 1, d: '2026-10-30', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 2, d: '2026-11-06', races: [
    { dist: 1000, text: 'Maiden — 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 3, d: '2026-11-13', races: [
    { dist: 1200, text: '2nd / 3rd / 4th / Maiden', field: null }
  ]},
  { p: 'W', m: 4, d: '2026-11-20', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 5, d: '2026-11-26', races: [
    { dist: 1400, text: '3rd / 4th / Maiden', field: null }
  ]},
  { p: 'W', m: 6, d: '2026-11-27', races: [
    { dist: 1400, text: '2nd / 3rd / 4th / Maiden', field: null }
  ]},
  { p: 'W', m: 7, d: '2026-12-04', races: [
    { dist: 1200, text: 'Maiden — 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 8, d: '2026-12-11', races: [
    { dist: 1400, text: '3rd / 4th / Maiden', field: null }
  ]},
  { p: 'W', m: 9, d: '2026-12-17', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 10, d: '2026-12-18', races: [
    { dist: 1600, text: 'HH Sh Khalid Bin Hamad Al Khalifa Cup (All Classes & Maiden)', field: null }
  ]},
  { p: 'W', m: 11, d: '2026-12-24', races: [
    { dist: 1200, text: 'Maidens — Fillies & Mares', field: null }
  ]},
  { p: 'W', m: 12, d: '2027-01-02', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 13, d: '2027-01-08', races: [
    { dist: 1200, text: '3rd / 4th / Maiden', field: null }
  ]},
  { p: 'W', m: 14, d: '2027-01-15', races: [
    { dist: 1400, text: 'HH Sh Isa Bin Salman Al Khalifa Cup (All Classes & Maiden)', field: null }
  ]},
  { p: 'W', m: 15, d: '2027-01-22', races: [
    { dist: 1400, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 16, d: '2027-01-28', races: [
    { dist: 1000, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 17, d: '2027-01-29', races: [
    { dist: 1400, text: "HRH The Crown Prince's Cup — Domestic Grade 2", field: null }
  ]},
  { p: 'W', m: 18, d: '2027-02-05', races: [
    { dist: 1200, text: '3rd / 4th / Maiden', field: null }
  ]},
  { p: 'W', m: 19, d: '2027-02-11', races: [
    { dist: 1000, text: '3rd / 4th / Maiden', field: null }
  ]},
  { p: 'W', m: 20, d: '2027-02-18', races: [
    { dist: 1600, text: 'HH Sh Nasser Bin Hamad Al Khalifa Cup — Domestic Grade 2', field: null }
  ]},
  { p: 'W', m: 21, d: '2027-02-25', races: [
    { dist: 1000, text: 'Maiden — 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 22, d: '2027-03-04', races: [
    { dist: 1400, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 23, d: '2027-03-05', races: [
    { dist: 1600, text: "HM The King's Cup — Domestic Grade 1", field: null }
  ]},
  { p: 'W', m: 24, d: '2027-03-12', races: [
    { dist: 1200, text: '3rd / 4th / Maiden — Fillies & Mares', field: null }
  ]},
  { p: 'W', m: 25, d: '2027-03-19', races: [
    { dist: 1400, text: '2nd / 3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 26, d: '2027-03-26', races: [
    { dist: 1200, text: 'Maiden — 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 27, d: '2027-04-02', races: [
    { dist: 1600, text: 'Al Rouda Cup (All Classes & Maiden)', field: null }
  ]},
  { p: 'W', m: 28, d: '2027-04-08', races: [
    { dist: 1400, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 29, d: '2027-04-15', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 30, d: '2027-04-16', races: [
    { dist: 1400, text: '3rd / 4th / Maidens', field: null }
  ]}
];

function categorize(text) {
  const t = text.toUpperCase();
  if (t.includes('GROUP 1')) return { category: 'Group 1', tier: 1, accent: 'gold' };
  if (t.includes('GROUP 2')) return { category: 'Group 2', tier: 1, accent: 'gold' };
  if (t.includes('GROUP 3')) return { category: 'Group 3', tier: 1, accent: 'gold' };
  if (t.includes('LISTED')) return { category: 'Listed', tier: 2, accent: 'burgundy' };
  if (t.includes('GRADE 1')) return { category: 'Domestic G1', tier: 2, accent: 'green' };
  if (t.includes('GRADE 2')) return { category: 'Domestic G2', tier: 3, accent: 'sage' };
  if (t.includes('GRADE 3')) return { category: 'Domestic G3', tier: 3, accent: 'sage' };
  if (t.includes('TURF SERIES')) return { category: 'Turf Series', tier: 4, accent: 'teal' };
  if (t.includes('CHALLENGE SERIES')) return { category: 'Challenge Series', tier: 4, accent: 'amber' };
  if (t.includes('OPEN HANDICAP')) return { category: 'Open Handicap', tier: 5, accent: 'rust' };
  if (t.includes('ALL CLASSES')) return { category: 'All Classes', tier: 5, accent: 'slate' };
  if (t.includes('MAIDEN')) return { category: 'Maiden', tier: 6, accent: 'sand' };
  if (/0-\d+|\d+-100|\d+-90/.test(t)) return { category: 'Handicap', tier: 6, accent: 'olive' };
  if (t.includes('TBC')) return { category: 'TBC', tier: 7, accent: 'gray' };
  return { category: 'Other', tier: 7, accent: 'gray' };
}

const RACES = PROGRAMME.flatMap((m) =>
  m.races.map((r, ri) => ({
    id: m.p + '-' + m.m + '-' + r.dist + '-' + ri,
    programme: m.p === 'I' ? 'Imported' : m.p === 'W' ? 'WAHO' : 'Bahrain Bred',
    meeting: m.m,
    date: m.d,
    distance: r.dist,
    text: r.text,
    field: r.field,
    ...categorize(r.text)
  }))
);

// Per-race conditions from the REHC Condition Book 2026/27 (prize money, eligibility,
// entry fee, top weight). Keyed by race id (programme-meeting-distance-index).
const CONDITIONS = {"I-1-1000-0":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-1-1400-1":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"I-1-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"I-1-1800-3":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"Maidens","entry":"25","tw":"58","name":null},"I-2-1400-1":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 85 (Horses Rated 86 & 87 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-2-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 95 (Horses Rated 96 & 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-2-1800-3":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 80 (Horses Rated 81 & 82 may enter) (FILLIES &MARES ONLY) 3YO & UP","entry":"15","tw":"62","name":null},"I-2-2000-4":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"horses rated 0 \u2013 95 (Horses Rated 96 & 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-3-1000-0":{"prize":40000,"cur":"US$","bd":"24,000, 8000, 4800, 3200","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP","entry":"200","tw":"62","name":null},"I-3-1200-1":{"prize":16000,"cur":"US$","bd":"9600, 3200, 1920, 1280","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"80","tw":"62","name":null},"I-3-1600-2":{"prize":30000,"cur":"US$","bd":"18,000, 6000, 3600, 2400","elig":"Open Handicap 3YO & UP- Weight for Age","entry":"150","tw":"62","name":null},"I-3-2000-3":{"prize":null,"cur":null,"bd":null,"elig":null,"entry":null,"tw":null,"name":"BAHRAIN INTERNATIONAL TROPHY"},"I-3-2800-4":{"prize":null,"cur":null,"bd":null,"elig":"Open Handicap 3YO & UP- Weight for Age","entry":null,"tw":"62","name":"GULF OF BAHRAIN CUP"},"I-4-1400-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"62","name":null},"I-4-1600-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-4-2000-2":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 85 (Horses Rated 86 & 87 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-5-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-5-1200-1":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP","entry":"25","tw":null,"name":null},"I-5-1400-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 70 (Horses Rated 71 & 72 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-5-2000-3":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"I-5-2200-4":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-6-1000-0":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-6-1400-1":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":null,"name":null},"I-6-1600-2":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"I-6-1800-3":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"horses rated 0 \u2013 95 (Horses Rated 96 & 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-7-1400-0":{"prize":null,"cur":null,"bd":null,"elig":null,"entry":null,"tw":null,"name":null},"I-7-1600-1":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 80 (Horses Rated 81 & 82 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-7-2000-2":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 80 (Horses Rated 81 & 82 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-7-2400-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-8-1200-0":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 85 (Horses Rated 86 & 87 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-8-1800-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"I-8-2200-2":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-9-1200-0":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP","entry":"25","tw":null,"name":null},"I-9-1400-1":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 80 (Horses Rated 81 & 82 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-9-1400-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 2YO","entry":"10","tw":null,"name":null},"I-9-1600-3":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-9-2400-4":{"prize":20000,"cur":"BHD","bd":"12,000, 4000, 2400, 1600","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"100","tw":null,"name":null},"I-10-1000-0":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated (84 \u2013 100) (Horses Rated 101 & 102 may enter) 3YO & UP","entry":null,"tw":"62","name":"AL MANAMA CUP"},"I-10-1600-1":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated (84 \u2013 100) 3YO & UP","entry":null,"tw":"62","name":"AL JASRA CUP"},"I-10-1600-2":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"CLASS 1 \u2013 LISTED 3YO & UP - Weight for Age","entry":"400","tw":null,"name":"HH SH KHALID BIN HAMAD AL KHALIFA CUP"},"I-10-2000-3":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated (84 \u2013 100) (Horses Rated 101 & 102 may enter) 3YO & UP","entry":null,"tw":null,"name":"AL MUHARRAQ CUP"},"I-11-1000-0":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-11-1200-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-11-1400-2":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP RACE 4: (IMPORTED) BHD 2000 (1200, 400, 240, 160) 1200M(STR) Thursday For 24th horses ra","entry":"10","tw":"62","name":null},"I-11-2000-3":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"I-12-1000-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"40","tw":"62","name":null},"I-12-1200-1":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated (80 \u2013 100) (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"AL RIFFA CUP"},"I-12-1600-2":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated (80 \u2013 100) (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"AL SEEF CUP"},"I-12-2000-3":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"AL DANA CUP"},"I-13-1200-0":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP (FOR BAHRAINI APPRENTICE ONLY)","entry":"15","tw":"62","name":null},"I-13-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 70 (Horses Rated 71 & 72 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-13-1800-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"I-13-2400-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-14-1000-0":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1, 4YO & UP","entry":"400","tw":null,"name":"AL WASMIYA CUP"},"I-14-1400-1":{"prize":25000,"cur":"US$","bd":"15,000, 5000, 3000, 2000","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 4YO & UP","entry":"125","tw":null,"name":"SOUTHERN GOVERNORATE CUP"},"I-14-1800-2":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"CLASS 1 \u2013 LISTED, 4YO & UP - Weight for Age","entry":"400","tw":null,"name":"AL ADIYAT CUP"},"I-14-2000-3":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"horses rated 0 \u2013 85 (Horses Rated 86 & 87 may enter) 3YO & UP","entry":"40","tw":"62","name":null},"I-15-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-15-1200-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO","entry":"10","tw":null,"name":null},"I-15-1400-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age (FOR BAHRAINI APPRENTICE ONLY)","entry":"10","tw":null,"name":null},"I-15-1600-3":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-15-2200-4":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 80 (Horses Rated 81 & 82 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-16-1200-0":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"THE HAWAR CUP"},"I-16-1600-1":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"BAHRAIN BAY CUP"},"I-16-2000-2":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"THE ANCHORMAN CUP"},"I-16-2400-3":{"prize":12000,"cur":"US$","bd":"7200, 2400, 1440, 960","elig":"Open Handicap 3YO & UP- Weight for Age","entry":"60","tw":"62","name":null},"I-17-1000-0":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"horses rated 0 \u2013 80 (Horses Rated 81 & 82 may enter) 3YO & UP","entry":"70","tw":"62","name":null},"I-17-1200-1":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"70","tw":null,"name":null},"I-17-1600-2":{"prize":50000,"cur":"US$","bd":"30,000, 10,000, 6000, 4000","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 4YO & UP","entry":"250","tw":null,"name":"BAHRAIN MILE CUP"},"I-17-2000-3":{"prize":200000,"cur":"US$","bd":"120,000, 40,000, 20,000, 12,000, 8000","elig":"CLASS 1 \u2013 GROUP 3 4YO & UP - Weight for Age","entry":"1000","tw":null,"name":null},"I-18-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 70 (Horses Rated 71 & 72 may enter) 3YO & UP (FOR BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"62","name":null},"I-18-1600-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76& 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-18-2000-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"I-18-2400-3":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 85 (Horses Rated 86& 87 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-19-1200-0":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 85 (Horses Rated 86 & 87 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-19-2000-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-19-2200-3":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"horses rated 0 \u2013 95 (Horses Rated 96& 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-20-1000-0":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"AL SAKHIR CUP"},"I-20-1400-1":{"prize":30000,"cur":"US$","bd":"18,000, 6000, 3600, 2400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 4YO & UP","entry":"150","tw":null,"name":"HH SH SHEEMA BINT NASSER BIN HAMAD AL KHALIFA CUP"},"I-20-1800-2":{"prize":80000,"cur":"US$","bd":"48,000, 16,000, 8000, 4800, 3200","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"BAHRAIN VISION CUP"},"I-20-2200-3":{"prize":135000,"cur":"US$","bd":"81,000, 27,000, 16,200, 10,800","elig":"CLASS 1 \u2013 LISTED 4YO & UP - Weight for Age","entry":"675","tw":null,"name":"HH SH NASSER BIN HAMAD AL KHALIFA CUP (SPONSORED BY BAPCO ENERGIES)"},"I-21-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-21-1200-1":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"I-21-1400-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-21-2400-4":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-22-1200-0":{"prize":100000,"cur":"US$","bd":"60,000, 20,000, 10,000, 6000, 4000","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"AL FATEH CUP"},"I-22-1400-1":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"MAIDENS 3YO & UP - Weight for Age","entry":"40","tw":"58","name":null},"I-22-1600-2":{"prize":100000,"cur":"US$","bd":"60,000, 20,000, 10,000, 6000, 4000","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"GOLDEN JUBILEE CUP"},"I-22-2000-3":{"prize":100000,"cur":"US$","bd":"60,000, 20,000, 10,000, 6000, 4000","elig":"horses rated 80 \u2013 100 (Horses Rated 101 & 102 may enter) 4YO & UP","entry":null,"tw":"62","name":"THE INTERNATIONAL HANDICAP"},"I-23-1000-0":{"prize":50000,"cur":"US$","bd":"30,000, 10,000, 6000, 4000","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 4YO & UP","entry":"250","tw":null,"name":"THE CHAIRMAN\u2019S CUP"},"I-23-1600-1":{"prize":120000,"cur":"US$","bd":"72,000, 24,000, 12,000, 7200, 4800","elig":"CLASS 1 \u2013 LISTED 4YO & UP","entry":"600","tw":null,"name":"AL METHAQ MILE"},"I-23-2000-2":{"prize":16000,"cur":"US$","bd":"9600, 3200, 1920, 1280","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"80","tw":"62","name":null},"I-23-2400-3":{"prize":400000,"cur":"US$","bd":"240,000, 80,000, 40,000, 24,000, 16,000","elig":"CLASS 1 \u2013 GROUP 3 4YO & UP - Weight for Age","entry":"2000","tw":null,"name":null},"I-24-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"62","name":null},"I-24-1400-1":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 85 (Horses Rated 86 & 87 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-24-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"I-24-2200-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-25-1200-0":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":"62","name":null},"I-25-1600-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP (BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"62","name":null},"I-25-1800-2":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"horses rated 0 \u2013 95 (Horses Rated 96 & 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-25-2400-3":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 90 (Horses Rated 91 & 92 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-26-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-26-1400-1":{"prize":10000,"cur":"BHD","bd":"6000, 2000, 1200, 800","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"50","tw":null,"name":null},"I-26-1600-2":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"Maidens","entry":null,"tw":null,"name":null},"I-26-2000-3":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"I-27-1200-0":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"horses rated 0 \u2013 95 (Horses Rated 96 & 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-27-1600-1":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"horses rated 0 \u2013 95 (Horses Rated 96 & 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-27-2200-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 65 (Horses Rated 66 & 67 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-28-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 65 (Horses Rated 66 & 67 may enter) 3YO & UP (BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"62","name":null},"I-28-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76 & 77 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"I-28-1800-2":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"horses rated 0 \u2013 85 (Horses Rated 86 & 87 may enter) 3YO & UP","entry":"15","tw":"62","name":null},"I-29-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"62","name":null},"I-29-2200-2":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"horses rated 0 \u2013 95 (Horses Rated 96 & 97 may enter) 3YO & UP","entry":"20","tw":"62","name":null},"I-30-1200-0":{"prize":15000,"cur":"BHD","bd":"9000, 3000, 1800, 1200","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"75","tw":null,"name":"CHAMPIONS SPRINT CUP"},"I-30-1600-1":{"prize":15000,"cur":"BHD","bd":"9000, 3000, 1800, 1200","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"75","tw":null,"name":"REHC MILE CUP"},"I-30-2000-2":{"prize":15000,"cur":"BHD","bd":"9000, 3000, 1800, 1200","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"75","tw":null,"name":"BAHRAIN GOLD CUP"},"I-30-2400-3":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":"STEWARDS CUP"},"B-1-1200-0":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"ALL CLASSES & MAIDENS 3YO & UP - Weight for Age","entry":"15","tw":"62","name":null},"B-1-1600-1":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"MAIDENS 3YO & UP - Weight for Age","entry":"25","tw":"58","name":"LATE HH SH RASHID BIN ISA AL KHALIFA (OPENING DAY CUP)"},"B-1-1800-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-2-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41 & 42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-2-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS (FILLIES &MARES ONLY) 3YO & UP - Weight for Age","entry":"10","tw":"58","name":null},"B-2-2200-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 45 (Horses Rated 46 & 47 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-3-1000-0":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"horses rated 0 \u2013 60 (Horses Rated 61 & 62 may enter) 3YO & UP","entry":"70","tw":"62","name":null},"B-3-1400-1":{"prize":16000,"cur":"US$","bd":"9600, 3200, 1920, 1280","elig":"ALL CLASSES & MAIDENS 3YO & UP - Weight for Age","entry":"80","tw":null,"name":null},"B-3-1800-2":{"prize":40000,"cur":"US$","bd":"24,000, 8000, 4800, 3200","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"200","tw":"62","name":null},"B-4-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41 & 42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-4-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 45 (Horses Rated 46 & 47 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-4-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"B-4-1600-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 &37 may enter) 3YO & UP (FOR BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"62","name":null},"B-5-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"62","name":null},"B-5-1600-1":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"B-5-2200-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 -60 (Horses Rated 61 & 62 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-6-1200-0":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"B-6-1800-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"58","name":null},"B-6-2000-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41 & 42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-7-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"58","name":null},"B-7-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-7-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 55 (Horses Rated 56 & 57 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-7-2000-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"B-8-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 45 (Horses Rated 46 & 47 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-8-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age (FOR BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"62","name":null},"B-8-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41& 42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-8-2200-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 50 (Horses Rated 51 & 52 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-9-1600-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS (FILLIES &MARES ONLY) 4YO & UP - Weight for Age","entry":"10","tw":"58","name":null},"B-9-1800-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"10","tw":"61","name":null},"B-10-1000-0":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"70","tw":null,"name":null},"B-10-1400-1":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"horses rated 0 \u2013 65 (Horses Rated 66 & 67 may enter) 3YO & UP","entry":"40","tw":"62","name":null},"B-10-2000-2":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"70","tw":null,"name":null},"B-11-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS (FILLIES & MARES ONLY) 4YO & UP - Weight for Age","entry":"10","tw":"58","name":null},"B-11-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-11-1800-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 45 (Horses Rated 46 & 47 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-12-1000-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"40","tw":"62","name":null},"B-12-1800-1":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 (4 Years Only)","entry":null,"tw":null,"name":null},"B-12-1800-2":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 (4 Years Only) (Fillies Only)","entry":"70","tw":null,"name":null},"B-12-2000-3":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"MAIDENS 4YO & UP - Weight for Age","entry":"40","tw":"58","name":null},"B-12-2000-4":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"ALL CLASSES & MAIDENS 5YO& UP - Weight for Age","entry":"40","tw":null,"name":null},"B-13-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-13-1200-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS 3YO ONLY","entry":"10","tw":"58","name":null},"B-13-2200-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-14-1200-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"40","tw":"62","name":null},"B-14-1600-1":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"40","tw":"61","name":"AL ADIYAT BAHRAIN BRED CUP"},"B-14-2400-2":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"horses rated 0 \u2013 45 (Horses Rated 46 & 47 may enter) 3YO & UP","entry":"40","tw":"62","name":null},"B-15-1400-0":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"B-15-2000-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 &37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-15-2200-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 60 (Horses Rated 61 &62 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-16-1000-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"horses rated 0 \u2013 55 (Horses Rated 56 &57 may enter) 3YO & UP","entry":"40","tw":"62","name":null},"B-16-1400-1":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 3YO & UP","entry":"40","tw":null,"name":null},"B-16-1800-2":{"prize":20000,"cur":"US$","bd":"12,000, 4000, 2400, 1600","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 4YO ONLY (FILLIES ONLY)","entry":"100","tw":null,"name":"BAHRAIN OAKS (SPONSORED BY AL MUZDAHER STUD)"},"B-16-2200-3":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"horses rated 0 \u2013 50 (Horses Rated 51 &52 may enter) 3YO & UP","entry":"40","tw":"62","name":null},"B-17-1000-0":{"prize":30000,"cur":"US$","bd":"18,000, 6000, 3600, 2400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"150","tw":"62","name":null},"B-17-2000-1":{"prize":30000,"cur":"US$","bd":"18,000, 6000, 3600, 2400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 4YO ONLY (Colts- Geldings- Fillies)","entry":"150","tw":null,"name":"BAHRAIN DERBY"},"B-17-2000-2":{"prize":40000,"cur":"US$","bd":"24,000, 8000, 4800, 3200","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"200","tw":null,"name":null},"B-18-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS 3YO ONLY","entry":"10","tw":"58","name":null},"B-18-1200-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 75 (Horses Rated 76& 77 may enter) 3YO & UP Friday 5th February","entry":"10","tw":"62","name":null},"B-18-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 60 (Horses Rated 61 & 62 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-18-2000-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41 &42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-19-1400-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 45 (Horses Rated 46 &47 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-19-1800-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS 4YO & UP - Weight for Age (FOR BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"58","name":null},"B-19-2200-2":{"prize":5000,"cur":"BHD","bd":"3000, 1000, 600, 400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"25","tw":null,"name":null},"B-20-1200-0":{"prize":12000,"cur":"US$","bd":"7200, 2400, 1440, 960","elig":"Open Handicap 3YO & UP- Weight for Age","entry":"60","tw":"62","name":null},"B-20-1600-2":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"MAIDENS 4YO & UP - Weight for Age","entry":"40","tw":"58","name":null},"B-20-1600-3":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"70","tw":null,"name":null},"B-21-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 45 (Horses Rated 46 & 47 may enter) 3YO & UP (FOR BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"62","name":null},"B-21-2200-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-22-1000-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"horses rated 0 \u2013 40 (Horses Rated 41 & 42 may enter) 3YO & UP","entry":"40","tw":"62","name":null},"B-22-1200-1":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"40","tw":"62","name":null},"B-22-1800-2":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"horses rated 0 \u2013 55 (Horses Rated 56 & 57 may enter) 3YO & UP","entry":"40","tw":"62","name":null},"B-23-1400-0":{"prize":55000,"cur":"US$","bd":"33,000, 11,000, 6600, 4400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 3YO & UP - Weight for Age","entry":"275","tw":null,"name":null},"B-23-1600-1":{"prize":16000,"cur":"US$","bd":"9600, 3200, 1920, 1280","elig":"4th CLASS & MAIDENS 3YO & UP - Weight for Age","entry":"80","tw":"61","name":null},"B-23-2400-2":{"prize":55000,"cur":"US$","bd":"33,000, 11,000, 6600, 4400","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"275","tw":null,"name":null},"B-24-1000-0":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"3rd, 4th CLASS & MAIDENS 3YO ONLY","entry":"20","tw":null,"name":"FUTURE STARS SPRINT LEG 1"},"B-24-1400-1":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"3rd, 4th CLASS & MAIDENS 3YO ONLY","entry":"20","tw":null,"name":"FUTURE STARS CHAMPIONS LEG 1"},"B-25-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 65 (Horses Rated 66 &67 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-25-1200-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 &37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-25-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"58","name":null},"B-25-2200-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 60 (Horses Rated 61 &62 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-26-1200-0":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"4th CLASS & MAIDENS 3YO ONLY","entry":"20","tw":null,"name":"FUTURE STARS SPRINT LEG 2"},"B-26-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41 & 42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-26-1600-2":{"prize":4000,"cur":"BHD","bd":"2400, 800, 480, 320","elig":"4th CLASS & MAIDENS 3YO ONLY","entry":"20","tw":null,"name":"FUTURE STARS CHAMPIONS LEG 2"},"B-26-1600-3":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"Open Handicap 3YO & UP- Weight for Age","entry":"15","tw":"62","name":null},"B-27-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41 & 42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-27-1200-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"62","name":null},"B-27-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-27-2000-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 55 (Horses Rated 56 & 57 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-27-2400-4":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 40 (Horses Rated 41 & 42 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-28-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 55 (Horses Rated 56 & 57 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-28-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"58","name":null},"B-28-1600-2":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 50 (Horses Rated 51 & 52 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-28-2000-3":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-29-1000-0":{"prize":8000,"cur":"BHD","bd":"4800, 1600, 960, 640","elig":"ALL CLASSES & MAIDENS 3YO ONLY","entry":"40","tw":null,"name":"FUTURE STARS SPRINT CUP"},"B-29-1000-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 35 (Horses Rated 36 & 37 may enter) 3YO & UP (BAHRAINI APPRENTICE ONLY)","entry":"10","tw":"62","name":null},"B-29-1200-2":{"prize":3000,"cur":"BHD","bd":"1800, 600, 360, 240","elig":"ALL CLASSES & MAIDENS 3YO ONLY (FILLIES ONLY)","entry":"15","tw":null,"name":null},"B-29-1600-3":{"prize":8000,"cur":"BHD","bd":"4800, 1600, 960, 640","elig":"ALL CLASSES & MAIDENS 3YO ONLY","entry":"40","tw":null,"name":"FUTURE STARS CHAMPIONS CUP"},"B-29-2200-4":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 55 (Horses Rated 56 & 57 may enter) 3YO & UP","entry":"10","tw":"62","name":null},"B-30-1200-0":{"prize":10000,"cur":"BHD","bd":"6000, 2000, 1200, 800","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"50","tw":null,"name":null},"B-30-1400-1":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"horses rated 0 \u2013 55 (Horses Rated 56 & 57 may enter) 4YO & UP","entry":"10","tw":"62","name":null},"B-30-1600-2":{"prize":10000,"cur":"BHD","bd":"6000, 2000, 1200, 800","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"50","tw":null,"name":null},"B-30-2000-3":{"prize":10000,"cur":"BHD","bd":"6000, 2000, 1200, 800","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 3YO & UP - Weight for Age","entry":"50","tw":null,"name":"OWNERS CUP"},"W-1-1200-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"57","name":null},"W-2-1000-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"MAIDENS (4 & 5 Years Only) - Weight for Age","entry":"7.5","tw":"57","name":null},"W-3-1200-0":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"2nd, 3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"70","tw":"58","name":null},"W-4-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"57","name":null},"W-5-1400-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-6-1400-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"2nd, 3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-7-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"MAIDENS (4 & 5 Years Only) - Weight for Age","entry":"7.5","tw":"57","name":null},"W-8-1400-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-9-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"10","tw":"57","name":null},"W-10-1600-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"ALL CLASSES & MAIDENS 4YO & UP- Weight for Age","entry":"40","tw":"58","name":null},"W-11-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"MAIDENS (FILLIES & MARES ONLY) - Weight for Age","entry":"7.5","tw":"57","name":null},"W-12-1200-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"40","tw":"57","name":null},"W-13-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-14-1400-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"ALL CLASSES & MAIDENS 4YO & UP- Weight for Age","entry":"40","tw":"59","name":null},"W-15-1400-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-16-1000-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"4th CLASS & MAIDENS 4YO & UP","entry":"40","tw":"57","name":null},"W-17-1400-0":{"prize":14000,"cur":"US$","bd":"8400, 2800, 1680, 1120","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 4YO & UP - Weight for Age","entry":"70","tw":null,"name":null},"W-18-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":"FATEES AL HAJERI CUP"},"W-19-1000-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":"SAFRA CUP"},"W-20-1600-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"CLASS 1 \u2013 DOMESTIC GRADE 2 4YO & UP - Weight for Age","entry":"40","tw":null,"name":null},"W-21-1000-0":{"prize":2000,"cur":"BHD","bd":"1200, 400, 240, 160","elig":"MAIDENS (4 & 5 Years Only) - Weight for Age","entry":"10","tw":"57","name":null},"W-22-1400-0":{"prize":8000,"cur":"US$","bd":"4800, 1600, 960, 640","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"40","tw":"58","name":null},"W-23-1600-0":{"prize":20000,"cur":"US$","bd":"12,000, 4000, 2400, 1600","elig":"CLASS 1 \u2013 DOMESTIC GRADE 1 4YO & UP - Weight for Age","entry":"100","tw":null,"name":null},"W-24-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS (FILLIES & MARES ONLY) 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-25-1400-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"2nd, 3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-26-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"MAIDENS (4 & 5 Years Only) - Weight for Age","entry":"7.5","tw":"57","name":null},"W-27-1600-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"ALL CLASSES & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":"AL ROUDA CUP"},"W-28-1400-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-29-1200-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null},"W-30-1400-0":{"prize":1500,"cur":"BHD","bd":"900, 300, 180, 120","elig":"3rd, 4th CLASS & MAIDENS 4YO & UP - Weight for Age","entry":"7.5","tw":"58","name":null}};
// Helper: fetch conditions for a race object.
function raceConditions(race) { return CONDITIONS[race.id] || null; }


// =================================================================
// MEETING METADATA — festivals, day types, Ramadan, series
// =================================================================
// Feature days / festivals. A festival can span more than one meeting.
// Keyed by meeting number → { label, festival? } where festival groups
// multiple meetings under one banner.
const FEATURE_DAYS = {
  3:  { label: 'Bahrain International Trophy', kind: 'international' },
  16: { label: "Crown Prince's Cup Festival", kind: 'crown', festival: 'crown' },
  17: { label: "Crown Prince's Cup Festival", kind: 'crown', festival: 'crown' },
  22: { label: "King's Cup Festival", kind: 'kings', festival: 'kings' },
  23: { label: "King's Cup Festival", kind: 'kings', festival: 'kings' }
};

// Ramadan 2027 falls mid-season (the purple band in the official programme,
// Meetings 19–23, 11 Feb – 5 Mar 2027). These run under Ramadan timings.
// Within this block the Thursday fixtures are 19, 20, 21 & 22 (M23 is a Friday).
const RAMADAN_MEETINGS = [19, 20, 21, 22, 23];
const RAMADAN_THURSDAY_MEETINGS = [19, 20, 21, 22];

// Special series days from the Bahrain Bred programme legend.
//   Champions Day (green) · Future Champions Day (brown) · Future Stars (blue)
// Keyed by meeting number → series key.
const SERIES_DAYS = {
  24: 'futureStars',       // Challenge Series heats
  26: 'futureStars',       // Challenge Series heats
  29: 'futureChampions',   // Series Finals
  30: 'champions'          // Season finale — Champions Day
};
const SERIES_META = {
  champions:       { label: 'Champions Day',        color: '#2E8B57', tagline: 'Season finale' },        // green
  futureChampions: { label: 'Future Champions Day', color: '#9C4A2C', tagline: 'Series finals' },         // brown/rust
  futureStars:     { label: 'Future Stars',         color: '#2F6FB0', tagline: 'Challenge Series' }       // blue
};
function seriesInfo(meetingNumbers) {
  if (!meetingNumbers) return null;
  for (const n of meetingNumbers) {
    if (SERIES_DAYS[n]) return SERIES_META[SERIES_DAYS[n]];
  }
  return null;
}

// Returns the feature-day descriptor for a race day, or null.
function featureDayInfo(meetingNumbers) {
  if (!meetingNumbers) return null;
  for (const n of meetingNumbers) {
    if (FEATURE_DAYS[n]) return FEATURE_DAYS[n];
  }
  return null;
}
// Back-compat: just the label string.
function featureDayLabel(meetingNumbers) {
  const info = featureDayInfo(meetingNumbers);
  return info ? info.label : null;
}
// Is any meeting on this day within the Ramadan block?
function isRamadanMeeting(meetingNumbers) {
  if (!meetingNumbers) return false;
  return meetingNumbers.some(n => RAMADAN_MEETINGS.includes(n));
}
// Is this specifically a Ramadan Thursday fixture?
function isRamadanThursday(meetingNumbers) {
  if (!meetingNumbers) return false;
  return meetingNumbers.some(n => RAMADAN_THURSDAY_MEETINGS.includes(n));
}
// Does this day include any Turf Series race?
function hasTurfSeries(races) {
  if (!races) return false;
  return races.some(r => /turf series/i.test(r.text));
}
// Day-of-week type from an ISO date → 'thu' | 'fri' | 'sat' | 'other'
function dayType(iso) {
  const wd = new Date(iso + 'T00:00:00').getDay(); // 0=Sun..6=Sat
  if (wd === 4) return 'thu';
  if (wd === 5) return 'fri';
  if (wd === 6) return 'sat';
  return 'other';
}
// Colour + short label for each day type (mirrors the official programme legend).
const DAY_TYPE_META = {
  thu: { label: 'Thursday', color: '#2F6FB0' },
  fri: { label: 'Friday',   color: '#E0A21A' },
  sat: { label: 'Saturday', color: '#D2463A' },
  other: { label: '', color: '#8A857C' }
};


// =================================================================
// MOCK ENTRIES & RESULTS DATA
// In production these would come from an API / database.
// Keys are race IDs (programme-meeting-distance-index).
// =================================================================
const MOCK_TRAINERS = ['F. Al Khalifa', 'A. Al Sabah', 'M. Al Mansouri', 'H. Bin Huzaim', 'S. Khalifa', 'Y. Al Rumaihi', 'N. Al Maktoum'];
const MOCK_JOCKEYS = ['L. Steward', 'A. Al Balushi', 'C. Lemaire', 'P. Cosgrave', 'R. Hornby', 'O. Murphy', 'F. Berry', 'T. Marquand', 'A. Atzeni'];
const MOCK_OWNERS = ['REHC Racing', 'Al Adiyat Racing', 'KHK Racing', 'Victorious Racing', 'Bahrain Racing Club', 'Al Mohamediya Racing', 'Yas Racing'];
const MOCK_HORSE_NAMES = ['Sakhir Star', 'Pearl of Manama', 'Desert Falcon', 'Riffa Dream', 'Adliya Spirit', 'Golden Hawar', 'Awal Thunder', 'Muharraq Prince', 'Royal Standard', 'Bahrain Glory', 'Saar Lightning', 'Tubli Bay', 'Janabiya Rose', 'Coral Coast', 'Arabian Knight', 'Hidd Hero', 'Budaiya Breeze', 'Jasra Storm', 'Bilad Al Qadeem', 'Sitra Sands'];

// Deterministic pseudo-random based on string hash — so same race always gets same field
function seededRand(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  return function() {
    h = Math.imul(48271, h) | 0;
    return Math.abs(h) / 2147483647;
  };
}

function generateMockField(raceId, fieldSize) {
  const rand = seededRand(raceId);
  const size = fieldSize || (5 + Math.floor(rand() * 10));
  const horses = [];
  const usedNames = new Set();
  for (let i = 0; i < size; i++) {
    let name;
    let attempt = 0;
    do {
      name = MOCK_HORSE_NAMES[Math.floor(rand() * MOCK_HORSE_NAMES.length)];
      attempt++;
    } while (usedNames.has(name) && attempt < 30);
    if (usedNames.has(name)) name = name + ' II';
    usedNames.add(name);
    horses.push({
      draw: i + 1,
      number: i + 1,
      horse: name,
      age: 3 + Math.floor(rand() * 5),
      weight: (54 + rand() * 8).toFixed(1),
      jockey: MOCK_JOCKEYS[Math.floor(rand() * MOCK_JOCKEYS.length)],
      trainer: MOCK_TRAINERS[Math.floor(rand() * MOCK_TRAINERS.length)],
      owner: MOCK_OWNERS[Math.floor(rand() * MOCK_OWNERS.length)],
      rating: 50 + Math.floor(rand() * 45),
      sp: rand() < 0.3 ? (2 + Math.floor(rand() * 8)) + '/1' : null
    });
  }
  return horses;
}

function generateMockResult(raceId, fieldSize) {
  const field = generateMockField(raceId, fieldSize);
  const rand = seededRand(raceId + '-result');
  // Shuffle for finishing positions
  const finishers = [...field].sort(() => rand() - 0.5);
  return {
    finishers: finishers.map((h, i) => ({
      position: i + 1,
      ...h,
      margin: i === 0 ? null : (i === 1 ? (rand() * 2).toFixed(2) + ' L' : (rand() * 4 + 0.5).toFixed(2) + ' L'),
      time: i === 0 ? Math.floor(rand() * 30 + 60) + ':' + (rand() * 60).toFixed(2).padStart(5, '0') : null
    })),
    winningTime: (60 + rand() * 90).toFixed(2) + 's',
    going: ['Good', 'Good to Firm', 'Firm', 'Soft'][Math.floor(rand() * 4)],
    weather: ['Sunny', 'Clear', 'Overcast', 'Light Breeze'][Math.floor(rand() * 4)],
    photo: rand() < 0.2,
    stewards: rand() < 0.15 ? 'Stewards enquiry — no change' : null
  };
}

// Race lifecycle status based on date vs. today
function getRaceStatus(raceDateIso, todayIso) {
  const raceDate = new Date(raceDateIso + 'T00:00:00');
  const today = new Date(todayIso + 'T00:00:00');
  const daysOut = Math.round((raceDate - today) / 86400000);
  if (daysOut < 0) return 'concluded';
  if (daysOut === 0) return 'raceday';
  if (daysOut <= 2) return 'declared';
  if (daysOut <= 7) return 'entries-closed';
  if (daysOut <= 21) return 'entries-open';
  return 'scheduled';
}

// Build a Bahrain Turf Club URL for a race.
// We don't know the precise race number on the BTC card, so we link to the
// day's racecard listing (which shows all races on that date). The "view"
// argument selects whether the user sees entries or results on landing.
function btcUrlForRace(race, todayIso) {
  // All "View on BTC" buttons link to the Bahrain Turf Club homepage.
  return 'https://bahrainturfclub.com';
}

function btcUrlLabel(race, todayIso) {
  const status = getRaceStatus(race.date, todayIso);
  if (status === 'concluded') return 'View results on BTC';
  if (status === 'raceday') return 'Live on BTC';
  if (status === 'declared' || status === 'entries-closed') return 'View declarations on BTC';
  if (status === 'entries-open') return 'View entries on BTC';
  return 'View racecard on BTC';
}

// =================================================================
// TOKENS
// =================================================================
const C = {
  cream: '#F0EADC',
  parchment: '#F6F0E2',
  paper: '#FCFAF3',
  forest: '#16271C',
  forestSoft: 'rgba(226,216,194,0.9)',
  forestDim: 'rgba(22,39,28,0.55)',
  ivory: '#F5F0E4',
  gold: '#B08D4F',
  goldSoft: '#EFE4CC',
  line: '#E4DAC5',
  burgundy: '#6B2737',
  rust: '#9C4A2C',
  green: '#0B223E'
};

const ACCENTS = {
  gold:     { bg: '#C8A35C', fg: '#1A2E20', soft: 'rgba(200,163,92,0.18)' },
  burgundy: { bg: '#6B2737', fg: '#F2EBDC', soft: 'rgba(107,39,55,0.13)' },
  green:    { bg: '#0B223E', fg: '#F2EBDC', soft: 'rgba(11,34,62,0.14)' },
  sage:     { bg: '#7B8A6E', fg: '#F2EBDC', soft: 'rgba(123,138,110,0.20)' },
  teal:     { bg: '#3B6B6B', fg: '#F2EBDC', soft: 'rgba(59,107,107,0.16)' },
  amber:    { bg: '#B5763E', fg: '#F2EBDC', soft: 'rgba(181,118,62,0.16)' },
  rust:     { bg: '#9C4A2C', fg: '#F2EBDC', soft: 'rgba(156,74,44,0.16)' },
  slate:    { bg: '#4A5568', fg: '#F2EBDC', soft: 'rgba(74,85,104,0.16)' },
  sand:     { bg: '#A89370', fg: '#1A2E20', soft: 'rgba(168,147,112,0.22)' },
  olive:    { bg: '#6B7548', fg: '#F2EBDC', soft: 'rgba(107,117,72,0.16)' },
  gray:     { bg: '#8A857C', fg: '#F2EBDC', soft: 'rgba(138,133,124,0.16)' }
};

const FONT_DISPLAY = "'Fraunces', Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";
const FONT_MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

// Programme metadata: colour, short label, sort order
const PROGRAMME_META = {
  'Imported':     { color: '#0B223E', short: 'IMP',  order: 1 },
  'Bahrain Bred': { color: '#9C4A2C', short: 'BB',   order: 2 },
  'WAHO':         { color: '#3B6B6B', short: 'WAHO', order: 3 }
};
function progColor(p) { return PROGRAMME_META[p]?.color || '#8A857C'; }
function progShort(p) { return PROGRAMME_META[p]?.short || p; }
function progOrder(p) { return PROGRAMME_META[p]?.order || 99; }

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function fmtFull(iso) {
  const d = new Date(iso + 'T00:00:00');
  return String(d.getDate()).padStart(2,'0') + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
}
function fmtShort(iso) {
  const d = new Date(iso + 'T00:00:00');
  return String(d.getDate()).padStart(2,'0') + ' ' + MONTHS[d.getMonth()];
}
function dayOfWeek(iso) {
  return DAYS[new Date(iso + 'T00:00:00').getDay()];
}
function daysBetween(a, b) {
  return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
}

// =================================================================
// EXPORTS
// =================================================================
function escapeCsv(value) {
  if (value == null) return '';
  const s = String(value);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function exportCSV(rows) {
  const headers = ['Programme','Meeting','Date','Day','Distance (m)','Race','Type','Field Size'];
  const lines = [headers.join(',')];
  rows.forEach(r => {
    lines.push([
      escapeCsv(r.programme), r.meeting, r.date, dayOfWeek(r.date),
      r.distance, escapeCsv(r.text), escapeCsv(r.category), r.field == null ? '' : r.field
    ].join(','));
  });
  downloadFile('\ufeff' + lines.join('\r\n'), 'rehc-2026-27.csv', 'text/csv;charset=utf-8;');
}
function exportICS() {
  const meetings = new Map();
  RACES.forEach(r => {
    const k = r.programme + '|' + r.meeting + '|' + r.date;
    if (!meetings.has(k)) meetings.set(k, { programme: r.programme, meeting: r.meeting, date: r.date, races: [] });
    meetings.get(k).races.push(r);
  });
  const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//REHC//Race Programme 2026-27//EN','CALSCALE:GREGORIAN'];
  [...meetings.values()].forEach(m => {
    const dateKey = m.date.replace(/-/g, '');
    const next = new Date(m.date + 'T00:00:00');
    next.setDate(next.getDate() + 1);
    const endKey = next.toISOString().slice(0,10).replace(/-/g, '');
    const desc = m.races.map(r => r.distance + 'm — ' + r.text + (r.field ? ' (' + r.field + ' runners)' : '')).join('\\n');
    lines.push(
      'BEGIN:VEVENT',
      'UID:rehc-' + m.programme.replace(/\s/g,'') + '-' + m.meeting + '-' + m.date + '@rehc.bh',
      'DTSTART;VALUE=DATE:' + dateKey,
      'DTEND;VALUE=DATE:' + endKey,
      'SUMMARY:REHC Meeting ' + m.meeting + ' — ' + m.programme,
      'DESCRIPTION:' + desc,
      'LOCATION:Bahrain',
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  downloadFile(lines.join('\r\n'), 'rehc-2026-27.ics', 'text/calendar;charset=utf-8;');
}

// Lazy-load jsPDF from CDN — runs in any browser without npm install
function loadJsPDF() {
  if (typeof window === 'undefined') return Promise.reject('SSR');
  if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-jspdf]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.jspdf?.jsPDF));
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.setAttribute('data-jspdf', 'true');
    s.onload = () => {
      if (window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf.jsPDF);
      else reject(new Error('jsPDF failed to expose'));
    };
    s.onerror = () => reject(new Error('Failed to load jsPDF from CDN'));
    document.head.appendChild(s);
  });
}

async function exportPDF(rows) {
  let jsPDF;
  try {
    jsPDF = await loadJsPDF();
  } catch (e) {
    // Fallback: use browser print dialog (user can choose 'Save as PDF')
    window.print();
    return;
  }
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const M = 14; // margin
  let y = M;

  // ----- HEADER -----
  doc.setFillColor(11, 34, 62);
  doc.rect(0, 0, pageW, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('times', 'italic');
  doc.setFontSize(16);
  doc.text('REHC Race Programme', M, 11);
  doc.setFontSize(11);
  doc.setFont('times', 'normal');
  doc.text('2026 / 27 Season  ·  Bahrain', M, 17);
  doc.setFontSize(8);
  doc.setTextColor(200, 163, 92);
  doc.text(rows.length + ' races  ·  ' + (new Set(rows.map(function(r){return r.date}))).size + ' race days', pageW - M, 11, { align: 'right' });
  doc.setTextColor(255, 255, 255);
  doc.text('Generated ' + new Date().toLocaleDateString('en-GB'), pageW - M, 17, { align: 'right' });
  y = 30;

  // ----- GROUP BY DATE -----
  const byDate = new Map();
  rows.forEach(function(r){
    if (!byDate.has(r.date)) byDate.set(r.date, []);
    byDate.get(r.date).push(r);
  });
  const dates = [...byDate.keys()].sort();

  doc.setTextColor(26, 46, 32);

  function ensureRoom(needed) {
    if (y + needed > pageH - 18) {
      // footer
      doc.setFontSize(7);
      doc.setTextColor(140, 140, 140);
      doc.setFont('helvetica', 'normal');
      doc.text('Rashid Equestrian & Horseracing Club  ·  Bahrain  ·  Est. 1977', M, pageH - 10);
      doc.text('Page ' + doc.internal.getNumberOfPages(), pageW - M, pageH - 10, { align: 'right' });
      doc.addPage();
      y = M;
      doc.setTextColor(26, 46, 32);
    }
  }

  dates.forEach(function(date){
    const races = byDate.get(date);
    const dateObj = new Date(date + 'T00:00:00');
    const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dateObj.getDay()];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const programmes = [...new Set(races.map(function(r){return r.programme}))].sort(function(a, b){ return progOrder(a) - progOrder(b); });

    ensureRoom(20 + races.length * 7);

    // Date header band
    doc.setFillColor(247, 241, 225);
    doc.rect(M, y, pageW - 2 * M, 9, 'F');
    doc.setDrawColor(200, 163, 92);
    doc.setLineWidth(0.6);
    doc.line(M, y, M, y + 9);
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(26, 46, 32);
    doc.text(dayName + ', ' + String(dateObj.getDate()).padStart(2,'0') + ' ' + months[dateObj.getMonth()] + ' ' + dateObj.getFullYear(), M + 2, y + 6.2);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(110, 110, 110);
    doc.text(programmes.join(' · '), pageW - M - 2, y + 6, { align: 'right' });
    y += 12;

    // Group races by programme within this date
    programmes.forEach(function(prog){
      const progRaces = races.filter(function(r){return r.programme === prog});
      // Programme sub-label
      const progColors = { 'Imported': [11,34,62], 'Bahrain Bred': [156,74,44], 'WAHO': [59,107,107] };
      const c = progColors[prog] || [100,100,100];
      doc.setTextColor(c[0], c[1], c[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(prog.toUpperCase(), M + 2, y);
      y += 4;

      // Races
      progRaces.forEach(function(r){
        ensureRoom(7);
        // Distance
        doc.setTextColor(26, 46, 32);
        doc.setFont('times', 'bold');
        doc.setFontSize(10);
        doc.text(String(r.distance) + 'm', M + 4, y);
        // Race text
        doc.setFont('times', 'normal');
        doc.setFontSize(9.5);
        const textLines = doc.splitTextToSize(r.text, pageW - 2 * M - 50);
        doc.text(textLines, M + 18, y);
        // Category & field
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(120, 120, 120);
        const meta = r.category + (r.field ? '  ·  ' + r.field + ' runners' : '');
        doc.text(meta, pageW - M - 2, y, { align: 'right' });
        y += Math.max(5.5, textLines.length * 4);
      });
      y += 1;
    });
    y += 3;
  });

  // ----- FOOTER on last page -----
  doc.setFontSize(7);
  doc.setTextColor(140, 140, 140);
  doc.setFont('helvetica', 'normal');
  doc.text('Rashid Equestrian & Horseracing Club  ·  Bahrain  ·  Est. 1977', M, pageH - 10);
  doc.text('Page ' + doc.internal.getNumberOfPages(), pageW - M, pageH - 10, { align: 'right' });
  doc.text('All races for 3 year olds and upwards except where stated  ·  ** Potential for tiered handicap', M, pageH - 6);

  doc.save('rehc-2026-27.pdf');
}


// =================================================================
// HOOKS
// =================================================================
function useViewport() {
  const [v, setV] = useState({ isMobile: false, isTablet: false });
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setV({ isMobile: w < 720, isTablet: w >= 720 && w < 1024 });
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return v;
}

// =================================================================
// COMPONENTS
// =================================================================
function Badge({ accent, children }) {
  const c = ACCENTS[accent] || ACCENTS.gray;
  return (
    <span style={{
      backgroundColor: c.soft, color: c.bg, border: '1px solid ' + c.bg,
      fontFamily: FONT_BODY, padding: '3px 8px', fontSize: '10px',
      fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      whiteSpace: 'nowrap', borderRadius: '2px', lineHeight: 1
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: c.bg }} />
      {children}
    </span>
  );
}

const LOGO_DATA_URL = "/rehc-logo.png";

function Crest({ size = 56 }) {
  return (
    <img
      src={LOGO_DATA_URL}
      alt="REHC crest"
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0, borderRadius: '50%' }}
    />
  );
}

function StatusPill({ date, todayIso }) {
  const diff = daysBetween(todayIso, date);
  if (diff < 0) {
    return <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(26,46,32,0.4)', fontWeight: 600 }}>Concluded</span>;
  }
  if (diff === 0) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', backgroundColor: C.burgundy, color: C.ivory, fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: FONT_BODY, borderRadius: '2px' }}>
        Race Day
      </span>
    );
  }
  if (diff <= 7) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: C.rust, fontWeight: 600, fontFamily: FONT_BODY }}>
        <Clock size={11} strokeWidth={2.2} />
        In {diff} {diff === 1 ? 'day' : 'days'}
      </span>
    );
  }
  return <span style={{ fontSize: '11px', color: 'rgba(26,46,32,0.55)', fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>In {diff} days</span>;
}

function StatCard({ label, value, sub, icon: Icon, accentColor, onClick, isActive }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', textAlign: 'left',
        backgroundColor: isActive ? C.paper : C.parchment,
        border: '1px solid ' + (isActive ? accentColor : C.forestSoft),
        borderRadius: '6px', padding: '18px 18px 16px', overflow: 'hidden',
        transition: 'all 0.2s ease', cursor: 'pointer', fontFamily: FONT_BODY,
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: isActive ? '0 6px 20px -8px ' + accentColor + '60' : (hover ? '0 4px 12px -6px rgba(26,46,32,0.18)' : 'none'),
        outline: 'none', width: '100%'
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: isActive ? '5px' : '3px', backgroundColor: accentColor, transition: 'width 0.2s ease' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.forestDim, fontWeight: 600 }}>{label}</span>
        {Icon && <Icon size={15} color={accentColor} strokeWidth={1.5} />}
      </div>
      <div style={{
        fontSize: 'clamp(2rem, 5vw, 2.5rem)', lineHeight: 0.95, color: C.forest,
        fontFamily: FONT_DISPLAY, fontWeight: 500, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em'
      }}>{value}</div>
      {sub && <div style={{ marginTop: '6px', fontSize: '11.5px', color: 'rgba(26,46,32,0.6)', lineHeight: 1.35 }}>{sub}</div>}
      {isActive && (
        <div style={{ marginTop: '8px', fontSize: '10px', color: accentColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ✓ Active filter
        </div>
      )}
    </button>
  );
}

function NextUpHero({ daysToNext, nextMeeting, isMobile, todayIso }) {
  if (!nextMeeting) return null;
  return (
    <div style={{
      position: 'relative', backgroundColor: '#0B223E', color: C.ivory,
      borderRadius: '4px', overflow: 'hidden',
      boxShadow: '0 8px 30px -12px rgba(11,34,62,0.45)'
    }}>
      <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,163,92,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '4px', background: 'linear-gradient(90deg, ' + C.gold + ' 0%, #A88842 50%, ' + C.gold + ' 100%)' }} />
      <div style={{
        padding: isMobile ? '24px 22px' : '32px 36px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
        gap: isMobile ? '20px' : '32px',
        alignItems: 'center', position: 'relative'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: C.gold, fontWeight: 700, marginBottom: '12px' }}>
            <span style={{ width: '20px', height: '1px', backgroundColor: C.gold }} />
            {featureDayLabel(nextMeeting.meetingNumbers) ? 'Next Up · Feature Day' : 'Next Up'}
            <span style={{ width: '20px', height: '1px', backgroundColor: C.gold }} />
          </div>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(242,235,220,0.6)', fontWeight: 600, marginBottom: '8px' }}>
            Meeting {nextMeeting.meetingNumbers.map(m => String(m).padStart(2,'0')).join(' / ')} · {nextMeeting.programmes.join(' + ')}
          </div>
          <h2 style={{
            margin: '0 0 14px 0',
            fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.4rem)' : 'clamp(2.2rem, 4vw, 3rem)',
            fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 500,
            lineHeight: 0.95, letterSpacing: '-0.01em'
          }}>
            {dayOfWeek(nextMeeting.date)},{' '}
            <span style={{ color: C.gold, fontStyle: 'normal', fontVariantNumeric: 'tabular-nums' }}>
              {fmtShort(nextMeeting.date)}
            </span>
          </h2>
        </div>
        <div style={{
          textAlign: isMobile ? 'left' : 'right',
          paddingLeft: isMobile ? 0 : '24px',
          borderLeft: isMobile ? 'none' : '1px solid rgba(200,163,92,0.25)',
          borderTop: isMobile ? '1px solid rgba(200,163,92,0.25)' : 'none',
          paddingTop: isMobile ? '16px' : 0
        }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(242,235,220,0.5)', fontWeight: 600, marginBottom: '4px' }}>
            Days to post
          </div>
          <div style={{
            fontSize: isMobile ? 'clamp(3.5rem, 20vw, 5rem)' : 'clamp(4.5rem, 7vw, 6rem)',
            lineHeight: 0.9, fontFamily: FONT_DISPLAY, fontWeight: 500,
            color: daysToNext === 0 ? C.gold : C.ivory,
            fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.04em'
          }}>
            {daysToNext === 0 ? '·' : String(daysToNext).padStart(2,'0')}
          </div>
          {daysToNext === 0 && <div style={{ fontSize: '14px', color: C.gold, fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 500 }}>Today</div>}
          <a
            href={btcUrlForRace({ date: nextMeeting.date }, todayIso || nextMeeting.date)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginTop: '14px',
              padding: '7px 12px',
              backgroundColor: 'rgba(200,163,92,0.15)',
              border: '1px solid ' + C.gold,
              borderRadius: '2px',
              color: C.gold,
              fontSize: '10.5px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: FONT_BODY, textDecoration: 'none',
              transition: 'background-color 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(200,163,92,0.28)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(200,163,92,0.15)'}
          >
            <ExternalLink size={11} strokeWidth={2} />
            {daysToNext === 0 ? 'Watch live on BTC' : 'View on BTC'}
          </a>
        </div>
      </div>
    </div>
  );
}

function MeetingCard({ raceDay, isOpen, onToggle, onRaceClick, todayIso, isMobile }) {
  const sortedByTier = [...raceDay.races].sort((a, b) => a.tier - b.tier);
  const featureInfo = featureDayInfo(raceDay.meetingNumbers);
  const isFeatureDay = !!featureInfo;
  const featureLabel = featureInfo ? featureInfo.label : null;
  const featureKind = featureInfo ? featureInfo.kind : null;
  const isRamadan = isRamadanMeeting(raceDay.meetingNumbers);
  const isRamadanThu = isRamadanThursday(raceDay.meetingNumbers);
  const turfSeriesDay = hasTurfSeries(raceDay.races);
  const series = seriesInfo(raceDay.meetingNumbers);
  const dt = dayType(raceDay.date);
  const dtMeta = DAY_TYPE_META[dt];

  // Ribbon colour scheme by festival kind.
  const ribbonScheme = featureKind === 'international'
    ? { bg: '#0B223E', fg: '#F2EBDC', icon: 'flag' }       // navy — International
    : featureKind === 'crown'
    ? { bg: '#6B2737', fg: '#F2EBDC', icon: 'crown' }       // burgundy — Crown Prince
    : featureKind === 'kings'
    ? { bg: '#C8A35C', fg: '#3A2E12', icon: 'crown' }       // gold — King's
    : { bg: C.gold, fg: '#3A2E12', icon: 'crown' };
  // Feature days always use a championship accent on the spine.
  const spineAccent = isFeatureDay ? { bg: ribbonScheme.bg, soft: 'rgba(200,163,92,0.12)' } : ACCENTS[sortedByTier[0].accent];
  const marquee = raceDay.races.find(r => r.tier <= 2);
  const hasBoth = raceDay.programmes.length > 1;

  // Group races by programme for the expanded view
  const racesByProgramme = useMemo(() => {
    const map = {};
    raceDay.races.forEach(r => {
      if (!map[r.programme]) map[r.programme] = [];
      map[r.programme].push(r);
    });
    return map;
  }, [raceDay.races]);

  return (
    <div style={{
      backgroundColor: isOpen ? C.paper : (isFeatureDay ? 'rgba(200,163,92,0.08)' : (series ? series.color + '0D' : C.parchment)),
      border: '1px solid ' + (isFeatureDay ? ribbonScheme.bg : (series ? series.color : (isOpen ? spineAccent.bg : C.forestSoft))),
      borderWidth: (isFeatureDay || series) ? '1.5px' : '1px',
      borderRadius: '6px', overflow: 'hidden',
      transition: 'all 0.25s ease',
      boxShadow: isOpen ? '0 4px 20px -8px rgba(26,46,32,0.15)' : (isFeatureDay ? '0 2px 14px -8px rgba(11,34,62,0.3)' : 'none')
    }}>
      {/* Feature / Festival ribbon */}
      {isFeatureDay && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: isMobile ? '6px 18px' : '7px 24px',
          backgroundColor: ribbonScheme.bg,
          color: ribbonScheme.fg
        }}>
          {ribbonScheme.icon === 'flag'
            ? <Flag size={13} strokeWidth={2} style={{ flexShrink: 0 }} />
            : <Crown size={13} strokeWidth={2} style={{ flexShrink: 0 }} />}
          <span style={{
            fontSize: '10px', fontWeight: 800, letterSpacing: '0.16em',
            textTransform: 'uppercase', fontFamily: FONT_BODY
          }}>
            {featureKind === 'international' ? 'Feature Day' : 'Festival'}
          </span>
          <span style={{
            fontSize: '11.5px', fontFamily: FONT_DISPLAY, fontStyle: 'italic',
            fontWeight: 600, marginLeft: '2px'
          }}>
            {featureLabel}
          </span>
        </div>
      )}
      {/* Ramadan ribbon (shows alongside festival ribbon when both apply) */}
      {isRamadan && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: isMobile ? '5px 18px' : '6px 24px',
          backgroundColor: '#7C5295',
          color: '#F2EBDC'
        }}>
          <Sparkles size={12} strokeWidth={2} style={{ flexShrink: 0 }} />
          <span style={{
            fontSize: '10px', fontWeight: 800, letterSpacing: '0.16em',
            textTransform: 'uppercase', fontFamily: FONT_BODY
          }}>
            {isRamadanThu ? 'Ramadan Meeting · Thursday' : 'Ramadan Meeting'}
          </span>
        </div>
      )}
      {/* Series ribbon — Champions Day / Future Champions Day / Future Stars */}
      {series && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: isMobile ? '6px 18px' : '7px 24px',
          backgroundColor: series.color,
          color: '#FFFFFF'
        }}>
          <Award size={13} strokeWidth={2} style={{ flexShrink: 0 }} />
          <span style={{
            fontSize: '10px', fontWeight: 800, letterSpacing: '0.16em',
            textTransform: 'uppercase', fontFamily: FONT_BODY
          }}>
            {series.label}
          </span>
          <span style={{
            fontSize: '11.5px', fontFamily: FONT_DISPLAY, fontStyle: 'italic',
            fontWeight: 600, marginLeft: '2px', color: 'rgba(255,255,255,0.85)'
          }}>
            {series.tagline}
          </span>
        </div>
      )}
      <button onClick={onToggle} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        padding: 0, display: 'block', textAlign: 'left'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'auto 1fr auto' : 'auto 1.6fr 1fr 1.6fr auto',
          gap: isMobile ? '14px' : '20px',
          padding: isMobile ? '16px 18px' : '18px 24px',
          alignItems: 'center'
        }}>
          {/* Big date as the primary identifier */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '3px', height: '52px', backgroundColor: spineAccent.bg, borderRadius: '2px' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: isMobile ? '28px' : '34px',
                fontFamily: FONT_DISPLAY, fontWeight: 600,
                fontVariantNumeric: 'tabular-nums', color: C.forest, lineHeight: 0.95,
                letterSpacing: '-0.01em'
              }}>
                {String(new Date(raceDay.date + 'T00:00:00').getDate()).padStart(2, '0')}
              </div>
              <div style={{
                fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em',
                color: C.forestDim, fontWeight: 700, marginTop: '2px'
              }}>
                {MONTHS[new Date(raceDay.date + 'T00:00:00').getMonth()]} {String(new Date(raceDay.date + 'T00:00:00').getFullYear()).slice(2)}
              </div>
            </div>
          </div>

          {/* Day + programme tags */}
          <div>
            <div style={{
              fontSize: isMobile ? '13px' : '14px',
              fontFamily: FONT_DISPLAY, fontStyle: 'italic',
              color: C.forest, lineHeight: 1.2, marginBottom: '6px',
              display: 'flex', alignItems: 'center', gap: '7px'
            }}>
              <span title={dtMeta.label} style={{
                width: '9px', height: '9px', borderRadius: '2px',
                backgroundColor: dtMeta.color, flexShrink: 0,
                border: dt === 'fri' ? '1px solid rgba(0,0,0,0.15)' : 'none'
              }} />
              <span>
                {dayOfWeek(raceDay.date)}
                {!isMobile && raceDay.meetingNumbers.length > 0 && (
                  <span style={{ color: 'rgba(26,46,32,0.4)', marginLeft: '6px', fontStyle: 'normal' }}>
                    · Meeting {raceDay.meetingNumbers.map(m => String(m).padStart(2, '0')).join(' / ')}
                  </span>
                )}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {raceDay.programmes.map(p => {
                const pc = progColor(p);
                return (
                  <span key={p} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em',
                    fontWeight: 700, color: pc,
                    padding: '2px 7px', backgroundColor: pc + '1A',
                    borderRadius: '2px', border: '1px solid ' + pc + '40'
                  }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: pc }} />
                    {isMobile ? progShort(p) : p}
                  </span>
                );
              })}
              {turfSeriesDay && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em',
                  fontWeight: 700, color: '#3B6B6B',
                  padding: '2px 7px', backgroundColor: 'rgba(59,107,107,0.12)',
                  borderRadius: '2px', border: '1px solid rgba(59,107,107,0.4)'
                }}>
                  <Sparkles size={9} strokeWidth={2} />
                  Turf Series
                </span>
              )}
            </div>
          </div>

          {!isMobile && <div><StatusPill date={raceDay.date} todayIso={todayIso} /></div>}

          {!isMobile && (
            <div style={{ minWidth: 0 }}>
              {marquee ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Crown size={13} strokeWidth={1.5} style={{ color: C.gold, flexShrink: 0 }} />
                  <span style={{ fontSize: '12.5px', fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 500, color: C.forest, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {marquee.text}
                  </span>
                </div>
              ) : (
                <span style={{ fontSize: '12px', color: 'rgba(26,46,32,0.4)', fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>
                  {raceDay.races.length} handicap & maiden races
                </span>
              )}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: isMobile ? '20px' : '18px', fontFamily: FONT_DISPLAY, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: C.forest, lineHeight: 1 }}>
                {raceDay.races.length}
              </div>
              <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: C.forestDim, fontWeight: 600, marginTop: '2px' }}>
                {raceDay.races.length === 1 ? 'Race' : 'Races'}
              </div>
            </div>
            <ChevronDown size={16} strokeWidth={1.5} style={{
              color: 'rgba(26,46,32,0.5)',
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.25s ease'
            }} />
          </div>
        </div>

        {isMobile && (
          <div style={{ padding: '0 18px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <StatusPill date={raceDay.date} todayIso={todayIso} />
          </div>
        )}
      </button>

      {isOpen && (
        <div style={{ backgroundColor: C.cream, borderTop: '1px solid ' + C.forestSoft, padding: isMobile ? '8px 18px 18px' : '12px 24px 22px' }}>
          {/* BTC live link for the whole day */}
          <a
            href={btcUrlForRace(raceDay.races[0], todayIso)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 12px', marginTop: '6px',
              backgroundColor: '#0B223E', color: C.ivory,
              fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: FONT_BODY,
              borderRadius: '2px', textDecoration: 'none',
              border: '1px solid ' + C.gold
            }}
          >
            <ExternalLink size={11} strokeWidth={2} />
            {(() => {
              const s = getRaceStatus(raceDay.date, todayIso);
              if (s === 'concluded') return 'Full results on BTC';
              if (s === 'raceday') return 'Watch live on BTC';
              return 'View racecard on BTC';
            })()}
          </a>

          {raceDay.programmes.map(prog => {
            const races = racesByProgramme[prog] || [];
            const progClr = progColor(prog);
            return (
              <div key={prog} style={{ marginTop: '12px' }}>
                {/* Programme sub-header (only show if multiple programmes present) */}
                {hasBoth && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '8px 12px', marginBottom: '4px',
                    backgroundColor: progClr + '14',
                    borderLeft: '3px solid ' + progClr,
                    borderRadius: '2px'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: progClr }} />
                    <span style={{
                      fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em',
                      fontWeight: 700, color: progClr
                    }}>
                      {prog} Programme
                    </span>
                    <span style={{
                      marginLeft: 'auto', fontSize: '11px', color: C.forestDim,
                      fontFamily: FONT_MONO, fontVariantNumeric: 'tabular-nums'
                    }}>
                      {races.length} {races.length === 1 ? 'race' : 'races'}
                    </span>
                  </div>
                )}

                {/* Individual races */}
                {races.map(r => (
                  <div key={r.id}
                    onClick={(e) => { e.stopPropagation(); onRaceClick && onRaceClick(r); }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? 'auto 1fr auto' : '80px 1fr auto auto auto',
                      gap: isMobile ? '12px' : '18px',
                      padding: isMobile ? '10px 4px' : '12px 12px',
                      borderBottom: '1px dashed ' + C.forestSoft,
                      alignItems: 'center',
                      cursor: onRaceClick ? 'pointer' : 'default',
                      transition: 'background-color 0.15s',
                      borderRadius: '2px'
                    }}
                    onMouseEnter={(e) => { if (onRaceClick) e.currentTarget.style.backgroundColor = 'rgba(200,163,92,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <span style={{ fontSize: isMobile ? '20px' : '22px', fontFamily: FONT_DISPLAY, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: C.forest, lineHeight: 1 }}>{r.distance}</span>
                      <span style={{ fontSize: '11px', color: 'rgba(26,46,32,0.5)' }}>m</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontSize: isMobile ? '13px' : '14px', fontFamily: FONT_DISPLAY,
                        fontStyle: r.text.toLowerCase().includes('cup') || r.text.toLowerCase().includes('trophy') ? 'italic' : 'normal',
                        fontWeight: 500, color: C.forest, lineHeight: 1.3
                      }}>
                        {r.text}
                      </div>
                      {isMobile && (
                        <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <Badge accent={r.accent}>{r.category}</Badge>
                          {r.field && <span style={{ fontSize: '11px', fontFamily: FONT_MONO, color: C.forestDim }}>{r.field} runners</span>}
                        </div>
                      )}
                    </div>
                    {!isMobile && <div><Badge accent={r.accent}>{r.category}</Badge></div>}
                    {!isMobile && (
                      <div style={{ minWidth: '80px', textAlign: 'right', fontSize: '13px', fontFamily: FONT_MONO, fontVariantNumeric: 'tabular-nums', color: C.forestDim }}>
                        {r.field ? r.field + ' runners' : '—'}
                      </div>
                    )}
                    <ChevronDown size={14} strokeWidth={1.5} style={{
                      color: 'rgba(26,46,32,0.35)',
                      transform: 'rotate(-90deg)',
                      opacity: onRaceClick ? 1 : 0
                    }} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RaceDetailDrawer({ race, todayIso, onClose }) {
  if (!race) return null;
  const status = getRaceStatus(race.date, todayIso);
  const isPast = status === 'concluded';
  const isToday = status === 'raceday';
  const isFuture = !isPast && !isToday;

  // Resolve data: results for past, entries for declared/raceday, draft for entries-open
  const data = isPast ? generateMockResult(race.id, race.field) : null;
  const entries = !isPast ? generateMockField(race.id, race.field) : null;

  const statusMeta = {
    'concluded':     { label: 'Concluded',     bg: '#4A5568',  fg: '#F2EBDC' },
    'raceday':       { label: 'Race Day',      bg: C.burgundy, fg: C.ivory },
    'declared':      { label: 'Declared',      bg: '#0B223E',  fg: C.ivory },
    'entries-closed':{ label: 'Entries Closed',bg: C.gold,     fg: C.forest },
    'entries-open':  { label: 'Entries Open',  bg: '#7B8A6E',  fg: C.ivory },
    'scheduled':     { label: 'Scheduled',     bg: '#A89370',  fg: C.forest }
  };
  const sm = statusMeta[status];

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(26,46,32,0.55)',
      zIndex: 999, display: 'flex', justifyContent: 'flex-end',
      backdropFilter: 'blur(2px)'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: C.parchment, width: '100%', maxWidth: '720px',
        height: '100%', overflowY: 'auto',
        boxShadow: '-20px 0 60px -15px rgba(0,0,0,0.4)',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '24px 28px', backgroundColor: C.forest, color: C.ivory,
          borderBottom: '3px solid ' + C.gold, position: 'sticky', top: 0, zIndex: 2
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
                  backgroundColor: sm.bg, color: sm.fg, fontSize: '10px',
                  fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  borderRadius: '2px', fontFamily: FONT_BODY
                }}>
                  {sm.label}
                </span>
                <Badge accent={race.accent}>{race.category}</Badge>
                <span style={{ fontSize: '11px', color: C.gold, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {race.programme}
                </span>
              </div>
              <h2 style={{ margin: '0 0 6px 0', fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 500, lineHeight: 1.2 }}>
                {race.text}
              </h2>
              <div style={{ fontSize: '13px', color: 'rgba(242,235,220,0.75)', fontFamily: FONT_DISPLAY }}>
                {dayOfWeek(race.date)}, {fmtFull(race.date)}
                <span style={{ color: C.gold, margin: '0 8px' }}>·</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: C.ivory }}>{race.distance}m</span>
                <span style={{ color: C.gold, margin: '0 8px' }}>·</span>
                Meeting {String(race.meeting).padStart(2, '0')}
              </div>
            </div>
            <button onClick={onClose} style={{
              background: 'rgba(242,235,220,0.1)', border: '1px solid rgba(242,235,220,0.2)',
              borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer',
              color: C.ivory, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div style={{ padding: '24px 28px', flex: 1 }}>
          {/* Live data link to Bahrain Turf Club */}
          <a
            href={btcUrlForRace(race, todayIso)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '12px', padding: '14px 16px', marginBottom: '20px',
              backgroundColor: '#0B223E', color: C.ivory,
              borderRadius: '6px', textDecoration: 'none',
              border: '1px solid ' + C.gold,
              transition: 'transform 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
          >
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em',
                color: C.gold, fontWeight: 700, marginBottom: '3px'
              }}>
                Live data · Bahrain Turf Club
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: '14px', fontStyle: 'italic' }}>
                {btcUrlLabel(race, todayIso)}
              </div>
            </div>
            <ExternalLink size={16} strokeWidth={1.5} style={{ color: C.gold, flexShrink: 0 }} />
          </a>

          {/* Race Conditions — real data from the REHC Condition Book 2026/27 */}
          {(() => {
            const cond = raceConditions(race);
            if (!cond) return null;
            const rows = [];
            if (cond.prize) {
              rows.push(['Total Prize', (cond.cur || 'BHD') + ' ' + cond.prize.toLocaleString()]);
            }
            if (cond.bd) rows.push(['Breakdown', (cond.cur || 'BHD') + ' ' + cond.bd]);
            if (cond.elig) rows.push(['Eligibility', cond.elig]);
            if (cond.entry) rows.push(['Entry / Declaration', (cond.cur || 'BHD') + ' ' + cond.entry + ' each']);
            if (cond.tw) rows.push(['Top Weight', cond.tw + ' kg']);
            if (rows.length === 0) return null;
            return (
              <div style={{ marginBottom: '18px' }}>
                <div style={{
                  fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
                  fontWeight: 700, color: C.forestDim, marginBottom: '10px',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}>
                  <Award size={13} strokeWidth={2} style={{ color: C.gold }} />
                  Race Conditions
                  <span style={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: C.forestDim, fontSize: '11px' }}>
                    · Condition Book 2026/27
                  </span>
                </div>
                <div style={{
                  border: '1px solid ' + C.forestSoft, borderRadius: '6px',
                  backgroundColor: C.paper, overflow: 'hidden'
                }}>
                  {rows.map(([k, v], i) => (
                    <div key={k} style={{
                      display: 'flex', gap: '12px', padding: '9px 14px',
                      borderTop: i === 0 ? 'none' : '1px solid ' + C.forestSoft,
                      alignItems: 'baseline'
                    }}>
                      <div style={{
                        flex: '0 0 130px', fontSize: '10.5px', textTransform: 'uppercase',
                        letterSpacing: '0.08em', color: C.forestDim, fontWeight: 600
                      }}>{k}</div>
                      <div style={{
                        flex: 1, fontSize: '13px', color: C.forest,
                        fontFamily: (k === 'Total Prize') ? FONT_DISPLAY : FONT_BODY,
                        fontWeight: (k === 'Total Prize') ? 700 : 400,
                        fontStyle: (k === 'Total Prize') ? 'italic' : 'normal'
                      }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Sample-data notice for non-past races */}
          {!isPast && (
            <div style={{
              padding: '10px 14px', marginBottom: '18px',
              backgroundColor: 'rgba(200,163,92,0.10)',
              border: '1px dashed ' + C.gold,
              borderRadius: '2px',
              fontSize: '11.5px', color: C.forest,
              fontFamily: FONT_DISPLAY, fontStyle: 'italic'
            }}>
              The race conditions above are official. The runners and weights below are sample data — tap the gold button for live entries and declarations from the Bahrain Turf Club.
            </div>
          )}
          {isPast && (
            <div style={{
              padding: '10px 14px', marginBottom: '18px',
              backgroundColor: 'rgba(200,163,92,0.10)',
              border: '1px dashed ' + C.gold,
              borderRadius: '2px',
              fontSize: '11.5px', color: C.forest,
              fontFamily: FONT_DISPLAY, fontStyle: 'italic'
            }}>
              The result shown below is sample data. Tap the gold button above for the official result, sectional timings, photo finish, and stewards' report from the Bahrain Turf Club.
            </div>
          )}

          {isPast && data && <ResultsView data={data} race={race} />}
          {isToday && entries && <EntriesView entries={entries} race={race} live={true} />}
          {isFuture && status === 'declared' && entries && <EntriesView entries={entries} race={race} live={false} />}
          {isFuture && (status === 'entries-closed' || status === 'entries-open') && entries && (
            <EntriesView entries={entries} race={race} live={false} draft={status === 'entries-open'} />
          )}
          {isFuture && status === 'scheduled' && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: C.forestDim }}>
              <Calendar size={36} strokeWidth={1} style={{ marginBottom: '14px', opacity: 0.4 }} />
              <div style={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontSize: '17px', marginBottom: '8px' }}>
                Entries not yet open
              </div>
              <div style={{ fontSize: '13px' }}>
                Entries typically open 21 days before each meeting. Check back closer to {fmtShort(race.date)}.
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div style={{
          padding: '14px 28px', borderTop: '1px solid ' + C.forestSoft,
          backgroundColor: C.cream, fontSize: '11px', color: C.forestDim,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: FONT_BODY
        }}>
          <span style={{ fontStyle: 'italic', fontFamily: FONT_DISPLAY }}>
            {isPast ? 'Official result' : isToday ? 'Live · refreshes every minute' : 'Provisional — subject to declarations'}
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px' }}>
            REHC · {race.id}
          </span>
        </div>
      </div>
    </div>
  );
}

function EntriesView({ entries, race, live, draft }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: '14px', fontFamily: FONT_DISPLAY, fontStyle: 'italic', color: C.forest }}>
          {draft ? 'Provisional entries' : live ? 'Today\u2019s field' : 'Declared runners'}
          <span style={{ color: C.gold, margin: '0 8px' }}>·</span>
          <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, fontStyle: 'normal' }}>{entries.length} runners</span>
        </div>
        {live && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: C.burgundy, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: C.burgundy, animation: 'pulse 1.5s infinite' }} />
            Live
          </span>
        )}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT_BODY, fontSize: '12.5px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid ' + C.forest, color: C.forestDim, textAlign: 'left' }}>
              <th style={{ padding: '8px 6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>No.</th>
              <th style={{ padding: '8px 6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Horse</th>
              <th style={{ padding: '8px 6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Jockey</th>
              <th style={{ padding: '8px 6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Trainer</th>
              <th style={{ padding: '8px 6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, textAlign: 'right' }}>Wt</th>
              <th style={{ padding: '8px 6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, textAlign: 'right' }}>OR</th>
              {live && <th style={{ padding: '8px 6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, textAlign: 'right' }}>SP</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map((h, i) => (
              <tr key={i} style={{ borderBottom: '1px dashed ' + C.forestSoft }}>
                <td style={{ padding: '10px 6px', fontFamily: FONT_MONO, fontWeight: 700, color: C.forest }}>{h.number}</td>
                <td style={{ padding: '10px 6px' }}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, color: C.forest }}>{h.horse}</div>
                  <div style={{ fontSize: '10.5px', color: C.forestDim, marginTop: '1px' }}>{h.age}yo · {h.owner}</div>
                </td>
                <td style={{ padding: '10px 6px', color: C.forest }}>{h.jockey}</td>
                <td style={{ padding: '10px 6px', color: C.forestDim, fontSize: '11.5px' }}>{h.trainer}</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', fontFamily: FONT_MONO, fontVariantNumeric: 'tabular-nums', color: C.forest }}>{h.weight}</td>
                <td style={{ padding: '10px 6px', textAlign: 'right', fontFamily: FONT_MONO, fontVariantNumeric: 'tabular-nums', color: C.forestDim }}>{h.rating}</td>
                {live && <td style={{ padding: '10px 6px', textAlign: 'right', fontFamily: FONT_MONO, color: h.sp ? C.burgundy : C.forestDim, fontWeight: h.sp ? 700 : 400 }}>{h.sp || '—'}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {draft && (
        <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: 'rgba(200,163,92,0.12)', border: '1px solid ' + C.gold, borderRadius: '2px', fontSize: '12px', color: C.forest, fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>
          ⚠ Provisional list — declarations close 48 hours before raceday. Final field will be confirmed once declarations are received.
        </div>
      )}
    </div>
  );
}

function ResultsView({ data, race }) {
  const top3 = data.finishers.slice(0, 3);
  const rest = data.finishers.slice(3);
  const positionColors = ['#C8A35C', '#B8B8B8', '#A87844'];
  return (
    <div>
      {/* Race conditions */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px',
        padding: '14px 16px', marginBottom: '20px',
        backgroundColor: C.cream, border: '1px solid ' + C.forestSoft, borderRadius: '2px'
      }}>
        {[
          { label: 'Winning Time', value: data.winningTime },
          { label: 'Going', value: data.going },
          { label: 'Weather', value: data.weather },
          { label: 'Field Size', value: data.finishers.length }
        ].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.12em', color: C.forestDim, fontWeight: 700, marginBottom: '3px' }}>{s.label}</div>
            <div style={{ fontFamily: FONT_DISPLAY, fontSize: '15px', fontWeight: 500, color: C.forest, fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Podium for top 3 */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: C.forestDim, fontWeight: 700, marginBottom: '10px' }}>Result</div>
        {top3.map((h, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '14px 16px', marginBottom: '6px',
            backgroundColor: i === 0 ? 'rgba(200,163,92,0.10)' : C.parchment,
            border: '1px solid ' + (i === 0 ? C.gold : C.forestSoft),
            borderLeft: '4px solid ' + positionColors[i],
            borderRadius: '2px'
          }}>
            <div style={{
              fontSize: '26px', fontFamily: FONT_DISPLAY, fontWeight: 700,
              color: positionColors[i], width: '36px', textAlign: 'center',
              fontVariantNumeric: 'tabular-nums', lineHeight: 1
            }}>
              {h.position}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: '16px', fontWeight: 500, color: C.forest, fontStyle: i === 0 ? 'italic' : 'normal' }}>
                {h.horse} {i === 0 && <Trophy size={14} strokeWidth={1.5} style={{ display: 'inline', marginLeft: '4px', color: C.gold, verticalAlign: 'baseline' }} />}
              </div>
              <div style={{ fontSize: '11.5px', color: C.forestDim, marginTop: '2px' }}>
                {h.jockey} · {h.trainer}
                {h.margin && <span> · won by {h.margin}</span>}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: FONT_MONO, fontSize: '11px', color: C.forestDim, fontVariantNumeric: 'tabular-nums' }}>{h.weight}kg</div>
              {h.sp && <div style={{ fontFamily: FONT_MONO, fontSize: '11px', color: C.burgundy, fontWeight: 700, marginTop: '2px' }}>{h.sp}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Remaining finishers */}
      {rest.length > 0 && (
        <div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: C.forestDim, fontWeight: 700, marginBottom: '10px' }}>Remaining finishers</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: FONT_BODY, fontSize: '12px' }}>
            <tbody>
              {rest.map(h => (
                <tr key={h.position} style={{ borderBottom: '1px dashed ' + C.forestSoft }}>
                  <td style={{ padding: '8px 6px', fontFamily: FONT_MONO, fontWeight: 600, color: C.forestDim, width: '32px' }}>{h.position}</td>
                  <td style={{ padding: '8px 6px', fontFamily: FONT_DISPLAY, color: C.forest }}>{h.horse}</td>
                  <td style={{ padding: '8px 6px', color: C.forestDim }}>{h.jockey}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'right', color: C.forestDim, fontFamily: FONT_MONO, fontSize: '11px' }}>{h.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.stewards && (
        <div style={{ marginTop: '18px', padding: '10px 14px', backgroundColor: 'rgba(107,39,55,0.08)', borderLeft: '3px solid ' + C.burgundy, fontSize: '12px', color: C.forest, fontFamily: FONT_DISPLAY }}>
          <strong style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em', fontFamily: FONT_BODY }}>Stewards: </strong>
          {data.stewards}
        </div>
      )}
    </div>
  );
}

function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : 'https://rehc.example.com';
  const qr = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=1A2E20&bgcolor=F7F1E1&data=' + encodeURIComponent(url) + '&qzone=2';
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(26,46,32,0.65)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: C.parchment, borderRadius: '4px', width: '100%', maxWidth: '460px',
        overflow: 'hidden', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.4)'
      }}>
        <div style={{ padding: '20px 24px', backgroundColor: C.forest, color: C.ivory, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 700 }}>Share dashboard</div>
            <div style={{ fontSize: '17px', fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 500, marginTop: '2px' }}>REHC Race Programme</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(242,235,220,0.7)', padding: '4px', display: 'flex', alignItems: 'center' }}>
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
            <div style={{ padding: '8px', backgroundColor: '#fff', border: '1px solid ' + C.forestSoft, borderRadius: '6px' }}>
              <img src={qr} alt="QR code" width={140} height={140} style={{ display: 'block' }} />
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: C.forestDim, fontFamily: FONT_DISPLAY, fontStyle: 'italic', margin: '0 0 16px 0' }}>
            Scan with a phone camera to open the live dashboard
          </p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <input readOnly value={url} style={{
              flex: 1, padding: '10px 12px', border: '1px solid ' + C.forestSoft, borderRadius: '2px',
              fontSize: '11px', fontFamily: FONT_MONO, backgroundColor: C.cream, color: C.forest, outline: 'none', minWidth: 0
            }} />
            <button onClick={copy} style={{
              padding: '10px 14px', backgroundColor: copied ? C.green : C.forest, color: C.ivory,
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              fontFamily: FONT_BODY, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap'
            }}>
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div style={{ paddingTop: '16px', borderTop: '1px dashed ' + C.forestSoft }}>
            <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', color: C.forestDim, fontWeight: 700, marginBottom: '10px', textAlign: 'center' }}>Quick exports</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {[
                { label: 'CSV', icon: Download, fn: () => exportCSV(RACES) },
                { label: 'iCal', icon: CalendarPlus, fn: exportICS },
                { label: 'PDF', icon: FileDown, fn: () => exportPDF(RACES) },
                { label: 'Print', icon: Printer, fn: () => window.print() }
              ].map(b => (
                <button key={b.label} onClick={b.fn} style={{
                  padding: '10px 6px', backgroundColor: C.cream, border: '1px solid ' + C.forestSoft,
                  borderRadius: '2px', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '4px', color: C.forest, fontFamily: FONT_BODY,
                  fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em'
                }}>
                  <b.icon size={14} />
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolBtn({ onClick, title, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} title={title}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: '10px 12px', border: '1px solid ' + C.forestSoft, borderRadius: '2px',
        cursor: 'pointer', backgroundColor: hover ? C.forest : 'transparent',
        color: hover ? C.ivory : C.forest, display: 'flex', alignItems: 'center', gap: '6px',
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase', fontFamily: FONT_BODY, transition: 'all 0.15s'
      }}>
      {children}
    </button>
  );
}

// =================================================================
// MAIN APP
// =================================================================
function SeriesModal({ onClose, isMobile }) {
  const Section = ({ color, tag, title, children }) => (
    <div style={{ marginBottom: '20px', border: '1px solid ' + C.forestSoft, borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: color, color: '#fff', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '9px' }}>
        <Award size={15} strokeWidth={2} />
        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{tag}</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 600, fontSize: '14px' }}>{title}</span>
      </div>
      <div style={{ padding: '14px 16px', backgroundColor: C.paper, fontSize: '13px', color: C.forest, lineHeight: 1.55 }}>
        {children}
      </div>
    </div>
  );
  const Row = ({ k, v }) => (
    <div style={{ display: 'flex', gap: '10px', padding: '4px 0', alignItems: 'baseline' }}>
      <div style={{ flex: '0 0 auto', fontWeight: 700, color: C.forest }}>{k}</div>
      <div style={{ flex: 1, color: C.forestDim, borderBottom: '1px dotted ' + C.forestSoft }} />
      <div style={{ flex: '0 0 auto', color: C.forest }}>{v}</div>
    </div>
  );
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(26,46,32,0.55)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: isMobile ? 'flex-start' : 'center', padding: isMobile ? '0' : '24px', backdropFilter: 'blur(2px)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: C.parchment, width: '100%', maxWidth: '640px', maxHeight: isMobile ? '100%' : '90vh', overflowY: 'auto', borderRadius: isMobile ? '0' : '6px', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '20px 24px', backgroundColor: C.forest, color: C.ivory, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 2, borderBottom: '3px solid ' + C.gold }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 700 }}>Condition Book 2026/27</div>
            <div style={{ fontSize: '18px', fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 500, marginTop: '2px' }}>Series & Championships</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(242,235,220,0.7)', padding: '4px', display: 'flex' }}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          <Section color="#2F6FB0" tag="Future Stars" title="Series 2026/27">
            <p style={{ marginTop: 0 }}>Second edition of Bahrain's flagship series for <strong>3-year-old Bahrain-bred</strong> horses — six races across three meetings, culminating on Future Champions Day.</p>
            <div style={{ margin: '12px 0', padding: '10px 12px', backgroundColor: C.parchment, borderRadius: '6px' }}>
              <Row k="Meeting 24 · 12 Mar" v="Sprint 1000m · Mile 1400m" />
              <Row k="Meeting 26 · 26 Mar" v="Sprint 1200m · Mile 1600m" />
              <Row k="Meeting 29 · 15 Apr" v="Finals: 1000m & 1600m" />
            </div>
            <p style={{ margin: '8px 0 4px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.forestDim }}>Points</p>
            <p style={{ margin: 0 }}>15 / 10 / 7 / 5 / 3 for the top five, 1 for completing. Finals score <strong>double</strong>.</p>
            <p style={{ margin: '8px 0 0' }}>Category winners on Future Champions Day earn a <strong>BHD 5,000</strong> bonus (Owner 2,500 · Trainer 1,500 · Jockey 1,000), on top of prize money.</p>
          </Section>
          <Section color="#9C4A2C" tag="Apprentice Championship" title="Bahraini Apprentices 2026/27">
            <p style={{ marginTop: 0 }}>Ten races for <strong>Bahraini apprentices only</strong>, over varied distances and abilities across the season.</p>
            <p style={{ margin: '8px 0 4px', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: C.forestDim }}>Points</p>
            <p style={{ margin: 0 }}>Races 1–8: 10 / 8 / 6 / 4 / 2 to the top five. The final two rounds (<strong>Meetings 28 & 29</strong>) score <strong>double</strong>: 20 / 16 / 12 / 8 / 4.</p>
            <p style={{ margin: '8px 0 0' }}>Top three jockeys by points are prized; ties broken by race wins. Using the whip more than eight times forfeits that race's points, plus a suspension and fine.</p>
          </Section>
          <p style={{ fontSize: '11px', color: C.forestDim, fontStyle: 'italic', fontFamily: FONT_DISPLAY, textAlign: 'center', margin: '4px 0 0' }}>
            Full conditions in the REHC Condition Book 2026/27.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {  const { isMobile, isTablet } = useViewport();
  const [now, setNow] = useState(new Date());
  const [search, setSearch] = useState('');
  const [programme, setProgramme] = useState('All');
  const [activeTypes, setActiveTypes] = useState(new Set());
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [activeTile, setActiveTile] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [showSeries, setShowSeries] = useState(false);
  const [installEvt, setInstallEvt] = useState(null);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Capture the browser's install prompt (Android/Chrome/Edge) for an in-app button.
  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallEvt(e); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  // Detect iOS Safari (no install API — needs manual Add to Home Screen).
  const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = typeof window !== 'undefined' && (window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone);

  const handleInstall = async () => {
    if (installEvt) {
      installEvt.prompt();
      await installEvt.userChoice;
      setInstallEvt(null);
    } else if (isIOS) {
      setShowIosHelp(true);
    }
  };
  const canInstall = !isStandalone && (installEvt || isIOS);

  // Print stylesheet
  useEffect(() => {
    if (document.getElementById('rehc-print')) return;
    const s = document.createElement('style');
    s.id = 'rehc-print';
    s.textContent = '@media print { @page { size: A4 portrait; margin: 14mm 12mm; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } body { background: #fff !important; } .rehc-no-print { display: none !important; } } @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }';
    document.head.appendChild(s);
  }, []);

  const todayIso = now.toISOString().slice(0, 10);
  const BLACK_TYPE = ['Group 1','Group 2','Group 3','Listed'];

  // Tile click handlers — each filters dashboard to a specific programme or to black-type
  const onTileImported = () => {
    if (activeTile === 'imported') { setActiveTile(null); setProgramme('All'); }
    else { setActiveTile('imported'); setProgramme('Imported'); setActiveTypes(new Set()); setSearch(''); }
  };
  const onTileBahrainBred = () => {
    if (activeTile === 'bahrainbred') { setActiveTile(null); setProgramme('All'); }
    else { setActiveTile('bahrainbred'); setProgramme('Bahrain Bred'); setActiveTypes(new Set()); setSearch(''); }
  };
  const onTileWAHO = () => {
    if (activeTile === 'waho') { setActiveTile(null); setProgramme('All'); }
    else { setActiveTile('waho'); setProgramme('WAHO'); setActiveTypes(new Set()); setSearch(''); }
  };
  const onTileBlackType = () => {
    if (activeTile === 'blacktype') { setActiveTile(null); setActiveTypes(new Set()); }
    else { setActiveTile('blacktype'); setActiveTypes(new Set(BLACK_TYPE)); setProgramme('All'); setSearch(''); }
  };

  const filtered = useMemo(() => {
    return RACES.filter(r => {
      if (programme !== 'All' && r.programme !== programme) return false;
      if (activeTypes.size > 0 && !activeTypes.has(r.category)) return false;
      if (search) {
        const q = search.toLowerCase();
        const blob = (r.text + ' ' + r.category + ' ' + r.distance + ' ' + r.meeting + ' ' + r.date).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [search, programme, activeTypes]);

  const groupedByDate = useMemo(() => {
    const map = new Map();
    filtered.forEach(r => {
      const k = r.date;
      if (!map.has(k)) {
        map.set(k, {
          date: r.date,
          races: [],
          programmes: new Set(),
          meetingNumbers: new Set()
        });
      }
      const entry = map.get(k);
      entry.races.push(r);
      entry.programmes.add(r.programme);
      entry.meetingNumbers.add(r.meeting);
    });
    return [...map.values()]
      .map(d => ({
        ...d,
        programmes: [...d.programmes].sort((a, b) => progOrder(a) - progOrder(b)),
        meetingNumbers: [...d.meetingNumbers].sort((a, b) => a - b),
        // Sort races: Imported first, then by distance
        races: d.races.sort((a, b) => {
          if (a.programme !== b.programme) return progOrder(a.programme) - progOrder(b.programme);
          return a.distance - b.distance;
        })
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [filtered]);

  const stats = useMemo(() => {
    const totalMeetings = new Set(RACES.map(r => r.programme + '-' + r.meeting)).size;
    const totalRaces = RACES.length;
    const blackType = RACES.filter(r => BLACK_TYPE.includes(r.category)).length;
    const upcoming = [...new Set(RACES.filter(r => r.date >= todayIso).map(r => r.date))].sort();
    const nextDate = upcoming[0];
    const daysToNext = nextDate ? daysBetween(todayIso, nextDate) : null;
    const totalRaceDays = new Set(RACES.map(r => r.date)).size;
    const importedCount = RACES.filter(r => r.programme === 'Imported').length;
    const bahrainBredCount = RACES.filter(r => r.programme === 'Bahrain Bred').length;
    const wahoCount = RACES.filter(r => r.programme === 'WAHO').length;
    return { totalMeetings, totalRaces, blackType, nextDate, daysToNext, totalRaceDays, importedCount, bahrainBredCount, wahoCount, seasonDays: daysBetween('2026-10-30', '2027-04-16') };
  }, [todayIso]);

  const nextMeeting = useMemo(() => {
    if (!stats.nextDate) return null;
    const races = RACES.filter(r => r.date === stats.nextDate);
    const programmes = [...new Set(races.map(r => r.programme))].sort((a, b) => progOrder(a) - progOrder(b));
    const meetingNumbers = [...new Set(races.map(r => r.meeting))].sort((a, b) => a - b);
    return {
      date: stats.nextDate,
      programmes,
      meetingNumbers,
      races: races.sort((a, b) => {
        if (a.programme !== b.programme) return progOrder(a.programme) - progOrder(b.programme);
        return a.distance - b.distance;
      })
    };
  }, [stats.nextDate]);

  const allTypes = useMemo(() => {
    const s = [...new Set(RACES.map(r => r.category))];
    return s.sort((a, b) => {
      const ta = RACES.find(r => r.category === a)?.tier ?? 99;
      const tb = RACES.find(r => r.category === b)?.tier ?? 99;
      return ta - tb;
    });
  }, []);

  const toggleType = (t) => {
    const ns = new Set(activeTypes);
    if (ns.has(t)) ns.delete(t); else ns.add(t);
    setActiveTypes(ns);
    if (activeTile === 'blacktype') setActiveTile(null);
  };

  const PX = isMobile ? '20px' : isTablet ? '32px' : '40px';
  const MW = '1400px';

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      backgroundColor: C.cream,
      backgroundImage: 'radial-gradient(circle at 15% -5%, rgba(200,163,92,0.10) 0%, transparent 45%), radial-gradient(circle at 85% 105%, rgba(26,46,32,0.08) 0%, transparent 50%)',
      fontFamily: FONT_BODY, color: C.forest
    }}>
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
      {showSeries && <SeriesModal onClose={() => setShowSeries(false)} isMobile={isMobile} />}
      {showIosHelp && (
        <div onClick={() => setShowIosHelp(false)} style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(26,46,32,0.55)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px',
          backdropFilter: 'blur(2px)'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            backgroundColor: C.parchment, width: '100%', maxWidth: '400px', borderRadius: '6px',
            overflow: 'hidden', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)'
          }}>
            <div style={{ padding: '18px 22px', backgroundColor: C.forest, color: C.ivory, borderBottom: '3px solid ' + C.gold, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '16px', fontFamily: FONT_DISPLAY, fontStyle: 'italic', fontWeight: 500 }}>Install on iPhone</div>
              <button onClick={() => setShowIosHelp(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(242,235,220,0.7)', padding: '2px', display: 'flex' }}><X size={20} strokeWidth={1.5} /></button>
            </div>
            <div style={{ padding: '20px 22px', fontSize: '14px', color: C.forest, lineHeight: 1.6 }}>
              <p style={{ marginTop: 0 }}>To add this to your home screen so it opens like an app:</p>
              <ol style={{ margin: '0 0 4px', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Tap the <strong>Share</strong> icon in Safari&rsquo;s toolbar.</li>
                <li style={{ marginBottom: '8px' }}>Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>.</li>
                <li>Tap <strong>Add</strong> — the REHC icon appears on your home screen.</li>
              </ol>
            </div>
          </div>
        </div>
      )}
      {selectedRace && <RaceDetailDrawer race={selectedRace} todayIso={todayIso} onClose={() => setSelectedRace(null)} />}

      {/* HEADER */}
      <header className="rehc-no-print" style={{ borderBottom: '1px solid ' + C.forestSoft, backgroundColor: C.parchment, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, ' + C.gold + ' 50%, transparent 100%)', opacity: 0.4 }} />
        <div style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Crest size={isMobile ? 48 : 64} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.forestDim, marginBottom: '4px', fontWeight: 700 }}>
                  <span>Rashid Equestrian &amp; Horseracing Club</span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: C.gold }} />
                  <span>Kingdom of Bahrain</span>
                </div>
                <h1 style={{
                  fontSize: isMobile ? 'clamp(1.4rem, 7vw, 1.9rem)' : 'clamp(1.9rem, 4vw, 2.6rem)',
                  lineHeight: 0.95, color: C.forest, fontFamily: FONT_DISPLAY,
                  fontWeight: 600, fontStyle: 'italic', margin: 0, letterSpacing: '-0.01em'
                }}>
                  Race Programme
                  <span style={{ color: C.gold }}> · </span>
                  <span style={{ fontVariantNumeric: 'tabular-nums', fontStyle: 'normal' }}>2026/27</span>
                </h1>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignSelf: isMobile ? 'stretch' : 'flex-start' }}>
            {canInstall && (
              <button onClick={handleInstall} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px', backgroundColor: 'transparent', color: C.ivory,
                border: '1px solid rgba(242,235,220,0.4)', borderRadius: '2px', cursor: 'pointer',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontFamily: FONT_BODY,
                flex: isMobile ? 1 : 'none', justifyContent: 'center'
              }}>
                <Download size={14} strokeWidth={2} />
                Install
              </button>
            )}
            <button onClick={() => setShowSeries(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', backgroundColor: 'transparent', color: C.gold,
              border: '1px solid ' + C.gold, borderRadius: '2px', cursor: 'pointer',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: FONT_BODY,
              flex: isMobile ? 1 : 'none', justifyContent: 'center'
            }}>
              <Award size={14} strokeWidth={2} />
              Series
            </button>
            <button onClick={() => setShowShare(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', backgroundColor: C.gold, color: C.forest,
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: FONT_BODY,
              boxShadow: '0 2px 8px -3px rgba(200,163,92,0.6)',
              flex: isMobile ? 1 : 'none',
              justifyContent: 'center'
            }}>
              <Share2 size={14} strokeWidth={2} />
              Share
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="rehc-no-print" style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX + ' 0' }}>
        <NextUpHero daysToNext={stats.daysToNext} nextMeeting={nextMeeting} isMobile={isMobile} todayIso={todayIso} />
      </section>

      {/* CLICKABLE STATS */}
      <section className="rehc-no-print" style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX + ' 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <StatCard
            label="Imported"
            value={stats.importedCount}
            sub={isMobile ? 'Tap to filter' : 'Click to filter to Imported only'}
            icon={Flag}
            accentColor={progColor('Imported')}
            onClick={onTileImported}
            isActive={activeTile === 'imported'}
          />
          <StatCard
            label="Bahrain Bred"
            value={stats.bahrainBredCount}
            sub={isMobile ? 'Tap to filter' : 'Click to filter to Bahrain Bred'}
            icon={Sparkles}
            accentColor={progColor('Bahrain Bred')}
            onClick={onTileBahrainBred}
            isActive={activeTile === 'bahrainbred'}
          />
          <StatCard
            label="WAHO"
            value={stats.wahoCount}
            sub={isMobile ? 'Tap to filter' : 'Click to filter to WAHO only'}
            icon={Crown}
            accentColor={progColor('WAHO')}
            onClick={onTileWAHO}
            isActive={activeTile === 'waho'}
          />
          <StatCard
            label="International Group & Listed Races"
            value={stats.blackType}
            sub={isMobile ? 'Tap for prestige races' : 'Click for Group & Listed races'}
            icon={Award}
            accentColor={C.burgundy}
            onClick={onTileBlackType}
            isActive={activeTile === 'blacktype'}
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="rehc-no-print" style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX + ' 0' }}>
        <div style={{ backgroundColor: C.parchment, border: '1px solid ' + C.forestSoft, padding: isMobile ? '16px' : '20px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
              <Search size={15} strokeWidth={1.5} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(26,46,32,0.4)' }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={isMobile ? 'Search races…' : 'Search by cup, meeting, distance…'}
                style={{
                  width: '100%', padding: '10px 12px 10px 36px', backgroundColor: C.cream,
                  border: '1px solid ' + C.forestSoft, fontSize: '14px', color: C.forest,
                  outline: 'none', borderRadius: '2px', fontFamily: FONT_BODY, boxSizing: 'border-box'
                }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,46,32,0.4)' }}>
                  <X size={14} />
                </button>
              )}
            </div>
            <div style={{ display: 'flex', border: '1px solid ' + C.forestSoft, borderRadius: '2px', overflow: 'hidden', flexWrap: 'wrap' }}>
              {['All','Imported','Bahrain Bred','WAHO'].map(p => (
                <button key={p} onClick={() => {
                  setProgramme(p);
                  // Sync active tile with programme selection
                  if (p === 'All') setActiveTile(null);
                  else if (p === 'Imported') setActiveTile('imported');
                  else if (p === 'Bahrain Bred') setActiveTile('bahrainbred');
                  else if (p === 'WAHO') setActiveTile('waho');
                }} style={{
                  padding: isMobile ? '9px 10px' : '10px 13px',
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer', fontFamily: FONT_BODY,
                  backgroundColor: programme === p ? C.forest : 'transparent',
                  color: programme === p ? C.ivory : C.forestDim
                }}>
                  {isMobile && p !== 'All' ? progShort(p) : p}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px', marginLeft: isMobile ? 0 : 'auto' }}>
              <ToolBtn onClick={() => exportCSV(filtered)} title={'Export ' + filtered.length + ' races as CSV'}>
                <Download size={13} strokeWidth={1.8} />
                {!isMobile && 'CSV'}
              </ToolBtn>
              <ToolBtn onClick={exportICS} title="Add all meetings to calendar">
                <CalendarPlus size={13} strokeWidth={1.8} />
                {!isMobile && 'iCal'}
              </ToolBtn>
              <ToolBtn onClick={() => exportPDF(filtered)} title="Download as PDF">
                <FileDown size={13} strokeWidth={1.8} />
                {!isMobile && 'PDF'}
              </ToolBtn>
              <ToolBtn onClick={() => window.print()} title="Print handout">
                <Printer size={13} strokeWidth={1.8} />
                {!isMobile && 'Print'}
              </ToolBtn>
            </div>
          </div>

          {/* Type chips */}
          <div style={{
            marginTop: '14px', paddingTop: '14px', borderTop: '1px dashed ' + C.forestSoft,
            display: 'flex', alignItems: 'center', gap: '8px',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflowX: isMobile ? 'auto' : 'visible',
            paddingBottom: isMobile ? '4px' : 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', color: C.forestDim, fontWeight: 700, marginRight: '4px', flexShrink: 0 }}>
              <Filter size={11} strokeWidth={2} />
              <span>Type</span>
            </div>
            {allTypes.map(t => {
              const accent = RACES.find(r => r.category === t)?.accent || 'gray';
              const c = ACCENTS[accent];
              const active = activeTypes.has(t);
              const count = RACES.filter(r => r.category === t).length;
              return (
                <button key={t} onClick={() => toggleType(t)} style={{
                  backgroundColor: active ? c.bg : c.soft, color: active ? c.fg : c.bg,
                  border: '1px solid ' + c.bg, padding: '4px 10px', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '2px',
                  cursor: 'pointer', fontFamily: FONT_BODY, whiteSpace: 'nowrap', flexShrink: 0
                }}>
                  {t} <span style={{ opacity: 0.65, marginLeft: '4px', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
                </button>
              );
            })}
            {(activeTypes.size > 0 || search || programme !== 'All' || activeTile) && (
              <button onClick={() => {
                setActiveTypes(new Set()); setSearch(''); setProgramme('All'); setActiveTile(null);
              }} style={{
                marginLeft: isMobile ? 0 : 'auto', fontSize: '11px', textTransform: 'uppercase',
                letterSpacing: '0.06em', color: C.burgundy, background: 'none', border: 'none',
                cursor: 'pointer', fontWeight: 700, textDecoration: 'underline', fontFamily: FONT_BODY, flexShrink: 0
              }}>
                Clear all
              </button>
            )}
          </div>

          <div style={{ marginTop: '12px', fontSize: '12px', color: C.forestDim, fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>
            <span style={{ color: C.forest, fontWeight: 600, fontStyle: 'normal', fontVariantNumeric: 'tabular-nums' }}>{filtered.length}</span> of {RACES.length} races · <span style={{ fontVariantNumeric: 'tabular-nums' }}>{groupedByDate.length}</span> race {groupedByDate.length === 1 ? 'day' : 'days'}
          </div>
        </div>
      </section>

      {/* RACE DAY LIST */}
      <main style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '16px' : '24px') + ' ' + PX + ' 64px' }}>
        {/* Legend */}
        {groupedByDate.length > 0 && (
          <div className="rehc-no-print" style={{
            display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '16px',
            flexWrap: 'wrap', marginBottom: '16px',
            padding: '10px 14px', backgroundColor: C.parchment,
            border: '1px solid ' + C.forestSoft, borderRadius: '6px',
            fontSize: '10.5px', fontFamily: FONT_BODY
          }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: C.forestDim }}>Legend</span>
            {[
              { c: DAY_TYPE_META.thu.color, label: 'Thursday' },
              { c: DAY_TYPE_META.fri.color, label: 'Friday' },
              { c: DAY_TYPE_META.sat.color, label: 'Saturday' }
            ].map(item => (
              <span key={item.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: C.forest }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: item.c, border: item.label === 'Friday' ? '1px solid rgba(0,0,0,0.15)' : 'none' }} />
                {item.label}
              </span>
            ))}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#7C5295', fontWeight: 600 }}>
              <Sparkles size={11} strokeWidth={2} /> Ramadan
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#3B6B6B', fontWeight: 600 }}>
              <Sparkles size={11} strokeWidth={2} /> Turf Series
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#2F6FB0', fontWeight: 600 }}>
              <Award size={11} strokeWidth={2} /> Future Stars
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#9C4A2C', fontWeight: 600 }}>
              <Award size={11} strokeWidth={2} /> Future Champions
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#2E8B57', fontWeight: 600 }}>
              <Award size={11} strokeWidth={2} /> Champions Day
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: C.forest, fontWeight: 600 }}>
              <Crown size={11} strokeWidth={2} style={{ color: C.gold }} /> Feature / Festival
            </span>
          </div>
        )}
        {groupedByDate.length === 0 ? (
          <div style={{ backgroundColor: C.parchment, border: '1px solid ' + C.forestSoft, padding: '64px 24px', textAlign: 'center', borderRadius: '6px' }}>
            <div style={{ fontSize: '20px', marginBottom: '8px', fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>No races match these filters</div>
            <div style={{ fontSize: '13px', color: C.forestDim }}>Try clearing your search or selecting different race types</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {groupedByDate.map(d => {
              const key = d.date;
              return (
                <MeetingCard
                  key={key}
                  raceDay={d}
                  isOpen={selectedMeeting === key}
                  onToggle={() => setSelectedMeeting(selectedMeeting === key ? null : key)}
                  onRaceClick={(race) => setSelectedRace(race)}
                  todayIso={todayIso}
                  isMobile={isMobile}
                />
              );
            })}
          </div>
        )}
      </main>

      <footer className="rehc-no-print" style={{ borderTop: '1px solid ' + C.forestSoft, padding: (isMobile ? '20px' : '28px') + ' 0', backgroundColor: C.parchment }}>
        <div style={{ maxWidth: MW, margin: '0 auto', padding: '0 ' + PX, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '11px', color: C.forestDim }}>
          <span style={{ fontFamily: FONT_DISPLAY, fontStyle: 'italic' }}>
            All races for 3yo and upwards except where stated
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: '10px' }}>REHC · 2026—27 SEASON</span>
        </div>
      </footer>
    </div>
  );
}
