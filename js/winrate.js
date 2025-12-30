// Module state variables
let equityChart = null;
let distributionChart = null;
let simulationResults = null;
let isIDR = true; // Default currency display
let winrateCurrentCurrency = 'idr'; // Currency for winrate starting equity
let winrateModalCurrency = 'idr'; // Currency for modal
let winrateStartingEquityValue = 0; // Stored value in IDR

// ============================================
// INITIALIZATION FLAGS (FIX 1: Prevent double init)
// ============================================
let isWinrateInitialized = false;
let isWinrateSetupComplete = false;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get current exchange rate from global scope
 */
const getCurrentKurs = () => {
    return (typeof window.currentKurs !== 'undefined' && window.currentKurs > 0) 
        ? window.currentKurs 
        : 15750;
};

/**
 * Format Rupiah currency
 */
function formatRupiah(amount, short = false) {
    // FIX: Handle NaN dan infinity
    if (!isFinite(amount) || isNaN(amount)) {
        return 'Rp0';
    }
    
    if (short && amount >= 1000000000) {
        return 'Rp' + (amount / 1000000000).toFixed(1) + 'B';
    } else if (short && amount >= 1000000) {
        return 'Rp' + (amount / 1000000).toFixed(1) + 'M';
    } else if (short && amount >= 1000) {
        return 'Rp' + (amount / 1000).toFixed(1) + 'K';
    }
    
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format USD currency
 */
function formatUSD(amount, short = false) {
    // FIX: Handle NaN dan infinity
    if (!isFinite(amount) || isNaN(amount)) {
        return '$0.00';
    }
    
    if (short && amount >= 1000000000) {
        return '$' + (amount / 1000000000).toFixed(1) + 'B';
    } else if (short && amount >= 1000000) {
        return '$' + (amount / 1000000).toFixed(1) + 'M';
    } else if (short && amount >= 1000) {
        return '$' + (amount / 1000).toFixed(1) + 'K';
    }
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Format currency based on current display setting
 */
function formatCurrency(amount, symbol = '') {
    if (isIDR) {
        return formatRupiah(amount);
    } else {
        return formatUSD(amount);
    }
}

/**
 * Show toast notification - FIXED: No recursion
 */
function showToast(message) {
    // FIX Kritis: Hapus recursive call ke window.showToast
    console.log('Toast:', message);
    
    // Create toast element
    let toast = document.getElementById('globalToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'globalToast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(26, 29, 62, 0.95);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            border-left: 4px solid #7b2ff7;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.style.transform = 'translateX(0)';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(150%)';
    }, 3000);
}

// ============================================
// INITIALIZATION (FIX 1: Single initialization)
// ============================================

// FIX: Only one DOMContentLoaded listener
if (!window.winrateLoaded) {
    window.winrateLoaded = true;
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Winrate Calculator Initializing...');
        
        // Prevent double initialization
        if (isWinrateInitialized) {
            console.log('Winrate already initialized, skipping...');
            return;
        }
        
        isWinrateInitialized = true;
        
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            try {
                initializeWinrateModule();
                setupEventListeners();
                initializeCharts();
                
                // Trigger currency display update
                updateCurrencyDisplay();
                
                isWinrateSetupComplete = true;
                console.log('✅ Winrate Calculator Ready');
                console.log('Exchange rate loaded:', getCurrentKurs());
            } catch (error) {
                console.error('❌ Winrate initialization failed:', error);
            }
        }, 100);
    });
}

/**
 * Initialize the winrate module
 */
