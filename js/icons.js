// =====================================================
// ICONS.JS - SVG Icon Management System
// Version: 2.0.0 - ENHANCED CONTRAST
// Enhanced with stronger glow and semantic colors
// =====================================================

const ICONS = {
    'check': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'path', d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" },
            { type: 'polyline', points: "22 4 12 14.01 9 11.01" }
        ],
        color: "#00ff88",
        glow: "rgba(0, 255, 136, 0.8)"
    },
    
    'chart': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'line', x1: "12", y1: "20", x2: "12", y2: "10" },
            { type: 'line', x1: "18", y1: "20", x2: "18", y2: "4" },
            { type: 'line', x1: "6", y1: "20", x2: "6", y2: "16" }
        ],
        color: "#00d4ff",
        glow: "rgba(0, 212, 255, 0.8)"
    },
    
    'home': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'path', d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
            { type: 'polyline', points: "9 22 9 12 15 12 15 22" }
        ],
        color: "#00d4ff",
        glow: "rgba(0, 212, 255, 0.8)"
    },
    
    'calculator': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'rect', x: "4", y: "2", width: "16", height: "20", rx: "2", ry: "2" },
            { type: 'line', x1: "8", y1: "6", x2: "16", y2: "6" },
            { type: 'line', x1: "16", y1: "14", x2: "16", y2: "18" },
            { type: 'line', x1: "8", y1: "14", x2: "8", y2: "14.01" },
            { type: 'line', x1: "8", y1: "18", x2: "8", y2: "18.01" },
            { type: 'line', x1: "12", y1: "18", x2: "12", y2: "18.01" }
        ],
        color: "#7b2ff7",
        glow: "rgba(123, 47, 247, 0.8)"
    },
    
    'file': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'path', d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
            { type: 'polyline', points: "14 2 14 8 20 8" },
            { type: 'line', x1: "16", y1: "13", x2: "8", y2: "13" },
            { type: 'line', x1: "16", y1: "17", x2: "8", y2: "17" },
            { type: 'polyline', points: "10 9 9 9 8 9" }
        ],
        color: "#00d4ff",
        glow: "rgba(0, 212, 255, 0.8)"
    },
    
    'warning': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'path', d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" },
            { type: 'line', x1: "12", y1: "9", x2: "12", y2: "13" },
            { type: 'line', x1: "12", y1: "17", x2: "12.01", y2: "17" }
        ],
        color: "#ffa500",
        glow: "rgba(255, 165, 0, 0.8)"
    },
    
    'dollar': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'line', x1: "12", y1: "1", x2: "12", y2: "23" },
            { type: 'path', d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" }
        ],
        color: "#ffd700",
        glow: "rgba(255, 215, 0, 0.8)"
    },
    
    'edit': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'path', d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" },
            { type: 'path', d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" }
        ],
        color: "#00d4ff",
        glow: "rgba(0, 212, 255, 0.8)"
    },
    
    'trending-up': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'polyline', points: "23 6 13.5 15.5 8.5 10.5 1 18" },
            { type: 'polyline', points: "17 6 23 6 23 12" }
        ],
        color: "#00ff88",
        glow: "rgba(0, 255, 136, 0.8)"
    },
    
    'target': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'circle', cx: "12", cy: "12", r: "10" },
            { type: 'circle', cx: "12", cy: "12", r: "6" },
            { type: 'circle', cx: "12", cy: "12", r: "2" }
        ],
        color: "#ffd700",
        glow: "rgba(255, 215, 0, 0.8)"
    },
    
    'plus': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'line', x1: "12", y1: "5", x2: "12", y2: "19" },
            { type: 'line', x1: "5", y1: "12", x2: "19", y2: "12" }
        ],
        color: "#00ff88",
        glow: "rgba(0, 255, 136, 0.8)"
    },
    
    'save': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'path', d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" },
            { type: 'polyline', points: "17 21 17 13 7 13 7 21" },
            { type: 'polyline', points: "7 3 7 8 15 8" }
        ],
        color: "#00ff88",
        glow: "rgba(0, 255, 136, 0.8)"
    },
    
    'logout': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'path', d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" },
            { type: 'polyline', points: "16 17 21 12 16 7" },
            { type: 'line', x1: "21", y1: "12", x2: "9", y2: "12" }
        ],
        color: "#ff3366",
        glow: "rgba(255, 51, 102, 0.8)"
    },
    
    'lightbulb': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'line', x1: "9", y1: "18", x2: "15", y2: "18" },
            { type: 'line', x1: "10", y1: "22", x2: "14", y2: "22" },
            { type: 'path', d: "M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" }
        ],
        color: "#ffeb3b",
        glow: "rgba(255, 235, 59, 0.8)"
    },
    
    'calendar': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'rect', x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" },
            { type: 'line', x1: "16", y1: "2", x2: "16", y2: "6" },
            { type: 'line', x1: "8", y1: "2", x2: "8", y2: "6" },
            { type: 'line', x1: "3", y1: "10", x2: "21", y2: "10" }
        ],
        color: "#00d4ff",
        glow: "rgba(0, 212, 255, 0.8)"
    },
    
    'trending-down': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'polyline', points: "23 18 13.5 8.5 8.5 13.5 1 6" },
            { type: 'polyline', points: "17 18 23 18 23 12" }
        ],
        color: "#ff3366",
        glow: "rgba(255, 51, 102, 0.8)"
    },
    
    'trash': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'polyline', points: "3 6 5 6 21 6" },
            { type: 'path', d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }
        ],
        color: "#ff3366",
        glow: "rgba(255, 51, 102, 0.8)"
    },
    
    'lock': {
        viewBox: "0 0 24 24",
        paths: [
            { type: 'rect', x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" },
            { type: 'path', d: "M7 11V7a5 5 0 0 1 10 0v4" }
        ],
        color: "#7b2ff7",
        glow: "rgba(123, 47, 247, 0.8)"
    }
};

