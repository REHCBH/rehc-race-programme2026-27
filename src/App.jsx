import { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, Filter, ChevronDown, X, Clock, Sparkles, Award, LayoutGrid, List, Crown, Flag, Download, Printer, Share2, Copy, Check, FileJson, CalendarPlus } from 'lucide-react';

// =================================================================
// DATA — REHC 2026/27
// =================================================================
const PROGRAMME = [
  { p: 'I', m: 1, d: '2026-10-30', races: [
    { dist: 1200, text: '0-90', field: 5 },
    { dist: 1400, text: 'Late H H Sh Rashid Bin Isa Al Khalifa Cup — Domestic Grade 2', field: 5 },
    { dist: 1600, text: '4th & Maiden', field: 6 },
    { dist: 1800, text: 'TBC', field: null }
  ]},
  { p: 'I', m: 2, d: '2026-11-06', races: [
    { dist: 1200, text: '0-85', field: 10 },
    { dist: 1400, text: 'Maiden', field: 9 },
    { dist: 1600, text: '0-65', field: 8 },
    { dist: 1800, text: '0-95', field: 5 },
    { dist: 2000, text: '0-85', field: 6 }
  ]},
  { p: 'I', m: 3, d: '2026-11-13', races: [
    { dist: 1000, text: 'Grand Seiko Bahrain Jewellery Centre Cup — Domestic Grade 1', field: 7 },
    { dist: 1200, text: '0-90', field: 9 },
    { dist: 1600, text: 'Open Handicap', field: 8 },
    { dist: 2000, text: 'Bahrain International Trophy — Group 2', field: 8 },
    { dist: 2400, text: 'Open Handicap (TBC)', field: null }
  ]},
  { p: 'I', m: 4, d: '2026-11-20', races: [
    { dist: 1400, text: '4th & Maiden', field: 11 },
    { dist: 1600, text: '0-75', field: 10 },
    { dist: 1800, text: '0-85', field: 7 }
  ]},
  { p: 'I', m: 5, d: '2026-11-26', races: [
    { dist: 1200, text: '0-75', field: 14 },
    { dist: 1400, text: 'Domestic Grade 2', field: 5 },
    { dist: 1600, text: '0-70 APP', field: 8 },
    { dist: 2000, text: 'REHC Cup — Domestic Grade 2', field: 4 },
    { dist: 2200, text: '0-75', field: 9 }
  ]},
  { p: 'I', m: 6, d: '2026-11-27', races: [
    { dist: 1000, text: '0-100', field: 6 },
    { dist: 1400, text: '0-90', field: 5 },
    { dist: 1600, text: 'Domestic Grade 2', field: 7 },
    { dist: 1800, text: '0-95', field: 8 }
  ]},
  { p: 'I', m: 7, d: '2026-12-04', races: [
    { dist: 1400, text: '4th & Maiden', field: 8 },
    { dist: 1600, text: '0-80', field: 6 },
    { dist: 2000, text: '0-80', field: 6 },
    { dist: 2400, text: '0-75', field: 8 }
  ]},
  { p: 'I', m: 8, d: '2026-12-11', races: [
    { dist: 1200, text: '0-85', field: 12 },
    { dist: 1800, text: '4th & Maiden', field: 4 },
    { dist: 2200, text: '0-85', field: 6 }
  ]},
  { p: 'I', m: 9, d: '2026-12-17', races: [
    { dist: 1200, text: 'Bahrain Olympic Committee Cup — Domestic Grade 2', field: 6 },
    { dist: 1400, text: '0-80 / Maiden 2yo only', field: 10 },
    { dist: 1600, text: '0-90', field: 7 },
    { dist: 2000, text: '0-90', field: 6 }
  ]},
  { p: 'I', m: 10, d: '2026-12-18', races: [
    { dist: 1200, text: 'Al Manama Cup — Turf Series 84-100', field: 16 },
    { dist: 1600, text: 'Sh Khalid Bin Hamad Al Khalifa Cup — Listed', field: 7 },
    { dist: 1800, text: '0-100 — Turf Series', field: null },
    { dist: 2000, text: 'Al Muharraq Cup — Turf Series 84-100', field: 13 },
    { dist: 2400, text: 'National Day Cup — Domestic Grade 1', field: 7 }
  ]},
  { p: 'I', m: 11, d: '2026-12-24', races: [
    { dist: 1000, text: '0-90', field: 6 },
    { dist: 1200, text: '0-75', field: 14 },
    { dist: 1400, text: '4th & Maiden', field: 7 },
    { dist: 2200, text: 'Alba Cup — Domestic Grade 2', field: 5 }
  ]},
  { p: 'I', m: 12, d: '2027-01-02', races: [
    { dist: 1000, text: '4th & Maiden', field: 10 },
    { dist: 1200, text: 'Al Riffa Cup — Turf Series 80-100', field: 18 },
    { dist: 1600, text: 'Turf Series 0-100', field: null },
    { dist: 2000, text: 'Al Dana Cup — Turf Series 80-100', field: 16 }
  ]},
  { p: 'I', m: 13, d: '2027-01-08', races: [
    { dist: 1200, text: '0-90', field: 13 },
    { dist: 1400, text: '0-70', field: 18 },
    { dist: 1600, text: '4th & Maiden', field: 12 },
    { dist: 2200, text: '0-75', field: 9 }
  ]},
  { p: 'I', m: 14, d: '2027-01-15', races: [
    { dist: 1000, text: 'Al Wasmiya Cup 4yo+ — Domestic Grade 1', field: 13 },
    { dist: 1400, text: 'Southern Governorate Cup 4yo+ — Domestic Grade 1', field: 11 },
    { dist: 1600, text: 'Al Adiyat Cup 4yo+ — Listed', field: 9 },
    { dist: 2000, text: '0-85', field: 12 }
  ]},
  { p: 'I', m: 15, d: '2027-01-22', races: [
    { dist: 1200, text: '4th & Maiden 3yo', field: 9 },
    { dist: 1200, text: '0-75', field: 17 },
    { dist: 1400, text: '4th & Maiden', field: 10 },
    { dist: 1600, text: '0-90', field: 10 },
    { dist: 2200, text: '0-80 APP', field: 9 }
  ]},
  { p: 'I', m: 16, d: '2027-01-28', races: [
    { dist: 1200, text: 'The Hawar Cup — Turf Series 80-100', field: 18 },
    { dist: 1600, text: 'Turf Series 0-100', field: null },
    { dist: 2000, text: 'The Anchorman Cup — Turf Series 80-100', field: 15 },
    { dist: 2600, text: '0-100', field: 8 }
  ]},
  { p: 'I', m: 17, d: '2027-01-29', races: [
    { dist: 1000, text: '0-80', field: 13 },
    { dist: 1400, text: 'Domestic Grade 2', field: 8 },
    { dist: 1600, text: 'Bahrain Mile 4yo+ — Domestic Grade 1', field: 7 },
    { dist: 2000, text: 'Crown Princes Cup 4yo+ — Group 3', field: 8 }
  ]},
  { p: 'I', m: 18, d: '2027-02-05', races: [
    { dist: 1200, text: '0-70', field: 14 },
    { dist: 1400, text: '0-75', field: 17 },
    { dist: 1600, text: '4th & Maiden', field: 8 },
    { dist: 2400, text: '0-85', field: 7 }
  ]},
  { p: 'I', m: 19, d: '2027-02-11', races: [
    { dist: 1200, text: '0-85', field: 17 },
    { dist: 1400, text: '4th & Maiden 3yo', field: 8 },
    { dist: 1600, text: '0-75', field: 14 },
    { dist: 2000, text: '0-95', field: 8 }
  ]},
  { p: 'I', m: 20, d: '2027-02-18', races: [
    { dist: 1200, text: 'Al Sakhir Cup — Turf Series 80-100', field: 18 },
    { dist: 1400, text: 'Sheema Bint Nasser Bin Hamad Al Khalifa Cup — Domestic Grade 1', field: 14 },
    { dist: 1600, text: 'Bahrain Vision Cup — Turf Series 80-100', field: 15 },
    { dist: 2000, text: 'Sh Nasser Bin Hamad Al Khalifa Cup — Listed', field: 10 }
  ]},
  { p: 'I', m: 21, d: '2027-02-25', races: [
    { dist: 1000, text: '0-75 APP', field: 11 },
    { dist: 1200, text: 'Domestic Grade 2', field: 9 },
    { dist: 1400, text: '0-75', field: 17 },
    { dist: 1600, text: '0-80 (3yo+)', field: null },
    { dist: 2200, text: '0-90', field: 12 }
  ]},
  { p: 'I', m: 22, d: '2027-03-04', races: [
    { dist: 1200, text: 'Al Fateh Cup — Turf Series 80-100', field: 17 },
    { dist: 1400, text: 'Maiden 3yo+', field: 11 },
    { dist: 1600, text: 'Turf Series 0-100', field: null },
    { dist: 1800, text: 'The International Handicap — Turf Series 80-100', field: 8 }
  ]},
  { p: 'I', m: 23, d: '2027-03-05', races: [
    { dist: 1000, text: 'Chairmans Cup 4yo+ — Domestic Grade 1', field: 8 },
    { dist: 1600, text: 'Al Methaq Cup 4yo+ — Listed', field: 7 },
    { dist: 1800, text: '0-90', field: 7 },
    { dist: 2200, text: 'Kings Cup 4yo+ — Group 3', field: 9 }
  ]},
  { p: 'I', m: 24, d: '2027-03-12', races: [
    { dist: 1200, text: '4th & Maiden', field: 13 },
    { dist: 1400, text: '0-85', field: 13 },
    { dist: 1600, text: '4th & Maiden', field: 9 },
    { dist: 2200, text: '0-75', field: 12 }
  ]},
  { p: 'I', m: 25, d: '2027-03-19', races: [
    { dist: 1400, text: 'Domestic Grade 2', field: 9 },
    { dist: 1600, text: '0-75 APP', field: 10 },
    { dist: 1800, text: '0-95', field: 11 },
    { dist: 2200, text: '0-90', field: 8 }
  ]},
  { p: 'I', m: 26, d: '2027-03-26', races: [
    { dist: 1200, text: '0-75', field: 15 },
    { dist: 1400, text: 'Domestic Grade 1', field: 9 },
    { dist: 1600, text: '4th & Maiden 3yo', field: 7 },
    { dist: 2000, text: 'REHC Cup — Domestic Grade 2', field: 6 }
  ]},
  { p: 'I', m: 27, d: '2027-04-02', races: [
    { dist: 1200, text: '0-95', field: 12 },
    { dist: 1600, text: '0-95', field: 8 },
    { dist: 2000, text: '0-65', field: 9 }
  ]},
  { p: 'I', m: 28, d: '2027-04-08', races: [
    { dist: 1000, text: '0-65 APP', field: 9 },
    { dist: 1400, text: '0-75', field: null },
    { dist: 1800, text: '0-85', field: 11 }
  ]},
  { p: 'I', m: 29, d: '2027-04-15', races: [
    { dist: 1200, text: '0-85', field: 15 },
    { dist: 1400, text: '4th & Maiden', field: 13 },
    { dist: 2000, text: '0-95', field: 10 }
  ]},
  { p: 'I', m: 30, d: '2027-04-16', races: [
    { dist: 1200, text: 'Champions Sprint — Domestic Grade 1', field: 7 },
    { dist: 1400, text: 'REHC Mile Cup — Domestic Grade 2', field: 10 },
    { dist: 2000, text: 'Bahrain Gold Cup — Domestic Grade 1', field: 6 },
    { dist: 2600, text: 'Stewards Cup — Domestic Grade 2', field: 9 }
  ]},
  { p: 'B', m: 1, d: '2026-10-30', races: [
    { dist: 1400, text: 'All Classes', field: 5 },
    { dist: 1600, text: 'Maiden', field: 17 },
    { dist: 1800, text: '0-35', field: 11 }
  ]},
  { p: 'B', m: 2, d: '2026-11-06', races: [
    { dist: 1200, text: '0-40', field: 10 },
    { dist: 1400, text: 'Maiden F&M', field: 16 },
    { dist: 2200, text: '0-45', field: 7 }
  ]},
  { p: 'B', m: 3, d: '2026-11-13', races: [
    { dist: 1400, text: 'All Classes', field: 8 },
    { dist: 1800, text: 'Domestic Grade 1', field: 7 }
  ]},
  { p: 'B', m: 4, d: '2026-11-20', races: [
    { dist: 1000, text: '0-40', field: 11 },
    { dist: 1400, text: '0-45', field: 11 },
    { dist: 1600, text: '0-35 APP', field: 11 },
    { dist: 1600, text: '4th & Maiden 4yo+', field: 17 },
    { dist: 2200, text: '0-35', field: 10 }
  ]},
  { p: 'B', m: 5, d: '2026-11-26', races: [
    { dist: 1200, text: '4th & Maiden 4yo+', field: 14 },
    { dist: 1600, text: 'Domestic Grade 2', field: 6 },
    { dist: 2200, text: '0-60', field: 6 }
  ]},
  { p: 'B', m: 6, d: '2026-11-27', races: [
    { dist: 1200, text: 'Domestic Grade 2', field: 6 },
    { dist: 1800, text: 'Maiden 4yo+', field: 15 },
    { dist: 2000, text: '0-40', field: 7 }
  ]},
  { p: 'B', m: 7, d: '2026-12-04', races: [
    { dist: 1000, text: 'Maiden', field: 14 },
    { dist: 1400, text: '0-35', field: null },
    { dist: 1800, text: '4th & Maiden', field: 11 },
    { dist: 2000, text: 'All Classes', field: 5 }
  ]},
  { p: 'B', m: 8, d: '2026-12-11', races: [
    { dist: 1200, text: '0-45', field: 14 },
    { dist: 1400, text: '4th & Maiden', field: 10 },
    { dist: 1600, text: '0-40', field: 10 },
    { dist: 2200, text: '0-50', field: 6 }
  ]},
  { p: 'B', m: 9, d: '2026-12-17', races: [
    { dist: 1400, text: 'Maiden 4yo+ F&M', field: 7 },
    { dist: 1800, text: '4th & Maiden', field: 6 }
  ]},
  { p: 'B', m: 10, d: '2026-12-18', races: [
    { dist: 1000, text: 'Domestic Grade 2', field: 7 },
    { dist: 1400, text: '0-65', field: 7 },
    { dist: 2000, text: 'Domestic Grade 2', field: 7 }
  ]},
  { p: 'B', m: 11, d: '2026-12-24', races: [
    { dist: 1200, text: 'Maiden F&M 4yo+', field: 16 },
    { dist: 1400, text: '0-35 APP', field: 11 },
    { dist: 1800, text: '0-45', field: 14 }
  ]},
  { p: 'B', m: 12, d: '2027-01-02', races: [
    { dist: 1000, text: '4th & Maiden', field: 13 },
    { dist: 1800, text: 'Domestic Grade 2 (4yo)', field: 6 },
    { dist: 1800, text: 'Domestic Grade 2 (4yoF)', field: 8 },
    { dist: 2000, text: 'Maiden 4yo+', field: 16 }
  ]},
  { p: 'B', m: 13, d: '2027-01-08', races: [
    { dist: 1200, text: '0-35', field: 18 },
    { dist: 1400, text: 'Maiden 3yo', field: 11 },
    { dist: 2200, text: '0-35', field: 14 }
  ]},
  { p: 'B', m: 14, d: '2027-01-15', races: [
    { dist: 1000, text: '4th & Maiden', field: 16 },
    { dist: 1400, text: '4th & Maiden', field: 15 },
    { dist: 2200, text: '4th & Maiden', field: 12 }
  ]},
  { p: 'B', m: 15, d: '2027-01-22', races: [
    { dist: 1400, text: 'Domestic Grade 2', field: 9 },
    { dist: 1600, text: '0-35', field: 17 },
    { dist: 2200, text: '0-45', field: 16 }
  ]},
  { p: 'B', m: 16, d: '2027-01-28', races: [
    { dist: 1000, text: '0-55', field: 11 },
    { dist: 1400, text: '4th & Maiden', field: 18 },
    { dist: 1600, text: 'Bahrain Oaks — Domestic Grade 1', field: 7 },
    { dist: 1800, text: '0-50', field: 13 }
  ]},
  { p: 'B', m: 17, d: '2027-01-29', races: [
    { dist: 1000, text: 'Domestic Grade 2', field: 6 },
    { dist: 2000, text: 'Crown Princes Cup — Domestic Grade 1', field: 12 },
    { dist: 2000, text: 'Derby 4yo — Domestic Grade 1', field: 6 }
  ]},
  { p: 'B', m: 18, d: '2027-02-05', races: [
    { dist: 1000, text: 'Maiden 3yo', field: 14 },
    { dist: 1200, text: '0-40 APP', field: 11 },
    { dist: 1600, text: '0-45', field: 10 },
    { dist: 1800, text: '0-40', field: 11 }
  ]},
  { p: 'B', m: 19, d: '2027-02-11', races: [
    { dist: 1200, text: 'Domestic Grade 2', field: 5 },
    { dist: 1400, text: '0-45', field: 14 },
    { dist: 1800, text: 'Maiden 4yo+', field: 12 }
  ]},
  { p: 'B', m: 20, d: '2027-02-18', races: [
    { dist: 1600, text: 'Domestic Grade 2', field: 18 },
    { dist: 1600, text: 'Maiden 4yo+', field: 18 },
    { dist: 2200, text: 'Domestic Grade 2', field: 10 }
  ]},
  { p: 'B', m: 21, d: '2027-02-25', races: [
    { dist: 1200, text: '0-45', field: 12 },
    { dist: 1400, text: 'F&M Maiden 3yo+', field: 14 },
    { dist: 2200, text: '0-35', field: 11 }
  ]},
  { p: 'B', m: 22, d: '2027-03-04', races: [
    { dist: 1000, text: '0-40', field: 10 },
    { dist: 1400, text: '4th & Maiden', field: 12 },
    { dist: 1800, text: '0-55', field: 9 }
  ]},
  { p: 'B', m: 23, d: '2027-03-05', races: [
    { dist: 1400, text: 'Domestic Grade 2', field: 6 },
    { dist: 1600, text: '4th & Maiden', field: 10 },
    { dist: 2400, text: 'Kings Cup — Domestic Grade 1', field: 11 }
  ]},
  { p: 'B', m: 24, d: '2027-03-12', races: [
    { dist: 1000, text: '3rd, 4th & Maiden 3yo — Challenge Series', field: 8 },
    { dist: 1400, text: '3rd, 4th & Maiden 3yo — Challenge Series', field: 14 },
    { dist: 1800, text: '0-35', field: 14 }
  ]},
  { p: 'B', m: 25, d: '2027-03-19', races: [
    { dist: 1200, text: '0-35', field: 18 },
    { dist: 1400, text: 'Maiden 4+', field: 14 },
    { dist: 2000, text: '0-60', field: 15 }
  ]},
  { p: 'B', m: 26, d: '2027-03-26', races: [
    { dist: 1200, text: '4th & Maiden 3yo — Challenge Series', field: 10 },
    { dist: 1400, text: '0-40', field: 10 },
    { dist: 1600, text: '4th & Maiden 3yo — Challenge Series', field: 13 },
    { dist: 1800, text: 'Domestic Grade 3', field: 6 }
  ]},
  { p: 'B', m: 27, d: '2027-04-02', races: [
    { dist: 1000, text: '0-40', field: null },
    { dist: 1200, text: '4th & Maiden', field: null },
    { dist: 1600, text: '0-35', field: 13 },
    { dist: 1800, text: '0-55', field: null },
    { dist: 2400, text: '0-40', field: 10 }
  ]},
  { p: 'B', m: 28, d: '2027-04-08', races: [
    { dist: 1000, text: '0-55', field: null },
    { dist: 1200, text: '4yo+ Maiden', field: 10 },
    { dist: 1400, text: '0-50 APP', field: 9 },
    { dist: 1800, text: '0-35', field: null }
  ]},
  { p: 'B', m: 29, d: '2027-04-15', races: [
    { dist: 1000, text: '0-35', field: 13 },
    { dist: 1000, text: 'All Classes 3yo Fillies — Series Final', field: 8 },
    { dist: 1200, text: 'All Classes 3yo — Series Final', field: 10 },
    { dist: 2200, text: '0-55', field: 12 }
  ]},
  { p: 'B', m: 30, d: '2027-04-16', races: [
    { dist: 1000, text: 'Domestic Grade 2', field: null },
    { dist: 1200, text: '0-55 (4yo+)', field: 15 },
    { dist: 1400, text: 'Domestic Grade 2', field: 8 },
    { dist: 2000, text: 'Owners Cup — Domestic Grade 1', field: 7 }
  ]},
  // ---------- WAHO (Arabian Horses) ----------
  { p: 'W', m: 1, d: '2026-10-30', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 2, d: '2026-11-06', races: [
    { dist: 1200, text: 'Maidens / 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 3, d: '2026-11-13', races: [
    { dist: 1200, text: '2nd / 3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 4, d: '2026-11-20', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 5, d: '2026-11-26', races: [
    { dist: 1400, text: '2nd / 3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 6, d: '2026-11-27', races: [
    { dist: 1400, text: '3rd / 4th / Maidens (APP)', field: null }
  ]},
  { p: 'W', m: 7, d: '2026-12-04', races: [
    { dist: 1200, text: 'Maidens / 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 8, d: '2026-12-11', races: [
    { dist: 1400, text: '2nd / 3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 9, d: '2026-12-17', races: [
    { dist: 1200, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 10, d: '2026-12-18', races: [
    { dist: 1600, text: 'H H Sh Khalid Bin Hamad Al Khalifa Cup (All Classes & Maidens)', field: null }
  ]},
  { p: 'W', m: 11, d: '2026-12-24', races: [
    { dist: 1400, text: '2nd / 3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 12, d: '2027-01-02', races: [
    { dist: 1200, text: '4th & Maiden (APP)', field: null }
  ]},
  { p: 'W', m: 13, d: '2027-01-08', races: [
    { dist: 1200, text: 'Maidens / Fillies & Mares', field: null }
  ]},
  { p: 'W', m: 14, d: '2027-01-15', races: [
    { dist: 1400, text: 'H H Sh Isa Bin Salman Al Khalifa Cup (All Classes & Maidens)', field: null }
  ]},
  { p: 'W', m: 15, d: '2027-01-22', races: [
    { dist: 1400, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 16, d: '2027-01-28', races: [
    { dist: 1000, text: '4th & Maiden', field: null }
  ]},
  { p: 'W', m: 17, d: '2027-01-29', races: [
    { dist: 1400, text: 'Crown Prince\u2019s Cup — Domestic Grade 2', field: null }
  ]},
  { p: 'W', m: 18, d: '2027-02-05', races: [
    { dist: 1400, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 19, d: '2027-02-11', races: [
    { dist: 1000, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 20, d: '2027-02-18', races: [
    { dist: 1400, text: 'Domestic Grade 2', field: 18 },
    { dist: 1600, text: 'H H Sh Nasser Bin Hamad Al Khalifa Cup — Domestic Grade 2', field: null }
  ]},
  { p: 'W', m: 21, d: '2027-02-25', races: [
    { dist: 1200, text: 'Maidens / 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 22, d: '2027-03-04', races: [
    { dist: 1000, text: '3rd / 4th / Maidens (APP)', field: null }
  ]},
  { p: 'W', m: 23, d: '2027-03-05', races: [
    { dist: 1600, text: 'King\u2019s Cup — Domestic Grade 1', field: null }
  ]},
  { p: 'W', m: 24, d: '2027-03-12', races: [
    { dist: 1200, text: '3rd / 4th / Maidens — Fillies & Mares', field: null }
  ]},
  { p: 'W', m: 25, d: '2027-03-19', races: [
    { dist: 1200, text: '2nd / 3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 26, d: '2027-03-26', races: [
    { dist: 1200, text: 'Maidens / 4yo & 5yo', field: null }
  ]},
  { p: 'W', m: 27, d: '2027-04-02', races: [
    { dist: 1400, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 28, d: '2027-04-08', races: [
    { dist: 1000, text: '3rd / 4th / Maidens', field: null }
  ]},
  { p: 'W', m: 29, d: '2027-04-15', races: [
    { dist: 1400, text: '4th & Maiden (APP)', field: null }
  ]},
  { p: 'W', m: 30, d: '2027-04-16', races: [
    { dist: 1400, text: 'Al Rouda Cup (All Classes & Maidens)', field: null }
  ]}
];

function categorize(text) {
  const t = text.toUpperCase();
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

// =================================================================
// TOKENS
// =================================================================
const C = {
  cream: '#ECE3D0',
  parchment: '#F7F1E1',
  paper: '#FBF7EA',
  forest: '#1A2E20',
  forestSoft: 'rgba(26,46,32,0.15)',
  forestDim: 'rgba(26,46,32,0.6)',
  ivory: '#F2EBDC',
  gold: '#C8A35C',
  burgundy: '#6B2737',
  rust: '#9C4A2C',
  green: '#1A3D2A'
};

const ACCENTS = {
  gold:     { bg: '#C8A35C', fg: '#1A2E20', soft: 'rgba(200,163,92,0.18)' },
  burgundy: { bg: '#6B2737', fg: '#F2EBDC', soft: 'rgba(107,39,55,0.13)' },
  green:    { bg: '#1A3D2A', fg: '#F2EBDC', soft: 'rgba(26,61,42,0.14)' },
  sage:     { bg: '#7B8A6E', fg: '#F2EBDC', soft: 'rgba(123,138,110,0.20)' },
  teal:     { bg: '#3B6B6B', fg: '#F2EBDC', soft: 'rgba(59,107,107,0.16)' },
  amber:    { bg: '#B5763E', fg: '#F2EBDC', soft: 'rgba(181,118,62,0.16)' },
  rust:     { bg: '#9C4A2C', fg: '#F2EBDC', soft: 'rgba(156,74,44,0.16)' },
  slate:    { bg: '#4A5568', fg: '#F2EBDC', soft: 'rgba(74,85,104,0.16)' },
  sand:     { bg: '#A89370', fg: '#1A2E20', soft: 'rgba(168,147,112,0.22)' },
  olive:    { bg: '#6B7548', fg: '#F2EBDC', soft: 'rgba(107,117,72,0.16)' },
  gray:     { bg: '#8A857C', fg: '#F2EBDC', soft: 'rgba(138,133,124,0.16)' }
};

const FONT_DISPLAY = "Georgia, 'Times New Roman', serif";
const FONT_BODY = "system-ui, -apple-system, 'Segoe UI', sans-serif";
const FONT_MONO = "ui-monospace, 'SF Mono', Menlo, monospace";

// Programme metadata: colour, short label, sort order
const PROGRAMME_META = {
  'Imported':     { color: '#1A3D2A', short: 'IMP',  order: 1 },
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
function exportJSON(rows) {
  downloadFile(JSON.stringify(rows, null, 2), 'rehc-2026-27.json', 'application/json');
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
      'LOCATION:Sakhir Racecourse, Bahrain',
      'END:VEVENT'
    );
  });
  lines.push('END:VCALENDAR');
  downloadFile(lines.join('\r\n'), 'rehc-2026-27.ics', 'text/calendar;charset=utf-8;');
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
        borderRadius: '3px', padding: '18px 18px 16px', overflow: 'hidden',
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

function NextUpHero({ daysToNext, nextMeeting, isMobile }) {
  if (!nextMeeting) return null;
  const marquee = nextMeeting.races.find(r => r.tier <= 2) || nextMeeting.races[0];
  return (
    <div style={{
      position: 'relative', backgroundColor: C.forest, color: C.ivory,
      borderRadius: '4px', overflow: 'hidden',
      boxShadow: '0 8px 30px -12px rgba(26,46,32,0.45)'
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
            Next Up
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
          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(242,235,220,0.75)', fontFamily: FONT_DISPLAY, fontStyle: 'italic', lineHeight: 1.5 }}>
            Featuring <span style={{ color: C.ivory, fontStyle: 'normal', fontWeight: 500 }}>{marquee.text}</span>
            <span style={{ color: 'rgba(242,235,220,0.5)' }}> · {marquee.distance}m</span>
          </p>
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
        </div>
      </div>
    </div>
  );
}

function MeetingCard({ raceDay, isOpen, onToggle, todayIso, isMobile }) {
  const sortedByTier = [...raceDay.races].sort((a, b) => a.tier - b.tier);
  const spineAccent = ACCENTS[sortedByTier[0].accent];
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
      backgroundColor: isOpen ? C.paper : C.parchment,
      border: '1px solid ' + (isOpen ? spineAccent.bg : C.forestSoft),
      borderRadius: '3px', overflow: 'hidden',
      transition: 'all 0.25s ease',
      boxShadow: isOpen ? '0 4px 20px -8px rgba(26,46,32,0.15)' : 'none'
    }}>
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
              color: C.forest, lineHeight: 1.2, marginBottom: '6px'
            }}>
              {dayOfWeek(raceDay.date)}
              {!isMobile && raceDay.meetingNumbers.length > 0 && (
                <span style={{ color: 'rgba(26,46,32,0.4)', marginLeft: '6px', fontStyle: 'normal' }}>
                  · Meeting {raceDay.meetingNumbers.map(m => String(m).padStart(2, '0')).join(' / ')}
                </span>
              )}
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
            {marquee && (
              <span style={{ fontSize: '10px', color: C.gold, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Crown size={11} strokeWidth={2} />
                Feature race
              </span>
            )}
          </div>
        )}
      </button>

      {isOpen && (
        <div style={{ backgroundColor: C.cream, borderTop: '1px solid ' + C.forestSoft, padding: isMobile ? '8px 18px 18px' : '12px 24px 22px' }}>
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
                  <div key={r.id} style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'auto 1fr' : '80px 1fr auto auto',
                    gap: isMobile ? '12px' : '18px',
                    padding: isMobile ? '10px 4px' : '12px 12px',
                    borderBottom: '1px dashed ' + C.forestSoft,
                    alignItems: 'center'
                  }}>
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
            <div style={{ padding: '8px', backgroundColor: '#fff', border: '1px solid ' + C.forestSoft, borderRadius: '3px' }}>
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
                { label: 'JSON', icon: FileJson, fn: () => exportJSON(RACES) },
                { label: 'iCal', icon: CalendarPlus, fn: exportICS },
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
export default function App() {
  const { isMobile, isTablet } = useViewport();
  const [now, setNow] = useState(new Date());
  const [search, setSearch] = useState('');
  const [programme, setProgramme] = useState('All');
  const [activeTypes, setActiveTypes] = useState(new Set());
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [activeTile, setActiveTile] = useState(null);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Print stylesheet
  useEffect(() => {
    if (document.getElementById('rehc-print')) return;
    const s = document.createElement('style');
    s.id = 'rehc-print';
    s.textContent = '@media print { @page { size: A4 portrait; margin: 14mm 12mm; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } body { background: #fff !important; } .rehc-no-print { display: none !important; } }';
    document.head.appendChild(s);
  }, []);

  const todayIso = now.toISOString().slice(0, 10);
  const BLACK_TYPE = ['Group 2','Group 3','Listed'];

  const onTileMeetings = () => {
    if (activeTile === 'meetings') { setActiveTile(null); return; }
    setActiveTile('meetings'); setProgramme('All'); setActiveTypes(new Set()); setSearch('');
  };
  const onTileTotal = () => {
    setActiveTile(null); setProgramme('All'); setActiveTypes(new Set()); setSearch('');
  };
  const onTileBlackType = () => {
    if (activeTile === 'blacktype') { setActiveTile(null); setActiveTypes(new Set()); }
    else { setActiveTile('blacktype'); setActiveTypes(new Set(BLACK_TYPE)); setProgramme('All'); setSearch(''); }
  };
  const onTileSeason = () => {
    setActiveTile(activeTile === 'season' ? null : 'season');
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
        programmes: [...d.programmes].sort(),
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
    return { totalMeetings, totalRaces, blackType, nextDate, daysToNext, totalRaceDays, seasonDays: daysBetween('2026-10-30', '2027-04-16') };
  }, [todayIso]);

  const nextMeeting = useMemo(() => {
    if (!stats.nextDate) return null;
    const races = RACES.filter(r => r.date === stats.nextDate);
    const programmes = [...new Set(races.map(r => r.programme))].sort();
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

      {/* HEADER */}
      <header className="rehc-no-print" style={{ borderBottom: '1px solid ' + C.forestSoft, backgroundColor: C.parchment, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, ' + C.gold + ' 50%, transparent 100%)', opacity: 0.4 }} />
        <div style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Crest size={isMobile ? 48 : 64} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.forestDim, marginBottom: '4px', fontWeight: 700 }}>
                  <span>REHC</span>
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
            <button onClick={() => setShowShare(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', backgroundColor: C.gold, color: C.forest,
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', fontFamily: FONT_BODY,
              boxShadow: '0 2px 8px -3px rgba(200,163,92,0.6)',
              alignSelf: isMobile ? 'stretch' : 'flex-start',
              justifyContent: 'center'
            }}>
              <Share2 size={14} strokeWidth={2} />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="rehc-no-print" style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX + ' 0' }}>
        <NextUpHero daysToNext={stats.daysToNext} nextMeeting={nextMeeting} isMobile={isMobile} />
      </section>

      {/* CLICKABLE STATS */}
      <section className="rehc-no-print" style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX + ' 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <StatCard label="Race Days" value={stats.totalRaceDays} sub={isMobile ? 'Tap to reset filters' : 'Click to view all race days'} icon={Flag} accentColor={C.green} onClick={onTileMeetings} isActive={activeTile === 'meetings'} />
          <StatCard label="Total Races" value={stats.totalRaces} sub={isMobile ? 'Tap to reset' : 'Click to clear filters'} icon={Sparkles} accentColor={C.gold} onClick={onTileTotal} isActive={false} />
          <StatCard label="Black-Type" value={stats.blackType} sub={isMobile ? 'Tap for prestige races' : 'Click to filter to G2 / G3 / Listed'} icon={Award} accentColor={C.burgundy} onClick={onTileBlackType} isActive={activeTile === 'blacktype'} />
          <StatCard label="Season Days" value={stats.seasonDays} sub="30 Oct → 16 Apr" icon={Calendar} accentColor={C.rust} onClick={onTileSeason} isActive={activeTile === 'season'} />
        </div>
      </section>

      {/* FILTERS */}
      <section className="rehc-no-print" style={{ maxWidth: MW, margin: '0 auto', padding: (isMobile ? '20px' : '28px') + ' ' + PX + ' 0' }}>
        <div style={{ backgroundColor: C.parchment, border: '1px solid ' + C.forestSoft, padding: isMobile ? '16px' : '20px', borderRadius: '3px' }}>
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
                <button key={p} onClick={() => setProgramme(p)} style={{
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
              <ToolBtn onClick={() => exportJSON(filtered)} title="Export as JSON">
                <FileJson size={13} strokeWidth={1.8} />
                {!isMobile && 'JSON'}
              </ToolBtn>
              <ToolBtn onClick={exportICS} title="Add all meetings to calendar">
                <CalendarPlus size={13} strokeWidth={1.8} />
                {!isMobile && 'iCal'}
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
        {groupedByDate.length === 0 ? (
          <div style={{ backgroundColor: C.parchment, border: '1px solid ' + C.forestSoft, padding: '64px 24px', textAlign: 'center', borderRadius: '3px' }}>
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
