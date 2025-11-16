// AstroSense AI - Frontend Application Logic

let currentChart = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadStoredChart();
});

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const view = e.target.getAttribute('data-view');
            showView(view);
        });
    });
    
    // Birth chart form
    const chartForm = document.getElementById('birthDetailsForm');
    if (chartForm) {
        chartForm.addEventListener('submit', handleChartSubmission);
    }
}

// Show specific view
function showView(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const selectedView = document.getElementById(viewId);
    if (selectedView) {
        selectedView.classList.add('active');
    }
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-view') === viewId) {
            btn.classList.add('active');
        }
    });
}

// Show chart form
function showChartForm() {
    showView('chart');
}

// Handle chart form submission
async function handleChartSubmission(e) {
    e.preventDefault();
    
    const formData = {
        dateOfBirth: document.getElementById('dateOfBirth').value,
        timeOfBirth: document.getElementById('timeOfBirth').value,
        placeOfBirth: {
            name: document.getElementById('placeOfBirth').value,
            lat: parseFloat(document.getElementById('latitude').value),
            lng: parseFloat(document.getElementById('longitude').value),
            timezone: 'Asia/Kolkata'
        },
        language: document.getElementById('language').value,
        system: 'vedic'
    };
    
    try {
        showLoading('Generating your birth chart...');
        
        const response = await fetch('/api/chart/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentChart = data.chart;
            displayChart(data.chart);
            saveChart(data.chart);
            hideLoading();
        } else {
            throw new Error(data.error || 'Failed to generate chart');
        }
    } catch (error) {
        console.error('Chart generation error:', error);
        alert('Failed to generate chart: ' + error.message);
        hideLoading();
    }
}