function initializeWinrateModule() {
    if (isWinrateSetupComplete) {
        console.warn('Winrate already setup, skipping initialization');
        return;
    }
    
    // Check if required elements exist
    const form = document.getElementById('winrateForm');
    if (!form) {
        console.warn('Winrate form not found');
        return;
    }
    
    // Set default values
    const winRateSlider = document.getElementById('winRateSlider');
    const winRateInput = document.getElementById('winRate');
    
    if (winRateSlider) winRateSlider.value = 50;
    if (winRateInput) winRateInput.value = 50;
    
    // Update maxEntry field based on selection
    updateMaxEntryField();
    
    // Hide results section initially
    const resultsSection = document.getElementById('winrateResults');
    if (resultsSection) {
        resultsSection.style.display = 'none';
    }
    
    // Initialize starting equity display
    updateWinrateBalanceDisplay();
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    const form = document.getElementById('winrateForm');
    if (!form) return;
    
    // Form submission
    form.addEventListener('submit', handleFormSubmit);
    
    // Currency toggle
    const currencyToggle = document.getElementById('currencyToggleWinrate');
    if (currencyToggle) {
        currencyToggle.addEventListener('change', handleCurrencyToggle);
    }
    
// Current balance button
    const useCurrentBalanceBtn = document.getElementById('useCurrentBalanceWinrate');
    if (useCurrentBalanceBtn) {
        useCurrentBalanceBtn.addEventListener('click', handleUseCurrentBalance);
    }
    
    // Winrate balance display currency toggle
    const winrateCurrencyPill = document.getElementById('winrateCurrencyPill');
    if (winrateCurrencyPill) {
        winrateCurrencyPill.querySelectorAll('.currency-option').forEach(opt => {
            opt.addEventListener('click', handleWinrateCurrencyToggle);
        });
    }
    
    // Edit starting equity button
    const btnEditStartingEquity = document.getElementById('btnEditStartingEquity');
    if (btnEditStartingEquity) {
        btnEditStartingEquity.addEventListener('click', openWinrateEquityModal);
    }
    
    // Modal currency toggle
    const winrateModalCurrencyPill = document.getElementById('winrateModalCurrencyPill');
    if (winrateModalCurrencyPill) {
        winrateModalCurrencyPill.querySelectorAll('.currency-option').forEach(opt => {
            opt.addEventListener('click', handleWinrateModalCurrencyToggle);
        });
    }
    
    // Modal buttons
    const btnCancelWinrateEquity = document.getElementById('btnCancelWinrateEquity');
    const btnConfirmWinrateEquity = document.getElementById('btnConfirmWinrateEquity');
    
    if (btnCancelWinrateEquity) {
        btnCancelWinrateEquity.addEventListener('click', closeWinrateEquityModal);
    }
    
    if (btnConfirmWinrateEquity) {
        btnConfirmWinrateEquity.addEventListener('click', saveWinrateEquity);
    }
    
    // Auto-format input in modal
    const winrateEquityInput = document.getElementById('winrateEquityInput');
    if (winrateEquityInput) {
        winrateEquityInput.addEventListener('input', autoFormatWinrateInput);
        winrateEquityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveWinrateEquity();
            }
        });
    }
    
    // Close modal on outside click
    const winrateEquityModal = document.getElementById('winrateEquityModal');
    if (winrateEquityModal) {
        winrateEquityModal.addEventListener('click', (e) => {
            if (e.target === winrateEquityModal) {
                closeWinrateEquityModal();
            }
        });
    }
    
    // Max entry selection
    const maxEntrySelect = document.getElementById('maxEntrySelect');
    if (maxEntrySelect) {
        maxEntrySelect.addEventListener('change', updateMaxEntryField);
    }
    
    // FIX 2: Win rate slider sync - NO INFINITE LOOP
    const winRateInput = document.getElementById('winRate');
    const winRateSlider = document.getElementById('winRateSlider');
    
    if (winRateSlider && winRateInput) {
        let isUpdating = false; // Flag to prevent infinite loop
        
        winRateSlider.addEventListener('input', function() {
            if (isUpdating) return;
            isUpdating = true;
            
            const newValue = this.value;
            if (winRateInput.value !== newValue) {
                winRateInput.value = newValue;
                updateWinRateDisplay();
            }
            
            // Use setTimeout to reset flag
            setTimeout(() => {
                isUpdating = false;
            }, 10);
        });
        
        winRateInput.addEventListener('input', function() {
            if (isUpdating) return;
            isUpdating = true;
            
            const value = Math.min(100, Math.max(0, parseInt(this.value) || 0));
            
            if (winRateSlider.value !== value.toString()) {
                this.value = value;
                winRateSlider.value = value;
                updateWinRateDisplay();
            }
            
            setTimeout(() => {
                isUpdating = false;
            }, 10);
        });
        
        updateWinRateDisplay();
    }
    
    // Input validation on blur
    const numericInputs = form.querySelectorAll('input[type="number"]');
    numericInputs.forEach(input => {
        input.addEventListener('blur', validateSingleInput);
        input.addEventListener('input', clearInputError);
    });
    
    // Add reset button listener if exists
    const resetBtn = document.getElementById('btnResetWinrate');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetWinrateCalculator);
    }
}

/**
 * Initialize empty charts
 */
function initializeCharts() {
    // Initialize equity chart with empty data
    const equityCtx = document.getElementById('equityChart');
    if (equityCtx) {
        if (equityChart) {
            equityChart.destroy();
        }
        
        equityChart = new Chart(equityCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Equity',
                    data: [],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: getEquityChartOptions()
        });
    }
    
    // Initialize distribution chart with empty data
    const distributionCtx = document.getElementById('distributionChart');
    if (distributionCtx) {
        if (distributionChart) {
            distributionChart.destroy();
        }
        
        distributionChart = new Chart(distributionCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Win Trades', 'Loss Trades'],
                datasets: [{
                    label: 'Number of Trades',
                    data: [0, 0],
                    backgroundColor: [
                        'rgba(0, 255, 136, 0.6)',
                        'rgba(255, 51, 102, 0.6)'
                    ],
                    borderColor: [
                        '#00ff88',
                        '#ff3366'
                    ],
                    borderWidth: 2
                }]
            },
            options: getDistributionChartOptions()
        });
    }
}
// ============================================
// WINRATE BALANCE DISPLAY FUNCTIONS
// ============================================

/**
 * Update winrate balance display
 */
function updateWinrateBalanceDisplay() {
    const balanceAmount = document.getElementById('winrateBalanceAmount');
    const balanceConversion = document.getElementById('winrateBalanceConversion');
    
    if (!balanceAmount || !balanceConversion) return;
    
    // Update active currency pill
    document.querySelectorAll('#winrateCurrencyPill .currency-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.currency === winrateCurrentCurrency) {
            opt.classList.add('active');
        }
    });
    
    const kurs = getCurrentKurs();
    
    if (winrateCurrentCurrency === 'idr') {
        balanceAmount.textContent = formatRupiah(winrateStartingEquityValue);
        balanceConversion.textContent = `≈ ${formatUSD(winrateStartingEquityValue / kurs)}`;
    } else {
        const usdAmount = winrateStartingEquityValue / kurs;
        balanceAmount.textContent = formatUSD(usdAmount);
        balanceConversion.textContent = `≈ ${formatRupiah(winrateStartingEquityValue)}`;
    }
}