/**
 * Generate SVG icon HTML string with ENHANCED CONTRAST
 * @param {string} name - Icon name
 * @param {number} size - Icon size in pixels (default: 16)
 * @returns {string} SVG HTML string
 */
function getIcon(name, size = 16) {
    const icon = ICONS[name];
    if (!icon) {
        console.warn(`Icon "${name}" not found in ICONS registry`);
        return '';
    }
    
    // Generate paths HTML
    const pathsHTML = icon.paths.map(p => {
        if (p.type === 'path') {
            return `<path d="${p.d}"></path>`;
        }
        if (p.type === 'polyline') {
            return `<polyline points="${p.points}"></polyline>`;
        }
        if (p.type === 'line') {
            return `<line x1="${p.x1}" y1="${p.y1}" x2="${p.x2}" y2="${p.y2}"></line>`;
        }
        if (p.type === 'rect') {
            const rx = p.rx ? ` rx="${p.rx}"` : '';
            const ry = p.ry ? ` ry="${p.ry}"` : '';
            return `<rect x="${p.x}" y="${p.y}" width="${p.width}" height="${p.height}"${rx}${ry}></rect>`;
        }
        if (p.type === 'circle') {
            return `<circle cx="${p.cx}" cy="${p.cy}" r="${p.r}"></circle>`;
        }
        if (p.type === 'ellipse') {
            return `<ellipse cx="${p.cx}" cy="${p.cy}" rx="${p.rx}" ry="${p.ry}"></ellipse>`;
        }
        return '';
    }).join('');
    
    // ✅ ENHANCED: stroke-width increased to 2.5, stronger drop-shadow
    return `<svg class="icon-svg icon-${name}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${icon.viewBox}" fill="none" stroke="${icon.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 0 12px ${icon.glow});">${pathsHTML}</svg>`;
}

/**
 * Initialize all icons in the page by data-icon attribute
 * Usage in HTML: <span data-icon="check" data-size="20"></span>
 */
function initializeIcons() {
    document.querySelectorAll('[data-icon]').forEach(el => {
        const name = el.getAttribute('data-icon');
        const size = parseInt(el.getAttribute('data-size')) || 16;
        el.innerHTML = getIcon(name, size);
    });
}

/**
 * Get icon data object
 * @param {string} name - Icon name
 * @returns {object|null} Icon data object or null if not found
 */
function getIconData(name) {
    return ICONS[name] || null;
}

/**
 * List all available icon names
 * @returns {string[]} Array of icon names
 */
function listIcons() {
    return Object.keys(ICONS);
}

/**
 * Check if icon exists
 * @param {string} name - Icon name
 * @returns {boolean} True if icon exists
 */
function hasIcon(name) {
    return name in ICONS;
}

// Export to window global
window.getIcon = getIcon;
window.ICONS = ICONS;
window.initializeIcons = initializeIcons;
window.getIconData = getIconData;
window.listIcons = listIcons;
window.hasIcon = hasIcon;

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeIcons);
} else {
    initializeIcons();
}

// Log initialization
console.log(`%c✅ ICONS.JS v2.0 ENHANCED Loaded`, 'color: #00ff88; font-weight: bold;');
console.log(`%c  ${Object.keys(ICONS).length} icons with IMPROVED CONTRAST`, 'color: #00d4ff;');
console.log(`%c  ✅ Glow increased: 0.5 → 0.8`, 'color: #ffd700;');
console.log(`%c  ✅ Stroke width: 2 → 2.5`, 'color: #ffd700;');
console.log(`%c  ✅ Semantic colors applied`, 'color: #ffd700;');
console.log(`%c  Usage: getIcon('name', size)`, 'color: #8b92b8;');
