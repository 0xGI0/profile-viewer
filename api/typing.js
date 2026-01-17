// api/typing.js
export default function handler(req, res) {
    const {
        lines = 'Web Developer;IT-Admin;Security Hobbyist',
        font = 'Fira Code',
        size = '30',
        color = '672FAE',
        width = '1300',
        height = '100',
        weight = '900',
        letterSpacing = '0.35em',
        pause = '1000',
        duration = '5000'
    } = req.query;

    const textLines = decodeURIComponent(lines).split(';');
    const w = parseInt(width);
    const h = parseInt(height);
    const fontSize = parseInt(size);
    const pauseMs = parseInt(pause);
    const durationMs = parseInt(duration);

    // Calculate total animation duration
    const totalDuration = textLines.reduce((sum, line) => {
        return sum + (line.length * 100) + pauseMs + 500; // 100ms per char + pause + delete time
    }, 0);

    // Generate typing keyframes for each line
    let keyframes = '';
    let timePercent = 0;

    textLines.forEach((line, lineIndex) => {
        // Type out the line
        for (let i = 0; i <= line.length; i++) {
            const text = line.substring(0, i);
            keyframes += `${timePercent.toFixed(2)}% { content: "${text}"; }\n`;
            timePercent += ((100 / totalDuration) * 100);
        }

        // Pause
        timePercent += ((pauseMs / totalDuration) * 100);
        keyframes += `${timePercent.toFixed(2)}% { content: "${line}"; }\n`;

        // Delete (faster)
        for (let i = line.length - 1; i >= 0; i--) {
            const text = line.substring(0, i);
            keyframes += `${timePercent.toFixed(2)}% { content: "${text}"; }\n`;
            timePercent += ((50 / totalDuration) * 100);
        }
    });

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@${weight}&amp;display=swap');

    .typing::after {
        content: "";
        animation: type ${(totalDuration / 1000).toFixed(1)}s steps(1) infinite;
    }

    @keyframes type {
        ${keyframes}
    }

    .cursor {
        animation: blink 0.7s step-end infinite;
    }

    @keyframes blink {
        50% { opacity: 0; }
    }

    text {
        font-family: '${font}', monospace;
        font-size: ${fontSize}px;
        font-weight: ${weight};
        fill: #${color};
        letter-spacing: ${letterSpacing};
    }
    </style>
    </defs>

    <rect width="${w}" height="${h}" fill="transparent"/>

    <text class="typing" x="${w/2}" y="${h/2 + fontSize/3}" text-anchor="middle"></text>
    <text class="cursor" x="${w/2 + 5}" y="${h/2 + fontSize/3}">|</text>
    </svg>
    `;

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate');
    res.status(200).send(svg);
}
