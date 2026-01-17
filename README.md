# ⚡ Profile Viewer

Self-hosted GitHub profile view counter and animated SVG generators powered by Vercel + Upstash Redis.

![Profile Views](https://profile-viewer-nu.vercel.app/api/views?username=QG1o&style=1)

## ✨ Features

- 📊 **Profile View Counter** - Track profile visits with animated badge
- 🌊 **Animated Header Waves** - Dynamic wave SVG for profile headers
- 🌊 **Animated Footer Waves** - Smooth wave animation for profile footers
- ⚡ **Serverless** - Built with Vercel Functions
- 🔒 **Privacy-friendly** - Only stores anonymous view counts
- 🎨 **Customizable** - Multiple styles and color options

## 🚀 Quick Start

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/QG1o/profile-viewer&env=UPSTASH_REDIS_REST_URL,UPSTASH_REDIS_REST_TOKEN)

1. Click the button above
2. Set up your [Upstash Redis](https://console.upstash.com/) database (free tier available)
3. Add environment variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Deploy!

### Manual Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/QG1o/profile-viewer.git
   cd profile-viewer
   ```

2. **Set up Upstash Redis**
   - Create a free account at [Upstash](https://console.upstash.com/)
   - Create a new Redis database
   - Copy the REST URL and TOKEN

3. **Deploy to Vercel**
   - Import the repo to Vercel
   - Add environment variables
   - Deploy!

## 📖 API Endpoints

### Profile View Counter

```markdown
![Profile Views](https://your-deployment.vercel.app/api/views?username=YOUR_USERNAME&style=1)
```

**Parameters:**
- `username` (required) - GitHub username to track
- `style` (optional) - Badge style (default: 1)

**Styles:**
- `1` - Animated eye (default)
- `2` - Pulsing glow
- `3` - Wave effect
- `4` - 3D shadow

### Header Wave

```markdown
![Header](https://your-deployment.vercel.app/api/header?color=672FAE&height=200&text=Welcome)
```

**Parameters:**
- `color` (optional) - Hex color without # (default: 672FAE)
- `height` (optional) - Height in pixels (default: 200)
- `text` (optional) - Text to display
- `fontSize` (optional) - Font size (default: 48)
- `fontColor` (optional) - Text color hex (default: FFFFFF)

### Footer Wave

```markdown
![Footer](https://your-deployment.vercel.app/api/footer?color=672FAE&height=120)
```

**Parameters:**
- `color` (optional) - Hex color without # (default: 672FAE)
- `height` (optional) - Height in pixels (default: 120)
- `text` (optional) - Text to display
- `fontSize` (optional) - Font size (default: 30)
- `fontColor` (optional) - Text color hex (default: 87CEFA)

## 🔧 Environment Variables

Create these in your Vercel project settings:

```env
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

## 📁 Project Structure

```
profile-viewer/
├── api/
│   ├── views.js      # View counter endpoint
│   ├── header.js     # Header wave generator
│   └── footer.js     # Footer wave generator
├── .env.example      # Environment variables template
├── package.json      # Project configuration
├── vercel.json       # Vercel configuration
└── README.md         # Documentation
```

## 💡 Usage Examples

### In your GitHub Profile README

```markdown
<!-- Profile Views -->
![Profile Views](https://your-deployment.vercel.app/api/views?username=YourUsername&style=1)

<!-- Header -->
![Header](https://your-deployment.vercel.app/api/header?color=672FAE&height=200)

<!-- Footer -->
![Footer](https://your-deployment.vercel.app/api/footer?color=672FAE&height=120)
```

### Customization

```markdown
<!-- Custom colors -->
![Header](https://your-deployment.vercel.app/api/header?color=FF6B6B&height=250&text=Hello%20World&fontColor=FFFFFF)

<!-- Different badge style -->
![Views](https://your-deployment.vercel.app/api/views?username=YourUsername&style=3)
```

## 🛠️ Tech Stack

- **Runtime:** Node.js (Vercel Serverless Functions)
- **Database:** Upstash Redis
- **Deployment:** Vercel
- **Language:** JavaScript (ESM)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Inspired by various GitHub profile enhancement tools
- Built with ❤️ for the developer community

## 📬 Contact

- GitHub: [@QG1o](https://github.com/QG1o)
- Matrix: [@qg1o:matrix.org](https://matrix.to/#/@qg1o:matrix.org)

---

**Made with ⚡ by [QG1o](https://github.com/QG1o)**

If you find this useful, consider giving it a ⭐!