/**
 * Handle winrate currency toggle
 */
function handleWinrateCurrencyToggle() {
    winrateCurrentCurrency = this.dataset.currency;
    
    document.querySelectorAll('#winrateCurrencyPill .currency-option').forEach(opt => {
        opt.classList.remove('active');
    });
    this.classList.add('active');
    
    updateWinrateBalanceDisplay();
}

/**
 * Open winrate equity modal
 */
function openWinrateEquityModal() {
    const modal = document.getElementById('winrateEquityModal');
    const input = document.getElementById('winrateEquityInput');
    
    if (!modal || !input) return;
    
    // Set modal currency to current display currency
    winrateModalCurrency = winrateCurrentCurrency;
    
    // Update modal currency pill
    document.querySelectorAll('#winrateModalCurrencyPill .currency-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.currency === winrateModalCurrency) {
            opt.classList.add('active');
        }
    });
    
    // Set input value
    if (winrateStartingEquityValue > 0) {
        if (winrateModalCurrency === 'idr') {
            input.value = formatNumber(Math.floor(winrateStartingEquityValue).toString());
        } else {
            const kurs = getCurrentKurs();
            input.value = (winrateStartingEquityValue / kurs).toFixed(2);
        }
    } else {
        input.value = '';
    }
    
    modal.classList.add('show');
    input.focus();
}

/**
 * Close winrate equity modal
 */
