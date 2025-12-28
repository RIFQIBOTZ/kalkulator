// ============================================
// WINRATE CALCULATOR MODULE
// Handles all simulation logic and charting
// ============================================

(function() {
    'use strict';
    
    // Module state variables
    let equityChart = null;
    let distributionChart = null;
    let simulationResults = null;
    let isIDR = true; // Default currency display
    
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
        if (short && amount >= 1000000000) {
            return '$' + (amount / 1000000000).toFixed(1) + 'B';
        } else if (short && amount >= 1000000) {
            return '$' + (amount / 1000000000).toFixed(1) + 'M';
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
     * Show toast notification
     */
    function showToast(message) {
        // Use existing toast function if available
        if (typeof window.showToast === 'function') {
            window.showToast(message);
            return;
        }
        
        // Fallback toast implementation
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
    // INITIALIZATION
    // ============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Winrate Calculator Initializing...');
        
        // Wait for DOM to be fully loaded
        setTimeout(() => {
            initializeWinrateModule();
            setupEventListeners();
            initializeCharts();
            
            // Trigger currency display update
            updateCurrencyDisplay();
            
            console.log('Winrate Calculator Ready');
            console.log('Exchange rate loaded:', getCurrentKurs());
        }, 100);
    });
    
    /**
     * Initialize the winrate module
     */
    function initializeWinrateModule() {
        // Check if required elements exist
        const form = document.getElementById('winrateForm');
        if (!form) {
            console.warn('Winrate form not found');
            return;
        }
        
        // Set default values
        document.getElementById('winRateSlider').value = 50;
        document.getElementById('winRate').value = 50;
        
        // Update maxEntry field based on selection
        updateMaxEntryField();
        
        // Hide results section initially
        const resultsSection = document.getElementById('winrateResults');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
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
        
        // Max entry selection
        const maxEntrySelect = document.getElementById('maxEntrySelect');
        if (maxEntrySelect) {
            maxEntrySelect.addEventListener('change', updateMaxEntryField);
        }
        
        // Win rate slider sync
        const winRateInput = document.getElementById('winRate');
        const winRateSlider = document.getElementById('winRateSlider');
        
        if (winRateSlider && winRateInput) {
            winRateSlider.addEventListener('input', function() {
                winRateInput.value = this.value;
                updateWinRateDisplay();
            });
            
            winRateInput.addEventListener('input', function() {
                const value = Math.min(100, Math.max(0, parseInt(this.value) || 0));
                this.value = value;
                winRateSlider.value = value;
                updateWinRateDisplay();
            });
            
            updateWinRateDisplay();
        }
        
        // Input validation on blur
        const numericInputs = form.querySelectorAll('input[type="number"]');
        numericInputs.forEach(input => {
            input.addEventListener('blur', validateSingleInput);
            input.addEventListener('input', clearInputError);
        });
    }
    
    /**
     * Initialize empty charts
     */
    function initializeCharts() {
        // Initialize equity chart with empty data
        const equityCtx = document.getElementById('equityChart');
        if (equityCtx) {
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
    // FORM HANDLING
    // ============================================
    
    /**
     * Handle form submission
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        const btn = document.getElementById('btnCalculateWinrate');
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
                // Calculate simulation
                simulationResults = calculateSimulation(inputs);
                
                // Run Monte Carlo simulation
                const monteCarloResults = runMonteCarloSimulation(inputs, 1000);
                
                // Combine results
                const combinedResults = {
                    ...simulationResults,
                    monteCarlo: monteCarloResults
                };
                
                // Display results
                displayResults(combinedResults);
                
                // Validate risk limits
                const warnings = validateRiskLimits(combinedResults, inputs.startingEquity);
                if (warnings.length > 0) {
                    displayRiskWarnings(warnings);
                }
                
                // Show success message
                showToast('✅ Simulation complete! Results updated.');
            } catch (error) {
                console.error('Simulation error:', error);
                showToast('❌ Error in simulation. Please check your inputs.');
            }
            
            // Restore button
            btn.disabled = false;
            btn.textContent = originalText;
        }, 500);
    }
    
    /**
     * Collect all form inputs
     */
    function collectFormInputs() {
        // Get currency state
        const isIDR = document.getElementById('currencyToggleWinrate')?.checked || true;
        
        // Collect values
        let startingEquity = parseFloat(document.getElementById('startingEquity').value);
        const riskPercent = parseFloat(document.getElementById('riskPercentWinrate').value);
        const totalTrades = parseInt(document.getElementById('totalTrades').value);
        const winRate = parseFloat(document.getElementById('winRate').value);
        const avgWinPercent = parseFloat(document.getElementById('avgWinPercent').value);
        const avgLossPercent = parseFloat(document.getElementById('avgLossPercent').value);
        
        // Get max entry based on selection
        let maxEntry;
        const maxEntrySelect = document.getElementById('maxEntrySelect');
        if (maxEntrySelect.value === 'custom') {
            maxEntry = parseInt(document.getElementById('maxEntryCustom').value);
        } else {
            maxEntry = parseInt(maxEntrySelect.value);
        }
        
        // Convert to IDR if in USD
        if (!isIDR) {
            startingEquity *= getCurrentKurs();
        }
        
        return {
            startingEquity,
            maxEntry,
            riskPercent,
            totalTrades,
            winRate,
            avgWinPercent,
            avgLossPercent,
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
        const currencySymbol = isIDR ? 'Rp' : '$';
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
                // Convert to appropriate currency
                let displayBalance = currentBalance;
                if (!isIDR) {
                    displayBalance = currentBalance / getCurrentKurs();
                }
                
                // Set the value
                document.getElementById('startingEquity').value = Math.floor(displayBalance);
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
     * Update win rate display
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
    // CALCULATION LOGIC
    // ============================================
    
    /**
     * Main simulation calculation
     */
    function calculateSimulation(inputs) {
        // Step 1: Extract inputs
        const {
            startingEquity,
            maxEntry,
            riskPercent,
            totalTrades,
            winRate,
            avgWinPercent,
            avgLossPercent
        } = inputs;
        
        // Step 2: Position sizing
        const positionValue = startingEquity / maxEntry;
        const riskAmount = positionValue * (riskPercent / 100);
        
        // Step 3: Calculate P/L per trade
        const rrRatio = avgWinPercent / avgLossPercent;
        const profitPerWin = riskAmount * rrRatio;
        const lossPerLoss = riskAmount;
        
        // Step 4: Trade distribution
        const winTrades = Math.round(totalTrades * (winRate / 100));
        const lossTrades = totalTrades - winTrades;
        
        // Step 5: Total calculation
        const totalProfit = winTrades * profitPerWin;
        const totalLoss = lossTrades * lossPerLoss;
        const netPL = totalProfit - totalLoss;
        const finalEquity = startingEquity + netPL;
        const roi = (netPL / startingEquity) * 100;
        
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
        const avgTrade = netPL / totalTrades;
        
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
        
        // Generate random sequence of wins/losses based on winRate
        for (let i = 0; i < totalTrades; i++) {
            const isWin = seededRandom() * 100 < winRate;
            
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
        const results = [];
        
        for (let i = 0; i < iterations; i++) {
            // Create modified inputs with slight random variation
            const modifiedInputs = {
                ...inputs,
                winRate: Math.max(0, Math.min(100, inputs.winRate + (Math.random() * 20 - 10))),
                avgWinPercent: Math.max(0.1, inputs.avgWinPercent + (Math.random() * 2 - 1)),
                avgLossPercent: Math.max(0.1, inputs.avgLossPercent + (Math.random() * 2 - 1))
            };
            
            const result = calculateSimulation(modifiedInputs);
            results.push(result.finalEquity);
        }
        
        // Sort results
        results.sort((a, b) => a - b);
        
        // Calculate percentiles
        const bestCase = results[Math.floor(results.length * 0.95)]; // Top 5%
        const averageCase = results[Math.floor(results.length * 0.5)]; // Median
        const worstCase = results[Math.floor(results.length * 0.05)]; // Bottom 5%
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
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const squareDiffs = values.map(value => Math.pow(value - avg, 2));
        const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
        return Math.sqrt(avgSquareDiff);
    }
    
    // ============================================
    // RISK VALIDATION (NAC Framework)
    // ============================================
    
    /**
     * Validate risk limits
     */
    function validateRiskLimits(results, startingEquity) {
        const warnings = [];
        
        // Check max drawdown
        if (results.maxDrawdown > 8) {
            warnings.push({
                type: 'drawdown',
                message: `Max drawdown ${results.maxDrawdown.toFixed(2)}% exceeds 8% limit`,
                severity: 'high'
            });
        } else if (results.maxDrawdown > 5) {
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
        let maxEquity = startingEquity;
        let maxDrawdown = 0;
        
        for (let equity of equityCurve) {
            if (equity > maxEquity) {
                maxEquity = equity;
            }
            
            const drawdown = ((maxEquity - equity) / maxEquity) * 100;
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
    function displayResults(results) {
        // Convert values based on currency
        const displayMultiplier = isIDR ? 1 : 1 / getCurrentKurs();
        const currencySymbol = isIDR ? 'Rp' : '$';
        
        // Update summary cards
        updateResultCard('finalEquityValue', results.finalEquity * displayMultiplier, currencySymbol);
        updateResultCard('netPLValue', results.netPL * displayMultiplier, currencySymbol, true);
        updateResultCard('roiValue', results.roi, '%', false, true);
        
        // Update trade statistics
        document.getElementById('winTradesValue').textContent = results.winTrades;
        document.getElementById('lossTradesValue').textContent = results.lossTrades;
        
        updateResultCard('expectedValueValue', results.expectedValue * displayMultiplier, currencySymbol);
        document.getElementById('rrRatioValue').textContent = '1:' + results.rrRatio.toFixed(2);
        
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
    }
    
    /**
     * Update a result card with proper formatting
     */
    function updateResultCard(elementId, value, suffix = '', isMonetary = true, isPercentage = false) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        // Clear existing classes
        element.className = 'stat-value';
        
        // Add color class for monetary values
        if (isMonetary) {
            if (value > 0) {
                element.classList.add('positive');
            } else if (value < 0) {
                element.classList.add('negative');
            }
        }
        
        // Format the value
        let formattedValue;
        if (isPercentage) {
            formattedValue = value.toFixed(2) + suffix;
        } else if (isMonetary) {
            formattedValue = formatCurrency(value, suffix);
        } else {
            formattedValue = Number(value.toFixed(2)).toLocaleString() + suffix;
        }
        
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
        showToast('🔄 Calculator reset');
    }
    
    // ============================================
    // PUBLIC API (for global access)
    // ============================================
    
    window.WinrateCalculator = {
        calculate: calculateSimulation,
        runMonteCarlo: runMonteCarloSimulation,
        exportResults: exportResults,
        reset: resetWinrateCalculator,
        updateExchangeRate: function(kurs) {
            window.currentKurs = kurs;
        }
    };
    
    // Auto-initialize when script loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWinrateModule);
    } else {
        initializeWinrateModule();
    }
})();