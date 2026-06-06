# Profile Viewer 👁️

A simple, self-hosted GitHub profile view counter with a Redis backend.
Locked to a single username and available in two display modes.

![Profile Views](https://profile-viewer-nu.vercel.app/api/views?username=0xGI0&icon=ring)
![Profile Views](https://profile-viewer-nu.vercel.app/api/views?username=0xGI0&mode=symbols)


## Features

- 🚀 Serverless deployment on Vercel
- 📊 View counter with Upstash Redis
- 🎨 SVG badge generation
- 🔒 Locked to a single username (no arbitrary usernames)
- 🔮 Two display modes: a plain counter or random symbols
- 🛡️ Privacy-friendly (no personal data stored)
- ⚡ Fast and lightweight

## Modes

This badge supports exactly two modes, selected via the `mode` query parameter:

| Mode | Parameter | What it shows |
|------|-----------|---------------|
| **Counter** | `mode=counter` (default) | The real view count as a number |
| **Symbols** | `mode=symbols` | Random glitch / geometric / Greek / math symbols, freshly generated on every load |

In **both** modes the real view count is tracked in the background — the symbol
mode simply hides the number behind random symbols.

```markdown
<!-- Normal counter -->
![Profile Views](https://your-deployment.vercel.app/api/views?username=your-github-username)

<!-- Random symbols on every load -->
![Profile Views](https://your-deployment.vercel.app/api/views?username=your-github-username&mode=symbols)
```

### Animated icon

The animated icon left of the label can be switched with the `icon` parameter
(works in both modes):

| Icon | Parameter | Look |
|------|-----------|------|
| **Rainbow eye** | `icon=eye` (default) | An eye whose colour cycles through the rainbow; the pupil looks around |
| **Spinning ring** | `icon=ring` | A rainbow ring that spins like a loader |

```markdown
<!-- Counter with the spinning rainbow ring -->
![Profile Views](https://your-deployment.vercel.app/api/views?username=your-github-username&icon=ring)

<!-- Symbols mode with the spinning ring -->
![Profile Views](https://your-deployment.vercel.app/api/views?username=your-github-username&mode=symbols&icon=ring)
```

### Colour effect on the value

The number / symbols can be coloured with the `effect` parameter (works in both
modes):

| Effect | Parameter | Look |
|--------|-----------|------|
| **Plain** | `effect=none` (default) | Static blue accent colour |
| **Rainbow** | `effect=rainbow` | The value cycles through the rainbow (animated) |
| **Terminal** | `effect=terminal` | Terminal-green value with a blinking block cursor (animated) |

```markdown
<!-- Animated rainbow number -->
![Profile Views](https://your-deployment.vercel.app/api/views?username=your-github-username&effect=rainbow)

<!-- Terminal-green value with a blinking cursor on the symbols -->
![Profile Views](https://your-deployment.vercel.app/api/views?username=your-github-username&mode=symbols&effect=terminal)
```

## Username lock

The counter only responds to **one** username. Any other value of `username`
returns an `Access denied` badge instead of a counter.

The allowed username is read from the `ALLOWED_USERNAME` environment variable.
Set it to your own GitHub username in your Vercel project settings — no code
change required. The match is case-insensitive.

## Setup

### 1. Fork & Clone
```bash
git clone https://github.com/your-github-username/profile-viewer.git
cd profile-viewer
```

### 2. Get Upstash Redis Credentials

1. Create a free account at [Upstash](https://console.upstash.com/)
2. Create a new Redis database
3. Copy your credentials

### 3. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above
2. Select your forked repository
3. Add environment variables:
```env
UPSTASH_REDIS_REST_URL=your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
ALLOWED_USERNAME=your-github-username
```

4. Deploy!

### 4. Use in Your Profile

Replace `profile-viewer-nu.vercel.app` with your own Vercel domain and use
your allowed username:
```markdown
![Profile Views](https://your-deployment.vercel.app/api/views?username=your-github-username)
```

## API

### `GET /api/views`

**Parameters:**

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `username` | ✅ | – | Must match `ALLOWED_USERNAME`, otherwise an `Access denied` badge is returned |
| `mode` | ❌ | `counter` | `counter` for the number, `symbols` for random symbols |
| `icon` | ❌ | `eye` | `eye` for the rainbow eye, `ring` for the spinning rainbow ring |
| `effect` | ❌ | `none` | Colour effect on the value: `none`, `rainbow` (animated) or `terminal` (green value + blinking cursor) |

**Examples:**
```
https://your-deployment.vercel.app/api/views?username=your-github-username
https://your-deployment.vercel.app/api/views?username=your-github-username&mode=symbols
https://your-deployment.vercel.app/api/views?username=your-github-username&icon=ring
https://your-deployment.vercel.app/api/views?username=your-github-username&mode=symbols&icon=ring
https://your-deployment.vercel.app/api/views?username=your-github-username&effect=rainbow
https://your-deployment.vercel.app/api/views?username=your-github-username&mode=symbols&effect=terminal
```

Returns an SVG badge.

## Privacy

This counter:
- ✅ Only stores an anonymous count
- ✅ No IP addresses logged
- ✅ No personal data collected
- ✅ GDPR compliant

## Tech Stack

- [Vercel Functions](https://vercel.com/docs/functions) - Serverless API
- [Upstash Redis](https://upstash.com/) - Data storage
- SVG - Badge generation

## License

MIT License - see [LICENSE](LICENSE) file

## Contributing

Contributions welcome! Feel free to open issues or pull requests.

---

Made with ❤️ by [0xGI0](https://github.com/0xGI0)
