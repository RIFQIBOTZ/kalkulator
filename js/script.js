// ===================== VARIABLES & INITIALIZATION =====================
// ============================================================
// FIREBASE FIRESTORE INTEGRATION - CLOUD STORAGE
// ============================================================
// <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> REAL IMPLEMENTATION - Direct connection to Firestore!
// ============================================================

const FIREBASE_CONFIG={'apiKey':'AIzaSyDrz7JT7RWRFgN2ErIjPsI2N5cNUplLPhM','authDomain':'journal-4268a.firebaseapp.com','projectId':'journal-4268a','storageBucket':'journal-4268a.firebasestorage.app','messagingSenderId':'1077845167972','appId':'1:1077845167972:web:94af0289a062b5d1bb3471','measurementId':'G-J9EBS740DJ'};globalThis['FIREBASE_CONFIG']=FIREBASE_CONFIG;

const FIRESTORE_CONFIG = {
    collectionName: "trading_data",
    enabled: localStorage.getItem('firestoreEnabled') === 'true' || false
};

// Firebase & Firestore instances
let firebaseApp = null;
let firestoreDB = null;
let isFirebaseReady = false;

// ===================== FIREBASE INITIALIZATION =====================

async function initFirebase() {
    try {
        // Check if Firebase SDK is loaded
        if (typeof firebase === 'undefined') {
            console.log('<svg class="icon-svg icon-clock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
</svg> Loading Firebase SDK...');
            return false;
        }

        // Initialize Firebase App
        if (!firebaseApp) {
            firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
            console.log('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Firebase App initialized');
        }

        // Initialize Firestore
        if (!firestoreDB) {
            firestoreDB = firebase.firestore();
            console.log('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Firestore initialized');
        }

        isFirebaseReady = true;
        return true;
    } catch (error) {
        console.error('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Firebase initialization failed:', error);
        isFirebaseReady = false;
        return false;
    }
}

// ===================== FIRESTORE OPERATIONS =====================

async function saveToFirestore(documentId, data) {
    if (!FIRESTORE_CONFIG.enabled || !isFirebaseReady) {
        return false;
    }

    try {
        const docRef = firestoreDB.collection(FIRESTORE_CONFIG.collectionName).doc(documentId);
        await docRef.set({
            data: data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        console.log(`<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Saved to Firestore: ${documentId}`);
        return true;
    } catch (error) {
        console.error('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Firestore save failed:', error);
        return false;
    }
}

async function getFromFirestore(documentId) {
    if (!FIRESTORE_CONFIG.enabled || !isFirebaseReady) {
        return null;
    }

    try {
        const docRef = firestoreDB.collection(FIRESTORE_CONFIG.collectionName).doc(documentId);
        const doc = await docRef.get();

        if (doc.exists) {
            console.log(`<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Retrieved from Firestore: ${documentId}`);
            return doc.data().data;
        } else {
            console.log(`<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Document not found: ${documentId}`);
            return null;
        }
    } catch (error) {
        console.error('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Firestore get failed:', error);
        return null;
    }
}

async function syncToCloud() {
    if (!FIRESTORE_CONFIG.enabled) {
        showToast('📴 Cloud sync is disabled');
        return false;
    }

    if (!isFirebaseReady) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Firebase not ready. Please wait...');
        await initFirebase();
        if (!isFirebaseReady) {
            showToast('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Firebase initialization failed!');
            return false;
        }
    }

    try {
        showToast('<svg class="icon-svg icon-cloud" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c27b0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(156, 39, 176, 0.5));">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
</svg> Syncing to cloud...');

        // Get all data from localStorage
        const dataToSync = {
            tpslHistory: localStorage.getItem('tpslHistory') || '[]',
            initialBalance: localStorage.getItem('initialBalance') || '0',
            peakBalance: localStorage.getItem('peakBalance') || '0',
            currencyPreference: localStorage.getItem('currencyPreference') || 'idr',
            metodeOptions: localStorage.getItem('metodeOptions') || '[]',
            sumberOptions: localStorage.getItem('sumberOptions') || '[]'
        };

        // Save to Firestore as a single document
        const userId = 'user_' + (localStorage.getItem('userId') || 'default');
        await saveToFirestore(userId, dataToSync);

        localStorage.setItem('lastCloudSync', new Date().toISOString());
        
        showToast('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Synced to cloud successfully!');
        return true;
    } catch (error) {
        console.error('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Cloud sync failed:', error);
        showToast('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Cloud sync failed! Check console.');
        return false;
    }
}

async function syncFromCloud() {
    if (!FIRESTORE_CONFIG.enabled) {
        showToast('📴 Cloud sync is disabled');
        return false;
    }

    if (!isFirebaseReady) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Firebase not ready. Please wait...');
        await initFirebase();
        if (!isFirebaseReady) {
            showToast('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Firebase initialization failed!');
            return false;
        }
    }

    try {
        if (!confirm('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> This will replace local data with cloud data. Continue?')) {
            return false;
        }

        showToast('<svg class="icon-svg icon-cloud" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c27b0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(156, 39, 176, 0.5));">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
</svg> Syncing from cloud...');

        // Get data from Firestore
        const userId = 'user_' + (localStorage.getItem('userId') || 'default');
        const cloudData = await getFromFirestore(userId);

        if (!cloudData) {
            showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> No cloud data found!');
            return false;
        }

        // Save to localStorage
        if (cloudData.tpslHistory) {
            localStorage.setItem('tpslHistory', cloudData.tpslHistory);
        }
        if (cloudData.initialBalance) {
            localStorage.setItem('initialBalance', cloudData.initialBalance);
        }
        if (cloudData.peakBalance) {
            localStorage.setItem('peakBalance', cloudData.peakBalance);
        }
        if (cloudData.currencyPreference) {
            localStorage.setItem('currencyPreference', cloudData.currencyPreference);
            currentCurrency = cloudData.currencyPreference;
        }
        if (cloudData.metodeOptions) {
            localStorage.setItem('metodeOptions', cloudData.metodeOptions);
        }
        if (cloudData.sumberOptions) {
            localStorage.setItem('sumberOptions', cloudData.sumberOptions);
        }

        localStorage.setItem('lastCloudSync', new Date().toISOString());

        // Refresh UI
        initializeDropdownOptions();
        loadHistory();
        updateStats();
        updateCurrentBalanceDisplay();
        updatePositionSize();
        updateFilterCounts();
        updateRiskDashboard();

        showToast('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Synced from cloud successfully!');
        return true;
    } catch (error) {
        console.error('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Cloud sync failed:', error);
        showToast('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Cloud sync failed! Check console.');
        return false;
    }
}

function toggleFirestoreSync() {
    FIRESTORE_CONFIG.enabled = !FIRESTORE_CONFIG.enabled;
    localStorage.setItem('firestoreEnabled', FIRESTORE_CONFIG.enabled.toString());

    updateSyncToggle();

    if (FIRESTORE_CONFIG.enabled) {
        showToast('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Cloud sync enabled');
        initFirebase();
    } else {
        showToast('📴 Cloud sync disabled');
    }
}

function updateSyncToggle() {
    const toggleBtn = document.getElementById('btnToggleSync');
    const uploadBtn = document.getElementById('btnSyncToCloud');
    const downloadBtn = document.getElementById('btnSyncFromCloud');

    if (toggleBtn) {
        if (FIRESTORE_CONFIG.enabled) {
            toggleBtn.classList.add('active');
            toggleBtn.textContent = '<svg class="icon-svg icon-cloud" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c27b0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(156, 39, 176, 0.5));">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
</svg> Cloud Sync: ON';
            if (uploadBtn) uploadBtn.style.display = 'inline-block';
            if (downloadBtn) downloadBtn.style.display = 'inline-block';
        } else {
            toggleBtn.classList.remove('active');
            toggleBtn.textContent = '<svg class="icon-svg icon-cloud" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9c27b0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(156, 39, 176, 0.5));">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
</svg> Cloud Sync: OFF';
            if (uploadBtn) uploadBtn.style.display = 'none';
            if (downloadBtn) downloadBtn.style.display = 'none';
        }
    }
}

// Export functions for use in script.js
window.firebaseSync = {
    init: initFirebase,
    syncToCloud: syncToCloud,
    syncFromCloud: syncFromCloud,
    toggle: toggleFirestoreSync,
    updateToggle: updateSyncToggle
};

const form = document.getElementById('calcForm');
const results = document.getElementById('results');
let currentKurs = 0;
let lastCalculation = null;
let selectedStatus = null;
let currentEditIndex = null;
let currentFilter = 'all';
let usePartialTP = false;
let tpLevels = [];
let currentEditTradeIndex = null;
let currentCurrency = localStorage.getItem('currencyPreference') || 'idr';
let modalCurrency = 'idr';
let maxEntryMultiplier = 3;
let hasInitialCalculation = false;

// 🆕 UPDATED VARIABLES FOR MANUAL POSITION
let useManualPosition = false;
let manualPositionUSDT = 0;
let manualPositionSize = 0;
let recommendedPositionSize = 0;
let recommendedPositionUSDT = 0;
let pendingCalculation = null;

// 🆕 NEW VARIABLES FOR RISK MANAGEMENT
let currentPage = localStorage.getItem('currentPage') || 'ringkasan';
let riskTab = 'today';

// History sort order
let historySortOrder = localStorage.getItem('historySortOrder') || 'newest'; // 'newest' atau 'oldest'

// ===================== HELPER FUNCTIONS =====================
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseNumber(str) {
    return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

function getRiskPercent() {
    const riskSelect = document.getElementById('riskPercent');
    return parseFloat(riskSelect.value) / 100;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===================== NAVIGATION =====================
function showPage(pageName, updateHistory = true) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(`page${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`);
    if (page) {
        page.classList.add('active');
        currentPage = pageName;
        localStorage.setItem('currentPage', pageName);
        
        // <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> NEW: Update URL without page reload
        if (updateHistory) {
            const newUrl = `/kalkulator/${pageName}`;
            history.pushState({ page: pageName }, '', newUrl);
            console.log('📍 URL updated to:', newUrl);
        }
    }
    
    // Update nav active state
    document.querySelectorAll('.sidebar-item').forEach(nav => {
        nav.classList.remove('active');
    });

    document.querySelector(`.sidebar-item[data-nav="${pageName}"]`)?.classList.add('active');
    
    // Update specific page content if needed
    if (pageName === 'ringkasan' || pageName === 'risiko') {
        updateRiskDashboard();
        // 🆕 TAMBAHKAN INI:
        initializeRecapFilters(); // Refresh dropdown options
    } else if (pageName === 'riwayat') {
        // 🆕 UPDATED: Panggil populateHistoryFilters()
        populateHistoryFilters();
        loadHistory();
        updateStats();
        updateFilterCounts();
    }
    // 🆕 NEW: Add winrate page handling
    else if (pageName === 'winrate') {
        // No special action needed, winrate.js will handle its own initialization
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showRiskTab(tabName) {
    // Update active tab
    document.querySelectorAll('.risk-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.risk-tab[data-tab="${tabName}"]`)?.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.risk-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show target tab content
    const content = document.querySelector(`[data-content="${tabName}"]`);
    if (content) {
        content.classList.add('active');
    }
    
    // Update data if needed
    if (tabName === 'today') {
        loadTodayData();
    } else if (tabName === 'weekly') {
        loadWeeklyData();
    } else if (tabName === 'drawdown') {
        loadDrawdownData();
    }
    
    riskTab = tabName;
}

// ===================== SIDEBAR TOGGLE FUNCTIONALITY =====================
function toggleSidebar() {
    const sidebar = document.getElementById('sidebarNav');
    const mainContent = document.getElementById('mainContent');
    const hamburger = document.getElementById('hamburgerBtn');
    
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('expanded');
    hamburger.classList.toggle('active');
}

// ===================== DROPDOWN MANAGEMENT SYSTEM =====================
function initializeDropdownOptions() {
    if (!localStorage.getItem('metodeOptions')) {
        const defaultMetode = ['Breakout', 'Retest', 'Reversal', 'Trend Following'];
        localStorage.setItem('metodeOptions', JSON.stringify(defaultMetode));
    }
    
    if (!localStorage.getItem('sumberOptions')) {
        const defaultSumber = ['Analisa Sendiri', 'Sinyal A', 'Sinyal B', 'Sinyal C'];
        localStorage.setItem('sumberOptions', JSON.stringify(defaultSumber));
    }
    
    updateDropdownSelects();
    renderDropdownLists();
}

function updateDropdownSelects() {
    const metodeSelect = document.getElementById('metode');
    const sumberSelect = document.getElementById('sumberSignal');
    
    // Update Metode
    const metodeOptions = JSON.parse(localStorage.getItem('metodeOptions') || '[]');
    metodeSelect.innerHTML = '<option value="">-- Pilih Metode --</option>';
    metodeOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.toLowerCase().replace(/\s+/g, '-');
        opt.textContent = option;
        metodeSelect.appendChild(opt);
    });
    
    // Update Sumber Sinyal
    const sumberOptions = JSON.parse(localStorage.getItem('sumberOptions') || '[]');
    sumberSelect.innerHTML = '<option value="">-- Pilih Sumber --</option>';
    sumberOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.toLowerCase().replace(/\s+/g, '-');
        opt.textContent = option;
        sumberSelect.appendChild(opt);
    });
}

function renderDropdownLists() {
    renderMetodeList();
    renderSumberList();
}

function renderMetodeList() {
    const metodeOptions = JSON.parse(localStorage.getItem('metodeOptions') || '[]');
    const metodeList = document.getElementById('metodeList');
    
    metodeList.innerHTML = metodeOptions.map(option => {
        const key = option.toLowerCase().replace(/\s+/g, '-');
        return `
        <div class="dropdown-item">
            <span class="dropdown-item-name">${option}</span>
            <div class="dropdown-item-actions">
                <button class="btn-edit-option" onclick="editDropdownOption('metode', '${key}', '${option}')"><svg class="icon-svg icon-edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
</svg></button>
                <button class="btn-delete-option" onclick="deleteDropdownOption('metode', '${option}')"><svg class="icon-svg icon-trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(244, 67, 54, 0.5));">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
</svg></button>
            </div>
        </div>
        `;
    }).join('');
}

function renderSumberList() {
    const sumberOptions = JSON.parse(localStorage.getItem('sumberOptions') || '[]');
    const sumberList = document.getElementById('sumberList');
    
    sumberList.innerHTML = sumberOptions.map((option, index) => {
        const key = option.toLowerCase().replace(/\s+/g, '-');
        const isDefault = index === 0;
        
        return `
        <div class="dropdown-item">
            <span class="dropdown-item-name">${option}</span>
            <div class="dropdown-item-actions">
                ${!isDefault ? `<button class="btn-edit-option" onclick="editDropdownOption('sumber', '${key}', '${option}')"><svg class="icon-svg icon-edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
</svg></button>` : ''}
                <button class="btn-delete-option ${isDefault ? 'disabled' : ''}" 
                        onclick="deleteDropdownOption('sumber', '${option}')" 
                        ${isDefault ? 'disabled' : ''}>
                    ${isDefault ? '<svg class="icon-svg icon-lock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(158, 158, 158, 0.5));">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
</svg>' : '<svg class="icon-svg icon-trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(244, 67, 54, 0.5));">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
</svg>'}
                </button>
            </div>
        </div>
        `;
    }).join('');
}

function addDropdownOption(type) {
    const typeName = type === 'metode' ? 'Metode' : 'Sumber Sinyal';
    const newOption = prompt(`Tambah ${typeName} baru:`);
    
    if (!newOption || newOption.trim() === '') return;
    
    const storageKey = type === 'metode' ? 'metodeOptions' : 'sumberOptions';
    const options = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    if (options.includes(newOption.trim())) {
        showToast(`<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> ${typeName} "${newOption}" sudah ada!`);
        return;
    }
    
    options.push(newOption.trim());
    localStorage.setItem(storageKey, JSON.stringify(options));
    
    updateDropdownSelects();
    renderDropdownLists();
    showToast(`<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> ${typeName} "${newOption}" ditambahkan!`);
}

function deleteDropdownOption(type, option) {
    const storageKey = type === 'metode' ? 'metodeOptions' : 'sumberOptions';
    const typeName = type === 'metode' ? 'Metode' : 'Sumber Sinyal';
    
    // Prevent deleting "Analisa Sendiri"
    if (type === 'sumber' && option === 'Analisa Sendiri') {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> "Analisa Sendiri" tidak bisa dihapus!');
        return;
    }
    
    if (!confirm(`Hapus ${typeName} "${option}"?`)) return;
    
    let options = JSON.parse(localStorage.getItem(storageKey) || '[]');
    options = options.filter(opt => opt !== option);
    localStorage.setItem(storageKey, JSON.stringify(options));
    
    updateDropdownSelects();
    renderDropdownLists();
    showToast(`<svg class="icon-svg icon-trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(244, 67, 54, 0.5));">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
</svg> ${typeName} "${option}" dihapus!`);
}
// ===================== EDIT DROPDOWN OPTION FUNCTIONS =====================

/**
 * Edit dropdown option dengan modal
 */
function editDropdownOption(type, oldKey, oldValue) {
    const typeName = type === 'metode' ? 'Metode' : 'Sumber Sinyal';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'edit-dropdown-modal show';
    modal.innerHTML = `
        <div class="edit-dropdown-content">
            <h3><svg class="icon-svg icon-edit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
</svg> Edit ${typeName}</h3>
            <input type="text" class="edit-dropdown-input" id="editDropdownInput" value="${oldValue}" placeholder="Enter new name">
            <div class="modal-buttons">
                <button class="modal-btn cancel" id="btnCancelEdit">Cancel</button>
                <button class="modal-btn confirm" id="btnConfirmEdit">Save</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus input
    const input = document.getElementById('editDropdownInput');
    input.focus();
    input.select();
    
    // Cancel button
    document.getElementById('btnCancelEdit').onclick = () => {
        modal.remove();
    };
    
    // Confirm button
    document.getElementById('btnConfirmEdit').onclick = () => {
        const newValue = input.value.trim();
        
        if (!newValue) {
            showToast('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Nama tidak boleh kosong!');
            return;
        }
        
        if (newValue === oldValue) {
            showToast('ℹ️ Tidak ada perubahan');
            modal.remove();
            return;
        }
        
        // Check duplicate
        const storageKey = type === 'metode' ? 'metodeOptions' : 'sumberOptions';
        const options = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        if (options.includes(newValue)) {
            showToast(`<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> ${typeName} "${newValue}" sudah ada!`);
            return;
        }
        
        // Confirm if there are existing trades using this option
        const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
        const fieldName = type === 'metode' ? 'metode' : 'sumberSignal';
        const affectedTrades = history.filter(t => t[fieldName] === oldKey);
        
        if (affectedTrades.length > 0) {
            const confirmMsg = `<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Ada ${affectedTrades.length} trade menggunakan "${oldValue}".\n\nSemua trade akan diupdate ke "${newValue}".\n\nLanjutkan?`;
            
            if (!confirm(confirmMsg)) {
                return;
            }
        }
        
        // Perform update
        performDropdownEdit(type, oldKey, oldValue, newValue);
        modal.remove();
    };
    
    // Enter key to save
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('btnConfirmEdit').click();
        }
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

/**
 * Perform the actual edit operation
 */
function performDropdownEdit(type, oldKey, oldValue, newValue) {
    const storageKey = type === 'metode' ? 'metodeOptions' : 'sumberOptions';
    const fieldName = type === 'metode' ? 'metode' : 'sumberSignal';
    const typeName = type === 'metode' ? 'Metode' : 'Sumber Sinyal';
    
    // 1. Update options list
    let options = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const index = options.indexOf(oldValue);
    
    if (index !== -1) {
        options[index] = newValue;
        localStorage.setItem(storageKey, JSON.stringify(options));
    }
    
    // 2. Update all affected trades in history
    let history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const newKey = newValue.toLowerCase().replace(/\s+/g, '-');
    
    let updatedCount = 0;
    history.forEach(trade => {
        if (trade[fieldName] === oldKey) {
            trade[fieldName] = newKey;
            updatedCount++;
        }
    });
    
    if (updatedCount > 0) {
        localStorage.setItem('tpslHistory', JSON.stringify(history));
    }
    
    // 3. Update UI
    updateDropdownSelects();
    renderDropdownLists();
    
    // Refresh history if on history page
    if (currentPage === 'riwayat') {
        populateHistoryFilters();
        loadHistory();
    }
    
    // Refresh recap if on ringkasan page
    if (currentPage === 'ringkasan') {
        calculateRecapBySumber();
        calculateRecapByMetode();
    }
    
    showToast(`<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> ${typeName} "${oldValue}" berhasil diubah menjadi "${newValue}"!${updatedCount > 0 ? ` (${updatedCount} trade diupdate)` : ''}`);
}

// ===================== RISK MANAGEMENT FUNCTIONS =====================
function calculateTodayLoss() {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const today = new Date().toDateString();
    
    const todayTrades = history.filter(trade => {
        if (trade.status !== 'hit-sl') return false;
        if (trade.slInProfit) return false;
        
        const tradeDate = new Date(trade.timestamp).toDateString();
        return tradeDate === today;
    });
    
    const totalLoss = todayTrades.reduce((sum, trade) => sum + trade.loss, 0);
    return { totalLoss, trades: todayTrades };
}

function calculateWeeklyLoss() {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    weekStart.setHours(0, 0, 0, 0);
    
    const weeklyTrades = history.filter(trade => {
        if (trade.status !== 'hit-sl') return false;
        if (trade.slInProfit) return false;
        
        const tradeDate = new Date(trade.timestamp);
        return tradeDate >= weekStart;
    });
    
    const totalLoss = weeklyTrades.reduce((sum, trade) => sum + trade.loss, 0);
    return { totalLoss, trades: weeklyTrades };
}

function calculateDrawdown() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    let peakBalance = parseFloat(localStorage.getItem('peakBalance') || initialBalance.toString());
    const currentBalance = calculateCurrentBalance();
    
    // Update peak jika current balance lebih tinggi
    if (currentBalance > peakBalance) {
        peakBalance = currentBalance;
        localStorage.setItem('peakBalance', currentBalance.toString());
    }
    
    // 🆕 FIX #4: Formula drawdown yang benar
    // Drawdown = (Peak - Current) / Peak × 100%
    // Jika Current > Peak, drawdown = 0% (tidak ada drawdown)
    let drawdownPercent = 0;
    
    if (currentBalance < peakBalance) {
        drawdownPercent = ((peakBalance - currentBalance) / peakBalance) * 100;
    }
    // Else: currentBalance >= peakBalance → drawdown = 0%
    
    return {
        drawdownPercent: Math.max(0, drawdownPercent),  // Ensure non-negative
        peakBalance: peakBalance,
        currentBalance: currentBalance
    };
}

/**
 * Recalculate peak balance dari seluruh history
 * Dipanggil saat delete trade atau import database
 */
function recalculatePeakBalance() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    
    // Start dari initial balance
    let peakBalance = initialBalance;
    let currentEquity = initialBalance;
    
    // Sort history by timestamp
    const sortedHistory = [...history].sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
    );
    
    // Simulate balance changes dan track peak
    sortedHistory.forEach(trade => {
        if (trade.status === 'hit-tp') {
            currentEquity += trade.profit;
        } else if (trade.status === 'hit-sl') {
            if (trade.slInProfit) {
                currentEquity += trade.loss;
            } else {
                currentEquity -= trade.loss;
            }
        } else if (trade.status === 'partial') {
            if (trade.usePartialTP && trade.tpLevels) {
                const hitTPs = trade.tpLevels.filter(tp => tp.status === 'hit');
                currentEquity += hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
            }
        }
        
        // Update peak jika equity lebih tinggi
        if (currentEquity > peakBalance) {
            peakBalance = currentEquity;
        }
    });
    
    // Save new peak balance
    localStorage.setItem('peakBalance', peakBalance.toString());
    console.log(`<svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Peak balance recalculated: ${formatRupiah(peakBalance)}`);
    
    return peakBalance;
}

function validateRiskLimits() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    if (initialBalance === 0) return [];
    
    const { totalLoss: todayLoss } = calculateTodayLoss();
    const { totalLoss: weeklyLoss } = calculateWeeklyLoss();
    const { drawdownPercent } = calculateDrawdown();
    
    const dailyLimit = initialBalance * 0.02;
    const weeklyLimit = initialBalance * 0.05;
    const drawdownLimit = 8;
    
    const warnings = [];
    
    // Check daily limit
    const dailyUsage = (todayLoss / dailyLimit) * 100;
    if (dailyUsage >= 100) {
        warnings.push({
            level: 'critical',
            type: 'daily',
            message: `🚫 <strong>LIMIT HARIAN TERCAPAI (2%)</strong><br><br>
                Anda sudah mencapai batas kerugian harian.<br>
                Loss hari ini: <strong>${formatRupiah(todayLoss)}</strong><br>
                Limit: <strong>${formatRupiah(dailyLimit)}</strong><br><br>
                <em>Disarankan STOP trading hari ini sesuai framework NAC.</em>`
        });
    } else if (dailyUsage >= 80) {
        warnings.push({
            level: 'warning',
            type: 'daily',
            message: `<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> <strong>MENDEKATI LIMIT HARIAN</strong><br><br>
                Anda sudah menggunakan <strong>${dailyUsage.toFixed(1)}%</strong> dari limit harian.<br>
                Loss hari ini: <strong>${formatRupiah(todayLoss)}</strong><br>
                Sisa limit: <strong>${formatRupiah(dailyLimit - todayLoss)}</strong><br><br>
                <em>Berhati-hatilah dengan trade berikutnya!</em>`
        });
    }
    
    // Check weekly limit
    const weeklyUsage = (weeklyLoss / weeklyLimit) * 100;
    if (weeklyUsage >= 100) {
        warnings.push({
            level: 'critical',
            type: 'weekly',
            message: `🚫 <strong>LIMIT MINGGUAN TERCAPAI (5%)</strong><br><br>
                Anda sudah mencapai batas kerugian mingguan.<br>
                Loss minggu ini: <strong>${formatRupiah(weeklyLoss)}</strong><br>
                Limit: <strong>${formatRupiah(weeklyLimit)}</strong><br><br>
                <em>STOP trading hingga minggu depan sesuai framework NAC.</em>`
        });
    } else if (weeklyUsage >= 80) {
        warnings.push({
            level: 'warning',
            type: 'weekly',
            message: `<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> <strong>MENDEKATI LIMIT MINGGUAN</strong><br><br>
                Anda sudah menggunakan <strong>${weeklyUsage.toFixed(1)}%</strong> dari limit mingguan.<br>
                Loss minggu ini: <strong>${formatRupiah(weeklyLoss)}</strong><br>
                Sisa limit: <strong>${formatRupiah(weeklyLimit - weeklyLoss)}</strong>`
        });
    }
    
    // Check drawdown
    if (drawdownPercent >= drawdownLimit) {
        warnings.push({
            level: 'critical',
            type: 'drawdown',
            message: `⛔ <strong>DRAWDOWN KRITIS (8%)</strong><br><br>
                Drawdown Anda: <strong>${drawdownPercent.toFixed(2)}%</strong><br><br>
                <em>SEMUA AKTIVITAS TRADING DIHENTIKAN.<br>
                Evaluasi penuh diperlukan sesuai framework NAC.</em>`
        });
    } else if (drawdownPercent >= 6) {
        warnings.push({
            level: 'warning',
            type: 'drawdown',
            message: `<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> <strong>DRAWDOWN TINGGI</strong><br><br>
                Drawdown Anda: <strong>${drawdownPercent.toFixed(2)}%</strong> / 8%<br>
                Mendekati batas maksimal!<br><br>
                <em>Pertimbangkan untuk mengurangi risk per trade.</em>`
        });
    }
    
    return warnings;
}

function showRiskWarningModal(warnings) {
    const modal = document.getElementById('riskWarningModal');
    const warningBody = document.getElementById('warningBody');
    
    // Build warning messages
    const warningHTML = warnings.map(warning => `
        <div class="warning-message ${warning.level}">
            ${warning.message}
        </div>
    `).join('<hr style="border-color: rgba(255, 165, 0, 0.3); margin: 15px 0;">');

    warningBody.innerHTML = warningHTML;
    modal.classList.add('show');
    
    // Setup button handlers
    const cancelBtn = modal.querySelector('#btnCancelRisk');
    const proceedBtn = modal.querySelector('#btnProceedRisk');
    
    cancelBtn.onclick = () => {
        modal.classList.remove('show');
        pendingCalculation = null;
    };
    
    proceedBtn.onclick = () => {
        modal.classList.remove('show');
        if (pendingCalculation) {
            proceedWithCalculation(true);
        }
        pendingCalculation = null;
    };
}

// ===================== RISK DASHBOARD UPDATE =====================
function updateRiskDashboard() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    if (initialBalance === 0) return;
    
    const { totalLoss: todayLoss, trades: todayTrades } = calculateTodayLoss();
    const { totalLoss: weeklyLoss, trades: weeklyTrades } = calculateWeeklyLoss();
    const { drawdownPercent, peakBalance, currentBalance } = calculateDrawdown();
    
    const dailyLimit = initialBalance * 0.02;
    const weeklyLimit = initialBalance * 0.05;
    
    // Update Dashboard Cards
    // Big Balance
    document.getElementById('bigBalanceDisplay').textContent = formatRupiah(currentBalance);
    document.getElementById('modalAwalValue').textContent = formatRupiah(initialBalance);
    
    const netProfit = calculateNetProfitLoss();
    document.getElementById('netProfitValue').textContent = formatRupiah(netProfit);
    document.getElementById('netProfitValue').className = netProfit >= 0 ? 'stat-mini-value positive' : 'stat-mini-value negative';
    
    const roi = calculateROI();
    document.getElementById('roiValueMini').textContent = `${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%`;
    document.getElementById('roiValueMini').className = roi >= 0 ? 'stat-mini-value positive' : 'stat-mini-value negative';
    
    // Update progress bars & percentages
    const dailyUsage = Math.min((todayLoss / dailyLimit) * 100, 100);
    const weeklyUsage = Math.min((weeklyLoss / weeklyLimit) * 100, 100);
    const drawdownUsage = Math.min((drawdownPercent / 8) * 100, 100);
    
    // Update Daily
    updateProgressBar('dailyProgress', dailyUsage);
    document.getElementById('dailyPercentage').textContent = `${dailyUsage.toFixed(1)}% / 2%`;
    document.getElementById('dailyAmount').textContent = `${formatRupiah(todayLoss)} / ${formatRupiah(dailyLimit)}`;
    
    // Update Weekly
    updateProgressBar('weeklyProgress', weeklyUsage);
    document.getElementById('weeklyPercentage').textContent = `${weeklyUsage.toFixed(1)}% / 5%`;
    document.getElementById('weeklyAmount').textContent = `${formatRupiah(weeklyLoss)} / ${formatRupiah(weeklyLimit)}`;
    
    // Update Drawdown
    updateProgressBar('drawdownProgress', drawdownUsage);
    document.getElementById('drawdownPercentage').textContent = `${drawdownPercent.toFixed(2)}% / 8%`;
    updateDrawdownStatus(drawdownPercent);
    
    // Update Quick Stats
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const closedTrades = history.filter(t => t.status && t.status !== 'running');
    const wonTrades = closedTrades.filter(t => t.status === 'hit-tp' || t.status === 'partial');
    const lostTrades = closedTrades.filter(t => t.status === 'hit-sl' && !t.slInProfit);
    const runningTrades = history.filter(t => t.status === 'running');
    
    document.getElementById('quickTotalTrades').textContent = history.length;
    document.getElementById('quickWinTrades').textContent = wonTrades.length;
    document.getElementById('quickLossTrades').textContent = lostTrades.length;
    document.getElementById('quickRunningTrades').textContent = runningTrades.length;
    
    // Win Rate
    const winRate = closedTrades.length > 0 ? ((wonTrades.length / closedTrades.length) * 100).toFixed(1) : 0;
    document.getElementById('winRateValueMini').textContent = `${winRate}%`;
    
    // Update countdown
    updateResetCountdown();
    
    // If on risk page, update the specific tab
    if (currentPage === 'risiko') {
        if (riskTab === 'today') {
            loadTodayData();
        } else if (riskTab === 'weekly') {
            loadWeeklyData();
        } else if (riskTab === 'drawdown') {
            loadDrawdownData();
        }
    }
    
    // 🆕 UPDATE: Calculate recap if on ringkasan page
    if (currentPage === 'ringkasan') {
        calculateRecapBySumber();
        calculateRecapByMetode();
    }
}

function updateProgressBar(id, percentage) {
    const progressBar = document.getElementById(id);
    if (!progressBar) return;
    
    progressBar.style.width = percentage + '%';
    
    // Change color based on usage
    if (percentage >= 80) {
        progressBar.classList.add('critical');
        progressBar.classList.remove('warning');
    } else if (percentage >= 50) {
        progressBar.classList.add('warning');
        progressBar.classList.remove('critical');
    } else {
        progressBar.classList.remove('warning', 'critical');
    }
}

function updateDrawdownStatus(drawdownPercent) {
    const statusElement = document.getElementById('drawdownStatus');
    if (!statusElement) return;
    
    if (drawdownPercent >= 8) {
        statusElement.textContent = '⛔ KRITIS';
        statusElement.style.color = '#ff3366';
    } else if (drawdownPercent >= 6) {
        statusElement.textContent = '<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Tinggi';
        statusElement.style.color = '#ffa500';
    } else if (drawdownPercent >= 4) {
        statusElement.textContent = '<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Waspada';
        statusElement.style.color = '#ffd700';
    } else {
        statusElement.textContent = '<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Aman';
        statusElement.style.color = '#00ff88';
    }
}

function updateResetCountdown() {
    const countdownElement = document.getElementById('resetCountdown');
    if (!countdownElement) return;
    
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    countdownElement.textContent = `Reset otomatis: ${hours} jam ${minutes} menit lagi`;
    
    // Update next reset info in settings tab
    const nextResetInfo = document.getElementById('nextResetInfo');
    if (nextResetInfo) {
        const nextMonday = new Date(now);
        const daysUntilMonday = (7 - now.getDay() + 1) % 7 || 7;
        nextMonday.setDate(now.getDate() + daysUntilMonday);
        nextMonday.setHours(0, 0, 0, 0);
        
        const weeklyDiff = nextMonday - now;
        const weeklyHours = Math.floor(weeklyDiff / (1000 * 60 * 60));
        const weeklyMinutes = Math.floor((weeklyDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        nextResetInfo.innerHTML = `
            Next daily reset: ${hours} jam ${minutes} menit lagi<br>
            Next weekly reset: ${weeklyHours} jam ${weeklyMinutes} menit lagi
        `;
    }
}

// ===================== RISK TAB DATA LOADERS =====================
function loadTodayData() {
    const { totalLoss, trades } = calculateTodayLoss();
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    const dailyLimit = initialBalance * 0.02;
    
    // Update date
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('todayDate').textContent = today.toLocaleDateString('id-ID', options);
    
    // Update summary
    document.getElementById('dailyLimitValue').textContent = '2%';
    document.getElementById('dailyMaxLoss').textContent = formatRupiah(dailyLimit);
    
    // Render loss trades
    const listContainer = document.getElementById('lossTradesToday');
    if (trades.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon"><svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg></span>
                <p>Tidak ada loss hari ini</p>
            </div>
        `;
    } else {
        listContainer.innerHTML = trades.map(trade => `
            <div class="loss-trade-item">
                <span class="loss-trade-pair">${trade.pair}</span>
                <span class="loss-trade-amount">-${formatRupiah(trade.loss)}</span>
            </div>
        `).join('');
    }
    
    // Update totals
    const usage = (totalLoss / dailyLimit) * 100;
    document.getElementById('dailyTotalAmount').textContent = formatRupiah(totalLoss);
    document.getElementById('dailyTotalLimit').textContent = formatRupiah(dailyLimit);
    updateProgressBar('dailyTotalProgress', usage);
    document.getElementById('dailyTotalPercentage').textContent = `${usage.toFixed(1)}% / 2%`;
    
    // Show/hide warning
    const warningBox = document.getElementById('dailyWarningBox');
    if (usage >= 80) {
        warningBox.style.display = 'block';
    } else {
        warningBox.style.display = 'none';
    }
}

function loadWeeklyData() {
    const { totalLoss, trades } = calculateWeeklyLoss();
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    const weeklyLimit = initialBalance * 0.05;
    
    // Update summary
    document.getElementById('weeklyLimitValue').textContent = '5%';
    document.getElementById('weeklyMaxLoss').textContent = formatRupiah(weeklyLimit);
    
    // Render loss trades
    const listContainer = document.getElementById('lossTradesWeekly');
    if (trades.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon"><svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg></span>
                <p>Tidak ada loss minggu ini</p>
            </div>
        `;
    } else {
        listContainer.innerHTML = trades.map(trade => `
            <div class="loss-trade-item">
                <span class="loss-trade-pair">${trade.pair}</span>
                <span class="loss-trade-amount">-${formatRupiah(trade.loss)}</span>
            </div>
        `).join('');
    }
    
    // Update totals
    const usage = (totalLoss / weeklyLimit) * 100;
    document.getElementById('weeklyTotalAmount').textContent = formatRupiah(totalLoss);
    document.getElementById('weeklyTotalLimit').textContent = formatRupiah(weeklyLimit);
    updateProgressBar('weeklyTotalProgress', usage);
    document.getElementById('weeklyTotalPercentage').textContent = `${usage.toFixed(1)}% / 5%`;
    
    // Show/hide warning
    const warningBox = document.getElementById('weeklyWarningBox');
    if (usage >= 80) {
        warningBox.style.display = 'block';
    } else {
        warningBox.style.display = 'none';
    }
}

function loadDrawdownData() {
    const { drawdownPercent, peakBalance, currentBalance } = calculateDrawdown();
    
    document.getElementById('ddPeakBalance').textContent = formatRupiah(peakBalance);
    document.getElementById('ddCurrentBalance').textContent = formatRupiah(currentBalance);
    document.getElementById('ddPercent').textContent = `${drawdownPercent.toFixed(2)}%`;
    
    const usage = (drawdownPercent / 8) * 100;
    updateProgressBar('ddProgressBar', usage);
    document.getElementById('ddProgressPercentage').textContent = `${drawdownPercent.toFixed(2)}% / 8%`;
    
    // Update status box
    const statusBox = document.getElementById('ddStatusBox');
    const statusTitle = document.getElementById('ddStatusTitle');
    const statusText = document.getElementById('ddStatusText');
    
    if (drawdownPercent >= 8) {
        statusBox.style.background = 'rgba(255, 51, 102, 0.15)';
        statusBox.style.borderColor = '#ff3366';
        statusTitle.textContent = '⛔ KRITIS';
        statusTitle.style.color = '#ff3366';
        statusText.textContent = 'Drawdown kritis! STOP semua trading dan evaluasi strategi.';
    } else if (drawdownPercent >= 6) {
        statusBox.style.background = 'rgba(255, 165, 0, 0.15)';
        statusBox.style.borderColor = '#ffa500';
        statusTitle.textContent = '<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> TINGGI';
        statusTitle.style.color = '#ffa500';
        statusText.textContent = 'Drawdown tinggi! Pertimbangkan untuk mengurangi risk per trade.';
    } else if (drawdownPercent >= 4) {
        statusBox.style.background = 'rgba(255, 215, 0, 0.15)';
        statusBox.style.borderColor = '#ffd700';
        statusTitle.textContent = '<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> WASPADA';
        statusTitle.style.color = '#ffd700';
        statusText.textContent = 'Drawdown sedang meningkat. Tetap waspada.';
    } else {
        statusBox.style.background = 'rgba(0, 255, 136, 0.15)';
        statusBox.style.borderColor = '#00ff88';
        statusTitle.textContent = '<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> AMAN';
        statusTitle.style.color = '#00ff88';
        statusText.textContent = 'Drawdown Anda masih dalam batas aman.';
    }
}

// ===================== RECAP CALCULATION FUNCTIONS =====================
function calculateRecapBySumber() {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const sumberOptions = JSON.parse(localStorage.getItem('sumberOptions') || '[]');
    
    const recapContainer = document.getElementById('recapBySumber');
    if (!recapContainer) return;
    
    recapContainer.innerHTML = '';
    
    sumberOptions.forEach(sumber => {
        const sumberKey = sumber.toLowerCase().replace(/\s+/g, '-');
        const trades = history.filter(t => t.sumberSignal === sumberKey);
        
        if (trades.length === 0) return; // Skip jika tidak ada trade
        
        const tpCount = trades.filter(t => t.status === 'hit-tp').length;
        const slCount = trades.filter(t => t.status === 'hit-sl').length;
        const partialCount = trades.filter(t => t.status === 'partial').length;
        const bepCount = trades.filter(t => t.status === 'break-even').length;
        const totalTrades = trades.length;
        
        const totalClosed = tpCount + partialCount + slCount;
        const winRate = totalClosed > 0 ? (((tpCount + partialCount) / totalClosed) * 100).toFixed(1) : 0;
        const winRatePercent = totalClosed > 0 ? ((tpCount + partialCount) / totalClosed) * 100 : 0;
        
        // 🆕 Calculate Net P/L for this sumber
        let netPL = 0;
        trades.forEach(trade => {
            if (trade.status === 'hit-tp') {
                netPL += trade.profit;
            } else if (trade.status === 'hit-sl') {
                if (trade.slInProfit) {
                    netPL += trade.loss;
                } else {
                    netPL -= trade.loss;
                }
            } else if (trade.status === 'partial') {
                if (trade.usePartialTP && trade.tpLevels) {
                    const hitTPs = trade.tpLevels.filter(tp => tp.status === 'hit');
                    netPL += hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
                }
            }
        });
        const netPLFormatted = formatRupiah(Math.abs(netPL));
        const netPLClass = netPL >= 0 ? 'positive' : 'negative';
        const netPLSign = netPL >= 0 ? '+' : '-';
        
        const icon = sumber === 'Analisa Sendiri' ? '🧠' : '📡';
        
        recapContainer.innerHTML += `
            <div class="recap-card-progress">
                <div class="recap-card-header">
                    <span class="recap-icon">${icon}</span>
                    <span class="recap-title">${sumber}</span>
                </div>
                <div class="recap-stats-row">
                    <span class="recap-stat-item"><svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> <strong>${tpCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> <strong>${slCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> <strong>${partialCount}</strong></span>
                    <span class="recap-stat-item">🔄 <strong>${bepCount}</strong></span>
                </div>
                <div class="recap-progress-bar">
                    <div class="recap-progress-fill" style="width: ${winRatePercent}%"></div>
                </div>
                <div class="recap-footer">
                    <span class="recap-winrate"><svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Win Rate: <strong>${winRate}%</strong></span>
                    <span class="recap-total">Total: <strong>${totalTrades}</strong></span>
                </div>
                <div class="recap-netpl ${netPLClass}">
                    <span>Net P/L: ${netPLSign}${netPLFormatted}</span>
                </div>
            </div>
        `;
    });
    
    if (recapContainer.innerHTML === '') {
        recapContainer.innerHTML = '<p style="text-align: center; color: #8b92b8;">Belum ada data</p>';
    }
}

function calculateRecapByMetode() {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const metodeOptions = JSON.parse(localStorage.getItem('metodeOptions') || '[]');
    
    const recapContainer = document.getElementById('recapByMetode');
    if (!recapContainer) return;
    
    recapContainer.innerHTML = '';
    
    metodeOptions.forEach(metode => {
        const metodeKey = metode.toLowerCase().replace(/\s+/g, '-');
        const trades = history.filter(t => t.metode === metodeKey);
        
        if (trades.length === 0) return;
        
        const tpCount = trades.filter(t => t.status === 'hit-tp').length;
        const slCount = trades.filter(t => t.status === 'hit-sl').length;
        const partialCount = trades.filter(t => t.status === 'partial').length;
        const bepCount = trades.filter(t => t.status === 'break-even').length;
        const totalTrades = trades.length;
        
        const totalClosed = tpCount + partialCount + slCount;
        const winRate = totalClosed > 0 ? (((tpCount + partialCount) / totalClosed) * 100).toFixed(1) : 0;
        const winRatePercent = totalClosed > 0 ? ((tpCount + partialCount) / totalClosed) * 100 : 0;
        
        // 🆕 Calculate Net P/L for this metode
        let netPL = 0;
        trades.forEach(trade => {
            if (trade.status === 'hit-tp') {
                netPL += trade.profit;
            } else if (trade.status === 'hit-sl') {
                if (trade.slInProfit) {
                    netPL += trade.loss;
                } else {
                    netPL -= trade.loss;
                }
            } else if (trade.status === 'partial') {
                if (trade.usePartialTP && trade.tpLevels) {
                    const hitTPs = trade.tpLevels.filter(tp => tp.status === 'hit');
                    netPL += hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
                }
            }
        });
        const netPLFormatted = formatRupiah(Math.abs(netPL));
        const netPLClass = netPL >= 0 ? 'positive' : 'negative';
        const netPLSign = netPL >= 0 ? '+' : '-';
        
        recapContainer.innerHTML += `
            <div class="recap-card-progress">
                <div class="recap-card-header">
                    <span class="recap-icon"><svg class="icon-svg icon-trending-up" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
</svg></span>
                    <span class="recap-title">${metode}</span>
                </div>
                <div class="recap-stats-row">
                    <span class="recap-stat-item"><svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> <strong>${tpCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> <strong>${slCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> <strong>${partialCount}</strong></span>
                    <span class="recap-stat-item">🔄 <strong>${bepCount}</strong></span>
                </div>
                <div class="recap-progress-bar">
                    <div class="recap-progress-fill" style="width: ${winRatePercent}%"></div>
                </div>
                <div class="recap-footer">
                    <span class="recap-winrate"><svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Win Rate: <strong>${winRate}%</strong></span>
                    <span class="recap-total">Total: <strong>${totalTrades}</strong></span>
                </div>
                <div class="recap-netpl ${netPLClass}">
                    <span>Net P/L: ${netPLSign}${netPLFormatted}</span>
                </div>
            </div>
        `;
    });
    
    if (recapContainer.innerHTML === '') {
        recapContainer.innerHTML = '<p style="text-align: center; color: #8b92b8;">Belum ada data</p>';
    }
}

// ===================== RESET FUNCTIONS =====================
function resetTodayCounter() {
    // Reset hanya dilakukan otomatis setiap hari
    showToast('🔄 Daily counter akan reset otomatis setiap hari pukul 00:00 WIB');
}

function resetWeeklyCounter() {
    // Reset hanya dilakukan otomatis setiap Senin
    showToast('🔄 Weekly counter akan reset otomatis setiap Senin pukul 00:00 WIB');
}

function resetDrawdownPeak() {
    const currentBalance = calculateCurrentBalance();
    localStorage.setItem('peakBalance', currentBalance.toString());
    updateRiskDashboard();
    showToast('🔄 Peak balance diupdate ke nilai saat ini');
}

function resetAllCounters() {
    if (confirm('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Reset semua counter risk management? (Untuk testing only)')) {
        // Reset peak balance
        const currentBalance = calculateCurrentBalance();
        localStorage.setItem('peakBalance', currentBalance.toString());
        
        // Reset date trackers
        const now = new Date();
        localStorage.setItem('lastResetDate', now.toDateString());
        localStorage.setItem('lastWeeklyReset', getWeekStart(now));
        
        // Update dashboard
        updateRiskDashboard();
        
        if (currentPage === 'risiko') {
            loadTodayData();
            loadWeeklyData();
            loadDrawdownData();
        }
        
        showToast('🔄 Semua counter direset!');
    }
}

function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
}

// ===================== MODIFIED FORM SUBMIT =====================
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    if (initialBalance === 0) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Please set your initial balance first!');
        openBalanceModal();
        return;
    }
    
    // 🆕 CHECK RISK LIMITS DULU
    const warnings = validateRiskLimits();
    
    if (warnings.length > 0) {
        // Tampilkan modal warning
        showRiskWarningModal(warnings);
        pendingCalculation = {
            useCurrentBalance: true,
            pair: document.getElementById('pair').value,
            entry: parseNumber(document.getElementById('entry').value.replace(',', '.')),
        };
        return;
    }
    
    // Jika tidak ada warning, lanjut normal
    if (useManualPosition && manualPositionUSDT > 0) {
        showManualConfirmation();
        pendingCalculation = {
            useCurrentBalance: true,
            pair: document.getElementById('pair').value,
            entry: parseNumber(document.getElementById('entry').value.replace(',', '.')),
        };
        return;
    }
    
    proceedWithCalculation(true);
});

// ===================== 🆕 FILTER FUNCTIONS FOR RECAP =====================

/**
 * Initialize dropdown filter options
 */
function initializeRecapFilters() {
    // Populate Sumber Sinyal filter
    const sumberOptions = JSON.parse(localStorage.getItem('sumberOptions') || '[]');
    const filterSumberDropdown = document.getElementById('filterSumberSignal');
    
    if (filterSumberDropdown) {
        filterSumberDropdown.innerHTML = '<option value="all">Show All</option>';
        sumberOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.toLowerCase().replace(/\s+/g, '-');
            optElement.textContent = option;
            filterSumberDropdown.appendChild(optElement);
        });
    }
    
    // Populate Metode filter
    const metodeOptions = JSON.parse(localStorage.getItem('metodeOptions') || '[]');
    const filterMetodeDropdown = document.getElementById('filterMetode');
    
    if (filterMetodeDropdown) {
        filterMetodeDropdown.innerHTML = '<option value="all">Show All</option>';
        metodeOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.toLowerCase().replace(/\s+/g, '-');
            optElement.textContent = option;
            filterMetodeDropdown.appendChild(optElement);
        });
    }
}

/**
 * 🆕 Populate dropdown filters di halaman History
 */
function populateHistoryFilters() {
    const metodeOptions = JSON.parse(localStorage.getItem('metodeOptions') || '[]');
    const sumberOptions = JSON.parse(localStorage.getItem('sumberOptions') || '[]');
    
    // Populate Metode dropdown
    const filterMetodeDropdown = document.getElementById('filterMetodeHistory');
    if (filterMetodeDropdown) {
        filterMetodeDropdown.innerHTML = '<option value="all">Show All</option>';
        metodeOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase().replace(/\s+/g, '-');
            opt.textContent = option;
            filterMetodeDropdown.appendChild(opt);
        });
    }
    
    // Populate Sumber dropdown
    const filterSumberDropdown = document.getElementById('filterSumberHistory');
    if (filterSumberDropdown) {
        filterSumberDropdown.innerHTML = '<option value="all">Show All</option>';
        sumberOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.toLowerCase().replace(/\s+/g, '-');
            opt.textContent = option;
            filterSumberDropdown.appendChild(opt);
        });
    }
}

/**
 * Filter and display recap by sumber sinyal
 */
function filterRecapBySumber(selectedSumber = 'all') {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const sumberOptions = JSON.parse(localStorage.getItem('sumberOptions') || '[]');
    
    const recapContainer = document.getElementById('recapBySumber');
    if (!recapContainer) return;
    
    recapContainer.innerHTML = '';
    
    const displayOptions = selectedSumber === 'all' 
        ? sumberOptions 
        : sumberOptions.filter(s => s.toLowerCase().replace(/\s+/g, '-') === selectedSumber);
    
    if (displayOptions.length === 0) {
        recapContainer.innerHTML = '<p style="text-align: center; color: #8b92b8;">Belum ada data</p>';
        return;
    }
    
    displayOptions.forEach(sumber => {
        const sumberKey = sumber.toLowerCase().replace(/\s+/g, '-');
        const trades = history.filter(t => t.sumberSignal === sumberKey);
        
        if (trades.length === 0) return;
        
        const tpCount = trades.filter(t => t.status === 'hit-tp').length;
        const slCount = trades.filter(t => t.status === 'hit-sl').length;
        const partialCount = trades.filter(t => t.status === 'partial').length;
        const bepCount = trades.filter(t => t.status === 'break-even').length;
        const totalTrades = trades.length;
        
        const totalClosed = tpCount + partialCount + slCount;
        const winRate = totalClosed > 0 ? (((tpCount + partialCount) / totalClosed) * 100).toFixed(1) : 0;
        const winRatePercent = totalClosed > 0 ? ((tpCount + partialCount) / totalClosed) * 100 : 0;
        
        // 🆕 ADD THIS: Net P/L calculation
        let netPL = 0;
        trades.forEach(trade => {
            if (trade.status === 'hit-tp') {
                netPL += trade.profit;
            } else if (trade.status === 'hit-sl') {
                if (trade.slInProfit) {
                    netPL += trade.loss;
                } else {
                    netPL -= trade.loss;
                }
            } else if (trade.status === 'partial') {
                if (trade.usePartialTP && trade.tpLevels) {
                    const hitTPs = trade.tpLevels.filter(tp => tp.status === 'hit');
                    netPL += hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
                }
            }
        });
        const netPLFormatted = formatRupiah(Math.abs(netPL));
        const netPLClass = netPL >= 0 ? 'positive' : 'negative';
        const netPLSign = netPL >= 0 ? '+' : '-';
        
        const icon = sumber === 'Analisa Sendiri' ? '🧠' : '📡';
        
        recapContainer.innerHTML += `
            <div class="recap-card-progress">
                <div class="recap-card-header">
                    <span class="recap-icon">${icon}</span>
                    <span class="recap-title">${sumber}</span>
                </div>
                <div class="recap-stats-row">
                    <span class="recap-stat-item"><svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> <strong>${tpCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> <strong>${slCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> <strong>${partialCount}</strong></span>
                    <span class="recap-stat-item">🔄 <strong>${bepCount}</strong></span>
                </div>
                <div class="recap-progress-bar">
                    <div class="recap-progress-fill" style="width: ${winRatePercent}%"></div>
                </div>
                <div class="recap-footer">
                    <span class="recap-winrate"><svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Win Rate: <strong>${winRate}%</strong></span>
                    <span class="recap-total">Total: <strong>${totalTrades}</strong></span>
                </div>
                <div class="recap-netpl ${netPLClass}">
                    <span>Net P/L: ${netPLSign}${netPLFormatted}</span>
                </div>
            </div>
        `;
    });
    
    if (recapContainer.innerHTML === '') {
        recapContainer.innerHTML = '<p style="text-align: center; color: #8b92b8;">Belum ada data</p>';
    }
}

/**
 * Filter and display recap by metode
 */
function filterRecapByMetode(selectedMetode = 'all') {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const metodeOptions = JSON.parse(localStorage.getItem('metodeOptions') || '[]');
    
    const recapContainer = document.getElementById('recapByMetode');
    if (!recapContainer) return;
    
    recapContainer.innerHTML = '';
    
    let displayOptions = selectedMetode === 'all' 
        ? metodeOptions 
        : metodeOptions.filter(m => m.toLowerCase().replace(/\s+/g, '-') === selectedMetode);
    
    displayOptions = displayOptions.filter(metode => {
        const metodeKey = metode.toLowerCase().replace(/\s+/g, '-');
        const trades = history.filter(t => t.metode === metodeKey);
        return trades.length > 0;
    });
    
    if (displayOptions.length === 0) {
        recapContainer.innerHTML = '<p style="text-align: center; color: #8b92b8;">Belum ada data</p>';
        return;
    }
    
    displayOptions.forEach(metode => {
        const metodeKey = metode.toLowerCase().replace(/\s+/g, '-');
        const trades = history.filter(t => t.metode === metodeKey);
        
        const tpCount = trades.filter(t => t.status === 'hit-tp').length;
        const slCount = trades.filter(t => t.status === 'hit-sl').length;
        const partialCount = trades.filter(t => t.status === 'partial').length;
        const bepCount = trades.filter(t => t.status === 'break-even').length;
        const totalTrades = trades.length;
        
        const totalClosed = tpCount + partialCount + slCount;
        const winRate = totalClosed > 0 ? (((tpCount + partialCount) / totalClosed) * 100).toFixed(1) : 0;
        const winRatePercent = totalClosed > 0 ? ((tpCount + partialCount) / totalClosed) * 100 : 0;
        
        // 🆕 ADD THIS: Net P/L calculation
        let netPL = 0;
        trades.forEach(trade => {
            if (trade.status === 'hit-tp') {
                netPL += trade.profit;
            } else if (trade.status === 'hit-sl') {
                if (trade.slInProfit) {
                    netPL += trade.loss;
                } else {
                    netPL -= trade.loss;
                }
            } else if (trade.status === 'partial') {
                if (trade.usePartialTP && trade.tpLevels) {
                    const hitTPs = trade.tpLevels.filter(tp => tp.status === 'hit');
                    netPL += hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
                }
            }
        });
        const netPLFormatted = formatRupiah(Math.abs(netPL));
        const netPLClass = netPL >= 0 ? 'positive' : 'negative';
        const netPLSign = netPL >= 0 ? '+' : '-';
        
        recapContainer.innerHTML += `
            <div class="recap-card-progress">
                <div class="recap-card-header">
                    <span class="recap-icon"><svg class="icon-svg icon-trending-up" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
</svg></span>
                    <span class="recap-title">${metode}</span>
                </div>
                <div class="recap-stats-row">
                    <span class="recap-stat-item"><svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> <strong>${tpCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> <strong>${slCount}</strong></span>
                    <span class="recap-stat-item"><svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> <strong>${partialCount}</strong></span>
                    <span class="recap-stat-item">🔄 <strong>${bepCount}</strong></span>
                </div>
                <div class="recap-progress-bar">
                    <div class="recap-progress-fill" style="width: ${winRatePercent}%"></div>
                </div>
                <div class="recap-footer">
                    <span class="recap-winrate"><svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Win Rate: <strong>${winRate}%</strong></span>
                    <span class="recap-total">Total: <strong>${totalTrades}</strong></span>
                </div>
                <div class="recap-netpl ${netPLClass}">
                    <span>Net P/L: ${netPLSign}${netPLFormatted}</span>
                </div>
            </div>
        `;
    });
}

// ===================== UPDATE EXISTING FUNCTIONS =====================

// REPLACE calculateRecapBySumber() dengan ini:
function calculateRecapBySumber() {
    filterRecapBySumber('all'); // Default show all
}

// REPLACE calculateRecapByMetode() dengan ini:
function calculateRecapByMetode() {
    filterRecapByMetode('all'); // Default show all
}

// ===================== TP LEVELS FUNCTIONS =====================
function initializeTPLevels() {
    tpLevels = [
        { price: '', percentage: 50 },
        { price: '', percentage: 50 }
    ];
    renderTPLevels();
}

function renderTPLevels() {
    const container = document.getElementById('tpLevelsContainer');
    container.innerHTML = '';

    tpLevels.forEach((tp, index) => {
        const row = document.createElement('tr');
        row.className = 'tp-row';
        row.innerHTML = `
            <td class="tp-number">${index + 1}</td>
            <td>
                <input type="tel" inputmode="decimal" class="tp-price-input tp-price" data-index="${index}" 
                       placeholder="4.${200 + index * 100}" value="${tp.price}">
            </td>
            <td>
                <div class="tp-percentage-container">
                    <input type="number" class="tp-percentage-input tp-percentage-input" 
                           data-index="${index}" min="1" max="100" value="${tp.percentage}">
                    <span>%</span>
                </div>
            </td>
            <td class="tp-action">
                ${tpLevels.length > 2 ? `
                    <button type="button" class="btn-remove-tp" data-index="${index}"><svg class="icon-svg icon-trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(244, 67, 54, 0.5));">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
</svg></button>
                ` : ''}
            </td>
        `;
        container.appendChild(row);
    });

    updatePercentageTotal();
    attachTPEventListeners();
}

function attachTPEventListeners() {
    document.querySelectorAll('.tp-price').forEach(input => {
        input.addEventListener('input', function() {
            const index = parseInt(this.dataset.index);
            tpLevels[index].price = this.value;
            autoFormatInput({ target: this });
        });
    });

    document.querySelectorAll('.tp-percentage-input').forEach(input => {
        input.addEventListener('input', function() {
            const index = parseInt(this.dataset.index);
            let value = parseInt(this.value) || 0;
            if (value > 100) value = 100;
            if (value < 0) value = 0;
            this.value = value;
            tpLevels[index].percentage = value;
            updatePercentageTotal();
        });
    });

    document.querySelectorAll('.btn-remove-tp').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeTPLevel(index);
        });
    });
}

function addTPLevel() {
    if (tpLevels.length >= 5) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Maximum 5 TP levels!');
        return;
    }

    tpLevels.push({ price: '', percentage: 0 });
    redistributePercentages();
    renderTPLevels();
}

function removeTPLevel(index) {
    if (tpLevels.length <= 2) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Minimum 2 TP levels!');
        return;
    }

    tpLevels.splice(index, 1);
    redistributePercentages();
    renderTPLevels();
}

function redistributePercentages() {
    const evenPercentage = Math.floor(100 / tpLevels.length);
    const remainder = 100 - (evenPercentage * tpLevels.length);

    tpLevels.forEach((tp, index) => {
        tp.percentage = evenPercentage + (index === tpLevels.length - 1 ? remainder : 0);
    });
}

function updatePercentageTotal() {
    const total = tpLevels.reduce((sum, tp) => sum + tp.percentage, 0);
    const totalElement = document.getElementById('percentageTotal');
    totalElement.textContent = `Total: ${total}%`;
    
    if (total === 100) {
        totalElement.className = 'percentage-total valid';
    } else {
        totalElement.className = 'percentage-total invalid';
    }

    const btnAddTP = document.getElementById('btnAddTP');
    btnAddTP.disabled = tpLevels.length >= 5;
}

// ===================== TOGGLE FUNCTIONS =====================
document.getElementById('partialTPToggle').addEventListener('click', function() {
    usePartialTP = !usePartialTP;
    this.classList.toggle('active');
    
    const partialSection = document.getElementById('partialTPSection');
    const regularSection = document.getElementById('regularTPSection');
    
    if (usePartialTP) {
        partialSection.classList.add('active');
        regularSection.style.display = 'none';
        document.getElementById('tp').removeAttribute('required');
        document.getElementById('sl').removeAttribute('required');
        document.getElementById('slPartial').setAttribute('required', 'required');
        initializeTPLevels();
    } else {
        partialSection.classList.remove('active');
        regularSection.style.display = 'grid';
        document.getElementById('tp').setAttribute('required', 'required');
        document.getElementById('sl').setAttribute('required', 'required');
        document.getElementById('slPartial').removeAttribute('required');
    }
});

document.getElementById('manualPositionToggle').addEventListener('click', function() {
    useManualPosition = !useManualPosition;
    this.classList.toggle('active');
    
    const manualSection = document.getElementById('manualInputSection');
    if (useManualPosition) {
        manualSection.style.display = 'block';
        manualSection.classList.add('active');
        const recommendedSize = parseFloat(document.getElementById('posSize').textContent) || 0;
        const entry = parseNumber(document.getElementById('entry').value.replace(',', '.') || '0');
        if (entry > 0) {
            recommendedPositionUSDT = recommendedSize * entry;
            document.getElementById('recommendedUSDT').textContent = `$${recommendedPositionUSDT.toFixed(2)} USDT`;
        }
    } else {
        manualSection.style.display = 'none';
        manualSection.classList.remove('active');
        manualPositionUSDT = 0;
        manualPositionSize = 0;
        document.getElementById('manualPositionUSDT').value = '';
        document.getElementById('userInputUSDT').textContent = '-';
        document.getElementById('actualRiskManual').textContent = '-';
    }
});

document.getElementById('manualPositionUSDT').addEventListener('input', function(e) {
    // 🔧 FIX: USDT uses dot (.) as decimal separator, don't remove it!
    let value = e.target.value.trim();
    if (value === '') {
        manualPositionUSDT = 0;
        manualPositionSize = 0;
        document.getElementById('userInputUSDT').textContent = '-';
        document.getElementById('actualRiskManual').textContent = '-';
        return;
    }
    
    // Parse directly - USDT format: 4.5 (dot is decimal)
    value = parseFloat(value);
    if (isNaN(value)) {
        value = 0;
    }
    manualPositionUSDT = value;
    
    const entry = parseNumber(document.getElementById('entry').value.replace(',', '.') || '0');
    if (entry > 0) {
        manualPositionSize = manualPositionUSDT / entry;
    } else {
        manualPositionSize = 0;
    }
    
    const recommendedSize = parseFloat(document.getElementById('posSize').textContent) || 0;
    const entryPrice = parseNumber(document.getElementById('entry').value.replace(',', '.') || '0');
    if (recommendedSize > 0 && entryPrice > 0) {
        recommendedPositionUSDT = recommendedSize * entryPrice;
        const difference = ((manualPositionUSDT / recommendedPositionUSDT) - 1) * 100;
        const riskPercent = getRiskPercent() * 100;
        const actualRisk = (manualPositionUSDT / recommendedPositionUSDT) * riskPercent;
        
        document.getElementById('userInputUSDT').textContent = 
            `$${manualPositionUSDT.toFixed(2)} USDT (${difference > 0 ? '+' : ''}${difference.toFixed(1)}%)`;
        document.getElementById('actualRiskManual').textContent = 
            `${actualRisk.toFixed(2)}% of position value`;
        
        document.getElementById('recommendedUSDT').textContent = `$${recommendedPositionUSDT.toFixed(2)} USDT`;
    }
});

document.getElementById('btnAddTP').addEventListener('click', addTPLevel);

// ===================== KURS & FORMATTING =====================
async function fetchKurs() {
    currentKurs = 15750;
    document.getElementById('kursRate').textContent = `Rp ${formatNumber(currentKurs.toFixed(0))}`;
    
    const apis = [
        {
            url: 'https://api.frankfurter.app/latest?from=USD&to=IDR',
            parser: (data) => data.rates?.IDR
        },
        {
            url: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
            parser: (data) => data.usd?.idr
        },
        {
            url: 'https://open.er-api.com/v6/latest/USD',
            parser: (data) => data.rates?.IDR
        }
    ];

    for (let api of apis) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);

            const response = await fetch(api.url, { 
                signal: controller.signal,
                mode: 'cors'
            });
            clearTimeout(timeoutId);

            if (!response.ok) continue;

            const data = await response.json();
            const rate = api.parser(data);
            
            if (rate && rate > 0) {
                currentKurs = rate;
                document.getElementById('kursRate').textContent = `Rp ${formatNumber(currentKurs.toFixed(0))}`;
                updateCurrentBalanceDisplay();
                updatePositionSize();
                return;
            }
        } catch (error) {
            // 🔧 FIX: Silent AbortError (timeout adalah hal normal)
            if (error.name === 'AbortError') {
                // Timeout terjadi, coba API berikutnya
                continue;
            }
            // Error lainnya juga di-silent, coba API berikutnya
            continue;
        }
    }

    document.getElementById('kursRate').textContent = `Rp ${formatNumber(currentKurs.toFixed(0))} (Default)`;
    updateCurrentBalanceDisplay();
    updatePositionSize();
}

function autoFormatInput(e) {
    let input = e.target;
    let value = input.value.replace(/\./g, '');
    
    if (input.id === 'pair') return;
    if (value === '') return;
    
    let parts = value.split(',');
    if (parts.length > 1) {
        parts[0] = formatNumber(parts[0]);
        input.value = parts.join(',');
    } else {
        input.value = formatNumber(value);
    }

    updatePositionSize();
}

function showCustomEntryModal() {
    const customValue = prompt('Enter max entry multiplier (1-100):');
    
    if (!customValue && !isNaN(customValue)) {
        const num = parseInt(customValue);
        
        if (num >= 1 && num <= 100) {
            maxEntryMultiplier = num;
            
            const select = document.getElementById('maxEntry');
            const customOption = select.querySelector('[value="custom"]');
            customOption.textContent = `${num}x Entry (Custom)`;
            
            updatePositionSize();
        } else {
            alert('Please enter a number between 1-100');
            document.getElementById('maxEntry').value = '5';
            maxEntryMultiplier = 5;
            updatePositionSize();
        }
    } else {
        document.getElementById('maxEntry').value = '5';
        maxEntryMultiplier = 5;
        updatePositionSize();
    }
}

function updatePositionSize() {
    const currentBalance = calculateCurrentBalance();
    const entry = parseNumber(document.getElementById('entry').value.replace(',', '.') || '0');
    
    let sl = 0;
    if (usePartialTP) {
        sl = parseNumber(document.getElementById('slPartial').value.replace(',', '.') || '0');
    } else {
        sl = parseNumber(document.getElementById('sl').value.replace(',', '.') || '0');
    }

    if (currentBalance > 0 && entry > 0 && sl > 0 && currentKurs > 0 && entry !== sl) {
        const currentBalanceUSD = currentBalance / currentKurs;
        
        const riskPercent = getRiskPercent();
        
        const maxPositionValue = currentBalanceUSD / maxEntryMultiplier;
        
        const riskAmountUSD = maxPositionValue * riskPercent;
        
        const priceDiff = Math.abs(entry - sl);
        const positionSize = riskAmountUSD / priceDiff;
        
        const actualPositionValue = positionSize * entry;
        
        const actualRiskUSD = positionSize * priceDiff;
        const actualRiskIDR = actualRiskUSD * currentKurs;
        const actualRiskPercent = (actualRiskUSD / maxPositionValue) * 100;
        
        document.getElementById('positionSizeInfo').style.display = 'block';
        document.getElementById('posMaxEntry').textContent = `${maxEntryMultiplier}x`;
        document.getElementById('posValue').textContent = `$${actualPositionValue.toFixed(2)}`;
        document.getElementById('posSize').textContent = positionSize.toFixed(6);
        document.getElementById('posRisk').textContent = `${actualRiskPercent.toFixed(2)}%`;
        document.getElementById('posRiskIDR').textContent = formatRupiah(actualRiskIDR);
        
        recommendedPositionSize = positionSize;
        recommendedPositionUSDT = actualPositionValue;
        if (useManualPosition) {
            document.getElementById('recommendedUSDT').textContent = `$${actualPositionValue.toFixed(2)} USDT`;
            
            if (manualPositionUSDT > 0) {
                const difference = ((manualPositionUSDT / actualPositionValue) - 1) * 100;
                const riskPercentVal = getRiskPercent() * 100;
                const actualRisk = (manualPositionUSDT / actualPositionValue) * riskPercentVal;
                
                document.getElementById('userInputUSDT').textContent = 
                    `$${manualPositionUSDT.toFixed(2)} USDT (${difference > 0 ? '+' : ''}${difference.toFixed(1)}%)`;
                document.getElementById('actualRiskManual').textContent = 
                    `${actualRisk.toFixed(2)}% of position value`;
            }
        }
    } else {
        document.getElementById('positionSizeInfo').style.display = 'none';
    }
}

document.getElementById('maxEntry').addEventListener('change', function() {
    const value = this.value;
    
    if (value === 'custom') {
        showCustomEntryModal();
    } else {
        maxEntryMultiplier = parseInt(value);
        updatePositionSize();
    }
});

document.getElementById('entry').addEventListener('input', autoFormatInput);
document.getElementById('tp').addEventListener('input', autoFormatInput);
document.getElementById('sl').addEventListener('input', function(e) {
    autoFormatInput(e);
    updatePositionSize();
});
document.getElementById('slPartial').addEventListener('input', function(e) {
    autoFormatInput(e);
    updatePositionSize();
});

document.getElementById('riskPercent').addEventListener('change', function() {
    updatePositionSize();
});

function showManualConfirmation() {
    const entry = parseNumber(document.getElementById('entry').value.replace(',', '.'));
    const sl = usePartialTP ? 
        parseNumber(document.getElementById('slPartial').value.replace(',', '.')) : 
        parseNumber(document.getElementById('sl').value.replace(',', '.'));
    
    const priceDiff = Math.abs(entry - sl);
    const recommendedUSDT = recommendedPositionUSDT;
    const userUSDT = manualPositionUSDT;
    
    const difference = ((userUSDT / recommendedUSDT) - 1) * 100;
    const recommendedRisk = getRiskPercent() * 100;
    const actualRisk = (userUSDT / recommendedUSDT) * recommendedRisk;
    
    const coins = userUSDT / entry;
    const riskAmountUSD = coins * priceDiff;
    const riskAmountIDR = riskAmountUSD * currentKurs;
    
    const recommendedCoins = recommendedUSDT / entry;
    const recommendedRiskUSD = recommendedCoins * priceDiff;
    const recommendedRiskIDR = recommendedRiskUSD * currentKurs;
    
    const content = `
        <div style="text-align: left; line-height: 1.8;">
            <p style="margin-bottom: 15px;">You are using <strong>MANUAL position size:</strong></p>
            
            <div style="background: rgba(255, 165, 0, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #8b92b8;">🔧 Your Input:</span>
                    <span style="color: #ffa500; font-weight: 600;">$${userUSDT.toFixed(2)} USDT</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #8b92b8;"><svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Recommended:</span>
                    <span style="color: #00ff88; font-weight: 600;">$${recommendedUSDT.toFixed(2)} USDT</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #8b92b8;"><svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Difference:</span>
                    <span style="color: ${difference > 0 ? '#ff3366' : '#00ff88'}; font-weight: 600;">
                        ${difference > 0 ? '+' : ''}${difference.toFixed(1)}% (${(userUSDT/recommendedUSDT).toFixed(2)}x)
                    </span>
                </div>
            </div>
            
            <p style="margin-bottom: 10px; color: #ffa500;"><strong><svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> This means your actual risk is:</strong></p>
            <ul style="margin-left: 20px; margin-bottom: 15px; color: #e0e0e0;">
                <li>${actualRisk.toFixed(2)}% instead of ${recommendedRisk.toFixed(2)}%</li>
                <li>You're risking ${formatRupiah(riskAmountIDR)} instead of ${formatRupiah(recommendedRiskIDR)}</li>
            </ul>
            
            <hr style="border: 1px solid rgba(255, 165, 0, 0.3); margin: 15px 0;">
            
            <p style="text-align: center; color: #8b92b8; font-size: 0.9rem;">
                This trade will be marked as <strong style="color: #ffa500;">[<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> WARNING]</strong> in history.
            </p>
        </div>
    `;
    
    document.getElementById('manualConfirmContent').innerHTML = content;
    document.getElementById('manualConfirmModal').classList.add('show');
}

function calculate(e, useCurrentBalance = true) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }

    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    if (initialBalance === 0) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Please set your initial balance first!');
        openBalanceModal();
        return;
    }

    if (useManualPosition && manualPositionUSDT > 0) {
        showManualConfirmation();
        pendingCalculation = {
            useCurrentBalance: useCurrentBalance,
            pair: document.getElementById('pair').value,
            entry: parseNumber(document.getElementById('entry').value.replace(',', '.')),
        };
        return;
    }

    proceedWithCalculation(useCurrentBalance);
}

function proceedWithCalculation(useCurrentBalance = true) {
    const pair = document.getElementById('pair').value;
    const entry = parseNumber(document.getElementById('entry').value.replace(',', '.'));

    if (usePartialTP) {
        const totalPercentage = tpLevels.reduce((sum, tp) => sum + tp.percentage, 0);
        if (totalPercentage !== 100) {
            showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Total percentage must be 100%!');
            return;
        }

        const allFilled = tpLevels.every(tp => tp.price && parseNumber(tp.price.replace(',', '.')) > 0);
        if (!allFilled) {
            showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Please fill all TP prices!');
            return;
        }

        const sl = parseNumber(document.getElementById('slPartial').value.replace(',', '.'));
        calculatePartialTP(pair, entry, sl, useCurrentBalance);
    } else {
        const tp = parseNumber(document.getElementById('tp').value.replace(',', '.'));
        const sl = parseNumber(document.getElementById('sl').value.replace(',', '.'));
        calculateRegular(pair, entry, tp, sl, useCurrentBalance);
    }
    
    hasInitialCalculation = true;
}

// ===================== CALCULATION FUNCTIONS =====================
function calculateRegular(pair, entry, tp, sl, useCurrentBalance = true) {
    const currentBalance = useCurrentBalance ? calculateCurrentBalance() : (lastCalculation ? lastCalculation.modalIDR * maxEntryMultiplier : calculateCurrentBalance());
    
    const riskPercent = getRiskPercent();
    const currentBalanceUSD = currentBalance / currentKurs;
    const maxPositionValue = currentBalanceUSD / maxEntryMultiplier;
    const riskAmountUSD = maxPositionValue * riskPercent;
    const priceDiff = Math.abs(entry - sl);
    let calculatedPositionSize = riskAmountUSD / priceDiff;
    let calculatedPositionUSDT = calculatedPositionSize * entry;
    
    let positionSize = calculatedPositionSize;
    let positionUSDT = calculatedPositionUSDT;
    if (useManualPosition && manualPositionUSDT > 0) {
        positionUSDT = manualPositionUSDT;
        positionSize = positionUSDT / entry;
    }
    
    const modalUSDT = positionSize * entry;
    const modalIDR = modalUSDT * currentKurs;
    
    const nilaiTPUSDT = positionSize * tp;
    const nilaiTPIDR = nilaiTPUSDT * currentKurs;

    const nilaiSLUSDT = positionSize * sl;
    const nilaiSLIDR = nilaiSLUSDT * currentKurs;

    let profit, loss, slPercent;
    
    if (sl > entry) {
        profit = nilaiTPIDR - modalIDR;
        loss = nilaiSLIDR - modalIDR;
        slPercent = ((sl - entry) / entry) * 100;
    } else {
        profit = nilaiTPIDR - modalIDR;
        loss = modalIDR - nilaiSLIDR;
        slPercent = ((sl - entry) / entry) * 100;
    }

    const tpPercent = ((tp - entry) / entry) * 100;
    const rrRatio = Math.abs(tpPercent / slPercent);

    const currentBalanceNow = calculateCurrentBalance();
    const capitalUsed = modalIDR;
    const capitalPercent = (capitalUsed / currentBalanceNow) * 100;
    
    const balanceIfTP = currentBalanceNow + profit;
    const balanceTPPercent = ((balanceIfTP - currentBalanceNow) / currentBalanceNow) * 100;
    
    const balanceIfSL = sl > entry ? currentBalanceNow + loss : currentBalanceNow - loss;
    const balanceSLPercent = ((balanceIfSL - currentBalanceNow) / currentBalanceNow) * 100;
    
    const balanceIfBE = currentBalanceNow;

    lastCalculation = {
        pair, 
        modalIDR: modalIDR,
        entry, tp, sl,
        profit, loss, tpPercent, slPercent, rrRatio,
        nilaiTPIDR, nilaiSLIDR,
        timestamp: new Date().toISOString(),
        usePartialTP: false,
        slInProfit: sl > entry,
        balanceProjection: {
            capitalUsed,
            capitalPercent,
            balanceIfTP,
            balanceTPPercent,
            balanceIfSL,
            balanceSLPercent,
            balanceIfBE
        },
        positionSize: positionSize,
        riskPercent: riskPercent * 100,
        isManualPosition: useManualPosition && manualPositionUSDT > 0,
        manualPositionUSDT: useManualPosition && manualPositionUSDT > 0 ? manualPositionUSDT : null,
        manualPositionSize: useManualPosition && manualPositionUSDT > 0 ? positionSize : null,
        recommendedPositionUSDT: useManualPosition && manualPositionUSDT > 0 ? calculatedPositionUSDT : null,
        recommendedPositionSize: useManualPosition && manualPositionUSDT > 0 ? calculatedPositionSize : null,
        // 🆕 NEW FIELDS
        sessions: document.getElementById('sessions').value,
        metode: document.getElementById('metode').value,
        sumberSignal: document.getElementById('sumberSignal').value,
        chartBefore: document.getElementById('chartBefore').value,
        chartAfter: document.getElementById('chartAfter').value,
        catatan: document.getElementById('catatan').value
    };

    document.getElementById('tpPercent').textContent = `+${tpPercent.toFixed(2)}%`;
    document.getElementById('tpValue').textContent = `Total: ${formatRupiah(nilaiTPIDR)}`;
    
    if (sl > entry) {
        document.getElementById('slPercent').textContent = `+${slPercent.toFixed(2)}%`;
        document.getElementById('slValue').textContent = `Total: ${formatRupiah(nilaiSLIDR)} (Profit Zone)`;
        document.getElementById('lossAmount').textContent = `+${formatRupiah(loss)}`;
        document.querySelector('#lossAmount').parentElement.querySelector('.result-label').textContent = 'Min Profit (SL)';
    } else {
        document.getElementById('slPercent').textContent = `${slPercent.toFixed(2)}%`;
        document.getElementById('slValue').textContent = `Total: ${formatRupiah(nilaiSLIDR)}`;
        document.getElementById('lossAmount').textContent = `-${formatRupiah(loss)}`;
        document.querySelector('#lossAmount').parentElement.querySelector('.result-label').textContent = 'Kerugian Bersih';
    }
    
    document.getElementById('rrRatio').textContent = `1 : ${rrRatio.toFixed(2)}`;
    document.getElementById('profitAmount').textContent = `+${formatRupiah(profit)}`;
    document.getElementById('pairDisplay').textContent = pair.toUpperCase();

    document.getElementById('partialTPResults').classList.remove('show');
    results.classList.add('show');

    displayBalanceProjection(lastCalculation.balanceProjection);
}

function calculatePartialTP(pair, entry, sl, useCurrentBalance = true) {
    const currentBalance = useCurrentBalance ? calculateCurrentBalance() : (lastCalculation ? lastCalculation.modalIDR * maxEntryMultiplier : calculateCurrentBalance());
    
    const riskPercent = getRiskPercent();
    const currentBalanceUSD = currentBalance / currentKurs;
    const maxPositionValue = currentBalanceUSD / maxEntryMultiplier;
    const riskAmountUSD = maxPositionValue * riskPercent;
    const priceDiff = Math.abs(entry - sl);
    let calculatedPositionSize = riskAmountUSD / priceDiff;
    let calculatedPositionUSDT = calculatedPositionSize * entry;
    
    let positionSize = calculatedPositionSize;
    let positionUSDT = calculatedPositionUSDT;
    if (useManualPosition && manualPositionUSDT > 0) {
        positionUSDT = manualPositionUSDT;
        positionSize = positionUSDT / entry;
    }
    
    const modalUSDT = positionSize * entry;
    const modalIDR = modalUSDT * currentKurs;

    const tpResults = tpLevels.map(tp => {
        const tpPrice = parseNumber(tp.price.replace(',', '.'));
        const percentage = tp.percentage / 100;
        const coinsAtTP = positionSize * percentage;
        const valueAtTP = coinsAtTP * tpPrice;
        const valueAtTPIDR = valueAtTP * currentKurs;
        const modalPortionIDR = modalIDR * percentage;
        const profitIDR = valueAtTPIDR - modalPortionIDR;
        const profitPercent = ((tpPrice - entry) / entry) * 100;

        return {
            price: tpPrice,
            percentage: tp.percentage,
            profit: profitIDR,
            profitPercent: profitPercent,
            status: 'pending'
        };
    });

    const totalProfit = tpResults.reduce((sum, tp) => sum + tp.profit, 0);
    
    const weightedTP = tpResults.reduce((sum, tp) => sum + (tp.price * tp.percentage / 100), 0);
    const avgTPPercent = ((weightedTP - entry) / entry) * 100;

    const nilaiSLUSDT = positionSize * sl;
    const nilaiSLIDR = nilaiSLUSDT * currentKurs;
    
    let loss, slPercent;
    if (sl > entry) {
        loss = nilaiSLIDR - modalIDR;
        slPercent = ((sl - entry) / entry) * 100;
    } else {
        loss = modalIDR - nilaiSLIDR;
        slPercent = ((sl - entry) / entry) * 100;
    }

    const rrRatio = Math.abs(avgTPPercent / slPercent);

    const currentBalanceNow = calculateCurrentBalance();
    const capitalUsed = modalIDR;
    const capitalPercent = (capitalUsed / currentBalanceNow) * 100;
    
    const balanceIfTP = currentBalanceNow + totalProfit;
    const balanceTPPercent = ((balanceIfTP - currentBalanceNow) / currentBalanceNow) * 100;
    
    const balanceIfSL = sl > entry ? currentBalanceNow + loss : currentBalanceNow - loss;
    const balanceSLPercent = ((balanceIfSL - currentBalanceNow) / currentBalanceNow) * 100;
    
    const balanceIfBE = currentBalanceNow;

    lastCalculation = {
        pair, 
        modalIDR: modalIDR,
        entry, sl,
        profit: totalProfit,
        loss, slPercent, rrRatio,
        nilaiSLIDR,
        timestamp: new Date().toISOString(),
        usePartialTP: true,
        tpLevels: tpResults,
        slInProfit: sl > entry,
        balanceProjection: {
            capitalUsed,
            capitalPercent,
            balanceIfTP,
            balanceTPPercent,
            balanceIfSL,
            balanceSLPercent,
            balanceIfBE
        },
        positionSize: positionSize,
        riskPercent: riskPercent * 100,
        isManualPosition: useManualPosition && manualPositionUSDT > 0,
        manualPositionUSDT: useManualPosition && manualPositionUSDT > 0 ? manualPositionUSDT : null,
        manualPositionSize: useManualPosition && manualPositionUSDT > 0 ? positionSize : null,
        recommendedPositionUSDT: useManualPosition && manualPositionUSDT > 0 ? calculatedPositionUSDT : null,
        recommendedPositionSize: useManualPosition && manualPositionUSDT > 0 ? calculatedPositionSize : null,
        // 🆕 NEW FIELDS
        sessions: document.getElementById('sessions').value,
        metode: document.getElementById('metode').value,
        sumberSignal: document.getElementById('sumberSignal').value,
        chartBefore: document.getElementById('chartBefore').value,
        chartAfter: document.getElementById('chartAfter').value,
        catatan: document.getElementById('catatan').value
    };

    const partialTPResultsContent = document.getElementById('partialTPResultsContent');
    partialTPResultsContent.innerHTML = tpResults.map((tp, index) => `
        <div class="tp-result-item">
            <span class="tp-result-label">TP${index + 1} ($${tp.price.toFixed(2)}) - ${tp.percentage}%</span>
            <span class="tp-result-value">+${formatRupiah(tp.profit)} (+${tp.profitPercent.toFixed(2)}%)</span>
        </div>
    `).join('');

    document.getElementById('partialTPResults').classList.add('show');

    document.getElementById('tpPercent').textContent = `+${avgTPPercent.toFixed(2)}%`;
    document.getElementById('tpValue').textContent = `Total if all TP hit: ${formatRupiah(modalIDR + totalProfit)}`;
    
    if (sl > entry) {
        document.getElementById('slPercent').textContent = `+${slPercent.toFixed(2)}%`;
        document.getElementById('slValue').textContent = `Total: ${formatRupiah(nilaiSLIDR)} (Profit Zone)`;
        document.getElementById('lossAmount').textContent = `+${formatRupiah(loss)}`;
        document.querySelector('#lossAmount').parentElement.querySelector('.result-label').textContent = 'Min Profit (SL)';
    } else {
        document.getElementById('slPercent').textContent = `${slPercent.toFixed(2)}%`;
        document.getElementById('slValue').textContent = `Total: ${formatRupiah(nilaiSLIDR)}`;
        document.getElementById('lossAmount').textContent = `-${formatRupiah(loss)}`;
        document.querySelector('#lossAmount').parentElement.querySelector('.result-label').textContent = 'Kerugian Bersih';
    }
    
    document.getElementById('rrRatio').textContent = `1 : ${rrRatio.toFixed(2)}`;
    document.getElementById('profitAmount').textContent = `+${formatRupiah(totalProfit)}`;
    document.getElementById('pairDisplay').textContent = pair.toUpperCase();

    results.classList.add('show');

    displayBalanceProjection(lastCalculation.balanceProjection);
}

function displayBalanceProjection(projection) {
    document.getElementById('balanceProjection').style.display = 'block';
    
    document.getElementById('capitalUsed').textContent = formatRupiah(projection.capitalUsed);
    document.getElementById('capitalPercent').textContent = `${projection.capitalPercent.toFixed(1)}%`;
    
    document.getElementById('balanceIfTP').textContent = formatRupiah(projection.balanceIfTP);
    document.getElementById('balanceTPChange').textContent = `+${projection.balanceTPPercent.toFixed(2)}%`;
    
    document.getElementById('balanceIfSL').textContent = formatRupiah(projection.balanceIfSL);
    const slSign = projection.balanceSLPercent >= 0 ? '+' : '';
    document.getElementById('balanceSLChange').textContent = `${slSign}${projection.balanceSLPercent.toFixed(2)}%`;
    
    document.getElementById('balanceIfBE').textContent = formatRupiah(projection.balanceIfBE);
}


// 🆕 AUTO-FORMAT BALANCE INPUT (like winrate calculator)
function autoFormatBalanceInput(e) {
    const input = e.target;
    
    // Only format for IDR
    if (modalCurrency !== 'idr') return;
    
    let value = input.value.replace(/\./g, '');
    
    if (value === '') return;
    
    // Allow decimal with comma
    let parts = value.split(',');
    if (parts.length > 1) {
        parts[0] = formatNumber(parts[0]);
        input.value = parts.join(',');
    } else {
        input.value = formatNumber(value);
    }
}

function calculateCurrentBalance() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    
    const closedTrades = history.filter(t => 
        t.status === 'hit-tp' || 
        t.status === 'hit-sl' || 
        t.status === 'break-even' ||
        t.status === 'partial'
    );
    
    let totalProfit = 0;
    let totalLoss = 0;
    
    closedTrades.forEach(trade => {
        if (trade.status === 'hit-tp') {
            totalProfit += trade.profit;
        } else if (trade.status === 'hit-sl') {
            if (trade.slInProfit) {
                totalProfit += trade.loss;
            } else {
                totalLoss += trade.loss;
            }
        } else if (trade.status === 'partial') {
            if (trade.usePartialTP && trade.tpLevels) {
                const hitTPs = trade.tpLevels.filter(tp => tp.status === 'hit');
                totalProfit += hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
            }
        }
    });
    
    return initialBalance + totalProfit - totalLoss;
}

function updateCurrentBalanceDisplay() {
    const currentBalance = calculateCurrentBalance();
    const balanceAmount = document.getElementById('balanceAmount');
    const balanceConversion = document.getElementById('balanceConversion');
    
    
// 🆕 AUTO-FORMAT BALANCE INPUT EVENT LISTENER
document.getElementById('balanceInput').addEventListener('input', autoFormatBalanceInput);

document.querySelectorAll('#currencyPill .currency-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.currency === currentCurrency) {
            opt.classList.add('active');
        }
    });
    
    if (currentCurrency === 'idr') {
        balanceAmount.textContent = `Rp ${formatNumber(Math.floor(currentBalance).toString())}`;
        balanceConversion.textContent = `≈ $${(currentBalance / currentKurs).toFixed(2)} USD`;
    } else {
        const usdAmount = currentBalance / currentKurs;
        balanceAmount.textContent = `$${usdAmount.toFixed(2)}`;
        balanceConversion.textContent = `≈ Rp ${formatNumber(Math.floor(currentBalance).toString())}`;
    }
}

function copyResults() {
    if (!lastCalculation) return;

    let text = `
<svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> TP/SL Calculator Results

<svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Pair: ${lastCalculation.pair.toUpperCase()}${lastCalculation.isManualPosition ? ' 🔧' : ''}
<svg class="icon-svg icon-dollar" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));">
    <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
</svg> Current Balance: ${currentCurrency === 'idr' ? formatRupiah(lastCalculation.modalIDR) : `$${(lastCalculation.modalIDR / currentKurs).toFixed(2)}`}
<svg class="icon-svg icon-trending-up" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>
</svg> Entry: $${lastCalculation.entry}
`;

    if (lastCalculation.usePartialTP) {
        text += `\n<svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> Partial Take Profit:\n`;
        lastCalculation.tpLevels.forEach((tp, index) => {
            text += `   TP${index + 1}: $${tp.price.toFixed(2)} (${tp.percentage}%) - Profit: ${formatRupiah(tp.profit)}\n`;
        });
        text += `\n<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Total Profit if all TP hit: ${formatRupiah(lastCalculation.profit)}`;
    } else {
        text += `<svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> TP: $${lastCalculation.tp} (+${lastCalculation.tpPercent.toFixed(2)}%)`;
        text += `\n<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Profit Potensial: ${formatRupiah(lastCalculation.profit)}`;
    }

    if (lastCalculation.slInProfit) {
        text += `\n🛑 SL: $${lastCalculation.sl} (+${lastCalculation.slPercent.toFixed(2)}%) - In Profit Zone`;
        text += `\n<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Min Profit (SL): ${formatRupiah(lastCalculation.loss)}`;
    } else {
        text += `\n🛑 SL: $${lastCalculation.sl} (${lastCalculation.slPercent.toFixed(2)}%)`;
        text += `\n<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Loss Potensial: ${formatRupiah(lastCalculation.loss)}`;
    }

    text += `\n⚖️ Risk:Reward = 1:${lastCalculation.rrRatio.toFixed(2)}`;
    text += `\n<svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> Risk % Used: ${lastCalculation.riskPercent ? lastCalculation.riskPercent.toFixed(1) + '%' : 'N/A'}`;
    
    if (lastCalculation.isManualPosition) {
        text += `\n\n<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> MANUAL POSITION OVERRIDE:`;
        text += `\n🔧 Position Used: $${lastCalculation.manualPositionUSDT.toFixed(2)} USDT`;
        text += `\n<svg class="icon-svg icon-lightbulb" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffeb3b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 235, 59, 0.5));">
    <line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
</svg> Recommended: $${lastCalculation.recommendedPositionUSDT.toFixed(2)} USDT`;
        const diff = ((lastCalculation.manualPositionUSDT / lastCalculation.recommendedPositionUSDT) - 1) * 100;
        text += `\n<svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Difference: ${diff > 0 ? '+' : ''}${diff.toFixed(1)}% (${(lastCalculation.manualPositionUSDT / lastCalculation.recommendedPositionUSDT).toFixed(2)}x)`;
        const actualRisk = (lastCalculation.manualPositionUSDT / lastCalculation.recommendedPositionUSDT) * lastCalculation.riskPercent;
        text += `\n<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Actual Risk: ${actualRisk.toFixed(2)}% (expected ${lastCalculation.riskPercent.toFixed(2)}%)`;
    }
    
    if (lastCalculation.balanceProjection) {
        text += `\n\n💼 BALANCE PROJECTION:`;
        text += `\n<svg class="icon-svg icon-chart" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.5));">
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
</svg> Capital Used: ${formatRupiah(lastCalculation.balanceProjection.capitalUsed)} (${lastCalculation.balanceProjection.capitalPercent.toFixed(1)}%)`;
        text += `\n<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> If TP Hit: ${formatRupiah(lastCalculation.balanceProjection.balanceIfTP)} (+${lastCalculation.balanceProjection.balanceTPPercent.toFixed(2)}%)`;
        const slSign = lastCalculation.balanceProjection.balanceSLPercent >= 0 ? '+' : '';
        text += `\n<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> If SL Hit: ${formatRupiah(lastCalculation.balanceProjection.balanceIfSL)} (${slSign}${lastCalculation.balanceProjection.balanceSLPercent.toFixed(2)}%)`;
    }

    text += `\n\nGenerated by TP/SL Calculator by RIFQI`;

    navigator.clipboard.writeText(text.trim()).then(() => {
        showToast('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Results copied to clipboard!');
    });
}

function saveToHistory() {
    if (!lastCalculation) return;

    let history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    
    lastCalculation.status = 'running';
    
    history.unshift(lastCalculation);
    
    if (history.length > 100) {
        history = history.slice(0, 100);
    }

    localStorage.setItem('tpslHistory', JSON.stringify(history));
    updateStats();
    updateCurrentBalanceDisplay();
    updatePositionSize();
    updateFilterCounts();
    updateRiskDashboard();
    
    if (lastCalculation.isManualPosition) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Saved with MANUAL position! This trade is marked in history.');
    } else {
        showToast('<svg class="icon-svg icon-save" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(76, 175, 80, 0.5));">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>
</svg> Saved to history!');
    }
}

function updateFilterCounts() {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    
    const allCount = history.length;
    const runningCount = history.filter(t => t.status === 'running').length;
    const partialCount = history.filter(t => t.status === 'partial').length;
    const hitTpCount = history.filter(t => t.status === 'hit-tp').length;
    const hitSlCount = history.filter(t => t.status === 'hit-sl').length;
    const breakEvenCount = history.filter(t => t.status === 'break-even').length;
    const warningCount = history.filter(t => t.isManualPosition === true).length;
    
    // 🆕 NEW: Session counts
    const asiaCount = history.filter(t => t.sessions === 'asia').length;
    const londonCount = history.filter(t => t.sessions === 'london').length;
    const newyorkCount = history.filter(t => t.sessions === 'newyork').length;
    
    document.querySelector('.filter-btn.all').textContent = `All (${allCount})`;
    document.querySelector('.filter-btn.running').textContent = `<svg class="icon-svg icon-clock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
</svg> Running (${runningCount})`;
    document.querySelector('.filter-btn.partial').textContent = `<svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg> Partial (${partialCount})`;
    document.querySelector('.filter-btn.hit-tp').textContent = `<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Hit TP (${hitTpCount})`;
    document.querySelector('.filter-btn.hit-sl').textContent = `<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Hit SL (${hitSlCount})`;
    document.querySelector('.filter-btn.break-even').textContent = `🔄 Break Even (${breakEvenCount})`;
    document.querySelector('.filter-btn.warning').textContent = `<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Warning (${warningCount})`;
    
    // 🆕 NEW: Update session filters
    document.querySelector('.filter-btn.sessions-asia').textContent = `🌏 Asia (${asiaCount})`;
    document.querySelector('.filter-btn.sessions-london').textContent = `🇬🇧 London (${londonCount})`;
    document.querySelector('.filter-btn.sessions-newyork').textContent = `🇺🇸 NY (${newyorkCount})`;
}

function applyFilter(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn.${filter}`).classList.add('active');
    
    loadHistory();
}

// ===================== 🆕 UPDATED loadHistory() WITH TABLE RENDERING =====================
// Helper function: Convert dash-separated text back to readable format
function dashToReadable(text) {
    if (!text || text === '-') return '-';
    
    return text
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const tableBody = document.getElementById('historyTableBody');

    let filteredHistory = history;
    
    // Apply current filter
    if (currentFilter === 'warning') {
        filteredHistory = history.filter(t => t.isManualPosition === true);
    } else if (currentFilter.startsWith('sessions-')) {
        const session = currentFilter.replace('sessions-', '');
        filteredHistory = history.filter(t => t.sessions === session);
    } else if (currentFilter !== 'all') {
        filteredHistory = history.filter(t => t.status === currentFilter);
    }
    
    // 🆕 Apply Metode filter
    const filterMetodeValue = document.getElementById('filterMetodeHistory')?.value;
    if (filterMetodeValue && filterMetodeValue !== 'all') {
        filteredHistory = filteredHistory.filter(t => t.metode === filterMetodeValue);
    }
    
    // 🆕 Apply Sumber Sinyal filter
    const filterSumberValue = document.getElementById('filterSumberHistory')?.value;
    if (filterSumberValue && filterSumberValue !== 'all') {
        filteredHistory = filteredHistory.filter(t => t.sumberSignal === filterSumberValue);
    }

    // SORTING berdasarkan timestamp dengan RENUMBERING
    if (historySortOrder === 'newest') {
        // Terbaru dahulu (descending) - Trade terbaru = Nomor 1
        filteredHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else {
        // Terlama dahulu (ascending) - Trade lama = Nomor 1
        filteredHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    }

    if (filteredHistory.length === 0) {
        let message = 'No trading history yet. Start calculating!';
        if (currentFilter !== 'all') {
            message = `No ${currentFilter.replace('-', ' ')} trades found.`;
        }
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; color: #8b92b8; padding: 40px 0;">
                    ${message}
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = '';

    filteredHistory.forEach((item, index) => {
        const actualIndex = history.indexOf(item);
        
        const date = new Date(item.timestamp);
        const dateStr = date.toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });

        const status = item.status || 'running';
        const statusEmoji = {
            'running': '<svg class="icon-svg icon-clock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
</svg>',
            'partial': '<svg class="icon-svg icon-target" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 107, 107, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>
</svg>',
            'hit-tp': '<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg>',
            'hit-sl': '<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg>',
            'break-even': '🔄'
        };

        let displayAmount = 0;
        let displayClass = 'positive';
        
        if (status === 'partial') {
            if (item.usePartialTP && item.tpLevels) {
                const hitTPs = item.tpLevels.filter(tp => tp.status === 'hit');
                displayAmount = hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
            }
            displayClass = 'positive';
        } else if (status === 'hit-tp' || status === 'running') {
            displayAmount = item.profit;
            displayClass = 'positive';
        } else if (status === 'hit-sl') {
            if (item.slInProfit) {
                displayAmount = item.loss;
                displayClass = 'positive';
            } else {
                displayAmount = -item.loss;
                displayClass = 'negative';
            }
        } else if (status === 'break-even') {
            displayAmount = 0;
            displayClass = 'break-even';
        }

        const row = document.createElement('tr');
        row.className = `${status}${item.isManualPosition ? ' manual' : ''}`;
        row.dataset.index = actualIndex;
               // Add warning badge to pair if manual position
        const pairDisplay = item.isManualPosition 
            ? `${item.pair.toUpperCase()} <span class="badge-warning"><svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg></span>` 
            : item.pair.toUpperCase();
        
        row.innerHTML = `
            <td data-label="No">${index + 1}</td>
            <td data-label="Date">${dateStr}</td>
            <td data-label="Pair">${pairDisplay}</td>
            <td data-label="Sessions">${item.sessions ? item.sessions.toUpperCase() : '-'}</td>
            <td data-label="Entry">$${item.entry}</td>
            <td data-label="TP">$${item.usePartialTP ? 'Multiple' : item.tp}</td>
            <td data-label="SL">$${item.sl}</td>
            <td data-label="Status">${statusEmoji[status]} ${status.toUpperCase()}</td>
            <td data-label="P/L" class="${displayClass}">${displayAmount === 0 ? 'Rp 0' : formatRupiah(displayAmount)}</td>
            <td data-label="Actions">
                <div class="history-actions">
                    <button class="btn-history update-status" onclick="openStatusModal(${actualIndex})">Update</button>
                    <button class="btn-history" onclick="openEditModal(${actualIndex})">Edit</button>
                    <button class="btn-history delete" onclick="deleteHistory(${actualIndex})">Delete</button>
                </div>
            </td>
        `;
        
        // Toggle expand on row click
        row.addEventListener('click', function(e) {
            if (e.target.closest('.btn-history')) return;
            toggleExpandedRow(this, item);
        });
        
        tableBody.appendChild(row);
    });
}

/**
 * Toggle history sort order
 */
function toggleHistorySortOrder() {
    historySortOrder = historySortOrder === 'newest' ? 'oldest' : 'newest';
    localStorage.setItem('historySortOrder', historySortOrder);
    
    updateSortButton();
    loadHistory(); // Reload dengan sorting baru
    showToast(`<svg class="icon-svg icon-calendar" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00bcd4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 188, 212, 0.5));">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
</svg> Urutan: ${historySortOrder === 'newest' ? 'Terbaru Dahulu' : 'Terlama Dahulu'}`);
}

/**
 * Update sort button UI with SVG arrow
 */
function updateSortButton() {
    const sortIcon = document.getElementById('sortIcon');
    const sortLabel = document.getElementById('sortLabel');
    
    if (sortIcon && sortLabel) {
        if (historySortOrder === 'newest') {
            // Arrow down - Newest first
            sortIcon.innerHTML = '<path d="M8 12L3 7h10l-5 5z"/>';
            sortLabel.textContent = 'BARU';
        } else {
            // Arrow up - Oldest first
            sortIcon.innerHTML = '<path d="M8 4L3 9h10L8 4z"/>';
            sortLabel.textContent = 'LAMA';
        }
    }
}

function toggleExpandedRow(row, item) {
    const existingExpanded = row.nextElementSibling;
    
    if (existingExpanded && existingExpanded.classList.contains('expanded-row')) {
        existingExpanded.remove();
        row.classList.remove('expanded');
        return;
    }
    
    document.querySelectorAll('.expanded-row').forEach(r => r.remove());
    document.querySelectorAll('.history-table tbody tr').forEach(r => r.classList.remove('expanded'));
    
    const template = document.getElementById('expandedRowTemplate');
    const clone = template.content.cloneNode(true);
    const expandedRow = clone.querySelector('.expanded-row');
    
    expandedRow.querySelector('[data-field="positionSize"]').textContent = item.positionSize ? item.positionSize.toFixed(6) : '-';
    
    // Set RR with color coding
    const rrElement = expandedRow.querySelector('[data-field="rrRatio"]');
    if (item.rrRatio) {
        const rrValue = item.rrRatio;
        rrElement.textContent = `1:${rrValue.toFixed(2)}`;
        
        // Remove all existing RR classes
        rrElement.classList.remove('rr-excellent', 'rr-good', 'rr-medium', 'rr-bad');
        
        // Add appropriate class based on RR value
        if (rrValue >= 2) {
            rrElement.classList.add('rr-excellent'); // Green
        } else if (rrValue >= 1.5) {
            rrElement.classList.add('rr-good'); // Blue
        } else if (rrValue >= 1) {
            rrElement.classList.add('rr-medium'); // Yellow
        } else {
            rrElement.classList.add('rr-bad'); // Red
        }
    } else {
        rrElement.textContent = '-';
    }
    
    // Convert dash-separated values back to readable format
    expandedRow.querySelector('[data-field="metode"]').textContent = dashToReadable(item.metode) || '-';
    expandedRow.querySelector('[data-field="sumberSignal"]').textContent = dashToReadable(item.sumberSignal) || '-';
    expandedRow.querySelector('[data-field="catatan"]').textContent = item.catatan || '-';
    
    const chartBeforeLink = expandedRow.querySelector('[data-field="chartBefore"]');
    const chartAfterLink = expandedRow.querySelector('[data-field="chartAfter"]');
    
    if (item.chartBefore) {
        chartBeforeLink.href = item.chartBefore;
        chartBeforeLink.style.display = 'inline-block';
    } else {
        chartBeforeLink.style.display = 'none';
        chartBeforeLink.parentElement.querySelector('.expanded-label').nextSibling.textContent = ' No chart';
    }
    
    if (item.chartAfter) {
        chartAfterLink.href = item.chartAfter;
        chartAfterLink.style.display = 'inline-block';
    } else {
        chartAfterLink.style.display = 'none';
        chartAfterLink.parentElement.querySelector('.expanded-label').nextSibling.textContent = ' No chart';
    }
    
    expandedRow.classList.add('show');
    row.classList.add('expanded');
    row.parentNode.insertBefore(expandedRow, row.nextSibling);
}

function loadCalculation(index) {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const item = history[index];

    document.getElementById('pair').value = item.pair;
    document.getElementById('entry').value = formatNumber(item.entry.toString());

    if (item.usePartialTP) {
        if (!usePartialTP) {
            document.getElementById('partialTPToggle').click();
        }
        
        tpLevels = item.tpLevels.map(tp => ({
            price: tp.price.toString(),
            percentage: tp.percentage
        }));
        renderTPLevels();
        
        document.getElementById('slPartial').value = formatNumber(item.sl.toString());
    } else {
        if (usePartialTP) {
            document.getElementById('partialTPToggle').click();
        }
        
        document.getElementById('tp').value = formatNumber(item.tp.toString());
        document.getElementById('sl').value = formatNumber(item.sl.toString());
    }

    if (item.riskPercent) {
        const riskSelect = document.getElementById('riskPercent');
        const closestValue = [1, 2, 3, 5].reduce((prev, curr) => {
            return Math.abs(curr - item.riskPercent) < Math.abs(prev - item.riskPercent) ? curr : prev;
        });
        riskSelect.value = closestValue;
    }

    useManualPosition = false;
    manualPositionUSDT = 0;
    manualPositionSize = 0;
    document.getElementById('manualPositionToggle').classList.remove('active');
    document.getElementById('manualInputSection').style.display = 'none';
    document.getElementById('manualInputSection').classList.remove('active');
    document.getElementById('manualPositionUSDT').value = '';

    updatePositionSize();

    showPage('kalkulator');
    showToast('🔥 Calculation loaded!');
}

function openEditModal(index) {
    currentEditTradeIndex = index;
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const item = history[index];

    const editFormContainer = document.getElementById('editFormContainer');
    
    // Get dropdown options
    const metodeOptions = JSON.parse(localStorage.getItem('metodeOptions') || '[]');
    const sumberOptions = JSON.parse(localStorage.getItem('sumberOptions') || '[]');

    let metodeOptionsHTML = '<option value="">-- Pilih Metode --</option>';
    metodeOptions.forEach(option => {
        const value = option.toLowerCase().replace(/\s+/g, '-');
        const selected = item.metode === value ? 'selected' : '';
        metodeOptionsHTML += `<option value="${value}" ${selected}>${option}</option>`;
    });

    let sumberOptionsHTML = '<option value="">-- Pilih Sumber --</option>';
    sumberOptions.forEach(option => {
        const value = option.toLowerCase().replace(/\s+/g, '-');
        const selected = item.sumberSignal === value ? 'selected' : '';
        sumberOptionsHTML += `<option value="${value}" ${selected}>${option}</option>`;
    });
    
    if (item.usePartialTP) {
        const tpInputs = item.tpLevels.map((tp, idx) => `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <div class="form-group">
                    <label>TP${idx + 1} Price (USD)</label>
                    <input type="tel" inputmode="decimal" class="edit-tp-price" data-index="${idx}" value="${formatNumber(tp.price.toString())}">
                </div>
                <div class="form-group">
                    <label>Percentage (%)</label>
                    <input type="number" class="edit-tp-percentage" data-index="${idx}" min="1" max="100" value="${tp.percentage}">
                </div>
            </div>
        `).join('');

        editFormContainer.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>Trading Pair</label>
                    <input type="text" id="editPair" value="${item.pair}">
                </div>
                <div class="form-group">
                    <label>Entry Price (USD)</label>
                    <input type="tel" inputmode="decimal" id="editEntry" value="${formatNumber(item.entry.toString())}">
                </div>
                <div class="form-group">
                    <label>Stop Loss (USD)</label>
                    <input type="tel" inputmode="decimal" id="editSL" value="${formatNumber(item.sl.toString())}">
                </div>
                <div class="form-group">
                    <label>Sessions</label>
                    <select id="editSessions">
                        <option value="asia" ${item.sessions === 'asia' ? 'selected' : ''}>Asia</option>
                        <option value="london" ${item.sessions === 'london' ? 'selected' : ''}>London</option>
                        <option value="newyork" ${item.sessions === 'newyork' ? 'selected' : ''}>New York</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Metode</label>
                    <select id="editMetode">
                        ${metodeOptionsHTML}
                    </select>
                </div>
                <div class="form-group">
                    <label>Sumber Sinyal</label>
                    <select id="editSumberSignal">
                        ${sumberOptionsHTML}
                    </select>
                </div>
                <div class="form-group">
                    <label>Chart Before (URL)</label>
                    <input type="url" id="editChartBefore" value="${item.chartBefore || ''}">
                </div>
                <div class="form-group">
                    <label>Chart After (URL)</label>
                    <input type="url" id="editChartAfter" value="${item.chartAfter || ''}">
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label>Catatan</label>
                    <textarea id="editCatatan" rows="3">${item.catatan || ''}</textarea>
                </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: rgba(0, 212, 255, 0.1); border-radius: 10px;">
                <h4 style="color: #00d4ff; margin-bottom: 10px;">Take Profit Levels</h4>
                ${tpInputs}
            </div>
            <div class="modal-buttons" style="margin-top: 20px;">
                <button class="modal-btn cancel" onclick="closeEditModal()">Cancel</button>
                <button class="modal-btn confirm" onclick="saveEditTrade()">Save Changes</button>
            </div>
        `;
    } else {
        editFormContainer.innerHTML = `
            <div class="form-grid">
                <div class="form-group">
                    <label>Trading Pair</label>
                    <input type="text" id="editPair" value="${item.pair}">
                </div>
                <div class="form-group">
                    <label>Entry Price (USD)</label>
                    <input type="tel" inputmode="decimal" id="editEntry" value="${formatNumber(item.entry.toString())}">
                </div>
                <div class="form-group">
                    <label>Take Profit (USD)</label>
                    <input type="tel" inputmode="decimal" id="editTP" value="${formatNumber(item.tp.toString())}">
                </div>
                <div class="form-group">
                    <label>Stop Loss (USD)</label>
                    <input type="tel" inputmode="decimal" id="editSL" value="${formatNumber(item.sl.toString())}">
                </div>
                <div class="form-group">
                    <label>Sessions</label>
                    <select id="editSessions">
                        <option value="asia" ${item.sessions === 'asia' ? 'selected' : ''}>Asia</option>
                        <option value="london" ${item.sessions === 'london' ? 'selected' : ''}>London</option>
                        <option value="newyork" ${item.sessions === 'newyork' ? 'selected' : ''}>New York</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Metode</label>
                    <select id="editMetode">
                        ${metodeOptionsHTML}
                    </select>
                </div>
                <div class="form-group">
                    <label>Sumber Sinyal</label>
                    <select id="editSumberSignal">
                        ${sumberOptionsHTML}
                    </select>
                </div>
                <div class="form-group">
                    <label>Chart Before (URL)</label>
                    <input type="url" id="editChartBefore" value="${item.chartBefore || ''}">
                </div>
                <div class="form-group">
                    <label>Chart After (URL)</label>
                    <input type="url" id="editChartAfter" value="${item.chartAfter || ''}">
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label>Catatan</label>
                    <textarea id="editCatatan" rows="3">${item.catatan || ''}</textarea>
                </div>
            </div>
            <div class="modal-buttons" style="margin-top: 20px;">
                <button class="modal-btn cancel" onclick="closeEditModal()">Cancel</button>
                <button class="modal-btn confirm" onclick="saveEditTrade()">Save Changes</button>
            </div>
        `;
    }

    editFormContainer.querySelectorAll('input[type="tel"]').forEach(input => {
        if (input.id !== 'editPair') {
            input.addEventListener('input', autoFormatInput);
        }
    });

    document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
    currentEditTradeIndex = null;
}

function saveEditTrade() {
    if (currentEditTradeIndex === null) return;

    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const item = history[currentEditTradeIndex];

    const pair = document.getElementById('editPair').value;
    const entry = parseNumber(document.getElementById('editEntry').value.replace(',', '.'));
    const sl = parseNumber(document.getElementById('editSL').value.replace(',', '.'));

    if (item.usePartialTP) {
        const editedTPLevels = item.tpLevels.map((tp, idx) => {
            const priceInput = document.querySelector(`.edit-tp-price[data-index="${idx}"]`);
            const percentageInput = document.querySelector(`.edit-tp-percentage[data-index="${idx}"]`);
            
            return {
                ...tp,
                price: parseNumber(priceInput.value.replace(',', '.')),
                percentage: parseInt(percentageInput.value)
            };
        });

        const totalPercentage = editedTPLevels.reduce((sum, tp) => sum + tp.percentage, 0);
        if (totalPercentage !== 100) {
            showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Total percentage must be 100%!');
            return;
        }

        const riskPercent = getRiskPercent();
        const currentBalanceUSD = calculateCurrentBalance() / currentKurs;
        const maxPositionValue = currentBalanceUSD / maxEntryMultiplier;
        const riskAmountUSD = maxPositionValue * riskPercent;
        const priceDiff = Math.abs(entry - sl);
        const positionSize = riskAmountUSD / priceDiff;
        const positionUSDT = positionSize * entry;
        
        const modalIDR = positionUSDT * currentKurs;

        const recalculatedTPLevels = editedTPLevels.map(tp => {
            const percentage = tp.percentage / 100;
            const coinsAtTP = positionSize * percentage;
            const valueAtTP = coinsAtTP * tp.price;
            const valueAtTPIDR = valueAtTP * currentKurs;
            const modalPortionIDR = modalIDR * percentage;
            const profitIDR = valueAtTPIDR - modalPortionIDR;
            const profitPercent = ((tp.price - entry) / entry) * 100;

            return {
                price: tp.price,
                percentage: tp.percentage,
                profit: profitIDR,
                profitPercent: profitPercent,
                status: tp.status
            };
        });

        const totalProfit = recalculatedTPLevels.reduce((sum, tp) => sum + tp.profit, 0);

        history[currentEditTradeIndex].pair = pair;
        history[currentEditTradeIndex].entry = entry;
        history[currentEditTradeIndex].sl = sl;
        history[currentEditTradeIndex].tpLevels = recalculatedTPLevels;
        history[currentEditTradeIndex].profit = totalProfit;
        history[currentEditTradeIndex].modalIDR = modalIDR;
        history[currentEditTradeIndex].positionSize = positionSize;
        history[currentEditTradeIndex].riskPercent = riskPercent * 100;

        const nilaiSLUSDT = positionSize * sl;
        const nilaiSLIDR = nilaiSLUSDT * currentKurs;
        
        if (sl > entry) {
            history[currentEditTradeIndex].loss = nilaiSLIDR - modalIDR;
            history[currentEditTradeIndex].slInProfit = true;
        } else {
            history[currentEditTradeIndex].loss = modalIDR - nilaiSLIDR;
            history[currentEditTradeIndex].slInProfit = false;
        }

        const slPercent = ((sl - entry) / entry) * 100;
        history[currentEditTradeIndex].slPercent = slPercent;

        const weightedTP = recalculatedTPLevels.reduce((sum, tp) => sum + (tp.price * tp.percentage / 100), 0);
        const avgTPPercent = ((weightedTP - entry) / entry) * 100;
        history[currentEditTradeIndex].rrRatio = Math.abs(avgTPPercent / slPercent);

    } else {
        const tp = parseNumber(document.getElementById('editTP').value.replace(',', '.'));
        
        const riskPercent = getRiskPercent();
        const currentBalanceUSD = calculateCurrentBalance() / currentKurs;
        const maxPositionValue = currentBalanceUSD / maxEntryMultiplier;
        const riskAmountUSD = maxPositionValue * riskPercent;
        const priceDiff = Math.abs(entry - sl);
        const positionSize = riskAmountUSD / priceDiff;
        const positionUSDT = positionSize * entry;
        
        const modalIDR = positionUSDT * currentKurs;

        const nilaiTPUSDT = positionSize * tp;
        const nilaiTPIDR = nilaiTPUSDT * currentKurs;

        const nilaiSLUSDT = positionSize * sl;
        const nilaiSLIDR = nilaiSLUSDT * currentKurs;

        let profit, loss;
        if (sl > entry) {
            profit = nilaiTPIDR - modalIDR;
            loss = nilaiSLIDR - modalIDR;
            history[currentEditTradeIndex].slInProfit = true;
        } else {
            profit = nilaiTPIDR - modalIDR;
            loss = modalIDR - nilaiSLIDR;
            history[currentEditTradeIndex].slInProfit = false;
        }

        const tpPercent = ((tp - entry) / entry) * 100;
        const slPercent = ((sl - entry) / entry) * 100;
        const rrRatio = Math.abs(tpPercent / slPercent);

        history[currentEditTradeIndex].pair = pair;
        history[currentEditTradeIndex].entry = entry;
        history[currentEditTradeIndex].tp = tp;
        history[currentEditTradeIndex].sl = sl;
        history[currentEditTradeIndex].profit = profit;
        history[currentEditTradeIndex].loss = loss;
        history[currentEditTradeIndex].tpPercent = tpPercent;
        history[currentEditTradeIndex].slPercent = slPercent;
        history[currentEditTradeIndex].rrRatio = rrRatio;
        history[currentEditTradeIndex].nilaiTPIDR = nilaiTPIDR;
        history[currentEditTradeIndex].nilaiSLIDR = nilaiSLIDR;
        history[currentEditTradeIndex].modalIDR = modalIDR;
        history[currentEditTradeIndex].positionSize = positionSize;
        history[currentEditTradeIndex].riskPercent = riskPercent * 100;
    }

    history[currentEditTradeIndex].isManualPosition = item.isManualPosition || false;
    history[currentEditTradeIndex].manualPositionUSDT = item.manualPositionUSDT || null;
    history[currentEditTradeIndex].manualPositionSize = item.manualPositionSize || null;
    history[currentEditTradeIndex].recommendedPositionUSDT = item.recommendedPositionUSDT || null;
    history[currentEditTradeIndex].recommendedPositionSize = item.recommendedPositionSize || null;
    
    // 🆕 SAVE NEW FIELDS
    history[currentEditTradeIndex].sessions = document.getElementById('editSessions').value;
    // Save Metode & Sumber Sinyal
    history[currentEditTradeIndex].metode = document.getElementById('editMetode').value;
    history[currentEditTradeIndex].sumberSignal = document.getElementById('editSumberSignal').value;
    history[currentEditTradeIndex].chartBefore = document.getElementById('editChartBefore').value;
    history[currentEditTradeIndex].chartAfter = document.getElementById('editChartAfter').value;
    history[currentEditTradeIndex].catatan = document.getElementById('editCatatan').value;

    localStorage.setItem('tpslHistory', JSON.stringify(history));
    loadHistory();
    updateStats();
    updateCurrentBalanceDisplay();
    updatePositionSize();
    updateFilterCounts();
    updateRiskDashboard();
    closeEditModal();
    showToast('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Trade updated successfully!');
}

function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    history.splice(index, 1);
    localStorage.setItem('tpslHistory', JSON.stringify(history));
    
    // 🆕 FIX #2: Recalculate peak balance from remaining history
    recalculatePeakBalance();
    
    loadHistory();
    updateStats();
    updateCurrentBalanceDisplay();
    updatePositionSize();
    updateFilterCounts();
    updateRiskDashboard();
    showToast('<svg class="icon-svg icon-trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(244, 67, 54, 0.5));">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
</svg> Deleted from history!');
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
        localStorage.removeItem('tpslHistory');
        loadHistory();
        updateStats();
        updateCurrentBalanceDisplay();
        updatePositionSize();
        updateFilterCounts();
        updateRiskDashboard();
        showToast('<svg class="icon-svg icon-trash" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(244, 67, 54, 0.5));">
    <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
</svg> All history cleared!');
    }
}

function openStatusModal(index) {
    currentEditIndex = index;
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const item = history[index];
    const currentStatus = item.status || 'running';
    
    selectedStatus = currentStatus;

    const statusModalContent = document.getElementById('statusModalContent');

    if (item.usePartialTP) {
        const tpCheckboxes = item.tpLevels.map((tp, idx) => `
            <div class="tp-checkbox-item" id="tpCheckItem${idx}">
                <input type="checkbox" id="tpCheck${idx}" ${tp.status === 'hit' ? 'checked' : ''}>
                <label for="tpCheck${idx}" class="tp-checkbox-label">
                    TP${idx + 1}: $${tp.price.toFixed(2)} (${tp.percentage}%) - ${formatRupiah(tp.profit)}
                </label>
            </div>
        `).join('');

        statusModalContent.innerHTML = `
            <div class="partial-tp-checkboxes">
                <h4>Select TP Levels Hit:</h4>
                ${tpCheckboxes}
                <div class="sl-checkbox-item" id="slCheckItem">
                    <input type="checkbox" id="slCheck" ${currentStatus === 'hit-sl' ? 'checked' : ''}>
                    <label for="slCheck" class="sl-checkbox-label">
                        Hit Stop Loss: $${item.sl}
                    </label>
                </div>
                <div class="tp-checkbox-item" id="breakEvenCheckItem">
                    <input type="checkbox" id="breakEvenCheck" ${currentStatus === 'break-even' ? 'checked' : ''}>
                    <label for="breakEvenCheck" class="tp-checkbox-label">
                        Break Even
                    </label>
                </div>
            </div>
        `;

        const slCheck = document.getElementById('slCheck');
        const breakEvenCheck = document.getElementById('breakEvenCheck');
        const tpChecks = item.tpLevels.map((_, idx) => document.getElementById(`tpCheck${idx}`));

        function updateCheckboxStates() {
            const slChecked = slCheck.checked;
            const breakEvenChecked = breakEvenCheck.checked;
            const anyTPChecked = tpChecks.some(check => check.checked);

            if (slChecked) {
                tpChecks.forEach(check => {
                    check.disabled = true;
                    document.getElementById(`tpCheckItem${tpChecks.indexOf(check)}`).classList.add('disabled');
                });
                breakEvenCheck.disabled = true;
                document.getElementById('breakEvenCheckItem').classList.add('disabled');
            } else if (breakEvenChecked) {
                tpChecks.forEach(check => {
                    check.disabled = true;
                    document.getElementById(`tpCheckItem${tpChecks.indexOf(check)}`).classList.add('disabled');
                });
                slCheck.disabled = true;
                document.getElementById('slCheckItem').classList.add('disabled');
            } else if (anyTPChecked) {
                slCheck.disabled = true;
                document.getElementById('slCheckItem').classList.add('disabled');
                breakEvenCheck.disabled = true;
                document.getElementById('breakEvenCheckItem').classList.add('disabled');
            } else {
                tpChecks.forEach(check => {
                    check.disabled = false;
                    document.getElementById(`tpCheckItem${tpChecks.indexOf(check)}`).classList.remove('disabled');
                });
                slCheck.disabled = false;
                document.getElementById('slCheckItem').classList.remove('disabled');
                breakEvenCheck.disabled = false;
                document.getElementById('breakEvenCheckItem').classList.remove('disabled');
            }
        }

        slCheck.addEventListener('change', function() {
            if (this.checked) {
                tpChecks.forEach(check => check.checked = false);
                breakEvenCheck.checked = false;
            }
            updateCheckboxStates();
        });

        breakEvenCheck.addEventListener('change', function() {
            if (this.checked) {
                tpChecks.forEach(check => check.checked = false);
                slCheck.checked = false;
            }
            updateCheckboxStates();
        });

        tpChecks.forEach(check => {
            check.addEventListener('change', function() {
                if (this.checked) {
                    slCheck.checked = false;
                    breakEvenCheck.checked = false;
                }
                updateCheckboxStates();
            });
        });

        updateCheckboxStates();

    } else {
        statusModalContent.innerHTML = `
            <div class="status-options">
                <div class="status-option running ${currentStatus === 'running' ? 'selected' : ''}" data-status="running">
                    <svg class="icon-svg icon-clock" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
</svg> Running
                </div>
                <div class="status-option hit-tp ${currentStatus === 'hit-tp' ? 'selected' : ''}" data-status="hit-tp">
                    <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Hit TP
                </div>
                <div class="status-option hit-sl ${currentStatus === 'hit-sl' ? 'selected' : ''}" data-status="hit-sl">
                    <svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Hit SL
                </div>
                <div class="status-option break-even ${currentStatus === 'break-even' ? 'selected' : ''}" data-status="break-even">
                    🔄 Break Even
                </div>
            </div>
        `;

        statusModalContent.querySelectorAll('.status-option').forEach(option => {
            option.addEventListener('click', function() {
                statusModalContent.querySelectorAll('.status-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedStatus = this.dataset.status;
            });
        });
    }
    
    document.getElementById('statusModal').classList.add('show');
}

function closeStatusModal() {
    document.getElementById('statusModal').classList.remove('show');
    currentEditIndex = null;
    selectedStatus = null;
}

function updateTradeStatus() {
    if (currentEditIndex === null) return;

    let history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const item = history[currentEditIndex];

    if (item.usePartialTP) {
        const slChecked = document.getElementById('slCheck').checked;
        const breakEvenChecked = document.getElementById('breakEvenCheck').checked;
        
        let anyTPHit = false;
        let allTPHit = true;

        item.tpLevels.forEach((tp, idx) => {
            const check = document.getElementById(`tpCheck${idx}`);
            if (check.checked) {
                anyTPHit = true;
                item.tpLevels[idx].status = 'hit';
            } else {
                allTPHit = false;
                item.tpLevels[idx].status = 'pending';
            }
        });

        if (slChecked) {
            item.status = 'hit-sl';
        } else if (breakEvenChecked) {
            item.status = 'break-even';
        } else if (anyTPHit) {
            if (allTPHit) {
                item.status = 'hit-tp';
            } else {
                item.status = 'partial';
            }
        } else {
            item.status = 'running';
        }

    } else {
        item.status = selectedStatus;
    }

    localStorage.setItem('tpslHistory', JSON.stringify(history));

    // 🆕 FIX #1: Update peak balance if current balance increased
    const currentBalance = calculateCurrentBalance();
    const peakBalance = parseFloat(localStorage.getItem('peakBalance') || '0');
    
    if (currentBalance > peakBalance) {
        localStorage.setItem('peakBalance', currentBalance.toString());
        console.log(`<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Peak balance updated: ${formatRupiah(currentBalance)}`);
    }

    loadHistory();
    updateStats();
    updateCurrentBalanceDisplay();
    updatePositionSize();
    updateFilterCounts();
    updateRiskDashboard();

    closeStatusModal();
    showToast('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Status updated!');
}

function loadInitialBalance() {
    const savedBalance = localStorage.getItem('initialBalance');
    if (savedBalance) {
        updateStats();
    }
}

function openBalanceModal() {
    modalCurrency = 'idr';
    document.querySelectorAll('#modalCurrencyPill .currency-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.currency === modalCurrency) {
            opt.classList.add('active');
        }
    });
    
    const currentBalance = calculateCurrentBalance();
    document.getElementById('balanceInput').value = formatNumber(Math.floor(currentBalance).toString());
    
    document.getElementById('balanceModal').classList.add('show');
}

function closeBalanceModal() {
    document.getElementById('balanceModal').classList.remove('show');
}

function saveBalance() {
    const input = document.getElementById('balanceInput').value;
    if (!input || isNaN(parseNumber(input))) {
        showToast('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Please enter a valid amount!');
        return;
    }

    const amount = parseNumber(input);
    localStorage.setItem('initialBalance', amount.toString());

    localStorage.setItem('peakBalance', amount.toString());

    updateStats();
    updateCurrentBalanceDisplay();
    updatePositionSize();
    updateRiskDashboard();
    
    closeBalanceModal();
    showToast('<svg class="icon-svg icon-dollar" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.5));">
    <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
</svg> Balance saved!');
}

function updateStats() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    const currentBalance = calculateCurrentBalance();
    const netProfitLoss = calculateNetProfitLoss();
    const roi = calculateROI();

    document.getElementById('initialBalanceValue').textContent = formatRupiah(initialBalance);

    document.getElementById('currentBalanceValue').textContent = formatRupiah(currentBalance);
    if (netProfitLoss > 0) {
        document.getElementById('currentBalanceValue').className = 'stat-value positive';
    } else if (netProfitLoss < 0) {
        document.getElementById('currentBalanceValue').className = 'stat-value negative';
    } else {
        document.getElementById('currentBalanceValue').className = 'stat-value break-even';
    }

    document.getElementById('netProfitLossValue').textContent = formatRupiah(netProfitLoss);
    if (netProfitLoss > 0) {
        document.getElementById('netProfitLossValue').className = 'stat-value positive';
    } else if (netProfitLoss < 0) {
        document.getElementById('netProfitLossValue').className = 'stat-value negative';
    } else {
        document.getElementById('netProfitLossValue').className = 'stat-value break-even';
    }

    document.getElementById('roiValue').textContent = `${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%`;
    if (roi > 0) {
        document.getElementById('roiValue').className = 'stat-value positive';
    } else if (roi < 0) {
        document.getElementById('roiValue').className = 'stat-value negative';
    } else {
        document.getElementById('roiValue').className = 'stat-value break-even';
    }

    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const closedTrades = history.filter(t => t.status && t.status !== 'running');
    const wonTrades = closedTrades.filter(t => t.status === 'hit-tp' || t.status === 'partial');
    const lostTrades = closedTrades.filter(t => t.status === 'hit-sl' && !t.slInProfit);

    let totalProfit = 0;
    let totalLoss = 0;

    history.forEach(trade => {
        if (trade.status === 'hit-tp') {
            totalProfit += trade.profit;
        } else if (trade.status === 'hit-sl') {
            if (trade.slInProfit) {
                totalProfit += trade.loss;
            } else {
                totalLoss += trade.loss;
            }
        } else if (trade.status === 'partial') {
            if (trade.usePartialTP && trade.tpLevels) {
                const hitTPs = trade.tpLevels.filter(tp => tp.status === 'hit');
                totalProfit += hitTPs.reduce((sum, tp) => sum + tp.profit, 0);
            }
        }
    });

    document.getElementById('statProfit').textContent = formatRupiah(totalProfit);
    document.getElementById('statLoss').textContent = formatRupiah(totalLoss);
    document.getElementById('statTotal').textContent = history.length;

    const winRate = closedTrades.length > 0 ? ((wonTrades.length / closedTrades.length) * 100).toFixed(1) : 0;
    document.getElementById('statWinRate').textContent = `${winRate}%`;
}

function calculateNetProfitLoss() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    const currentBalance = calculateCurrentBalance();
    return currentBalance - initialBalance;
}

function calculateROI() {
    const initialBalance = parseFloat(localStorage.getItem('initialBalance') || '0');
    if (initialBalance === 0) return 0;
    
    const netProfitLoss = calculateNetProfitLoss();
    return (netProfitLoss / initialBalance) * 100;
}

// ===================== EVENT LISTENERS =====================
document.querySelectorAll('.sidebar-item').forEach(nav => {
    nav.addEventListener('click', function() {
        const page = this.dataset.nav;
        showPage(page);
    });
});

document.getElementById('hamburgerBtn').addEventListener('click', toggleSidebar);

document.querySelectorAll('.risk-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetTab = this.dataset.tab;
        showRiskTab(targetTab);
    });
});

document.getElementById('btnQuickCalculator').addEventListener('click', function() {
    showPage('kalkulator');
});

document.getElementById('btnQuickHistory').addEventListener('click', function() {
    showPage('riwayat');
});

document.getElementById('btnResetToday').addEventListener('click', resetTodayCounter);
document.getElementById('btnResetDrawdown').addEventListener('click', resetDrawdownPeak);
document.getElementById('btnResetAll').addEventListener('click', resetAllCounters);

document.getElementById('btnEditBalanceDashboard').addEventListener('click', openBalanceModal);

document.getElementById('btnCancelStatus').addEventListener('click', closeStatusModal);
document.getElementById('btnConfirmStatus').addEventListener('click', updateTradeStatus);

document.getElementById('btnCancelBalance').addEventListener('click', closeBalanceModal);
document.getElementById('btnConfirmBalance').addEventListener('click', saveBalance);

document.querySelectorAll('#modalCurrencyPill .currency-option').forEach(opt => {
    opt.addEventListener('click', function() {
        modalCurrency = this.dataset.currency;
        
        document.querySelectorAll('#modalCurrencyPill .currency-option').forEach(o => {
            o.classList.remove('active');
        });
        this.classList.add('active');
        
        const currentBalance = calculateCurrentBalance();
        const input = document.getElementById('balanceInput');
        
        if (modalCurrency === 'idr') {
            input.value = formatNumber(Math.floor(currentBalance).toString());
        } else {
            input.value = (currentBalance / currentKurs).toFixed(2);
        }
    });
});


// 🆕 AUTO-FORMAT BALANCE INPUT EVENT LISTENER
document.getElementById('balanceInput').addEventListener('input', autoFormatBalanceInput);

document.querySelectorAll('#currencyPill .currency-option').forEach(opt => {
    opt.addEventListener('click', function() {
        currentCurrency = this.dataset.currency;
        localStorage.setItem('currencyPreference', currentCurrency);
        
        document.querySelectorAll('#currencyPill .currency-option').forEach(o => {
            o.classList.remove('active');
        });
        this.classList.add('active');
        
        updateCurrentBalanceDisplay();
    });
});

document.getElementById('btnCancelManual').addEventListener('click', function() {
    document.getElementById('manualConfirmModal').classList.remove('show');
    pendingCalculation = null;
});

document.getElementById('btnConfirmManual').addEventListener('click', function() {
    document.getElementById('manualConfirmModal').classList.remove('show');
    if (pendingCalculation) {
        proceedWithCalculation(pendingCalculation.useCurrentBalance);
    }
    pendingCalculation = null;
});

document.getElementById('btnCopy').addEventListener('click', copyResults);
document.getElementById('btnSave').addEventListener('click', saveToHistory);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        applyFilter(filter);
    });
});

document.getElementById('btnExportDB').addEventListener('click', function() {
    const history = JSON.parse(localStorage.getItem('tpslHistory') || '[]');
    const initialBalance = localStorage.getItem('initialBalance') || '0';
    const peakBalance = localStorage.getItem('peakBalance') || initialBalance;
    const currencyPreference = localStorage.getItem('currencyPreference') || 'idr';
    const metodeOptions = localStorage.getItem('metodeOptions') || '[]';
    const sumberOptions = localStorage.getItem('sumberOptions') || '[]';
    
    const data = {
        version: '2.0',
        exportDate: new Date().toISOString(),
        initialBalance: initialBalance,
        peakBalance: peakBalance,
        currencyPreference: currencyPreference,
        metodeOptions: JSON.parse(metodeOptions),
        sumberOptions: JSON.parse(sumberOptions),
        history: history
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `tpsl-calculator-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('<svg class="icon-svg icon-save" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(76, 175, 80, 0.5));">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>
</svg> Database exported successfully!');
});

document.getElementById('btnImportDB').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            if (confirm('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> This will replace ALL current data. Continue?')) {
                if (data.history) {
                    localStorage.setItem('tpslHistory', JSON.stringify(data.history));
                }
                if (data.initialBalance) {
                    localStorage.setItem('initialBalance', data.initialBalance);
                }
                if (data.peakBalance) {
                    localStorage.setItem('peakBalance', data.peakBalance);
                }
                if (data.currencyPreference) {
                    localStorage.setItem('currencyPreference', data.currencyPreference);
                    currentCurrency = data.currencyPreference;
                }
                if (data.metodeOptions) {
                    localStorage.setItem('metodeOptions', JSON.stringify(data.metodeOptions));
                }
                if (data.sumberOptions) {
                    localStorage.setItem('sumberOptions', JSON.stringify(data.sumberOptions));
                }
                
                // 🆕 FIX #5: Recalculate peak balance dari imported history
                recalculatePeakBalance();
                
                initializeDropdownOptions();
                loadHistory();
                updateStats();
                updateCurrentBalanceDisplay();
                updatePositionSize();
                updateFilterCounts();
                updateRiskDashboard();
                
                showToast('📂 Database imported successfully!');
            }
        } catch (error) {
            showToast('<svg class="icon-svg icon-x-circle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff3366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 51, 102, 0.5));">
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
</svg> Invalid backup file!');
        }
        
        e.target.value = '';
    };
    reader.readAsText(file);
});

document.getElementById('btnClearHistory').addEventListener('click', clearHistory);

// ===================== FIREBASE CLOUD SYNC EVENT LISTENERS =====================
document.getElementById('btnToggleSync')?.addEventListener('click', function() {
    window.firebaseSync.toggle();
    
    // Show/hide sync buttons
    const uploadBtn = document.getElementById('btnSyncToCloud');
    const downloadBtn = document.getElementById('btnSyncFromCloud');
    
    if (FIRESTORE_CONFIG.enabled) {
        if (uploadBtn) uploadBtn.style.display = 'inline-block';
        if (downloadBtn) downloadBtn.style.display = 'inline-block';
    } else {
        if (uploadBtn) uploadBtn.style.display = 'none';
        if (downloadBtn) downloadBtn.style.display = 'none';
    }
});

document.getElementById('btnSyncToCloud')?.addEventListener('click', function() {
    window.firebaseSync.syncToCloud();
});

document.getElementById('btnSyncFromCloud')?.addEventListener('click', function() {
    window.firebaseSync.syncFromCloud();
});
// ===================== END FIREBASE SYNC LISTENERS =====================

document.getElementById('btnEditBalance').addEventListener('click', openBalanceModal);

document.getElementById('btnAddMetode').addEventListener('click', () => addDropdownOption('metode'));
document.getElementById('btnAddSumber').addEventListener('click', () => addDropdownOption('sumber'));

// Event listeners untuk filter dropdown recap
document.getElementById('filterSumberSignal')?.addEventListener('change', function() {
    filterRecapBySumber(this.value);
});

document.getElementById('filterMetode')?.addEventListener('change', function() {
    filterRecapByMetode(this.value);
});

// 🆕 Event listeners untuk History filter dropdowns
document.getElementById('filterMetodeHistory')?.addEventListener('change', function() {
    loadHistory();
});

document.getElementById('filterSumberHistory')?.addEventListener('change', function() {
    loadHistory();
});

// ===================== INITIALIZATION =====================
window.addEventListener('DOMContentLoaded', function() {
    const initialBalance = localStorage.getItem('initialBalance');
    
    if (!initialBalance || initialBalance === '0') {
        setTimeout(() => {
            openBalanceModal();
        }, 500);
    }
    
    initializeDropdownOptions();
    
    showPage(currentPage);
    
    // 🔧 TAMBAHKAN: Initialize Firebase sync
    window.firebaseSync.init();
    window.firebaseSync.updateToggle();
    
    fetchKurs();
    setInterval(fetchKurs, 300000);
    updateStats();
    loadInitialBalance();
    updateCurrentBalanceDisplay();
    updateFilterCounts();
    updateRiskDashboard();
    
    if (currentPage === 'ringkasan') {
        calculateRecapBySumber();
        calculateRecapByMetode();
    }
    
    // 🆕 Initialize history filters
    populateHistoryFilters();
    
    // Sort history button
    const btnSortHistory = document.getElementById('btnSortHistory');
    if (btnSortHistory) {
        btnSortHistory.addEventListener('click', toggleHistorySortOrder);
        updateSortButton(); // Set initial state
    }

    // ===================== AUTO-HIDE HAMBURGER ON SCROLL (v2.5 - BUG FIX) =====================
    const scrollContainer = document.querySelector('.scroll-container');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarNav = document.getElementById('sidebarNav');

    if (hamburgerBtn && scrollContainer && sidebarNav) {
        let lastScrollTop = 0;
        let scrollTimeout = null;
        let isUserInputting = false;
        let allTimeouts = []; // 🔧 FIX 1: Track all timeouts untuk cleanup
        // 🔧 FIX 2: Removed stuckCheckInterval (too aggressive)
        
        // 🔧 FIX 3: Fungsi untuk clear semua timeout yang menumpuk
        function clearAllTimeouts() {
            allTimeouts.forEach(timeout => clearTimeout(timeout));
            allTimeouts = [];
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
                scrollTimeout = null;
            }
        }
        
        // 🔧 FIX 4: Fungsi untuk force reset flag
        function forceResetFlags() {
            isUserInputting = false;
        }
        
        // 🔧 FIX 5: Fungsi untuk cek apakah user sedang mengisi input/dropdown/textarea
        function checkIfUserInputting() {
            const activeElement = document.activeElement;
            const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
            
            // Cek apakah element yang aktif adalah input/textarea/select
            if (inputElements.includes(activeElement.tagName)) {
                return true;
            }
            
            // 🔧 FIX 6: Cek modal dengan lebih strict - hanya yang BENAR-BENAR visible
            const modals = document.querySelectorAll('.edit-modal, .balance-modal, .status-modal, .confirmation-modal, .risk-warning-modal');
            for (let modal of modals) {
                if (modal.classList.contains('show') && 
                    window.getComputedStyle(modal).display !== 'none' &&
                    window.getComputedStyle(modal).visibility !== 'hidden') {
                    return true;
                }
            }
            
            return false;
        }
        
        // Fungsi untuk cek apakah SIDEBAR sedang TERBUKA
        function isSidebarOpen() {
            return !sidebarNav.classList.contains('hidden');
        }
        
        // 🔧 FIX 7: Force show hamburger function
        function forceShowHamburger() {
            hamburgerBtn.classList.remove('hide');
            clearAllTimeouts();
        }
        
        // Event listener untuk detect input focus
        document.addEventListener('focusin', function(e) {
            const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
            if (inputElements.includes(e.target.tagName)) {
                isUserInputting = true;
                // Jangan hide jika sidebar terbuka
                if (!isSidebarOpen()) {
                    hamburgerBtn.classList.add('hide');
                }
            }
        });
        
        // 🔧 FIX 8: Enhanced focusout dengan safety check
        document.addEventListener('focusout', function(e) {
            const inputElements = ['INPUT', 'TEXTAREA', 'SELECT'];
            if (inputElements.includes(e.target.tagName)) {
                isUserInputting = false;
                
                // 🔧 Double check setelah 300ms untuk memastikan flag di-reset
                const resetTimeout = setTimeout(() => {
                    if (!checkIfUserInputting()) {
                        isUserInputting = false;
                        forceShowHamburger();
                    }
                }, 300);
                allTimeouts.push(resetTimeout);
            }
        });
        
        // 🔧 FIX 9: Cleanup saat modal ditutup
        const modalCloseObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (!target.classList.contains('show')) {
                        // Modal baru ditutup, reset flag dan show hamburger
                        const cleanupTimeout = setTimeout(() => {
                            forceResetFlags();
                            if (!checkIfUserInputting() && !isSidebarOpen()) {
                                forceShowHamburger();
                            }
                        }, 100);
                        allTimeouts.push(cleanupTimeout);
                    }
                }
            });
        });
        
        // Observe semua modal
        const modalsToObserve = document.querySelectorAll('.edit-modal, .balance-modal, .status-modal, .confirmation-modal, .risk-warning-modal');
        modalsToObserve.forEach(modal => {
            modalCloseObserver.observe(modal, {
                attributes: true,
                attributeFilter: ['class']
            });
        });
        
        // Scroll event dengan timeout 1.5 detik
        scrollContainer.addEventListener('scroll', function() {
            let scrollTop = scrollContainer.scrollTop;
            
            // Jika SIDEBAR TERBUKA, hamburger SELALU visible (no auto-hide)
            if (isSidebarOpen()) {
                hamburgerBtn.classList.remove('hide');
                clearAllTimeouts();
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                return; // Skip auto-hide logic
            }
            
            // Jangan tampilkan hamburger jika user sedang mengisi input
            if (checkIfUserInputting() || isUserInputting) {
                hamburgerBtn.classList.add('hide');
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                return;
            }
            
            // Tampilkan hamburger saat ada scroll (up atau down)
            if (Math.abs(scrollTop - lastScrollTop) > 5) {
                hamburgerBtn.classList.remove('hide');
                
                // 🔧 FIX 10: Clear ALL timeouts sebelum set yang baru
                clearAllTimeouts();
                
                // Set timeout baru untuk hide setelah 1.5 detik
                scrollTimeout = setTimeout(function() {
                    if (!checkIfUserInputting() && !isUserInputting && !isSidebarOpen()) {
                        hamburgerBtn.classList.add('hide');
                    }
                }, 1500);
                allTimeouts.push(scrollTimeout);
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
        
        // Initial state based on sidebar
        if (isSidebarOpen()) {
            hamburgerBtn.classList.remove('hide');
        }
        
        // Observer untuk detect sidebar open/close
        const sidebarObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (isSidebarOpen()) {
                        // Sidebar baru dibuka → Show hamburger
                        forceShowHamburger();
                    } else {
                        // Sidebar baru ditutup → Show hamburger juga
                        forceShowHamburger();
                    }
                }
            });
        });
        
        // Start observing sidebar
        sidebarObserver.observe(sidebarNav, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // 🔧 FIX 11: Removed aggressive interval checker
        // Hamburger akan show otomatis melalui:
        // - Scroll trigger (langsung)
        // - Modal close (FIX 9)
        // - Input blur (FIX 8)
        // - Click anywhere (FIX 12)
        
        // 🔧 FIX 12: Click/Tap anywhere untuk force show hamburger
        document.addEventListener('click', function(e) {
            // Jika click bukan pada input/modal/sidebar, show hamburger
            const isClickOnInput = e.target.tagName === 'INPUT' || 
                                   e.target.tagName === 'TEXTAREA' || 
                                   e.target.tagName === 'SELECT';
            const isClickOnModal = e.target.closest('.edit-modal, .balance-modal, .status-modal, .confirmation-modal, .risk-warning-modal');
            const isClickOnSidebar = e.target.closest('.sidebar-nav');
            
            if (!isClickOnInput && !isClickOnModal && !isClickOnSidebar) {
                // User click di area kosong, kemungkinan mau show hamburger
                const showTimeout = setTimeout(() => {
                    if (!checkIfUserInputting() && !isSidebarOpen()) {
                        forceShowHamburger();
                    }
                }, 50);
                allTimeouts.push(showTimeout);
            }
        });
        
        // 🔧 FIX 13: Cleanup saat page unload
        window.addEventListener('beforeunload', () => {
            clearAllTimeouts();
        });
    }
    // =========================================================================
    
    setInterval(() => {
        updateResetCountdown();
    }, 60000);
    
    setInterval(() => {
        if (currentPage === 'ringkasan' || currentPage === 'risiko') {
            updateRiskDashboard();
        }
    }, 30000);
});

