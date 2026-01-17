// api/footer.js
export default function handler(req, res) {
    const {
        text = '',
        color = '672FAE',
        height = '120',
        fontSize = '30',
        fontColor = '87CEFA'
    } = req.query;

    const h = parseInt(height);
    const fSize = parseInt(fontSize);
    const waveHeight = h * 0.3;

    const svg = `
    <svg width="100%" height="${h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 ${h}" preserveAspectRatio="none">
    <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color:#${color};stop-opacity:0.9" />
    <stop offset="100%" style="stop-color:#${color};stop-opacity:1" />
    </linearGradient>
    </defs>

    <!-- Wave Layer 1 (top, lightest) -->
    <path d="M0,${waveHeight} Q300,${waveHeight*0.7} 600,${waveHeight} T1200,${waveHeight} L1200,0 L0,0 Z"
    fill="#${color}" opacity="0.7">
    <animate attributeName="d"
    values="M0,${waveHeight} Q300,${waveHeight*0.7} 600,${waveHeight} T1200,${waveHeight} L1200,0 L0,0 Z;
    M0,${waveHeight} Q300,${waveHeight*1.3} 600,${waveHeight} T1200,${waveHeight} L1200,0 L0,0 Z;
    M0,${waveHeight} Q300,${waveHeight*0.7} 600,${waveHeight} T1200,${waveHeight} L1200,0 L0,0 Z"
    dur="4s" repeatCount="indefinite" />
    </path>

    <!-- Wave Layer 2 (medium) -->
    <path d="M0,${waveHeight*2} Q300,${waveHeight*1.6} 600,${waveHeight*2} T1200,${waveHeight*2} L1200,0 L0,0 Z"
    fill="#${color}" opacity="0.5">
    <animate attributeName="d"
    values="M0,${waveHeight*2} Q300,${waveHeight*1.6} 600,${waveHeight*2} T1200,${waveHeight*2} L1200,0 L0,0 Z;
    M0,${waveHeight*2} Q300,${waveHeight*2.4} 600,${waveHeight*2} T1200,${waveHeight*2} L1200,0 L0,0 Z;
    M0,${waveHeight*2} Q300,${waveHeight*1.6} 600,${waveHeight*2} T1200,${waveHeight*2} L1200,0 L0,0 Z"
    dur="6s" repeatCount="indefinite" />
    </path>

    <!-- Wave Layer 3 (darkest) -->
    <path d="M0,${waveHeight*3} Q300,${waveHeight*2.5} 600,${waveHeight*3} T1200,${waveHeight*3} L1200,0 L0,0 Z"
    fill="#${color}" opacity="0.3">
    <animate attributeName="d"
    values="M0,${waveHeight*3} Q300,${waveHeight*2.5} 600,${waveHeight*3} T1200,${waveHeight*3} L1200,0 L0,0 Z;
    M0,${waveHeight*3} Q300,${waveHeight*3.5} 600,${waveHeight*3} T1200,${waveHeight*3} L1200,0 L0,0 Z;
    M0,${waveHeight*3} Q300,${waveHeight*2.5} 600,${waveHeight*3} T1200,${waveHeight*3} L1200,0 L0,0 Z"
    dur="8s" repeatCount="indefinite" />
    </path>

    <!-- Solid Background -->
    <rect y="${waveHeight*3}" width="1200" height="${h-waveHeight*3}" fill="url(#bg)"/>

    ${text ? `<text x="600" y="${h/2 + fSize/2 + 10}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${fSize}" font-weight="600" fill="#${fontColor}">${decodeURIComponent(text)}</text>` : ''}
    </svg>
    `;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.status(200).send(svg);
}
