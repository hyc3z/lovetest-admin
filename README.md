# Activation Code Admin Dashboard

A beautiful Monet-inspired admin dashboard for managing activation codes, built with React, TypeScript, and featuring full internationalization support (English & Chinese).

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Features

- 🎨 **Monet-Inspired Design** - Soft, impressionist color palette with dreamy gradients
- 🌍 **i18n Support** - Full Chinese and English translations with flag-based language switcher
- 📊 **Bulk Operations** - Create thousands of codes at once, multi-select delete
- 🔍 **Search & Filter** - Real-time search across codes, users, and statuses
- 📄 **Pagination** - Efficient handling of 20,000+ records with 100 items per page
- ✏️ **CRUD Operations** - Create, read, update, and delete activation codes
- 🔐 **Authentication** - Secure login system (demo: admin/admin123)
- 🐳 **Docker Ready** - One-command deployment with Docker

## Quick Start

### Using Docker (Recommended)

```bash
# Pull from Docker Hub
docker pull YOUR_USERNAME/activation-code-admin:latest

# Run the container
docker run -d -p 8080:80 YOUR_USERNAME/activation-code-admin:latest

# Access at http://localhost:8080
```

### Using Docker Compose

```bash
docker-compose up -d
```

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deployment

### Automated CI/CD

Every push to `main` branch automatically:
1. Builds a new Docker image
2. Pushes to Docker Hub with tags:
   - `latest` (for main branch)
   - `<branch-name>` (for feature branches)
   - `<version>` (for tagged releases)

### Manual Deployment

See [Docker Deployment Guide](./README.docker.md) for detailed instructions.

## Configuration

### GitHub Secrets

Required secrets for CI/CD:
- `DOCKERHUB_USERNAME` - Your Docker Hub username
- `DOCKERHUB_TOKEN` - Your Docker Hub access token

### Environment Variables

Currently using demo data. To connect to a real backend:
1. Update API endpoints in `src/components/Dashboard.tsx`
2. Replace authentication logic in `src/App.tsx`
3. Add environment variables for API URLs

## Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Login.tsx       # Login page
│   │   ├── Dashboard.tsx   # Main dashboard
│   │   ├── CodeList.tsx    # Code table with pagination
│   │   ├── CodeEditor.tsx  # Create/Edit form
│   │   └── LanguageSwitcher.tsx
│   ├── i18n/               # Internationalization
│   │   ├── translations.ts # EN/ZH translations
│   │   └── LanguageContext.tsx
│   └── types.ts            # TypeScript types
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Docker Compose config
├── nginx.conf             # Nginx configuration
└── .github/workflows/     # CI/CD pipelines
```

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Custom CSS with Monet-inspired gradients
- **i18n**: Custom context-based solution
- **Deployment**: Docker + Nginx
- **CI/CD**: GitHub Actions

## Screenshots

### Login Page
Monet-inspired gradient background with floating animations

### Dashboard
- Soft pastel colors
- Gradient buttons and badges
- Frosted glass effects
- Smooth transitions

### Features
- Multi-language support (🇺🇸 English / 🇨🇳 中文)
- Bulk operations
- Real-time search
- Responsive pagination

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Demo Credentials

- **Username**: admin
- **Password**: admin123

## Support

For issues and questions, please open an issue on GitHub.