function closeWinrateEquityModal() {
    const modal = document.getElementById('winrateEquityModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

/**
 * Handle modal currency toggle
 */
function handleWinrateModalCurrencyToggle() {
    const oldCurrency = winrateModalCurrency;
    winrateModalCurrency = this.dataset.currency;
    
    document.querySelectorAll('#winrateModalCurrencyPill .currency-option').forEach(opt => {
        opt.classList.remove('active');
    });
    this.classList.add('active');
    
    // Convert current input value
    const input = document.getElementById('winrateEquityInput');
    if (input && input.value) {
        const currentValue = parseNumber(input.value.replace(/\./g, '').replace(',', '.'));
        const kurs = getCurrentKurs();
        
        if (oldCurrency === 'idr' && winrateModalCurrency === 'usd') {
            // IDR to USD
            input.value = (currentValue / kurs).toFixed(2);
        } else if (oldCurrency === 'usd' && winrateModalCurrency === 'idr') {
            // USD to IDR
            input.value = formatNumber(Math.floor(currentValue * kurs).toString());
        }
    }
}

/**
 * Auto-format winrate input
 */
function autoFormatWinrateInput(e) {
    const input = e.target;
    
    // Only format for IDR
    if (winrateModalCurrency !== 'idr') return;
    
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

/**
 * Save winrate equity
 */
function saveWinrateEquity() {
    const input = document.getElementById('winrateEquityInput');
    if (!input || !input.value) {
        showToast('⚠️ Please enter a valid amount!');
        return;
    }
    
    const inputValue = parseNumber(input.value.replace(/\./g, '').replace(',', '.'));
    
    if (isNaN(inputValue) || inputValue <= 0) {
        showToast('⚠️ Please enter a valid amount!');
        return;
    }
    
    const kurs = getCurrentKurs();
    
    // Always store in IDR
    if (winrateModalCurrency === 'idr') {
        winrateStartingEquityValue = inputValue;
    } else {
        winrateStartingEquityValue = inputValue * kurs;
    }
    
    updateWinrateBalanceDisplay();
    closeWinrateEquityModal();
    showToast('💰 Starting equity saved!');
}

/**
 * Parse number from formatted string
 */
function parseNumber(str) {
    return parseFloat(str.replace(/\./g, '').replace(',', '.'));
}

/**
 * Format number with thousand separators
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// ============================================
// FORM HANDLING
// ============================================

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    const btn = document.getElementById('btnCalculateWinrate');
    if (!btn) return;
    
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = '⏳ Calculating...';
    
    // Collect and validate inputs
    const inputs = collectFormInputs();
    if (!validateInputs(inputs)) {
        btn.disabled = false;
        btn.textContent = originalText;
        return;
    }
    
    // Run simulation with slight delay for UX
    setTimeout(() => {
        try {
            console.log('Starting simulation with inputs:', inputs);
            
            // FIX 3: Add simulation limits
            if (inputs.totalTrades > 10000) {
                throw new Error('Total trades cannot exceed 10,000');
            }
            
            // Calculate simulation
            simulationResults = calculateSimulation(inputs);
            console.log('Basic simulation complete:', simulationResults);
            
            // Run Monte Carlo simulation with safety limit
            const monteCarloResults = runMonteCarloSimulation(inputs, 500); // Reduced to 500 for safety
            
            // Combine results
            const combinedResults = {
                ...simulationResults,
                monteCarlo: monteCarloResults
            };
            
            // Display results
            displayResults(combinedResults);
            
            // Validate risk limits
const warnings = validateWinrateRiskLimits(combinedResults, inputs.startingEquity);
if (warnings.length > 0) {
    displayRiskWarnings(warnings);
}
            
            // Show success message
            showToast('✅ Simulation complete! Results updated.');
        } catch (error) {
            console.error('❌ Simulation error:', error);
            showToast('❌ Error in simulation: ' + error.message);
        } finally {
            // Always restore button
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }, 100);
}

/**
 * Collect all form inputs
 */
function collectFormInputs() {
    // Get currency state
    const currencyToggle = document.getElementById('currencyToggleWinrate');
    const isIDR = currencyToggle ? currencyToggle.checked : true;
    
 // Collect values with safety parsing
    let startingEquity = winrateStartingEquityValue || 0; // Use stored value
    const riskPercent = parseFloat(document.getElementById('riskPercentWinrate').value) || 0;
    const totalTrades = parseInt(document.getElementById('totalTrades').value) || 0;
    const winRate = parseFloat(document.getElementById('winRate').value) || 0;
    const avgWinPercent = parseFloat(document.getElementById('avgWinPercent').value) || 0;
    const avgLossPercent = parseFloat(document.getElementById('avgLossPercent').value) || 0;
    
    // Get max entry based on selection
    let maxEntry = 1;
    const maxEntrySelect = document.getElementById('maxEntrySelect');
    if (maxEntrySelect && maxEntrySelect.value === 'custom') {
        maxEntry = parseInt(document.getElementById('maxEntryCustom').value) || 1;
    } else if (maxEntrySelect) {
        maxEntry = parseInt(maxEntrySelect.value) || 1;
    }
    
    // Validate max entry
    maxEntry = Math.max(1, Math.min(100, maxEntry));
    
    // Convert to IDR if in USD
    if (!isIDR) {
        const kurs = getCurrentKurs();
        startingEquity = startingEquity * kurs;
    }
    
    return {
        startingEquity: Math.max(0, startingEquity),
        maxEntry,
        riskPercent: Math.max(0.01, Math.min(100, riskPercent)),
        totalTrades: Math.max(1, Math.min(10000, totalTrades)),
        winRate: Math.max(0, Math.min(100, winRate)),
        avgWinPercent: Math.max(0.01, avgWinPercent),
        avgLossPercent: Math.max(0.01, avgLossPercent),
        currency: isIDR ? 'IDR' : 'USD'
    };
}

/**
 * Handle currency toggle
 */
function handleCurrencyToggle() {
    const isChecked = this.checked;
    isIDR = isChecked;
    
    // Update all displayed currency values
    updateCurrencyDisplay();
    
    // Update placeholder and labels
    const equityInput = document.getElementById('startingEquity');
    if (equityInput) {
        equityInput.placeholder = isChecked ? 'Contoh: 10000000' : 'Example: 1000';
    }
    
    // Update chart labels if results exist
    if (simulationResults) {
        updateChartCurrencyLabels();
    }
}

/**
 * Update currency display for all elements
 */
function updateCurrencyDisplay() {
    const currencyText = isIDR ? 'IDR' : 'USD';
    
    // Update currency display elements
    document.querySelectorAll('.currency-display').forEach(el => {
        el.textContent = currencyText;
    });
    
    // Update input placeholders if needed
    const equityInput = document.getElementById('startingEquity');
    if (equityInput && equityInput.placeholder.includes('Contoh:')) {
        equityInput.placeholder = isIDR ? 'Contoh: 10000000' : 'Example: 1000';
    }
}

/**
 * Handle "Use Current Balance" button click
 */
function handleUseCurrentBalance() {
    if (typeof window.calculateCurrentBalance === 'function') {
        const currentBalance = window.calculateCurrentBalance();
        
        if (currentBalance && currentBalance > 0) {
            // Store value in IDR
            winrateStartingEquityValue = currentBalance;
            
            // Update display
            updateWinrateBalanceDisplay();
            
            showToast('✅ Current balance loaded!');
        } else {
            showToast('❌ Could not calculate current balance');
        }
    } else {
        showToast('❌ Balance calculation not available');
    }
}

/**
 * Update max entry field based on selection
 */
function updateMaxEntryField() {
    const select = document.getElementById('maxEntrySelect');
    const customInput = document.getElementById('maxEntryCustomContainer');
    
    if (!select || !customInput) return;
    
    if (select.value === 'custom') {
        customInput.style.display = 'block';
        document.getElementById('maxEntryCustom').focus();
    } else {
        customInput.style.display = 'none';
    }
}

/**
 * Update win rate display (FIX 2: No event triggering)
 */
function updateWinRateDisplay() {
    const winRate = document.getElementById('winRate').value;
    const displayElement = document.getElementById('winRateDisplay');
    
    if (displayElement) {
        displayElement.textContent = `${winRate}%`;
    }
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validate all form inputs
 */
function validateInputs(inputs) {
    let isValid = true;
    
    // Check required fields
    const requiredChecks = [
        { value: inputs.startingEquity, name: 'Starting Equity', min: 1 },
        { value: inputs.maxEntry, name: 'Max Entry', min: 1 },
        { value: inputs.totalTrades, name: 'Total Trades', min: 1, max: 10000 },
        { value: inputs.winRate, name: 'Win Rate', min: 0, max: 100 },
        { value: inputs.avgWinPercent, name: 'Avg Win %', min: 0.01 },
        { value: inputs.avgLossPercent, name: 'Avg Loss %', min: 0.01 },
        { value: inputs.riskPercent, name: 'Risk %', min: 0.01, max: 100 }
    ];
    
    requiredChecks.forEach(check => {
        if (!check.value || isNaN(check.value)) {
            showInputError(check.name, 'This field is required');
            isValid = false;
        } else if (check.min !== undefined && check.value < check.min) {
            showInputError(check.name, `Minimum value is ${check.min}`);
            isValid = false;
        } else if (check.max !== undefined && check.value > check.max) {
            showInputError(check.name, `Maximum value is ${check.max}`);
            isValid = false;
        }
    });
    
    // Additional validations
    if (inputs.maxEntry > 100) {
        showInputError('Max Entry', 'Maximum 100 concurrent positions');
        isValid = false;
    }
    
    if (inputs.riskPercent > 5) {
        if (!confirm(`⚠️ Warning: Risk per trade (${inputs.riskPercent}%) is above recommended 5%. Continue anyway?`)) {
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Validate single input field
 */
function validateSingleInput(e) {
    const input = e.target;
    const name = input.previousElementSibling?.textContent || input.name;
    const value = parseFloat(input.value);
    
    if (isNaN(value)) {
        showInputError(name, 'Please enter a valid number');
        return false;
    }
    
    // Check min/max based on input ID
    const checks = {
        'winRate': { min: 0, max: 100 },
        'totalTrades': { min: 1, max: 10000 },
        'avgWinPercent': { min: 0.01 },
        'avgLossPercent': { min: 0.01 },
        'riskPercentWinrate': { min: 0.01, max: 100 },
        'startingEquity': { min: 1 },
        'maxEntryCustom': { min: 1, max: 100 }
    };
    
    const check = checks[input.id];
    if (check) {
        if (check.min !== undefined && value < check.min) {
            showInputError(name, `Minimum value is ${check.min}`);
            return false;
        }
        if (check.max !== undefined && value > check.max) {
            showInputError(name, `Maximum value is ${check.max}`);
            return false;
        }
    }
    
    clearInputError({ target: input });
    return true;
}

/**
 * Show input error
 */
function showInputError(fieldName, message) {
    console.warn(`Validation Error (${fieldName}): ${message}`);
    
    // Find the input field
    const inputs = document.querySelectorAll('input, select');
    const input = Array.from(inputs).find(inp => {
        const label = inp.previousElementSibling;
        return label && label.textContent.includes(fieldName);
    });
    
    if (input) {
        input.classList.add('error');
        
        // Show error message
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentNode.insertBefore(errorElement, input.nextElementSibling);
        }
        errorElement.textContent = message;
        
        // Show toast
        showToast(`❌ ${fieldName}: ${message}`);
    }
}

/**
 * Clear input error
 */
function clearInputError(e) {
    const input = e.target;
    input.classList.remove('error');
    
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

// ============================================
// CALCULATION LOGIC (FIX 3: Add safety limits)
// ============================================

/**
 * Main simulation calculation
 */
function calculateSimulation(inputs) {
    // Step 1: Extract inputs with validation
    const {
        startingEquity,
        maxEntry,
        riskPercent,
        totalTrades,
        winRate,
        avgWinPercent,
        avgLossPercent
    } = inputs;
    
    // Safety checks
    if (startingEquity <= 0) {
        throw new Error('Starting equity must be greater than 0');
    }
    
    if (totalTrades <= 0) {
        throw new Error('Total trades must be greater than 0');
    }
    
    // Step 2: Position sizing
    const positionValue = startingEquity / Math.max(1, maxEntry);
    const riskAmount = positionValue * (riskPercent / 100);
    
    // Step 3: Calculate P/L per trade
    const rrRatio = Math.min(100, avgWinPercent / Math.max(0.01, avgLossPercent));
    const profitPerWin = riskAmount * rrRatio;
    const lossPerLoss = riskAmount;
    
    // Step 4: Trade distribution
    const winTrades = Math.round(totalTrades * (winRate / 100));
    const lossTrades = Math.max(0, totalTrades - winTrades);
    
    // Step 5: Total calculation
    const totalProfit = winTrades * profitPerWin;
    const totalLoss = lossTrades * lossPerLoss;
    const netPL = totalProfit - totalLoss;
    const finalEquity = Math.max(0, startingEquity + netPL);
    
    // FIX: Calculate ROI correctly
    const roi = startingEquity > 0 ? ((finalEquity - startingEquity) / Math.max(0.01, startingEquity)) * 100 : 0;
    
    // Step 6: Expected value per trade
    const winProbability = winRate / 100;
    const lossProbability = (100 - winRate) / 100;
    const expectedValue = (winProbability * profitPerWin) - (lossProbability * lossPerLoss);
    
    // Step 7: Generate equity curve
    const equityCurve = generateEquityCurve(
        startingEquity,
        totalTrades,
        winRate,
        profitPerWin,
        lossPerLoss
    );
    
    // Step 8: Calculate statistics
    const maxDrawdown = calculateMaxDrawdown(equityCurve, startingEquity);
    const avgTrade = totalTrades > 0 ? netPL / totalTrades : 0;
    
    return {
        finalEquity,
        netPL,
        roi,
        winTrades,
        lossTrades,
        expectedValue,
        rrRatio,
        equityCurve,
        totalProfit,
        totalLoss,
        profitPerWin,
        lossPerLoss,
        maxDrawdown,
        avgTrade,
        startingEquity,
        totalTrades,
        winRate
    };
}

/**
 * Generate equity curve with random walk simulation
 */
function generateEquityCurve(startingEquity, totalTrades, winRate, profitPerWin, lossPerLoss) {
    const curve = [startingEquity];
    let currentEquity = startingEquity;
    
    // Use seeded random for reproducible results
    let seed = 42;
    function seededRandom() {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    // FIX 3: Add iteration limit and safety check
    const MAX_ITERATIONS = Math.min(totalTrades, 10000);
    
    // Generate random sequence of wins/losses based on winRate
    for (let i = 0; i < MAX_ITERATIONS; i++) {
        const randomValue = seededRandom() * 100;
        const isWin = randomValue < winRate;
        
        if (isWin) {
            currentEquity += profitPerWin;
        } else {
            currentEquity -= lossPerLoss;
        }
        
        // Ensure equity doesn't go negative
        currentEquity = Math.max(currentEquity, 0);
        curve.push(currentEquity);
    }
    
    return curve;
}

/**
 * Run Monte Carlo simulation
 */
function runMonteCarloSimulation(inputs, iterations = 1000) {
    // FIX 3: Limit Monte Carlo iterations
    const MAX_MONTE_CARLO_ITERATIONS = 500;
    const safeIterations = Math.min(iterations, MAX_MONTE_CARLO_ITERATIONS);
    
    console.log(`Running Monte Carlo with ${safeIterations} iterations`);
    
    const results = [];
    
    for (let i = 0; i < safeIterations; i++) {
        // Create modified inputs with slight random variation
        const modifiedInputs = {
            ...inputs,
            winRate: Math.max(0, Math.min(100, inputs.winRate + (Math.random() * 20 - 10))),
            avgWinPercent: Math.max(0.1, inputs.avgWinPercent + (Math.random() * 2 - 1)),
            avgLossPercent: Math.max(0.1, inputs.avgLossPercent + (Math.random() * 2 - 1))
        };
        
        try {
            const result = calculateSimulation(modifiedInputs);
            // FIX: Ensure result is finite
            if (isFinite(result.finalEquity)) {
                results.push(result.finalEquity);
            } else {
                results.push(inputs.startingEquity);
            }
        } catch (error) {
            console.warn(`Monte Carlo iteration ${i} failed:`, error);
            results.push(inputs.startingEquity);
        }
    }
    
    if (results.length === 0) {
        return {
            bestCase: inputs.startingEquity,
            averageCase: inputs.startingEquity,
            worstCase: inputs.startingEquity,
            stdDev: 0,
            allResults: []
        };
    }
    
    // Sort results
    results.sort((a, b) => a - b);
    
    // Calculate percentiles
    const bestCase = results[Math.min(results.length - 1, Math.floor(results.length * 0.95))];
    const averageCase = results[Math.floor(results.length * 0.5)];
    const worstCase = results[Math.max(0, Math.floor(results.length * 0.05))];
    const stdDev = calculateStandardDeviation(results);
    
    return {
        bestCase,
        averageCase,
        worstCase,
        stdDev,
        allResults: results
    };
}

/**
 * Calculate standard deviation
 */
function calculateStandardDeviation(values) {
    if (values.length === 0) return 0;
    
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    // FIX: Handle non-finite values
    if (!isFinite(avg)) return 0;
    
    const squareDiffs = values.map(value => {
        const diff = value - avg;
        return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
    return Math.sqrt(Math.max(0, avgSquareDiff));
}

// ============================================
// RISK VALIDATION (NAC Framework)
// ============================================

/**
 * Validate risk limits
 */
function validateWinrateRiskLimits(results, startingEquity) {
    const warnings = [];
    
    // Check max drawdown
    if (results.maxDrawdown > 8) {
        warnings.push({
            type: 'drawdown',
            message: `Max drawdown ${results.maxDrawdown.toFixed(2)}% exceeds 8% limit`,
            severity: 'high'
        });
    } else if (results.
    maxDrawdown > 5) {
        warnings.push({
            type: 'drawdown',
            message: `Max drawdown ${results.maxDrawdown.toFixed(2)}% is above 5% warning level`,
            severity: 'medium'
        });
    }
    
    // Check daily loss potential (simplified)
    const dailyLossLimit = startingEquity * 0.02;
    if (results.lossPerLoss > dailyLossLimit) {
        warnings.push({
            type: 'daily',
            message: 'Potential to breach daily loss limit (2%)',
            severity: 'medium'
        });
    }
    
    // Check win rate consistency
    if (results.winRate < 40 && results.rrRatio < 2) {
        warnings.push({
            type: 'consistency',
            message: 'Low win rate with low risk-reward ratio',
            severity: 'high'
        });
    }
    
    // Check if expected value is positive
    if (results.expectedValue <= 0) {
        warnings.push({
            type: 'profitability',
            message: 'Expected value per trade is not positive',
            severity: 'high'
        });
    }
    
    return warnings;
}

/**
 * Calculate max drawdown from equity curve
 */
function calculateMaxDrawdown(equityCurve, startingEquity) {
    if (!equityCurve || equityCurve.length === 0) return 0;
    
    let maxEquity = startingEquity;
    let maxDrawdown = 0;
    
    for (let equity of equityCurve) {
        if (equity > maxEquity) {
            maxEquity = equity;
        }
        
        const drawdown = ((maxEquity - equity) / Math.max(0.01, maxEquity)) * 100;
        if (drawdown > maxDrawdown) {
            maxDrawdown = drawdown;
        }
    }
    
    return maxDrawdown;
}

/**
 * Display risk warnings
 */
function displayRiskWarnings(warnings) {
    const warningsContainer = document.getElementById('riskWarnings');
    if (!warningsContainer) return;
    
    // Clear previous warnings
    warningsContainer.innerHTML = '';
    
    if (warnings.length === 0) {
        warningsContainer.innerHTML = `
            <div class="alert success">
                <span class="alert-icon">✅</span>
                <div>
                    <strong>Risk Profile: Good</strong>
                    <p>All risk parameters within acceptable limits.</p>
                </div>
            </div>
        `;
        return;
    }
    
    // Sort by severity
    warnings.sort((a, b) => {
        const severityOrder = { high: 0, medium: 1, low: 2 };
        return severityOrder[a.severity] - severityOrder[b.severity];
    });
    
    // Display warnings
    warnings.forEach(warning => {
        const severityClass = warning.severity === 'high' ? 'error' : 'warning';
        const icon = warning.severity === 'high' ? '❌' : '⚠️';
        
        const warningElement = document.createElement('div');
        warningElement.className = `alert ${severityClass}`;
        warningElement.innerHTML = `
            <span class="alert-icon">${icon}</span>
            <div>
                <strong>${warning.type.toUpperCase()}</strong>
                <p>${warning.message}</p>
            </div>
        `;
        warningsContainer.appendChild(warningElement);
    });
    
    // Show warnings section
    warningsContainer.style.display = 'block';
}

// ============================================
// CHART FUNCTIONS
// ============================================

/**
 * Get equity chart options
 */
function getEquityChartOptions() {
    const currency = isIDR ? 'IDR' : 'USD';
    
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(26, 29, 62, 0.9)',
                titleColor: '#00d4ff',
                bodyColor: '#e0e0e0',
                borderColor: '#7b2ff7',
                borderWidth: 1,
                callbacks: {
                    label: function(context) {
                        const value = context.raw;
                        return isIDR ? formatRupiah(value) : formatUSD(value / getCurrentKurs());
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Trade Number',
                    color: '#8b92b8'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#8b92b8'
                }
            },
            y: {
                title: {
                    display: true,
                    text: `Equity (${currency})`,
                    color: '#8b92b8'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#8b92b8',
                    callback: function(value) {
                        return isIDR ? formatRupiah(value, true) : formatUSD(value / getCurrentKurs(), true);
                    }
                }
            }
        }
    };
}

/**
 * Get distribution chart options
 */
function getDistributionChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(26, 29, 62, 0.9)',
                titleColor: '#00d4ff',
                bodyColor: '#e0e0e0',
                borderColor: '#7b2ff7',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)'
                },
                ticks: {
                    color: '#8b92b8',
                    precision: 0
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#8b92b8'
                }
            }
        }
    };
}

/**
 * Render equity chart
 */
function renderEquityChart(equityCurve) {
    const ctx = document.getElementById('equityChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (equityChart) {
        equityChart.destroy();
    }
    
    // Create labels for each trade
    const labels = equityCurve.map((_, i) => i);
    
    equityChart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Equity',
                data: equityCurve,
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 5
            }]
        },
        options: getEquityChartOptions()
    });
}

