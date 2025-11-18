# 🐳 Docker Deployment Guide

## Activation Code Admin Dashboard

A Monet-inspired admin dashboard for managing activation codes with full i18n support.

---

# Docker Deployment Guide

## Quick Start

### Build and Run Locally

```bash
# Build the image
docker build -t activation-code-admin:latest .

# Run the container
docker run -d -p 8080:80 --name admin-dashboard activation-code-admin:latest

# Access at http://localhost:8080
```

### Using Docker Compose

```bash
# Start the service
docker-compose up -d

# Stop the service
docker-compose down

# View logs
docker-compose logs -f
```

## Deploy to Cloud VM

### Method 1: Build on VM

```bash
# 1. Copy files to VM
scp -r . user@your-vm-ip:~/admin-dashboard/

# 2. SSH into VM
ssh user@your-vm-ip

# 3. Build and run
cd ~/admin-dashboard
docker build -t activation-code-admin:latest .
docker run -d -p 80:80 --restart always --name admin-dashboard activation-code-admin:latest
```

### Method 2: Transfer Image

```bash
# 1. Build locally
docker build -t activation-code-admin:latest .

# 2. Save image
docker save activation-code-admin:latest | gzip > admin-dashboard.tar.gz

# 3. Transfer to VM
scp admin-dashboard.tar.gz user@your-vm-ip:~/

# 4. SSH into VM and load
ssh user@your-vm-ip
docker load < admin-dashboard.tar.gz
docker run -d -p 80:80 --restart always --name admin-dashboard activation-code-admin:latest
```

### Method 3: Using Docker Registry

```bash
# 1. Tag image
docker tag activation-code-admin:latest your-registry/activation-code-admin:latest

# 2. Push to registry
docker push your-registry/activation-code-admin:latest

# 3. On VM, pull and run
docker pull your-registry/activation-code-admin:latest
docker run -d -p 80:80 --restart always --name admin-dashboard your-registry/activation-code-admin:latest
```

## Environment Configuration

### Custom Port

```bash
docker run -d -p 3000:80 --name admin-dashboard activation-code-admin:latest
```

### With SSL (using reverse proxy)

```bash
# Run on internal port
docker run -d -p 127.0.0.1:8080:80 --name admin-dashboard activation-code-admin:latest

# Configure nginx/caddy as reverse proxy with SSL
```

## Useful Commands

```bash
# View logs
docker logs -f admin-dashboard

# Stop container
docker stop admin-dashboard

# Start container
docker start admin-dashboard

# Remove container
docker rm -f admin-dashboard

# Update deployment
docker pull your-registry/activation-code-admin:latest
docker stop admin-dashboard
docker rm admin-dashboard
docker run -d -p 80:80 --restart always --name admin-dashboard your-registry/activation-code-admin:latest
```

## Production Recommendations

1. **Use HTTPS**: Set up SSL certificate with Let's Encrypt
2. **Firewall**: Configure firewall to allow only necessary ports
3. **Monitoring**: Set up container health checks and monitoring
4. **Backups**: Regular backups of any persistent data
5. **Updates**: Keep base images updated for security patches

## Troubleshooting

### Container won't start
```bash
docker logs admin-dashboard
```

### Port already in use
```bash
# Use different port
docker run -d -p 8081:80 --name admin-dashboard activation-code-admin:latest
```

### Permission issues
```bash
# Run with sudo or add user to docker group
sudo usermod -aG docker $USER
```
