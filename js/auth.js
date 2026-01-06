/* ===================================================================
   JOURNAL TRADE - LOGIN AUTHENTICATION
   Version: 7.6 - FIXED FOR /kalkulator/ STRUCTURE
   =================================================================== */

// ===================== LOGIN CONFIGURATION =====================
// Ganti username & password di sini
const LOGIN_CONFIG = {
    username: 'admin',
    password: 'admin'
};

// ===================== PARTICLE EFFECTS =====================

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random color between purple and cyan
        const colors = [
            'rgba(123, 47, 247, 0.5)',
            'rgba(0, 212, 255, 0.5)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Validation functions
function validateUsername() {
    const usernameInput = document.getElementById('username');
    const usernameValidation = document.getElementById('usernameValidation');
    const value = usernameInput.value.trim();
    
    if (value.length > 0) {
        usernameValidation.classList.add('show');
        if (value === LOGIN_CONFIG.username) {
            usernameValidation.classList.add('valid');
            usernameValidation.classList.remove('invalid');
            // Change to checkmark
            usernameValidation.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
        } else {
            usernameValidation.classList.add('invalid');
            usernameValidation.classList.remove('valid');
            // Change to X mark
            usernameValidation.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        }
    } else {
        usernameValidation.classList.remove('show');
    }
}

function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordValidation = document.getElementById('passwordValidation');
    const value = passwordInput.value.trim();
    
    if (value.length > 0) {
        passwordValidation.classList.add('show');
        if (value === LOGIN_CONFIG.password) {
            passwordValidation.classList.add('valid');
            passwordValidation.classList.remove('invalid');
            // Change to checkmark
            passwordValidation.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
        } else {
            passwordValidation.classList.add('invalid');
            passwordValidation.classList.remove('valid');
            // Change to X mark
            passwordValidation.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        }
    } else {
        passwordValidation.classList.remove('show');
    }
}

// Show message
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    const icon = type === 'error' ? '❌' : '✅';
    messageEl.innerHTML = `<span style="font-size: 1.2rem;">${icon}</span><span>${text}</span>`;
    messageEl.className = `message ${type} show`;
    
    setTimeout(() => {
        messageEl.classList.remove('show');
    }, 3000);
}

// ✅ FIXED: Fungsi untuk mendapatkan base path yang benar
function getBasePath() {
    const path = window.location.pathname;
    
    // Cek apakah ada /kalkulator/ di path
    if (path.includes('/kalkulator/')) {
        return '/kalkulator/index.html';
    }
    
    // Fallback: gunakan relative path
    return '../index.html';
}

// ✅ FIXED: Fungsi untuk mendapatkan login path yang benar
function getLoginPath() {
    const path = window.location.pathname;
    
    // Cek apakah ada /kalkulator/ di path
    if (path.includes('/kalkulator/')) {
        return '/kalkulator/login/';
    }
    
    // Fallback
    return './login/';
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const buttonText = document.getElementById('buttonText');
    const buttonIcon = document.querySelector('.button-icon');
    const loading = document.getElementById('loading');
    const loginButton = document.querySelector('.login-button');
    
    loginButton.disabled = true;
    buttonText.style.display = 'none';
    buttonIcon.style.display = 'none';
    loading.classList.add('show');
    
    setTimeout(() => {
        if (username === LOGIN_CONFIG.username && password === LOGIN_CONFIG.password) {
            localStorage.setItem('isLoggedIn', 'true');
            showMessage('Login berhasil! Mengalihkan...', 'success');
            
            setTimeout(() => {
                // ✅ FIXED: Gunakan fungsi getBasePath untuk redirect yang benar
                const redirectPath = getBasePath();
                console.log('Login successful! Redirecting to:', redirectPath);
                console.log('Current pathname:', window.location.pathname);
                window.location.href = redirectPath;
            }, 1000);
        } else {
            showMessage('Username atau password salah!', 'error');
            loginButton.disabled = false;
            buttonText.style.display = 'flex';
            buttonText.style.alignItems = 'center';
            buttonIcon.style.display = 'flex';
            loading.classList.remove('show');
            
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
            
            // Shake effect on inputs
            document.querySelectorAll('.form-input').forEach(input => {
                input.style.animation = 'shake 0.4s ease-in-out';
                setTimeout(() => {
                    input.style.animation = '';
                }, 400);
            });
        }
    }, 800);
}

// ✅ FIXED: Fungsi logout dengan path yang benar
function logout() {
    localStorage.removeItem('isLoggedIn');
    const loginPath = getLoginPath();
    console.log('Logging out... Redirecting to:', loginPath);
    window.location.href = loginPath;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ✅ CRITICAL FIX: Hanya jalankan script ini di halaman login
    // Cek apakah ini halaman login dengan melihat ada elemen #username atau tidak
    const isLoginPage = document.getElementById('username') !== null;
    
    if (!isLoginPage) {
        // Jika bukan halaman login, jangan jalankan script auth
        console.log('Auth.js loaded on non-login page. Skipping initialization.');
        return;
    }
    
    console.log('Auth.js: Initializing login page...');
    
    // Create particles
    createParticles();
    
    // Add sparkle on button hover
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.8) {
                createSparkle(e.pageX, e.pageY);
            }
        });
    }
    
    // Input validation listeners
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    if (usernameInput) {
        usernameInput.addEventListener('input', validateUsername);
        usernameInput.focus();
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }
    
    // ✅ FIXED: Check session dengan path yang benar
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const redirectPath = getBasePath();
        console.log('Already logged in. Redirecting to:', redirectPath);
        window.location.href = redirectPath;
    }
});

/* ===================================================================
   END OF LOGIN AUTHENTICATION
   =================================================================== */