/**
 * Render distribution chart
 */
function renderDistributionChart(winTrades, lossTrades) {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;
    
    // Destroy existing chart
    if (distributionChart) {
        distributionChart.destroy();
    }
    
    distributionChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Win Trades', 'Loss Trades'],
            datasets: [{
                label: 'Number of Trades',
                data: [winTrades, lossTrades],
                backgroundColor: [
                    'rgba(0, 255, 136, 0.6)',
                    'rgba(255, 51, 102, 0.6)'
                ],
                borderColor: [
                    '#00ff88',
                    '#ff3366'
                ],
                borderWidth: 2
            }]
        },
        options: getDistributionChartOptions()
    });
}

/**
 * Update chart currency labels
 */
function updateChartCurrencyLabels() {
    if (equityChart) {
        const currency = isIDR ? 'IDR' : 'USD';
        equityChart.options.scales.y.title.text = `Equity (${currency})`;
        
        equityChart.options.scales.y.ticks.callback = function(value) {
            return isIDR ? formatRupiah(value, true) : formatUSD(value / getCurrentKurs(), true);
        };
        
        equityChart.update();
    }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

/**
 * Display simulation results
 */
// ✅ FIXED - Around line 1015 in winrate.js
function displayResults(results) {
    try {
        const displayMultiplier = isIDR ? 1 : 1 / getCurrentKurs();
        const currencySymbol = isIDR ? 'Rp' : '$';
        
        // Update summary cards
        updateResultCard('finalEquityValue', results.finalEquity * displayMultiplier, currencySymbol);
        updateResultCard('netPLValue', results.netPL * displayMultiplier, currencySymbol, true);
        
        // ✅ FIX ROI - Use new ID and correct parameters
        updateResultCard('roiValueWinrate', results.roi, '%', false, true);
        //                ^^^^^^^^^^^^^^^^  New ID
        
        // ... rest of the code
        
        // Update trade statistics
        const winTradesElement = document.getElementById('winTradesValue');
        const lossTradesElement = document.getElementById('lossTradesValue');
        if (winTradesElement) winTradesElement.textContent = results.winTrades;
        if (lossTradesElement) lossTradesElement.textContent = results.lossTrades;
        
        updateResultCard('expectedValueValue', results.expectedValue * displayMultiplier, currencySymbol);
        
        const rrRatioElement = document.getElementById('rrRatioValue');
        if (rrRatioElement) {
            rrRatioElement.textContent = '1:' + results.rrRatio.toFixed(2);
        }
        
        // Update Monte Carlo results if available
        if (results.monteCarlo) {
            updateResultCard('bestCaseValue', results.monteCarlo.bestCase * displayMultiplier, currencySymbol);
            updateResultCard('averageCaseValue', results.monteCarlo.averageCase * displayMultiplier, currencySymbol);
            updateResultCard('worstCaseValue', results.monteCarlo.worstCase * displayMultiplier, currencySymbol);
            
            // Show Monte Carlo section
            const mcSection = document.getElementById('monteCarloSection');
            if (mcSection) {
                mcSection.style.display = 'block';
            }
        }
        
        // Update additional statistics
        const additionalStats = document.getElementById('additionalStats');
        if (additionalStats) {
            additionalStats.innerHTML = `
                <div class="stat-item">
                    <span class="stat-label">Max Drawdown</span>
                    <span class="stat-value ${results.maxDrawdown > 8 ? 'negative' : ''}">
                        ${results.maxDrawdown.toFixed(2)}%
                    </span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Avg Trade</span>
                    <span class="stat-value">${formatCurrency(results.avgTrade * displayMultiplier, currencySymbol)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Win Rate</span>
                    <span class="stat-value">${results.winRate.toFixed(1)}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Total Trades</span>
                    <span class="stat-value">${results.totalTrades}</span>
                </div>
            `;
        }
        
        // Show results section with animation
        const resultsSection = document.getElementById('winrateResults');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            setTimeout(() => {
                resultsSection.classList.add('show');
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
        
        // Render charts
        renderEquityChart(results.equityCurve);
        renderDistributionChart(results.winTrades, results.lossTrades);
    } catch (error) {
        console.error('Error displaying results:', error);
        showToast('❌ Error displaying results');
    }
}

/**
 * Update a result card with proper formatting
 */
// ✅ IMPROVED - Around line 1105 in winrate.js
function updateResultCard(elementId, value, suffix = '', isMonetary = true, isPercentage = false) {
    console.log(`🔍 Updating ${elementId}: value=${value}, suffix=${suffix}, isPercentage=${isPercentage}`);
    
    const element = document.getElementById(elementId);
    
    if (!element) {
        console.error(`❌ Element not found: ${elementId}`);
        return;
    }
    
    // Clear previous classes
    element.classList.remove('positive', 'negative');
    
    // Add color class for monetary values and percentages
    if (isMonetary || isPercentage) {
        if (value > 0) {
            element.classList.add('positive');
        } else if (value < 0) {
            element.classList.add('negative');
        }
    }
    
    // Format the value
    let formattedValue;
    try {
        if (isPercentage) {
            // ✅ Format percentage with sign
            const sign = value >= 0 ? '+' : '';
            formattedValue = sign + value.toFixed(2) + suffix;
        } else if (isMonetary) {
            formattedValue = formatCurrency(value, suffix);
        } else {
            formattedValue = Number(value.toFixed(2)).toLocaleString() + suffix;
        }
    } catch (error) {
        console.error('Error formatting value:', error);
        formattedValue = 'Error';
    }
    
    console.log(`✅ Updated ${elementId} to: ${formattedValue}`);
    element.textContent = formattedValue;
}

/**
 * Export simulation results
 */
function exportResults() {
    if (!simulationResults) {
        showToast('❌ No results to export');
        return;
    }
    
    const dataStr = JSON.stringify(simulationResults, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `winrate-simulation-${new Date().toISOString().slice(0,10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showToast('✅ Results exported successfully');
}

/**
 * Reset form and results
 */
function resetWinrateCalculator() {
    // Reset form
    const form = document.getElementById('winrateForm');
    if (form) {
        form.reset();
        document.getElementById('winRateSlider').value = 50;
        document.getElementById('winRate').value = 50;
        updateWinRateDisplay();
        updateMaxEntryField();
    }
    
    // Hide results
    const resultsSection = document.getElementById('winrateResults');
    if (resultsSection) {
        resultsSection.style.display = 'none';
        resultsSection.classList.remove('show');
    }
    
    // Hide warnings
    const warningsContainer = document.getElementById('riskWarnings');
    if (warningsContainer) {
        warningsContainer.style.display = 'none';
    }
    
    // Reset charts
    if (equityChart) {
        equityChart.data.datasets[0].data = [];
        equityChart.data.labels = [];
        equityChart.update();
    }
    
    if (distributionChart) {
        distributionChart.data.datasets[0].data = [0, 0];
        distributionChart.update();
    }
    
    simulationResults = null;
    showToast('🔃 Calculator reset');
}

// ============================================
// PUBLIC API (for global access)
// ============================================

window.WinrateCalculator = {
    calculate: calculateSimulation,
    runMonteCarlo: runMonteCarloSimulation,
    exportResults: exportResults,
    reset: resetWinrateCalculator,
    validateRiskLimits: validateWinrateRiskLimits,  // ✅ TAMBAHKAN INI
    updateExchangeRate: function(kurs) {
        window.currentKurs = kurs;
        console.log('Exchange rate updated to:', kurs);
    }
};