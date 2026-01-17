# Profile Viewer 👁️

A simple, self-hosted GitHub profile view counter with Redis backend.

![Profile Views](https://profile-viewer-nu.vercel.app/api/views?username=QG1o&t=${Date.now()})

## Features

- 🚀 Serverless deployment on Vercel
- 📊 View counter with Upstash Redis
- 🎨 SVG badge generation
- 🔒 Privacy-friendly (no personal data stored)
- ⚡ Fast and lightweight

## Demo

Add to your GitHub profile:
```markdown
![Profile Views](https://your-deployment.vercel.app/api/views?username=YourUsername)
```

## Setup

### 1. Fork & Clone
```bash
git clone https://github.com/YourUsername/profile-viewer.git
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
```

4. Deploy!

### 4. Use in Your Profile

Replace `your-deployment.vercel.app` with your Vercel domain:
```markdown
![Profile Views](https://your-deployment.vercel.app/api/views?username=YourUsername)
```

## API

### `GET /api/views`

**Parameters:**
- `username` (required) - GitHub username to track

**Example:**
```
https://your-deployment.vercel.app/api/views?username=QG1o
```

Returns an SVG badge with the view count.

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

Made with ❤️ by [QG1o](https://github.com/QG1o)