// Display chart
function displayChart(chart) {
    const chartDisplay = document.getElementById('chartDisplay');
    const chartResult = document.getElementById('chartResult');
    
    const d1Chart = chart.charts.d1;
    
    let html = `
        <div class="chart-info">
            <h4>Birth Details</h4>
            <p><strong>Date:</strong> ${chart.birthData.dateOfBirth}</p>
            <p><strong>Time:</strong> ${chart.birthData.timeOfBirth}</p>
            <p><strong>Place:</strong> ${chart.birthData.placeOfBirth.name}</p>
        </div>
        
        <div class="chart-data">
            <h4>Ascendant: ${d1Chart.ascendantSign}</h4>
            
            <h4>Planetary Positions:</h4>
            <table class="planet-table">
                <thead>
                    <tr>
                        <th>Planet</th>
                        <th>Sign</th>
                        <th>Degree</th>
                        <th>Nakshatra</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    for (const [planet, position] of Object.entries(d1Chart.planets)) {
        html += `
            <tr>
                <td>${planet}</td>
                <td>${position.sign}</td>
                <td>${position.degree.toFixed(2)}°</td>
                <td>${position.nakshatra.name}</td>
            </tr>
        `;
    }
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    chartResult.innerHTML = html;
    
    document.getElementById('chartForm').style.display = 'none';
    chartDisplay.style.display = 'block';
}

// Get AI interpretation
async function getInterpretation() {
    if (!currentChart) {
        alert('Please generate your birth chart first');
        return;
    }
    
    try {
        showLoading('Generating AI interpretation...');
        
        const response = await fetch('/api/chart/interpret', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chart: currentChart, type: 'all' })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayInterpretation(data.interpretation);
            hideLoading();
        } else {
            throw new Error(data.error || 'Failed to get interpretation');
        }
    } catch (error) {
        console.error('Interpretation error:', error);
        alert('Failed to get interpretation: ' + error.message);
        hideLoading();
    }
}

// Display interpretation
function displayInterpretation(interpretation) {
    const chartResult = document.getElementById('chartResult');
    
    let html = '<div class="interpretation-section">';
    html += '<h3>🤖 AI Interpretation</h3>';
    
    if (interpretation.analyses.personality) {
        html += `<div class="analysis-block">
            <h4>Personality Profile</h4>
            <p>${interpretation.analyses.personality.replace(/\n/g, '<br>')}</p>
        </div>`;
    }
    
    if (interpretation.analyses.career) {
        html += `<div class="analysis-block">
            <h4>Career Analysis</h4>
            <p>${interpretation.analyses.career.replace(/\n/g, '<br>')}</p>
        </div>`;
    }
    
    if (interpretation.analyses.strengths) {
        html += `<div class="analysis-block">
            <h4>Your Strengths</h4>
            <ul>`;
        interpretation.analyses.strengths.forEach(strength => {
            html += `<li>${strength}</li>`;
        });
        html += `</ul></div>`;
    }
    
    html += '</div>';
    
    chartResult.innerHTML += html;
}

// Chat functionality
function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Display user message
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML += `
        <div class="user-message">
            <p>${message}</p>
        </div>
    `;
    
    input.value = '';
    
    try {
        const response = await fetch('/api/chat/message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: message,
                chartContext: currentChart 
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            messagesContainer.innerHTML += `
                <div class="ai-message">
                    <p>${data.response.answer}</p>
                    ${data.response.usedData ? `
                        <p style="font-size: 0.85rem; opacity: 0.7; margin-top: 10px;">
                            <em>Based on: ${data.response.usedData.join(', ')}</em>
                        </p>
                    ` : ''}
                </div>
            `;
        }
    } catch (error) {
        console.error('Chat error:', error);
        messagesContainer.innerHTML += `
            <div class="ai-message">
                <p>Sorry, I encountered an error. Please try again.</p>
            </div>
        `;
    }
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show predictions
async function showPrediction(type) {
    if (!currentChart) {
        document.getElementById('predictionContent').innerHTML = 
            '<p>Please generate your birth chart first to see personalized predictions.</p>';
        return;
    }
    
    try {
        showLoading(`Loading ${type} prediction...`);
        
        const response = await fetch(`/api/predictions/${type}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ chart: currentChart })
        });
        
        const data = await response.json();
        
        if (data.success) {
            displayPrediction(data.prediction, type);
        }
        
        hideLoading();
    } catch (error) {
        console.error('Prediction error:', error);
        hideLoading();
    }
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Display prediction
function displayPrediction(prediction, type) {
    const content = document.getElementById('predictionContent');
    
    let html = `<h3>${type.charAt(0).toUpperCase() + type.slice(1)} Prediction</h3>`;
    
    if (type === 'daily' && prediction) {
        html += `
            <div class="prediction-details">
                <p><strong>Date:</strong> ${prediction.date}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(prediction.rating || 4)}</p>
                <p><strong>Today's Vibes:</strong> ${prediction.todaysVibes}</p>
                <p><strong>Guidance:</strong> ${prediction.guidance}</p>
                ${prediction.luckyElements ? `
                    <div class="lucky-elements">
                        <h4>Lucky Elements</h4>
                        <p>Color: ${prediction.luckyElements.color}</p>
                        <p>Number: ${prediction.luckyElements.number}</p>
                        <p>Direction: ${prediction.luckyElements.direction}</p>
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        html += '<p>Prediction data not available. This feature requires chart generation.</p>';
    }
    
    content.innerHTML = html;
}

// Additional feature functions
function showMatchmaking() {
    alert('Matchmaking feature - Coming soon! Upload two birth charts for compatibility analysis.');
}

function showNumerology() {
    alert('Numerology Calculator - Enter your name and birth date to discover your life path number.');
}

function showMuhurta() {
    alert('Muhurta Finder - Select an activity to find auspicious dates and timings.');
}

function showRemedies() {
    alert('Remedies Hub - Personalized remedies based on your birth chart analysis.');
}

function showLearning() {
    alert('Learning Center - Interactive AI tutor for astrology basics. Coming soon!');
}

// Utility functions
function showLoading(message) {
    // Create loading overlay
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(11, 15, 59, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div class="loader"></div>
            <p style="margin-top: 20px; font-size: 1.2rem;">${message}</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

function saveChart(chart) {
    localStorage.setItem('astrosense_chart', JSON.stringify(chart));
}

function loadStoredChart() {
    const stored = localStorage.getItem('astrosense_chart');
    if (stored) {
        currentChart = JSON.parse(stored);
    }
}
