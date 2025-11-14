# ⚡ Quick Deployment Guide

**Fastest way to deploy jiilanporto to your VPS**

## 🎯 Prerequisites
- VPS with Ubuntu 20.04+
- Domain `jiilan.thecodesorcerer.com` pointing to VPS IP
- SSH access to VPS

---

## 🚀 Deploy in 5 Minutes

### 1️⃣ Connect to VPS
```bash
ssh root@your-vps-ip
```

### 2️⃣ Run Auto-Setup (Copy-Paste This!)
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 & Nginx
sudo npm install -g pm2
sudo apt install -y nginx certbot python3-certbot-nginx

# Setup PM2 startup
pm2 startup
# Run the command it outputs

# Create project directory
cd /var/www
sudo mkdir -p jiilanporto
sudo chown -R $USER:$USER jiilanporto
cd jiilanporto

# Clone project
git clone https://github.com/JiilanTj/jiilanporto.git .

# Setup environment
cat > .env << 'EOL'
DATABASE_URL="file:./dev.db"
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://jiilan.thecodesorcerer.com
EOL

# Install & Build
npm ci --production=false
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run build

# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
```

### 3️⃣ Configure Nginx
```bash
sudo tee /etc/nginx/sites-available/jiilanporto > /dev/null << 'EOL'
server {
    listen 80;
    server_name jiilan.thecodesorcerer.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOL

# Enable site
sudo ln -s /etc/nginx/sites-available/jiilanporto /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 4️⃣ Setup SSL (Free HTTPS)
```bash
sudo certbot --nginx -d jiilan.thecodesorcerer.com
# Follow prompts: enter email, agree to terms, choose redirect (option 2)
```

### 5️⃣ Setup Firewall
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable
```

---

## ✅ Done! Visit Your Site

🌐 **Website**: https://jiilan.thecodesorcerer.com  
🔐 **Admin**: https://jiilan.thecodesorcerer.com/admin

**Default Login:**
- Username: `admin`
- Password: `jiilan2024`

---

## 🔄 Deploy Updates

```bash
cd /var/www/jiilanporto
./deploy.sh
```

Or manually:
```bash
git pull origin main
npm ci --production=false
npx prisma migrate deploy
npm run build
pm2 restart jiilanporto
```

---

## 🛠️ Useful Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs jiilanporto

# Restart app
pm2 restart jiilanporto

# Monitor
pm2 monit
```

---

## 🆘 Troubleshooting

**App not starting?**
```bash
pm2 logs jiilanporto --lines 50
```

**Nginx error?**
```bash
sudo nginx -t
sudo systemctl status nginx
```

**Port 3000 busy?**
```bash
sudo lsof -i :3000
sudo kill -9 <PID>
pm2 restart jiilanporto
```

---

For detailed documentation, see **DEPLOYMENT.md**
