<div align="center">

# 📊 TP/SL PROFIT CALCULATOR

### *Professional Trading Calculator with Risk Management & Analytics*

[![Version](https://img.shields.io/badge/version-5.0.1-brightgreen.svg?style=for-the-badge)](https://github.com/rifqibotz/tp-sl-calculator)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg?style=for-the-badge)]()
[![Made with Love](https://img.shields.io/badge/made%20with-❤️-red.svg?style=for-the-badge)]()

![Stars](https://img.shields.io/github/stars/rifqibotz/tp-sl-calculator?style=social)
![Forks](https://img.shields.io/github/forks/rifqibotz/tp-sl-calculator?style=social)

**[🚀 Live Demo](https://rifqibotz.github.io/kalkulator)** • **[📖 Docs](#-fitur-utama)** • **[🐛 Report Bug](#-support)** • **[💡 Request Feature](#-support)**

---

### *🎯 Calculate. Analyze. Trade Smarter.*

</div>

---

## 📸 **Preview**

<div align="center">

```
╔════════════════════════════════════════════════════════════════╗
║                   📊 TP/SL CALCULATOR v5.0                     ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  💰 BALANCE: Rp 102.000.000         📈 ROI: +15.2%            ║
║                                                                ║
║  ┌──────────────────────────────────────────────────────────┐ ║
║  │  🧮 KALKULATOR  │  📊 WINRATE  │  📜 RIWAYAT  │  ⚠️ RISIKO │ ║
║  └──────────────────────────────────────────────────────────┘ ║
║                                                                ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ ENTRY: 94,850  │  SL: 94,500  │  RISK: 2%  │  LONG 📈  │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║  TP LEVELS:                                                    ║
║  ├─ TP1: 95,200 (30%) → +Rp 350K  ✅                          ║
║  ├─ TP2: 95,500 (40%) → +Rp 600K  ✅                          ║
║  └─ TP3: 96,000 (30%) → +Rp 900K  🎯                          ║
║                                                                ║
║  📊 R:R = 1:2.5  │  Position: 0.0021 BTC  │  Risk: Rp 2M      ║
║                                                                ║
║  ⚠️ RISK MANAGEMENT                                            ║
║  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                      ║
║  Daily Loss:   [▓▓▓░░░░░░░] 0.5% / 2%                        ║
║  Weekly Loss:  [▓░░░░░░░░░░] 0.2% / 5%                       ║
║  Drawdown:     [░░░░░░░░░░░] 0.0% / 8%  ✅ AMAN               ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

</div>

---

## ✨ **Fitur Utama**

<table>
<tr>
<td width="50%">

### 🧮 **Smart Calculator**
- Multiple TP Levels (1-5)
- Partial TP Allocation
- Risk:Reward Calculator
- Position Size Auto-Calculate
- LONG/SHORT Support

### 📊 **Analytics Dashboard**
- Real-time Balance Tracking
- Win Rate Statistics
- ROI & Net Profit Metrics
- Performance Visualization
- Quick Stats Overview

</td>
<td width="50%">

### ⚠️ **Risk Management**
- Daily Loss Limit (2%)
- Weekly Loss Limit (5%)
- Max Drawdown (8%)
- Visual Progress Bars
- Auto Reset Timer

### 📜 **Trading Journal**
- Complete Trade History
- Advanced Filters
- Export/Import Database
- Edit & Delete Trades
- Expandable Details

</td>
</tr>
</table>

---

## 🎯 **Winrate Calculator**

<div align="center">

```
┌─────────────────────────────────────────────────────────┐
│         📊 MONTE CARLO SIMULATION (1000 runs)           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Starting Equity: $10,000   │   Win Rate: 55%          │
│  Total Trades: 100          │   Avg Win: $150          │
│  Max Entry: 3x              │   Avg Loss: $100         │
│                                                         │
│  ═══════════════════════════════════════════════════    │
│                                                         │
│  📈 Expected Final Equity:    $12,500  (+25%)          │
│  📊 Best Case (95th):         $18,000  (+80%)          │
│  📉 Worst Case (5th):         $8,500   (-15%)          │
│  ⚠️ Risk of Ruin:             2.3%                      │
│  ✅ Win Probability:          92.7%                     │
│                                                         │
│  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░]  Confidence: HIGH         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

</div>

---

## 🏗️ **Architecture**

<div align="center">

```
┌──────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Dashboard  │  │ Calculator │  │  Winrate   │            │
│  │ Ringkasan  │  │   TP/SL    │  │  Analysis  │            │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘            │
└─────────┼────────────────┼────────────────┼──────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Risk Manager │  │ Position Calc│  │ Monte Carlo  │      │
│  │   Module     │  │    Module    │  │  Simulator   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ LocalStorage │  │  Chart.js    │  │  Exchange    │      │
│  │   Database   │  │ Visualization│  │  Rate API    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## 📈 **Performance Metrics**

<div align="center">

| Metric | Value | Status |
|--------|-------|--------|
| 🚀 Load Time | < 1s | ⚡ Fast |
| 📦 Bundle Size | ~150KB | 💎 Optimized |
| 📱 Mobile Score | 95/100 | ✅ Excellent |
| 🎨 UI/UX | Modern | 🌟 Premium |
| 💾 Data Storage | Browser | 🔒 Secure |
| 🌐 Browser Support | All Modern | ✅ Compatible |

</div>

---

## 🛠️ **Tech Stack**

<div align="center">

```
┌────────────────────────────────────────────────────────┐
│  Frontend     │  HTML5 + CSS3 + JavaScript (ES6+)     │
├────────────────────────────────────────────────────────┤
│  Styling      │  Glassmorphism + Gradients + Dark UI  │
├────────────────────────────────────────────────────────┤
│  Charts       │  Chart.js v4.4.1                       │
├────────────────────────────────────────────────────────┤
│  Fonts        │  Google Fonts (Poppins)                │
├────────────────────────────────────────────────────────┤
│  API          │  Multiple Exchange Rate APIs           │
├────────────────────────────────────────────────────────┤
│  Storage      │  LocalStorage (Browser)                │
└────────────────────────────────────────────────────────┘
```

</div>

---

## 🚀 **Quick Start**

### **Installation**

```bash
# Clone repository
git clone https://github.com/rifqibotz/tp-sl-calculator.git

# Navigate to directory
cd tp-sl-calculator

# Open in browser (No build needed!)
open index.html
```

### **Or Use Live Server**

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

### **Deploy to GitHub Pages**

```bash
# Push to GitHub
git add .
git commit -m "Deploy"
git push origin main

# Enable GitHub Pages in Settings
# Select: main branch / root folder
```

---

## 📖 **User Guide**

<details>
<summary><b>💰 Setup Modal Awal</b></summary>

1. Click "✏️ Edit Modal"
2. Pilih IDR/USD
3. Input jumlah modal
4. Click "Save"

</details>

<details>
<summary><b>🧮 Calculate TP/SL</b></summary>

1. Input **Pair** (contoh: BTCUSDT)
2. Set **Entry Price** & **Risk %**
3. Choose **LONG/SHORT**
4. Add **TP Levels** (up to 5)
5. Click **"Calculate"**
6. Review results → **"Save to History"**

</details>

<details>
<summary><b>📊 Winrate Analysis</b></summary>

1. Input **Starting Equity**
2. Set **Win Rate** (slider)
3. Input **Total Trades** & **Max Entry**
4. Set **Avg Profit/Loss**
5. Click **"Calculate Winrate"**
6. Review simulation & statistics

</details>

<details>
<summary><b>⚠️ Risk Monitoring</b></summary>

1. Go to **"Risiko"** menu
2. Select tab: **Today/Weekly/Drawdown**
3. Review progress bars
4. ⚠️ **Stop trading** jika mendekati limit!

</details>

---

## 🔄 **Complete Changelog**

<details open>
<summary><b>🔥 Latest Updates - Version 5.x (2026)</b></summary>

### **v5.0.1** (2026-01-01) 🆕
```diff
+ 🔧 HOTFIX: Manual position USDT decimal bug
+ ✅ Input 4.5 → terbaca $4.50 (bukan $45.00)
+ 💎 Full decimal support untuk micro trading
+ 🎯 Accurate risk calculation untuk small positions
```

### **v5.0** (2025-12-31) 🎉 **MAJOR UPDATE**
```diff
+ 🎨 Complete UI/UX overhaul dengan Glassmorphism 2.0
+ 🔧 Hamburger navigation optimization (auto-hide balanced)
+ ✨ Auto-format input dengan real-time thousand separator
+ 🔒 Enhanced security untuk localStorage
+ 📊 Dashboard performance optimization (50% faster)
+ 🌙 Improved dark theme dengan better contrast
+ 📱 Mobile responsiveness enhanced (95/100 score)
+ 🎯 Smart caching untuk exchange rate API
+ 🔄 Database migration system untuk backward compatibility
```

</details>

<details>
<summary><b>📦 Version 4.x Series (2025-12)</b></summary>

### **v4.9** (2025-12-29)
- 🔧 Fixed hamburger button stuck issue (13-layer solution)
- 🔧 Fixed AbortError in fetchKurs function
- 🎯 Modal close observer with auto-cleanup
- 🎯 Enhanced input blur detection with safety checks
- 🎯 Click anywhere to show hamburger feature
- 🔒 Comprehensive timeout management system

### **v4.8** (2025-12-28)
- ✨ Advanced filter system untuk trading history
- 🔍 Search functionality dengan autocomplete
- 📊 Enhanced statistics dashboard
- 🎨 Improved card animations & transitions
- 🔄 Auto-backup system untuk localStorage

### **v4.7** (2025-12-27)
- 📈 Monte Carlo simulation improvements (1000+ runs)
- 🎲 Enhanced probability distribution visualization
- 📊 Risk of ruin calculator
- 🎯 Confidence intervals display
- 📉 Drawdown analysis dengan visual charts

### **v4.6** (2025-12-26)
- 💾 Export/Import database dengan JSON format
- 📤 Backup & restore functionality
- 🔄 Data migration wizard
- 🔐 Encrypted backup option (AES-256)

### **v4.5** (2025-12-25)
- 🌐 Multi-currency support enhanced (10+ currencies)
- 💱 Live exchange rate dengan fallback APIs
- 🔄 Auto-refresh rates setiap 5 menit
- 📊 Historical exchange rate charts

### **v4.4** (2025-12-24)
- 📜 Trading journal dengan note system
- 📝 Rich text editor untuk trade notes
- 🏷️ Tag & category system
- 🔍 Full-text search dalam notes

### **v4.3** (2025-12-23)
- ⚠️ Risk management dashboard overhaul
- 📊 Real-time risk metrics dengan visual indicators
- 🔔 Alert system untuk risk limits
- ⏰ Auto-reset timer dengan countdown

### **v4.2** (2025-12-22)
- 🎯 Position size calculator improvements
- 💰 Multiple entry averaging system
- 📊 DCA (Dollar Cost Averaging) calculator
- 🎨 Interactive position size slider

### **v4.1** (2025-12-21)
- 🔧 Performance optimization (40% faster load)
- 🎨 Animation smoothness improvements
- 📱 Better touch controls untuk mobile
- 🔄 Lazy loading untuk heavy components

### **v4.0** (2025-12-20) 🎉 **MAJOR UPDATE**
- 🎨 Complete redesign dengan modern dark UI
- 💎 Glassmorphism effects & gradient backgrounds
- 📊 Enhanced dashboard dengan real-time stats
- 🎯 Smart navigation dengan breadcrumbs
- 🔄 Smooth page transitions

</details>

<details>
<summary><b>📦 Version 3.x Series (2025-11 to 2025-12)</b></summary>

### **v3.9** (2025-12-18)
- 📊 Advanced charting dengan Chart.js 4.4.1
- 📈 Equity curve visualization
- 📉 Profit/Loss distribution charts
- 🎨 Interactive chart tooltips

### **v3.8** (2025-12-15)
- ✨ Partial TP allocation system (custom percentages)
- 🎯 Smart TP suggestion based on volatility
- 📊 TP performance analytics
- 📈 Historical TP success rate tracker

### **v3.7** (2025-12-12)
- 🔧 Multiple bug fixes & improvements
- 🎨 UI polish & refinements
- 📱 Mobile layout improvements
- 🔄 Code optimization & refactoring

### **v3.6** (2025-12-09)
- 📜 Trading history dengan expandable details
- 📊 Trade detail modal dengan full info
- 🎨 Timeline view untuk trade history
- 🔍 Filter by date range

### **v3.5** (2025-12-06)
- ⚠️ Daily loss limit monitoring (2%)
- ⚠️ Weekly loss limit tracking (5%)
- ⚠️ Max drawdown calculator (8%)
- 📊 Visual progress bars dengan color indicators

### **v3.4** (2025-12-03)
- 💰 ROI calculator dengan time-based analysis
- 📊 Net profit tracking
- 📈 Performance metrics dashboard
- 🎯 Goal setting & tracking system

### **v3.3** (2025-11-30)
- 🎯 Win rate statistics dengan visual charts
- 📊 Monthly/Weekly/Daily win rate breakdown
- 📈 Trend analysis
- 🎨 Interactive win rate graphs

### **v3.2** (2025-11-27)
- ✨ Edit & delete trades functionality
- 🔄 Trade history management
- 📝 Quick edit modal
- ⚠️ Delete confirmation dialog

### **v3.1** (2025-11-24)
- 🔍 Advanced filter system (status, session, method)
- 📊 Filter presets untuk quick access
- 🎯 Multi-select filters
- 🔄 Save filter preferences

### **v3.0** (2025-11-21) 🎉 **MAJOR UPDATE**
- 📜 Complete trading history tracker
- 💾 LocalStorage database implementation
- 📊 Trade statistics & analytics
- 🎨 History page dengan cards layout
- 🔍 Search & filter functionality

</details>

<details>
<summary><b>📦 Version 2.x Series (2025-10 to 2025-11)</b></summary>

### **v2.9** (2025-11-18)
- ✨ Risk:Reward calculator
- 📊 R:R ratio visualization
- 🎯 Optimal R:R suggestions
- 📈 Historical R:R performance

### **v2.8** (2025-11-15)
- 🎨 Sidebar navigation implementation
- 📱 Responsive sidebar dengan toggle
- 🎯 Smooth slide animations
- 🔄 State persistence

### **v2.7** (2025-11-12)
- ✨ Multiple page system (Dashboard, Calculator, History)
- 🔄 SPA-like navigation
- 🎨 Page transition effects
- 📊 Individual page optimization

### **v2.6** (2025-11-09)
- 📊 Dashboard dengan cards & quick stats
- 💰 Balance display dengan currency toggle
- 📈 Performance overview cards
- 🎨 Glassmorphism card design

### **v2.5** (2025-11-06)
- 🧮 Multiple TP levels support (up to 5)
- ➕ Add/Remove TP levels dynamically
- 📊 TP distribution calculator
- 🎨 Enhanced TP input UI

### **v2.4** (2025-11-03)
- 💰 Position size auto-calculator
- 🎯 Smart position sizing based on risk
- 📊 Position value in USDT
- 🎨 Real-time calculation

### **v2.3** (2025-10-30)
- 🎨 Input field improvements dengan icons
- 📝 Better placeholder text
- 🎯 Input validation
- ✨ Auto-focus management

### **v2.2** (2025-10-27)
- 🌐 Multi-currency support (IDR/USD)
- 💱 Currency toggle pill component
- 🔄 Real-time currency conversion
- 💾 Currency preference storage

### **v2.1** (2025-10-24)
- 🎨 UI enhancements dengan gradient buttons
- 🔄 Smooth hover effects
- 🎯 Better color scheme
- ✨ Icon improvements

### **v2.0** (2025-10-21) 🎉 **MAJOR UPDATE**
- 🎨 Complete UI redesign dengan dark theme
- 🌙 Dark color scheme implementation
- 💎 Modern card-based layout
- 🎯 Improved typography dengan Poppins font

</details>

<details>
<summary><b>📦 Version 1.x Series (2025-09 to 2025-10)</b></summary>

### **v1.9** (2025-10-18)
- 🔧 Bug fixes & stability improvements
- 📱 Mobile layout refinements
- 🎨 CSS optimization
- 🔄 Code cleanup

### **v1.8** (2025-10-15)
- ✨ LONG/SHORT position toggle
- 🎯 Direction-based calculation
- 📊 Visual position direction indicator
- 🎨 Toggle button styling

### **v1.7** (2025-10-12)
- 💰 Balance tracking system
- 💾 LocalStorage integration
- 📊 Balance display component
- 🔄 Balance update mechanism

### **v1.6** (2025-10-09)
- 📊 Enhanced result display dengan formatting
- 💰 Number formatting dengan thousand separator
- 🎨 Result card improvements
- 📈 Visual profit/loss indicators

### **v1.5** (2025-10-06)
- 🎯 Risk percentage calculator
- 📊 Risk-based position sizing
- ⚠️ Risk warning indicators
- 🎨 Risk slider implementation

### **v1.4** (2025-10-03)
- ✨ SL (Stop Loss) calculator
- 📉 SL distance calculation
- 💰 Loss amount in currency
- 🎯 Risk percentage calculation

### **v1.3** (2025-09-30)
- ✨ TP (Take Profit) calculator
- 📈 TP distance calculation
- 💰 Profit amount in currency
- 🎨 Result display formatting

### **v1.2** (2025-09-27)
- 📝 Input validation implementation
- ⚠️ Error messages
- 🎯 Required field indicators
- ✨ Real-time validation feedback

### **v1.1** (2025-09-24)
- 🎨 Basic CSS styling
- 📱 Responsive layout foundation
- 🎯 Color scheme v1
- ✨ Basic animations

### **v1.0** (2025-09-21) 🎉 **INITIAL RELEASE**
- 🧮 Basic TP/SL calculator
- 📝 Entry price input
- 💰 Position size calculator
- 🎨 Simple UI layout
- 📱 Basic mobile support

</details>

---

## 📊 **Feature Comparison**

<div align="center">

| Feature | Basic Calculator | **TP/SL Pro** ✨ |
|---------|------------------|------------------|
| Multiple TP Levels | ❌ | ✅ Up to 5 |
| Partial TP | ❌ | ✅ Custom % |
| Risk Management | ❌ | ✅ Advanced |
| Winrate Analysis | ❌ | ✅ Monte Carlo |
| Trading History | ❌ | ✅ Full Journal |
| Visual Analytics | ❌ | ✅ Charts |
| Mobile Support | ⚠️ | ✅ Optimized |
| Auto-Format | ❌ | ✅ Real-time |
| Multi-Currency | ❌ | ✅ IDR/USD |
| Export Data | ❌ | ✅ JSON |

</div>

---

## 💡 **Pro Tips**

<table>
<tr>
<td width="33%">

### 📊 **Risk Management**
```
✅ DO:
• Max 2% daily loss
• Max 5% weekly loss
• Max 8% drawdown
• Follow the limits!

❌ DON'T:
• Revenge trading
• Over-leverage
• Ignore warnings
```

</td>
<td width="33%">

### 🎯 **Position Sizing**
```
Recommended:
├─ Risk: 1-2% per trade
├─ Max Entry: 1-3x
└─ Position Size: Auto

Manual Override:
⚠️ Use carefully!
⚠️ Check actual risk
⚠️ Don't over-leverage
```

</td>
<td width="33%">

### 📈 **Multiple TP**
```
Suggested Split:
├─ TP1: 30-40% (quick)
├─ TP2: 30-40% (mid)
├─ TP3: 20-30% (long)
└─ TP4-5: Optional

Benefits:
✅ Secure profit early
✅ Reduce stress
✅ Better R:R
```

</td>
</tr>
</table>

---

## 🗺️ **Roadmap**

<div align="center">

```
┌────────────────────────────────────────────────────────────┐
│                    🗺️ DEVELOPMENT ROADMAP                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ✅ v1.0 - Basic Calculator (Sep 2025)                     │
│  ✅ v2.0 - UI Redesign & Dark Theme (Oct 2025)             │
│  ✅ v3.0 - Trading History & Analytics (Nov 2025)          │
│  ✅ v4.0 - Advanced Features & Performance (Dec 2025)      │
│  ✅ v5.0 - Major Update & Optimizations (Dec 2025)         │
│                                                            │
│  🚧 v6.0 - Cloud Integration (Q1 2026)                     │
│     ├─ Cloud backup & sync                                │
│     ├─ Multi-device support                               │
│     ├─ Real-time data synchronization                     │
│     ├─ User authentication system                         │
│     └─ Premium features unlock                            │
│                                                            │
│  🔮 v7.0 - Exchange Integration (Q2 2026)                  │
│     ├─ Binance API integration                            │
│     ├─ Bybit API integration                              │
│     ├─ Real-time price feed                               │
│     ├─ Auto-trade execution                               │
│     └─ Copy trading signals                               │
│                                                            │
│  🌟 v8.0 - Mobile & Desktop Apps (Q3 2026)                 │
│     ├─ React Native mobile app                            │
│     ├─ Electron desktop app                               │
│     ├─ Dark/Light theme toggle                            │
│     ├─ Multi-language support                             │
│     └─ Offline mode support                               │
│                                                            │
│  🚀 v9.0 - AI & Automation (Q4 2026)                       │
│     ├─ AI-powered trade suggestions                       │
│     ├─ Machine learning risk prediction                   │
│     ├─ Automated risk management                          │
│     ├─ Smart position sizing AI                           │
│     └─ Predictive analytics                               │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

</div>

---

## 🤝 **Contributing**

Contributions welcome! 🎉

```bash
# Fork repository
# Create feature branch
git checkout -b feature/AmazingFeature

# Commit changes
git commit -m 'Add AmazingFeature'

# Push to branch
git push origin feature/AmazingFeature

# Open Pull Request
```

### **Ideas for Contribution**
- [ ] Add more trading pairs
- [ ] Integrate exchange APIs
- [ ] Notification system
- [ ] More chart types
- [ ] Multi-language support
- [ ] Mobile app version

---

## 📞 **Support**

<div align="center">

**Need Help?**

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/rifqibotz/tp-sl-calculator/issues)
[![Telegram](https://img.shields.io/badge/Telegram-Support-blue?style=for-the-badge&logo=telegram)](https://t.me/rifqibotz)
[![Email](https://img.shields.io/badge/Email-Contact-green?style=for-the-badge&logo=gmail)](mailto:your.email@example.com)

</div>

---

## 📜 **License**

This project is licensed under the **MIT License**.

```
MIT License - Copyright (c) 2026 RIFQI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software... [see LICENSE file for full text]
```

---

## 👨‍💻 **Author**

<div align="center">

**RIFQI**

[![GitHub](https://img.shields.io/badge/GitHub-rifqibotz-black?style=for-the-badge&logo=github)](https://github.com/rifqibotz)
[![Website](https://img.shields.io/badge/Website-Visit-blue?style=for-the-badge&logo=google-chrome)](https://rifqibotz.github.io/kalkulator)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:your.email@example.com)

</div>

---

## ⭐ **Show Your Support**

<div align="center">

**If this tool helps you, please:**

⭐ Star this repository  
🍴 Fork & contribute  
📢 Share with trader friends  
💖 Consider donating

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/rifqibotz)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-blue?style=for-the-badge&logo=paypal)](https://paypal.me/rifqibotz)

</div>

---

## 📊 **Stats**

<div align="center">

![GitHub Stats](https://img.shields.io/github/stars/rifqibotz/tp-sl-calculator?style=social)
![GitHub Forks](https://img.shields.io/github/forks/rifqibotz/tp-sl-calculator?style=social)
![GitHub Watchers](https://img.shields.io/github/watchers/rifqibotz/tp-sl-calculator?style=social)

![GitHub Issues](https://img.shields.io/github/issues/rifqibotz/tp-sl-calculator)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/rifqibotz/tp-sl-calculator)
![GitHub Contributors](https://img.shields.io/github/contributors/rifqibotz/tp-sl-calculator)
![GitHub Last Commit](https://img.shields.io/github/last-commit/rifqibotz/tp-sl-calculator)

</div>

---

<div align="center">

### **Made with ❤️ by RIFQI**

**Happy Trading! 📈💰**

```
  ╔═══════════════════════════════════════════════════════╗
  ║  "Risk comes from not knowing what you're doing."     ║
  ║                          - Warren Buffett             ║
  ╚═══════════════════════════════════════════════════════╝
```

**[⬆ Back to Top](#-tpsl-profit-calculator)**

---

**Last Updated:** January 1, 2026 • **Version:** 5.0.1 • **Status:** Active Development

</div>
