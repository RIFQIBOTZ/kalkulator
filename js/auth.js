// ===================== AUTHENTICATION SYSTEM =====================
// TP/SL Calculator - Auth Protection  
// Version: 2.1 (FIXED - No Freeze)
// Author: RIFQI
// ===================================================================

(function() {
    'use strict';
    
    // ===================== CONFIGURATION =====================
    const AUTH_KEY = 'isLoggedIn';
    const LOGIN_PAGE = 'login/';
    const MAIN_PAGE = '../'; // Untuk redirect dari login ke main
    
    // ===================== UTILITY FUNCTIONS =====================
    
    /**
     * Cek apakah halaman saat ini adalah login page
     */
    function isLoginPage() {
        const path = window.location.pathname;
        // Cek apakah di folder login atau file login.html
        return path.includes('/login') || path.includes('login.html');
    }
    
    /**
     * Cek apakah halaman saat ini adalah main page (index.html)
     */
    function isMainPage() {
        const path = window.location.pathname;
        const isRoot = path.endsWith('/') || path.endsWith('/index.html') || path.includes('/kalkulator/');
        return isRoot && !isLoginPage();
    }
    
    /**
     * Safe redirect - Prevent download spam
     */
    function safeRedirect(page) {
        try {
            window.location.replace(page);
        } catch (error) {
            window.location.href = page;
        }
    }
    
    // ===================== AUTHENTICATION CHECK =====================
    
    /**
     * Cek status autentikasi user
     * - Jika BELUM login dan BUKAN di login page → redirect ke login
     * - Jika SUDAH login dan MASIH di login page → redirect ke main page
     * - Jika SUDAH login dan SUDAH di main page → tidak ada redirect
     */
    function checkAuth() {
        const isLoggedIn = localStorage.getItem(AUTH_KEY) === 'true';
        
        // Case 1: User belum login
        if (!isLoggedIn) {
            // Jika belum login tapi sedang di login page, biarkan tetap di login page
            if (isLoginPage()) {
                return;
            }
            // Jika belum login dan bukan di login page → redirect ke login
            safeRedirect(LOGIN_PAGE);
            return;
        }
        
        // Case 2: User sudah login
        if (isLoggedIn) {
            // Jika sudah login tapi masih di login page → redirect ke main page
            if (isLoginPage()) {
                safeRedirect(MAIN_PAGE);
                return;
            }
            // Jika sudah login dan sudah di main page → tidak ada redirect (biarkan load normal)
            return;
        }
    }
    
    // ===================== LOGOUT FUNCTION =====================
    
    /**
     * Logout user dan redirect ke login page
     * Function ini di-expose ke global scope agar bisa dipanggil dari HTML
     */
    window.logout = function() {
        try {
            // Stop pending requests
            if (window.stop) {
                window.stop();
            }
            
            // Clear session dari localStorage
            localStorage.removeItem(AUTH_KEY);
            
            // Clear session storage juga
            sessionStorage.clear();
            
            // Show logout message (optional)
            if (typeof showToast === 'function') {
                showToast('Logout berhasil!', 'info');
            }
            
            // Redirect dengan small delay untuk smooth UX
            setTimeout(() => {
                safeRedirect(LOGIN_PAGE);
            }, 100);
            
        } catch (error) {
            console.error('Logout error:', error);
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
        // Push state baru untuk prevent back
        window.history.pushState(null, '', window.location.href);
        
        // Listen untuk popstate event (back button)
        window.addEventListener('popstate', function() {
            // Cek apakah user masih login
            const isLoggedIn = localStorage.getItem(AUTH_KEY);
            
            if (isLoggedIn !== 'true' && !isLoginPage()) {
                // Push state lagi dan redirect ke login
                window.history.pushState(null, '', window.location.href);
                safeRedirect(LOGIN_PAGE);
            }
        });
    }
    
    // ===================== INITIALIZATION =====================
    
    /**
     * Initialize authentication system
     * Dipanggil otomatis saat script loaded
     */
    function init() {
        // Run authentication check
        checkAuth();
        
        // Setup back button prevention
        preventBack();
        
        // Console log untuk konfirmasi
        console.log('%c🔒 Auth System Active', 'color: #2dbce6; font-weight: bold; font-size: 14px;');
        console.log('%cTP/SL Calculator v2.0 by RIFQI', 'color: #94a3b8; font-size: 12px;');
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
    
})();

// ===================================================================
// END OF AUTHENTICATION SYSTEM
// ===================================================================