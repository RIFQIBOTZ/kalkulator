// ===================== AUTHENTICATION SYSTEM =====================
// TP/SL Calculator - Auth Protection  
// Version: 2.1 (FIXED - No Freeze)
// ===================================================================

(function() {
    'use strict';
    
    const AUTH_KEY = 'isLoggedIn';
    const LOGIN_PAGE = 'login.html';
    
    // ===================== UTILITY FUNCTIONS =====================
    
    function isLoginPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        // Cek exact match 'login.html' saja
        return page === 'login.html';
    }
    
    function safeRedirect(page) {
        try {
            window.location.replace(page);
        } catch (error) {
            window.location.href = page;
        }
    }
    
    // ===================== AUTH CHECK =====================
    
    function checkAuth() {
        // Skip jika di login page
        if (isLoginPage()) {
            return;
        }
        
        // Cek localStorage
        const isLoggedIn = localStorage.getItem(AUTH_KEY);
        
        // Jika belum login → redirect (TANPA throw error!)
        if (isLoggedIn !== 'true') {
            safeRedirect(LOGIN_PAGE);
            return; // ← PAKAI return, BUKAN throw!
        }
    }
    
    // ===================== LOGOUT =====================
    
    window.logout = function() {
        try {
            // Stop pending requests
            if (window.stop) window.stop();
            
            // Clear session
            localStorage.removeItem(AUTH_KEY);
            sessionStorage.clear();
            
            // Redirect
            setTimeout(() => {
                safeRedirect(LOGIN_PAGE);
            }, 100);
            
        } catch (error) {
            safeRedirect(LOGIN_PAGE);
        }
        
        return false;
    };
    
    // ===================== PREVENT BACK =====================
    
    function preventBack() {
        window.history.pushState(null, '', window.location.href);
        
        window.addEventListener('popstate', function() {
            const isLoggedIn = localStorage.getItem(AUTH_KEY);
            
            if (isLoggedIn !== 'true' && !isLoginPage()) {
                window.history.pushState(null, '', window.location.href);
                safeRedirect(LOGIN_PAGE);
            }
        });
    }
    
    // ===================== INIT =====================
    
    function init() {
        checkAuth();
        preventBack();
        
        console.log('%c🔐 Auth System Active', 'color: #2dbce6; font-weight: bold;');
    }
    
    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // ===================== UTILITY =====================
    
    window.isAuthenticated = function() {
        try {
            return localStorage.getItem(AUTH_KEY) === 'true';
        } catch (error) {
            return false;
        }
    };
    
})();