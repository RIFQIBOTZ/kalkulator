# 📊 TP/SL PROFIT CALCULATOR

> **Professional Trading Calculator with Risk Management & Analytics**  
> _by RIFQI_

[![Version](https://img.shields.io/badge/version-2.6-blue.svg)](https://github.com/yourusername/tp-sl-calculator)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

---

## 🎯 **Tentang Aplikasi**

**TP/SL Profit Calculator** adalah aplikasi web trading calculator yang dirancang untuk membantu trader dalam menghitung profit/loss, mengelola risiko, dan menganalisis performa trading mereka. Aplikasi ini dilengkapi dengan fitur-fitur canggih seperti multiple take profit levels, winrate calculator, risk management dashboard, dan trading history tracker.

### **✨ Kenapa Menggunakan Tools Ini?**

- 🧮 **Perhitungan Akurat** - Hitung TP/SL dengan multiple levels & partial TP
- 📊 **Risk Management** - Monitor daily/weekly loss limits & drawdown
- 📈 **Winrate Analysis** - Monte Carlo simulation untuk prediksi performa
- 📜 **Trading History** - Track & analyze semua trade Anda
- 💰 **Multi Currency** - Support IDR & USD dengan live exchange rate
- 📱 **Responsive Design** - Works on desktop & mobile
- 🎨 **Modern UI** - Dark theme dengan glassmorphism effect

---

## 📸 **Preview**

```
┌─────────────────────────────────────┐
│  📊 Dashboard Ringkasan             │
│  ┌─────────────────────────────┐   │
│  │ BALANCE & PERFORMANCE       │   │
│  │ Rp 102.000                  │   │
│  │ ┌──────┬──────┬──────┬────┐ │   │
│  │ │Modal │Profit│ ROI  │Win │ │   │
│  │ └──────┴──────┴──────┴────┘ │   │
│  └─────────────────────────────┘   │
│                                     │
│  ⚠️ MANAJEMEN RISIKO HARI INI       │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━       │
│  Daily Loss: [▓▓▓░░░] 0.5% / 2%   │
│  Weekly Loss: [▓░░░░░] 0.2% / 5%  │
│  Drawdown: [░░░░░░░] 0.0% / 8%    │
│                                     │
│  🧮 Kalkulator | 📜 Riwayat        │
│  📊 Winrate   | ⚠️ Risiko          │
└─────────────────────────────────────┘
```

---

## 🚀 **Fitur Utama**

### **1. 🧮 Kalkulator TP/SL**
- Multiple Take Profit levels (up to 5 TP)
- Partial TP allocation (custom percentages)
- Risk:Reward ratio calculation
- Position size calculator
- Support LONG & SHORT positions
- Real-time profit/loss calculation

### **2. 📊 Dashboard Ringkasan**
- Current balance display (IDR/USD)
- Net profit & ROI tracking
- Win rate statistics
- Quick stats overview
- Performance metrics

### **3. ⚠️ Risk Management**
- Daily loss limit monitoring (0-2%)
- Weekly loss limit tracking (0-5%)
- Drawdown calculator (max 8%)
- Auto-reset countdown timer
- Visual progress bars
- Risk warnings & alerts

### **4. 📜 Trading History**
- Complete trade log
- Filter by status (Win/Loss/Pending/BE)
- Filter by session (Asia/London/NY)
- Filter by method & signal source
- Export/Import database (JSON)
- Edit & delete trades
- Expandable detail view

### **5. 📊 Winrate Calculator**
- Monte Carlo simulation (1000 runs)
- Expected value calculation
- Equity curve visualization
- Profit/Loss distribution chart
- Best/Worst case scenarios
- Risk of ruin analysis
- Statistical confidence metrics

### **6. 💎 Fitur Tambahan**
- **Auto-format Input** - Titik pemisah ribuan otomatis
- **Live Exchange Rate** - Kurs USD/IDR real-time
- **Local Storage** - Data tersimpan di browser
- **Dark Theme** - Comfortable untuk mata
- **Responsive** - Mobile & desktop friendly
- **Customizable** - Edit dropdown options (metode & sumber sinyal)

---

## 🛠️ **Teknologi yang Digunakan**

### **Frontend:**
- HTML5
- CSS3 (Glassmorphism, Gradient, Animations)
- JavaScript (ES6+)

### **Libraries:**
- [Chart.js](https://www.chartjs.org/) v4.4.1 - Data visualization
- [Google Fonts](https://fonts.google.com/) - Poppins font family

### **API:**
- Multiple exchange rate APIs (Frankfurter, Fawaz, ER-API)
- Fallback system untuk reliability

---

## 📁 **Struktur File**

```
kalkulator/
│
├── index.html              # Main HTML file
├── script.js               # Main JavaScript logic
├── style.css               # Main stylesheet
│
├── js/
│   └── winrate.js          # Winrate calculator module
│
└── css/
    └── winrate.css         # Winrate calculator styles
```

---

## 🔧 **Instalasi & Setup**

### **1. Clone Repository**
```bash
git clone https://github.com/yourusername/tp-sl-calculator.git
cd tp-sl-calculator
```

### **2. Open in Browser**
Tidak perlu build process atau dependencies! Cukup buka `index.html` di browser Anda:

```bash
# Cara 1: Double-click index.html
# Cara 2: Drag & drop ke browser
# Cara 3: Gunakan local server
python -m http.server 8000
# Lalu buka: http://localhost:8000
```

### **3. (Opsional) Deploy ke GitHub Pages**
```bash
# Push ke GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Enable GitHub Pages di Settings > Pages
# Pilih branch: main, folder: / (root)
```

---

## 📖 **Cara Penggunaan**

### **💰 Setup Modal Awal**
1. Klik "✏️ Edit Modal" di dashboard
2. Pilih currency (IDR/USD)
3. Masukkan jumlah modal
4. Klik "Save"

### **🧮 Menghitung TP/SL**
1. Pergi ke menu "Kalkulator"
2. Pilih trading pair (contoh: BTCUSDT)
3. Input entry price & risk percentage
4. Tentukan posisi (LONG/SHORT)
5. Set SL & TP levels
6. Klik "Calculate"
7. Review hasil & klik "Save to History"

### **📊 Menggunakan Winrate Calculator**
1. Pergi ke menu "Winrate Calculator"
2. Input starting equity
3. Set win rate (slider)
4. Input total trades & max entry
5. Set average profit/loss
6. Klik "Calculate Winrate"
7. Review simulasi & statistik

### **📜 Mengelola Riwayat**
1. Pergi ke menu "Riwayat"
2. Filter berdasarkan status/session/method
3. Klik row untuk expand detail
4. Edit/Delete trade jika perlu
5. Export data untuk backup

### **⚠️ Monitoring Risiko**
1. Pergi ke menu "Risiko"
2. Pilih tab (Today/Weekly/Drawdown)
3. Review progress bars & warnings
4. Jangan trade jika mendekati limit!

---

## ⚙️ **Konfigurasi**

### **Mengubah Risk Limits**
Edit di `script.js`:
```javascript
const DAILY_LOSS_LIMIT = 0.02;     // 2% dari modal
const WEEKLY_LOSS_LIMIT = 0.05;    // 5% dari modal
const MAX_DRAWDOWN = 0.08;         // 8% dari peak balance
```

### **Menambah Trading Pair**
Tidak perlu edit code! Cukup ketik pair baru di dropdown kalkulator.

### **Customize Dropdown Options**
1. Pergi ke menu "Risiko"
2. Scroll ke bagian "Manage Dropdown Options"
3. Tambah/Edit/Hapus opsi Metode & Sumber Sinyal

---

## 🔄 **Changelog**

### **v2.6** (2025-12-31)
- ✨ **NEW:** Auto-format balance input dengan titik pemisah ribuan
- 🎯 Consistency dengan winrate calculator starting equity
- 📝 Real-time formatting saat mengetik

### **v2.5** (2025-12-31)
- 🔧 **FIX:** Hamburger button stuck bug (13 comprehensive fixes)
- 🔧 **FIX:** AbortError di fetchKurs function
- 🎯 Auto-recovery hamburger button (max 3 detik)
- 🎯 Modal close observer untuk cleanup
- 🎯 Click/tap anywhere untuk show hamburger

### **v2.4** (2025-12-30)
- ✨ Sidebar navigation system
- ✨ Multiple page content (Ringkasan, Kalkulator, Riwayat, Winrate, Risiko)
- ✨ Hamburger toggle button
- 📊 Dashboard dengan cards & stats
- ⚠️ Risk management dashboard

### **v2.3** (2025-12-29)
- ✨ Winrate calculator dengan Monte Carlo simulation
- 📊 Chart.js integration untuk visualisasi
- 📈 Equity curve & distribution charts
- 🎲 Best/Worst case scenarios

### **v2.2** (2025-12-28)
- ✨ Trading history tracker
- 🔍 Advanced filters (status, session, method, sumber)
- 📤 Export/Import database functionality
- ✏️ Edit & delete trades

### **v2.1** (2025-12-27)
- ✨ Multiple TP levels support (up to 5)
- ✨ Partial TP allocation
- 💰 Risk:Reward ratio calculator
- 📊 Enhanced result display

### **v2.0** (2025-12-26)
- 🎨 Complete UI redesign (dark theme)
- 💎 Glassmorphism & gradient effects
- 📱 Fully responsive design
- 🌐 Multi-currency support (IDR/USD)

### **v1.0** (2025-12-25)
- 🎉 Initial release
- 🧮 Basic TP/SL calculator
- 💰 Position size calculator
- 📊 Simple profit/loss display

---

## 🐛 **Known Issues**

### **Minor Issues:**
- Exchange rate API kadang timeout (ada fallback ke default Rp 15.750)
- Browser lama mungkin tidak support beberapa CSS effect

### **Planned Fixes:**
- Optimize Chart.js untuk mobile performance
- Add dark/light theme toggle
- Add more exchange rate API sources

---

## 🤝 **Contributing**

Contributions are welcome! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### **Ideas for Contribution:**
- [ ] Add more trading pair presets
- [ ] Integrate with exchange APIs (Binance, Bybit, etc)
- [ ] Add notification system
- [ ] Cloud sync untuk backup
- [ ] Add more chart types
- [ ] Multi-language support

---

## 📝 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 RIFQI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 **Author**

**RIFQI**

- GitHub: [@rifqibotz](https://github.com/rifqibotz)
- Website: [rifqibotz.github.io/kalkulator](https://rifqibotz.github.io/kalkulator)
- Email: your.email@example.com

---

## 🙏 **Acknowledgments**

- [Chart.js](https://www.chartjs.org/) - Amazing charting library
- [Google Fonts](https://fonts.google.com/) - Poppins font family
- [Exchange Rate APIs](https://frankfurter.app/) - Free currency API
- Inspired by professional trading platforms

---

## 📊 **Statistics**

![GitHub Stars](https://img.shields.io/github/stars/yourusername/tp-sl-calculator?style=social)
![GitHub Forks](https://img.shields.io/github/forks/yourusername/tp-sl-calculator?style=social)
![GitHub Issues](https://img.shields.io/github/issues/yourusername/tp-sl-calculator)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/yourusername/tp-sl-calculator)

---

## 💡 **Tips & Best Practices**

### **Risk Management:**
- ❌ **Jangan** trade jika daily loss mendekati 2%
- ❌ **Jangan** trade jika weekly loss mendekati 5%
- ❌ **Jangan** trade jika drawdown mendekati 8%
- ✅ **Selalu** patuhi risk limits
- ✅ **Gunakan** winrate calculator untuk planning

### **Using Multiple TP:**
- TP1: 30-40% (quick profit)
- TP2: 30-40% (mid-term)
- TP3: 20-30% (long-term)
- TP4-5: Optional untuk runner

### **Position Sizing:**
- Risiko max 1-2% per trade
- Max 3x entry untuk averaging (hati-hati!)
- Sesuaikan dengan equity & risk tolerance

---

## 🔮 **Roadmap**

### **v3.0 (Planned)**
- [ ] Cloud backup & sync
- [ ] Multi-device support
- [ ] Advanced statistics & analytics
- [ ] Trading journal dengan notes
- [ ] Performance comparison (vs benchmark)

### **v3.1 (Future)**
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Exchange API integration

---

## ❓ **FAQ**

**Q: Apakah data saya aman?**  
A: Ya! Semua data tersimpan di browser Anda (localStorage). Tidak ada data yang dikirim ke server.

**Q: Apakah bisa digunakan offline?**  
A: Ya untuk semua fitur kecuali live exchange rate (akan gunakan default Rp 15.750).

**Q: Bagaimana cara backup data?**  
A: Pergi ke menu Riwayat → Export Database → Save file JSON.

**Q: Apakah gratis?**  
A: Ya, 100% gratis dan open source!

**Q: Bisa request fitur baru?**  
A: Tentu! Buka issue di GitHub atau contact author.

---

## 📞 **Support**

Jika Anda mengalami masalah atau punya pertanyaan:

1. Check [Known Issues](#-known-issues) section
2. Search [GitHub Issues](https://github.com/yourusername/tp-sl-calculator/issues)
3. Open new issue dengan detail:
   - Browser & version
   - Screenshot jika ada
   - Steps to reproduce

---

## ⭐ **Show Your Support**

Jika tools ini membantu Anda, please:

- ⭐ Star repository ini
- 🍴 Fork & contribute
- 📢 Share ke teman trader lainnya
- 💖 Consider donating untuk support development

---

<div align="center">

### **Made with ❤️ by RIFQI**

**Happy Trading! 📈💰**

[⬆ Back to Top](#-tpsl-profit-calculator)

</div>
