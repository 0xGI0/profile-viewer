// api/header.js
export default function handler(req, res) {
    const {
        text = '',
        color = '672FAE',
        height = '200',
        fontSize = '48',
        fontColor = 'FFFFFF'
    } = req.query;

    const h = parseInt(height);
    const fSize = parseInt(fontSize);
    const waveHeight = h * 0.3;

    const svg = `
    <svg width="100%" height="${h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${h}" preserveAspectRatio="none">
    <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
    <stop offset="100%" style="stop-color:#${color};stop-opacity:0.9" />
    </linearGradient>
    </defs>

    <!-- Solid Background -->
    <rect width="1200" height="${h}" fill="url(#bg)"/>

    <!-- Wave Layer 1 (darkest) -->
    <path d="M0,${h-waveHeight*3} Q300,${h-waveHeight*3.5} 600,${h-waveHeight*3} T1200,${h-waveHeight*3} L1200,${h} L0,${h} Z"
    fill="#${color}" opacity="0.3">
    <animate attributeName="d"
    values="M0,${h-waveHeight*3} Q300,${h-waveHeight*3.5} 600,${h-waveHeight*3} T1200,${h-waveHeight*3} L1200,${h} L0,${h} Z;
    M0,${h-waveHeight*3} Q300,${h-waveHeight*2.5} 600,${h-waveHeight*3} T1200,${h-waveHeight*3} L1200,${h} L0,${h} Z;
    M0,${h-waveHeight*3} Q300,${h-waveHeight*3.5} 600,${h-waveHeight*3} T1200,${h-waveHeight*3} L1200,${h} L0,${h} Z"
    dur="8s" repeatCount="indefinite" />
    </path>

    <!-- Wave Layer 2 (medium) -->
    <path d="M0,${h-waveHeight*2} Q300,${h-waveHeight*2.4} 600,${h-waveHeight*2} T1200,${h-waveHeight*2} L1200,${h} L0,${h} Z"
    fill="#${color}" opacity="0.5">
    <animate attributeName="d"
    values="M0,${h-waveHeight*2} Q300,${h-waveHeight*2.4} 600,${h-waveHeight*2} T1200,${h-waveHeight*2} L1200,${h} L0,${h} Z;
    M0,${h-waveHeight*2} Q300,${h-waveHeight*1.6} 600,${h-waveHeight*2} T1200,${h-waveHeight*2} L1200,${h} L0,${h} Z;
    M0,${h-waveHeight*2} Q300,${h-waveHeight*2.4} 600,${h-waveHeight*2} T1200,${h-waveHeight*2} L1200,${h} L0,${h} Z"
    dur="6s" repeatCount="indefinite" />
    </path>

    <!-- Wave Layer 3 (lightest) -->
    <path d="M0,${h-waveHeight} Q300,${h-waveHeight*1.3} 600,${h-waveHeight} T1200,${h-waveHeight} L1200,${h} L0,${h} Z"
    fill="#${color}" opacity="0.7">
    <animate attributeName="d"
    values="M0,${h-waveHeight} Q300,${h-waveHeight*1.3} 600,${h-waveHeight} T1200,${h-waveHeight} L1200,${h} L0,${h} Z;
    M0,${h-waveHeight} Q300,${h-waveHeight*0.7} 600,${h-waveHeight} T1200,${h-waveHeight} L1200,${h} L0,${h} Z;
    M0,${h-waveHeight} Q300,${h-waveHeight*1.3} 600,${h-waveHeight} T1200,${h-waveHeight} L1200,${h} L0,${h} Z"
    dur="4s" repeatCount="indefinite" />
    </path>

    ${text ? `<text x="600" y="${h/2 + 10}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fSize}" font-weight="bold" fill="#${fontColor}">${decodeURIComponent(text)}</text>` : ''}
    </svg>
    `;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.status(200).send(svg);
}
