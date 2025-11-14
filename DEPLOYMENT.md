# 🚀 Deployment Guide - jiilanporto

Complete guide untuk deploy portfolio website ke VPS dengan domain `jiilan.thecodesorcerer.com`

## 📋 Prerequisites

### Di Local Machine:
- Git configured dengan GitHub account
- SSH access ke VPS

### Di VPS Kamu:
- Ubuntu 20.04+ atau Debian-based Linux
- Root atau sudo access
- Domain `jiilan.thecodesorcerer.com` sudah pointing ke VPS IP

---

## 🔧 Step 1: Setup VPS (First Time Only)

### 1.1 Login ke VPS
```bash
ssh root@your-vps-ip
# atau
ssh your-username@your-vps-ip
```

### 1.2 Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.3 Install Node.js (v20 LTS)
```bash
# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### 1.4 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2

# Setup PM2 to start on boot
pm2 startup
# Follow the command it gives you (usually starts with 'sudo env...')
```

### 1.5 Install Nginx
```bash
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 1.6 Install Certbot (SSL Certificate)
```bash
sudo apt install -y certbot python3-certbot-nginx
```

---

## 📦 Step 2: Clone & Setup Project

### 2.1 Create Directory
```bash
cd /var/www
sudo mkdir -p jiilanporto
sudo chown -R $USER:$USER jiilanporto
cd jiilanporto
```

### 2.2 Clone Repository
```bash
git clone https://github.com/JiilanTj/jiilanporto.git .
```

### 2.3 Create Environment File
```bash
cp .env.production .env
nano .env
```

Update the `.env` file:
```env
DATABASE_URL="file:./dev.db"
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://jiilan.thecodesorcerer.com
```

### 2.4 Install Dependencies
```bash
npm ci --production=false
```

### 2.5 Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (creates admin user & sample projects)
npx prisma db seed
```

### 2.6 Build Application
```bash
npm run build
```

### 2.7 Create Logs Directory
```bash
mkdir -p logs
```

### 2.8 Start with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 list
```

---

## 🌐 Step 3: Configure Nginx

### 3.1 Create Nginx Config
```bash
sudo nano /etc/nginx/sites-available/jiilanporto
```

Paste this configuration:
```nginx
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
```

### 3.2 Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/jiilanporto /etc/nginx/sites-enabled/
```

### 3.3 Test & Restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔒 Step 4: Setup SSL Certificate

### 4.1 Get SSL Certificate
```bash
sudo certbot --nginx -d jiilan.thecodesorcerer.com
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose to redirect HTTP to HTTPS (option 2)

### 4.2 Test Auto-Renewal
```bash
sudo certbot renew --dry-run
```

---

## ✅ Step 5: Verify Deployment

### 5.1 Check PM2 Status
```bash
pm2 status
pm2 logs jiilanporto --lines 50
```

### 5.2 Check Nginx Status
```bash
sudo systemctl status nginx
```

### 5.3 Test Website
Open browser and visit:
- `https://jiilan.thecodesorcerer.com` - Should load your portfolio
- `https://jiilan.thecodesorcerer.com/admin` - Admin login page

**Default Admin Credentials:**
- Username: `admin`
- Password: `jiilan2024`

**⚠️ IMPORTANT: Change admin password after first login!**

---

## 🔄 Step 6: Future Deployments

### 6.1 Push Changes to GitHub
```bash
# On your local machine
git add .
git commit -m "Your changes"
git push origin main
```

### 6.2 Deploy to VPS
```bash
# On your VPS
cd /var/www/jiilanporto
./deploy.sh
```

The `deploy.sh` script automatically:
- Pulls latest code
- Installs dependencies
- Runs migrations
- Builds the app
- Restarts PM2

### Alternative: Manual Deployment
```bash
cd /var/www/jiilanporto
git pull origin main
npm ci --production=false
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart jiilanporto
```

---

## 🛠️ Troubleshooting

### Check Application Logs
```bash
pm2 logs jiilanporto
pm2 logs jiilanporto --err  # Only errors
```

### Check Nginx Logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Restart Everything
```bash
pm2 restart jiilanporto
sudo systemctl restart nginx
```

### Database Issues
```bash
# Reset database (⚠️ deletes all data!)
cd /var/www/jiilanporto
npx prisma migrate reset --force
npx prisma db seed
```

### Port Already in Use
```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

### Nginx Config Issues
```bash
# Test config
sudo nginx -t

# Check syntax
sudo nginx -T
```

---

## 🔐 Security Best Practices

### 1. Change Admin Password
After first deployment, login and change the default password through the admin panel or update directly in database.

### 2. Setup Firewall
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 3. Keep System Updated
```bash
sudo apt update && sudo apt upgrade -y
```

### 4. Monitor PM2 Processes
```bash
pm2 monit
```

### 5. Setup Automated Backups
```bash
# Backup database
cp /var/www/jiilanporto/prisma/dev.db ~/backups/dev.db.$(date +%Y%m%d)
```

---

## 📊 Performance Optimization

### Enable Gzip Compression
Add to Nginx config:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### PM2 Cluster Mode (Optional)
For better performance:
```bash
pm2 delete jiilanporto
pm2 start ecosystem.config.js --instances max
pm2 save
```

---

## 🎯 Quick Commands Reference

```bash
# Start app
pm2 start ecosystem.config.js

# Stop app
pm2 stop jiilanporto

# Restart app
pm2 restart jiilanporto

# View logs
pm2 logs jiilanporto

# Monitor
pm2 monit

# Deploy updates
./deploy.sh
```

---

## 📝 Important Files & Locations

```
/var/www/jiilanporto/          # Project root
├── .env                        # Environment variables
├── ecosystem.config.js         # PM2 config
├── deploy.sh                   # Deployment script
├── prisma/dev.db              # SQLite database
└── logs/                       # Application logs

/etc/nginx/sites-available/jiilanporto  # Nginx config
/var/log/nginx/                          # Nginx logs
```

---

## 🆘 Need Help?

- Check PM2 logs: `pm2 logs jiilanporto`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Restart services: `pm2 restart jiilanporto && sudo systemctl restart nginx`
- Discord/Slack support: [Add your support channel]

---

## 🎉 Success!

Your portfolio should now be live at:
**https://jiilan.thecodesorcerer.com**

Admin panel:
**https://jiilan.thecodesorcerer.com/admin**

---

**Built with chaos and caffeine** ☕💀
