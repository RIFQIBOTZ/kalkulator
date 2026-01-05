// ===================== AUTHENTICATION SYSTEM =====================
// TP/SL Calculator - Auth Protection
// Version: 2.0 (FIXED)
// Author: RIFQI
// FIX: Prevent download spam on logout
// ===================================================================

(function() {
    'use strict';
    
    // ===================== CONFIGURATION =====================
    const AUTH_KEY = 'isLoggedIn';
    const LOGIN_PAGE = 'login.html';
    const DEBUG_MODE = false; // Set true untuk debugging
    
    // ===================== UTILITY FUNCTIONS =====================
    
    /**
     * Log debug messages jika DEBUG_MODE aktif
     */
    function debugLog(message, data = null) {
        if (DEBUG_MODE) {
            if (data) {
                console.log(`[AUTH DEBUG] ${message}`, data);
            } else {
                console.log(`[AUTH DEBUG] ${message}`);
            }
        }
    }
    
    /**
     * Cek apakah halaman saat ini adalah login page
     */
    function isLoginPage() {
        const currentPage = window.location.pathname.split('/').pop();
        return currentPage === LOGIN_PAGE || currentPage === '';
    }
    
    /**
     * Safe redirect - Prevent download spam
     */
    function safeRedirect(page) {
        try {
            // Coba beberapa metode redirect
            if (window.location.href.includes('file://') || window.location.href.includes('localhost')) {
                // Untuk file:// atau localhost file manager
                window.location.href = page;
            } else {
                // Untuk web server normal
                window.location.replace(page);
            }
        } catch (error) {
            // Fallback jika error
            window.location.href = page;
        }
    }
    
    // ===================== AUTHENTICATION CHECK =====================
    
    /**
     * Cek status autentikasi user
     * Jika belum login dan bukan di login page → redirect ke login
     */
    function checkAuth() {
        debugLog('Checking authentication status...');
        
        // Skip check jika sedang di login page
        if (isLoginPage()) {
            debugLog('Currently on login page, skipping auth check');
            return;
        }
        
        try {
            // Cek localStorage
            const isLoggedIn = localStorage.getItem(AUTH_KEY);
            debugLog('Login status from localStorage:', isLoggedIn);
            
            // Jika tidak ada session atau session tidak valid
            if (isLoggedIn !== 'true') {
                debugLog('User not authenticated, redirecting to login...');
                
                // Redirect ke login dengan safe method
                safeRedirect(LOGIN_PAGE);
                
                // Stop execution untuk mencegah flash of content
                throw new Error('Authentication required');
            }
            
            debugLog('User authenticated successfully');
            
        } catch (error) {
            // Jika ada error (localStorage disabled, dll) → redirect ke login
            debugLog('Authentication error:', error.message);
            
            if (!isLoginPage()) {
                safeRedirect(LOGIN_PAGE);
            }
        }
    }
    
    // ===================== LOGOUT FUNCTION =====================
    
    /**
     * Logout user dan redirect ke login page
     * Function ini di-expose ke global scope agar bisa dipanggil dari HTML
     */
    window.logout = function() {
    debugLog('Logout function called');
    
    try {
        // 🆕 TAMBAHKAN INI - Cancel semua pending fetch
        if (window.stop) {
            window.stop(); // Untuk Chrome/Firefox
        }
        document.execCommand('Stop'); // Untuk IE/Edge
        
        // Clear session dari localStorage
        localStorage.removeItem(AUTH_KEY);
        debugLog('Session cleared from localStorage');
        
        // ... kode lainnya tetap sama
            
            // Optional: Clear semua data terkait auth
            // localStorage.clear(); // Uncomment jika ingin clear semua data
            
            // Show logout message (optional)
            if (typeof showToast === 'function') {
                showToast('Logout berhasil!', 'info');
            }
            
            // Redirect langsung tanpa delay - FIX untuk prevent download spam
            debugLog('Redirecting to login page...');
            
            // Clear session storage juga (optional)
            sessionStorage.clear();
            
            // Safe redirect - prevent download
            safeRedirect(LOGIN_PAGE);
            
        } catch (error) {
            debugLog('Logout error:', error.message);
            
            // Tetap redirect meskipun ada error
            safeRedirect(LOGIN_PAGE);
        }
        
        // Return false untuk prevent default action
        return false;
    };
    
    // ===================== PREVENT BACK BUTTON =====================
    
    /**
     * Mencegah user kembali ke halaman protected setelah logout
     * Menggunakan history manipulation
     */
    function preventBack() {
        debugLog('Setting up back button prevention...');
        
        // Push state baru untuk prevent back
        window.history.pushState(null, '', window.location.href);
        
        // Listen untuk popstate event (back button)
        window.addEventListener('popstate', function(event) {
            debugLog('Back button detected');
            
            // Cek apakah user masih login
            const isLoggedIn = localStorage.getItem(AUTH_KEY);
            
            if (isLoggedIn !== 'true' && !isLoginPage()) {
                debugLog('User not logged in, preventing back navigation');
                
                // Push state lagi dan redirect ke login
                window.history.pushState(null, '', window.location.href);
                safeRedirect(LOGIN_PAGE);
            } else {
                // Jika masih login, allow normal back behavior
                debugLog('User still logged in, allowing back navigation');
            }
        });
    }
    
    // ===================== SESSION TIMEOUT (OPTIONAL) =====================
    
    /**
     * Auto logout setelah waktu tertentu (optional feature)
     * Uncomment untuk mengaktifkan
     */
    function setupSessionTimeout(minutes = 30) {
        debugLog(`Setting up session timeout: ${minutes} minutes`);
        
        const timeoutDuration = minutes * 60 * 1000; // Convert to milliseconds
        let timeoutId;
        
        // Reset timeout saat ada aktivitas
        function resetTimeout() {
            clearTimeout(timeoutId);
            
            timeoutId = setTimeout(() => {
                debugLog('Session timeout reached, logging out...');
                
                // Show timeout message
                alert('Sesi Anda telah berakhir. Silakan login kembali.');
                
                // Logout
                window.logout();
                
            }, timeoutDuration);
        }
        
        // Events yang reset timeout
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        
        events.forEach(event => {
            document.addEventListener(event, resetTimeout, true);
        });
        
        // Initial timeout
        resetTimeout();
    }
    
    // Uncomment line ini untuk aktifkan session timeout 30 menit
    // setupSessionTimeout(30);
    
    // ===================== VISIBILITY CHANGE HANDLER =====================
    
    /**
     * Re-check auth saat tab menjadi visible lagi
     * Mencegah akses jika session expired di tab lain
     */
    function setupVisibilityCheck() {
        debugLog('Setting up visibility change check...');
        
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden && !isLoginPage()) {
                debugLog('Tab became visible, re-checking authentication...');
                checkAuth();
            }
        });
    }
    
    // ===================== INITIALIZATION =====================
    
    /**
     * Initialize authentication system
     * Dipanggil otomatis saat script loaded
     */
    function init() {
        debugLog('='.repeat(50));
        debugLog('AUTH SYSTEM INITIALIZED (FIXED VERSION)');
        debugLog('Current page:', window.location.pathname);
        debugLog('='.repeat(50));
        
        // Run authentication check
        checkAuth();
        
        // Setup back button prevention
        preventBack();
        
        // Setup visibility check
        setupVisibilityCheck();
        
        debugLog('Auth system ready');
    }
    
    // ===================== AUTO-RUN ON LOAD =====================
    
    // Run immediately jika DOM sudah ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // ===================== EXPOSE UTILITY FUNCTIONS =====================
    
    /**
     * Check if user is currently logged in
     * Usage: if (window.isAuthenticated()) { ... }
     */
    window.isAuthenticated = function() {
        try {
            return localStorage.getItem(AUTH_KEY) === 'true';
        } catch (error) {
            return false;
        }
    };
    
    /**
     * Get current session status
     * Usage: const status = window.getAuthStatus();
     */
    window.getAuthStatus = function() {
        return {
            isLoggedIn: window.isAuthenticated(),
            timestamp: new Date().toISOString()
        };
    };
    
    // ===================== CONSOLE INFO =====================
    
    if (!DEBUG_MODE) {
        console.log('%c🔐 Auth System Active (Fixed)', 'color: #2dbce6; font-weight: bold; font-size: 14px;');
        console.log('%cTP/SL Calculator v2.0 by RIFQI', 'color: #94a3b8; font-size: 12px;');
    }
    
})();

// ===================================================================
// END OF AUTHENTICATION SYSTEM
// ===================================================================