initializeTPLevels();

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('status-modal')) {
        closeStatusModal();
    }
    if (e.target.classList.contains('balance-modal')) {
        closeBalanceModal();
    }
    if (e.target.classList.contains('edit-modal')) {
        closeEditModal();
    }
    if (e.target.classList.contains('confirmation-modal')) {
        document.getElementById('manualConfirmModal').classList.remove('show');
        pendingCalculation = null;
    }
    if (e.target.classList.contains('risk-warning-modal')) {
        document.getElementById('riskWarningModal').classList.remove('show');
        pendingCalculation = null;
    }
});

// ===================== GLOBAL FUNCTIONS =====================
window.openStatusModal = openStatusModal;
window.openEditModal = openEditModal;
window.loadCalculation = loadCalculation;
window.deleteHistory = deleteHistory;
window.closeEditModal = closeEditModal;
window.deleteDropdownOption = deleteDropdownOption;
window.editDropdownOption = editDropdownOption;
window.toggleHistorySortOrder = toggleHistorySortOrder;
window.updateSortButton = updateSortButton;

// ===================== LOGOUT FUNCTION =====================
function logout() {
    // Confirm logout
    if (confirm('Apakah Anda yakin ingin logout?')) {
        // Clear session
        localStorage.removeItem('isLoggedIn');
        
        // Show toast notification
        showToast('👋 Logout berhasil!');
        
        // Redirect to login page after short delay
        setTimeout(() => {
            window.location.href = '/kalkulator/login/';
        }, 500);
    }
}

