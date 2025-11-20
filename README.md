# Activation Code Admin Dashboard

A beautiful Monet-inspired admin dashboard for managing activation codes, built with React, TypeScript, and featuring full internationalization support (English & Chinese).

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Features

- 🎨 **Monet-Inspired Design** - Soft, impressionist color palette with dreamy gradients
- 🌍 **i18n Support** - Full Chinese and English translations with flag-based language switcher
- 📊 **Bulk Operations** - Create up to 20,000 codes at once
- 🔍 **Search & Filter** - Real-time search across activation codes
- 📄 **Pagination** - Efficient handling with skip token pagination
- ✏️ **Code Management** - Create and delete activation codes
- 🔐 **Authentication** - JWT-based secure login with password change support
- 📈 **Statistics Dashboard** - Real-time stats for total, used, unused, and active codes
- 🐳 **Docker Ready** - One-command deployment with Docker
- 🔌 **API Integration** - Full integration with Activation Code API

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

Create a `.env` file in the project root:

```bash
# API Base URL (default: https://api.lovetest.com.cn)
VITE_API_BASE_URL=https://api.lovetest.com.cn
```

The application connects to the Activation Code API. See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for full API details.

### API Integration

This admin dashboard integrates with the following API endpoints:

- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/change-password` - Change admin password
- `POST /api/admin/generate-codes` - Generate activation codes (1-20,000)
- `GET /api/admin/codes` - List codes with pagination
- `GET /api/admin/stats` - Get statistics
- `DELETE /api/admin/codes/{code}` - Delete specific code
- `DELETE /api/admin/codes/expired` - Delete all expired codes

All admin endpoints (except login) require JWT authentication.

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

## Default Credentials

The default admin credentials are set on the backend API:
- **Username**: admin
- **Password**: admin

**Important**: Change the default password immediately after first login using the "Change Password" feature in the dashboard.

## Support

For issues and questions, please open an issue on GitHub.
