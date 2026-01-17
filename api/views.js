// api/views.js
export default async function handler(req, res) {
    const { username, style = '1' } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username required' });
    }

    try {
        const views = await incrementViews(username);
        const svg = generateBadge(views, style);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.status(200).send(svg);

    } catch (error) {
        console.error('Error:', error);
        const svg = generateBadge(0, style);
        res.status(200).send(svg);
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

function generateBadge(count, style) {
    const countStr = count.toLocaleString();
    const textWidth = countStr.length * 8;
    const width = 160 + textWidth;

    const bgColor = '#1a1b26';
    const accentColor = '#7aa2f7';
    const textColor = '#a9b1d6';

    // Style 1: Auge bewegt sich hin und her
    if (style === '1') {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
        <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
        </linearGradient>
        <style>
        .eye-pupil {
            animation: lookAround 3s ease-in-out infinite;
        }
        @keyframes lookAround {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        </style>
        </defs>

        <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
        <rect x="2" y="2" width="${width - 4}" height="24" rx="12" fill="url(#grad)" opacity="0.1"/>

        <g transform="translate(12, 9)">
        <ellipse cx="5" cy="5" rx="6" ry="4" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
        <circle class="eye-pupil" cx="5" cy="5" r="2" fill="${accentColor}"/>
        </g>

        <text x="28" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">Profile Views</text>
        <text x="${width - 15}" y="18" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="bold" fill="${accentColor}">${countStr}</text>
        </svg>
        `;
    }

    // Style 2: Pulsierender Glow-Effekt
    if (style === '2') {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
        <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.8" />
        <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
        </feMerge>
        </filter>
        <style>
        .glow-badge {
            animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
        }
        </style>
        </defs>

        <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
        <rect class="glow-badge" x="2" y="2" width="${width - 4}" height="24" rx="12" fill="url(#grad)" opacity="0.1" filter="url(#glow)"/>

        <g transform="translate(12, 9)">
        <ellipse cx="5" cy="5" rx="6" ry="4" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
        <circle cx="5" cy="5" r="2" fill="${accentColor}"/>
        </g>

        <text x="28" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">Profile Views</text>
        <text x="${width - 15}" y="18" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="bold" fill="${accentColor}" filter="url(#glow)">${countStr}</text>
        </svg>
        `;
    }

    // Style 3: Welleneffekt
    if (style === '3') {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
        <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.8">
        <animate attributeName="offset" values="0;1;0" dur="3s" repeatCount="indefinite" />
        </stop>
        <stop offset="50%" style="stop-color:#9d7cd8;stop-opacity:1">
        <animate attributeName="offset" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0.8">
        <animate attributeName="offset" values="1;0;1" dur="3s" repeatCount="indefinite" />
        </stop>
        </linearGradient>
        </defs>

        <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
        <rect x="2" y="2" width="${width - 4}" height="24" rx="12" fill="url(#grad)" opacity="0.2"/>

        <g transform="translate(12, 9)">
        <ellipse cx="5" cy="5" rx="6" ry="4" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
        <circle cx="5" cy="5" r="2" fill="${accentColor}"/>
        </g>

        <text x="28" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">Profile Views</text>
        <text x="${width - 15}" y="18" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="bold" fill="${accentColor}">${countStr}</text>
        </svg>
        `;
    }

    // Style 4: 3D-Effekt mit Schatten
    if (style === '4') {
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="32" viewBox="0 0 ${width} 32">
        <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:${accentColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:#5a7fc7;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="0" dy="3" result="offsetblur"/>
        <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
        </feComponentTransfer>
        <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
        </feMerge>
        </filter>
        <style>
        .badge-3d {
            animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-2px); }
        }
        </style>
        </defs>

        <g class="badge-3d" filter="url(#shadow)">
        <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
        <rect x="2" y="2" width="${width - 4}" height="24" rx="12" fill="url(#grad)" opacity="0.15"/>
        <rect x="2" y="2" width="${width - 4}" height="2" rx="12" fill="white" opacity="0.2"/>

        <g transform="translate(12, 9)">
        <ellipse cx="5" cy="5" rx="6" ry="4" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
        <circle cx="5" cy="5" r="2" fill="${accentColor}"/>
        </g>

        <text x="28" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">Profile Views</text>
        <text x="${width - 15}" y="18" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="bold" fill="${accentColor}">${countStr}</text>
        </g>
        </svg>
        `;
    }

    // Default (wie vorher)
    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="28" viewBox="0 0 ${width} 28">
    <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:${accentColor};stop-opacity:0.8" />
    <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
    </linearGradient>
    </defs>

    <rect width="${width}" height="28" rx="14" fill="${bgColor}"/>
    <rect x="2" y="2" width="${width - 4}" height="24" rx="12" fill="url(#grad)" opacity="0.1"/>

    <g transform="translate(12, 9)">
    <ellipse cx="5" cy="5" rx="6" ry="4" fill="none" stroke="${accentColor}" stroke-width="1.5"/>
    <circle cx="5" cy="5" r="2" fill="${accentColor}"/>
    </g>

    <text x="28" y="18" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="${textColor}">Profile Views</text>
    <text x="${width - 15}" y="18" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="bold" fill="${accentColor}">${countStr}</text>
    </svg>
    `;
}