// Export logout to window global
window.logout = logout;
/* ===================================================================
   CLIENT-SIDE ROUTING - HISTORY API
   Added: 6 Jan 2026
   =================================================================== */

// <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    console.log('🔙 Browser navigation detected');
    
    if (event.state && event.state.page) {
        showPage(event.state.page, false);
    } else {
        const currentPath = window.location.pathname;
        const pageName = extractPageFromUrl(currentPath);
        showPage(pageName, false);
    }
});

// <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Extract page name dari URL
function extractPageFromUrl(pathname) {
    const match = pathname.match(/\/kalkulator\/([^\/]+)/);
    if (match && match[1]) {
        return match[1];
    }
    return 'ringkasan';
}

// <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Initialize routing saat page load
function initializeRouting() {
    console.log('🚀 Initializing client-side routing...');
    
    // <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Cek apakah ada requested page dari 404.html
    const requestedPage = sessionStorage.getItem('requestedPage');
    if (requestedPage) {
        console.log('📄 Loading requested page from 404:', requestedPage);
        sessionStorage.removeItem('requestedPage'); // Clear after use
        
        const validPages = ['ringkasan', 'kalkulator', 'riwayat', 'winrate', 'risiko'];
        if (validPages.includes(requestedPage)) {
            showPage(requestedPage, true);
            return; // Exit early
        }
    }
    
    const currentPath = window.location.pathname;
    console.log('📍 Current path:', currentPath);
    
    if (currentPath.includes('/kalkulator/')) {
        const pageName = extractPageFromUrl(currentPath);
        console.log('📄 Loading page from URL:', pageName);
        
        const validPages = ['ringkasan', 'kalkulator', 'riwayat', 'winrate', 'risiko'];
        
        if (validPages.includes(pageName)) {
            showPage(pageName, false);
            history.replaceState({ page: pageName }, '', currentPath);
        } else {
            console.log('<svg class="icon-svg icon-warning" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff9800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.5));">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
</svg> Invalid page, redirecting to ringkasan');
            showPage('ringkasan', true);
        }
    } else if (currentPath === '/kalkulator' || currentPath === '/kalkulator/') {
        showPage('ringkasan', true);
    }
}

// <svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Initialize saat DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRouting);
} else {
    initializeRouting();
}

console.log('<svg class="icon-svg icon-check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
</svg> Client-side routing initialized!');

/* ===================================================================
   END OF CLIENT-SIDE ROUTING
   =================================================================== */
