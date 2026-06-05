// api/views.js

// Only this username is allowed. Everyone else is rejected.
// Configurable via the ALLOWED_USERNAME env var (falls back to the owner).
const ALLOWED_USERNAME = (process.env.ALLOWED_USERNAME || '0xGI0').trim();

export default async function handler(req, res) {
    const { username, mode = 'counter' } = req.query;
    // Animated icon left of the label: 'eye' (rainbow eye) or 'ring' (spinner).
    const icon = req.query.icon === 'ring' ? 'ring' : 'eye';

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Lock the counter to a single username (case-insensitive match).
    if (!username || username.trim().toLowerCase() !== ALLOWED_USERNAME.toLowerCase()) {
        return res.status(403).send(generateDeniedBadge());
    }

    try {
        // The real view count is always tracked, in both modes.
        const views = await incrementViews(ALLOWED_USERNAME);
        const svg = mode === 'symbols'
            ? generateSymbolBadge(icon)
            : generateCounterBadge(views, icon);
        return res.status(200).send(svg);
    } catch (error) {
        console.error('Error:', error);
        return res.status(200).send(generateCounterBadge(0, icon));
    }
}

async function incrementViews(username) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
        throw new Error('Redis credentials not configured');
    }

    const key = `profile:views:${username}`;

    const response = await fetch(`${url}/incr/${key}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    return data.result || 1;
}

// ---------------------------------------------------------------------------
// Animated icon (left of the label). Selectable via ?icon=
//   eye  -> rainbow eye whose colour cycles, pupil looks around (default)
//   ring -> rainbow ring that spins like a loader
// Returns the <defs> snippet and the <g> body to drop into a badge.
// ---------------------------------------------------------------------------
function renderIcon(icon) {
    if (icon === 'ring') {
        return {
            defs: `
            <linearGradient id="ringgrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff3b3b"/>
            <stop offset="25%" stop-color="#ffe02c"/>
            <stop offset="50%" stop-color="#3bd16f"/>
            <stop offset="75%" stop-color="#2cb6ff"/>
            <stop offset="100%" stop-color="#9a6bff"/>
            </linearGradient>`,
            body: `
            <g transform="translate(12, 9)">
            <g>
            <circle cx="5" cy="5" r="5.5" fill="none" stroke="url(#ringgrad)" stroke-width="2"
                    stroke-linecap="round" stroke-dasharray="21 12"/>
            <animateTransform attributeName="transform" type="rotate"
                    from="0 5 5" to="360 5 5" dur="2.4s" repeatCount="indefinite"/>
            </g>
            </g>`,
        };
    }

    // Default: rainbow eye.
    return {
        defs: `
        <style>
        .rainbow { animation: rainbow 5s linear infinite; }
        .rainbow-pupil { animation: rainbow 5s linear infinite, lookAround 3s ease-in-out infinite; }
        @keyframes rainbow {
            0%   { stroke:#ff3b3b; fill:#ff3b3b; }
            17%  { stroke:#ff9e2c; fill:#ff9e2c; }
            33%  { stroke:#ffe02c; fill:#ffe02c; }
            50%  { stroke:#3bd16f; fill:#3bd16f; }
            67%  { stroke:#2cb6ff; fill:#2cb6ff; }
            83%  { stroke:#9a6bff; fill:#9a6bff; }
            100% { stroke:#ff3b3b; fill:#ff3b3b; }
        }
        @keyframes lookAround {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        </style>`,
        body: `
        <g transform="translate(12, 9)">
        <ellipse class="rainbow" cx="5" cy="5" rx="6" ry="4" fill="none" stroke="#ff3b3b" stroke-width="1.5"/>
        <circle class="rainbow-pupil" cx="5" cy="5" r="2" fill="#ff3b3b"/>
        </g>`,
    };
}

// ---------------------------------------------------------------------------
// Mode 1: normal counter
// ---------------------------------------------------------------------------
function generateCounterBadge(count, icon) {
    const countStr = count.toLocaleString();
    const textWidth = countStr.length * 8;
    const width = 160 + textWidth;

    const bgColor = '#1a1b26';
    const accentColor = '#7aa2f7';
    const textColor = '#a9b1d6';
    const ic = renderIcon(icon);

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
    <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.8" />
    <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
    </linearGradient>
    ${ic.defs}
    </defs>

    <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
    <rect x="2" y="2" width="${width - 4}" height="24" rx="12" fill="url(#grad)" opacity="0.1"/>

    ${ic.body}

    <text x="28" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">Profile Views</text>
    <text x="${width - 15}" y="18" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="bold" fill="${accentColor}">${countStr}</text>
    </svg>
    `;
}

// ---------------------------------------------------------------------------
// Mode 2: random glitch / geometric / Greek / math symbols on every load.
// The view count is still tracked in the background, it is just not shown.
// ---------------------------------------------------------------------------
function generateSymbolBadge(icon) {
    const bgColor = '#1a1b26';
    const accentColor = '#7aa2f7';
    const textColor = '#a9b1d6';
    const ic = renderIcon(icon);

    const symbolCount = 5 + Math.floor(Math.random() * 3); // 5..7 symbols
    const symbols = escapeXml(buildSymbolString(symbolCount));

    const width = 130 + symbolCount * 22;

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
    <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.8" />
    <stop offset="100%" style="stop-color:#9d7cd8;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
    <feGaussianBlur stdDeviation="0.6" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <style>
    .glyphs { animation: flicker 2.4s steps(2, jump-none) infinite; }
    @keyframes flicker {
        0%, 100% { opacity: 1; }
        47% { opacity: 0.85; }
        50% { opacity: 0.4; }
        53% { opacity: 0.9; }
    }
    </style>
    ${ic.defs}
    </defs>

    <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
    <rect x="2" y="2" width="${width - 4}" height="24" rx="12" fill="url(#grad)" opacity="0.12"/>

    ${ic.body}

    <text x="28" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">Profile Views</text>
    <text class="glyphs" x="${width - 14}" y="19" text-anchor="end" filter="url(#glow)"
          font-family="'Noto Sans Symbols', 'Segoe UI Symbol', 'Apple Symbols', monospace"
          font-size="15" letter-spacing="3" fill="${accentColor}">${symbols}</text>
    </svg>
    `;
}

// Curated symbols that are present in the default fonts on virtually every
// platform (Windows / macOS / Linux / mobile). These avoid the "tofu" boxes
// that occur with rarely-installed fonts (e.g. runes / Egyptian hieroglyphs).
const SAFE_SYMBOLS = [
    // Block / glitch elements
    '░', '▒', '▓', '█', '▄', '▀', '▌', '▐', '▚', '▞', '▙', '▟', '▛', '▜', '▖', '▗',
    // Geometric shapes
    '■', '□', '▢', '▣', '▤', '▥', '▦', '▧', '▨', '▩', '◆', '◇', '◈', '●', '○',
    '◐', '◑', '◒', '◓', '◢', '◣', '◤', '◥', '★', '☆', '▲', '△', '▶', '▼', '◀',
    // Box drawing
    '╳', '╋', '╬', '║', '═', '╔', '╗', '╚', '╝', '╠', '╣', '╦', '╩', '┃', '━',
    // Greek letters (mystical / cipher vibe)
    'Σ', 'Δ', 'Ω', 'Φ', 'Ψ', 'Ξ', 'Λ', 'Θ', 'Π', 'Γ',
    'α', 'β', 'γ', 'δ', 'λ', 'σ', 'φ', 'ψ', 'ω', 'ξ', 'π', 'μ', 'τ',
    // Math operators
    '∆', '∇', '∑', '∏', '√', '∞', '≈', '≠', '⊕', '⊗', '⊥', '∴', '∵', '∫',
];

// Build a random string from the universally-supported symbol set above.
function buildSymbolString(n) {
    let out = '';
    for (let i = 0; i < n; i++) {
        out += SAFE_SYMBOLS[Math.floor(Math.random() * SAFE_SYMBOLS.length)];
    }
    return out;
}

// ---------------------------------------------------------------------------
// Shown when a username other than the allowed one is requested.
// ---------------------------------------------------------------------------
function generateDeniedBadge() {
    const bgColor = '#1a1b26';
    const denyColor = '#f7768e';
    const textColor = '#a9b1d6';
    const label = 'Access denied';
    const width = 150;

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
    <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
    <rect x="2" y="2" width="${width - 4}" height="24" rx="12" fill="${denyColor}" opacity="0.1"/>

    <g transform="translate(12, 9)">
    <circle cx="5" cy="5" r="5" fill="none" stroke="${denyColor}" stroke-width="1.5"/>
    <line x1="2" y1="8" x2="8" y2="2" stroke="${denyColor}" stroke-width="1.5"/>
    </g>

    <text x="26" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">${label}</text>
    </svg>
    `;
}

function escapeXml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
