
        // Simple tax calculator functionality
        document.addEventListener('DOMContentLoaded', function() {
            const calculateBtn = document.querySelector('.calculate-btn');
            const resultValue = document.querySelector('.result-value');
            
            if (calculateBtn) {
                calculateBtn.addEventListener('click', function() {
                    const tradingVolume = parseFloat(document.getElementById('trading-volume').value) || 0;
                    const taxBracket = parseFloat(document.getElementById('tax-bracket').value) || 0;
                    
                    // Assumptions: 2% trading fee, 50% to charity, tax-deductible
                    const monthlyFees = tradingVolume * 0.01;
                    const monthlyCharity = monthlyFees * 0.5;
                    const annualCharity = monthlyCharity * 12;
                    const taxSavings = annualCharity * (taxBracket / 100);
                    
                    resultValue.textContent = '$' + taxSavings.toFixed(2);
                    
                    document.getElementById('calculation-result').style.display = 'block';
                });
            }
        });