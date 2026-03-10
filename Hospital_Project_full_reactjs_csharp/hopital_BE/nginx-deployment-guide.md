# Hướng dẫn Cài đặt và Cấu hình Nginx với HTTPS và Domain

## 1. Cài đặt Docker và Docker Compose

Đảm bảo Docker và Docker Compose đã được cài đặt trên server.

## 2. Cấu hình Docker Compose

Tạo file `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'  
      - '81:81'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    environment:
      - TZ=Asia/Ho_Chi_Minh
    networks:
      - npm_network

  frontend-server:
    image: 'nginx:alpine'
    restart: unless-stopped
    volumes:
      - /var/www/hospital-react-app:/usr/share/nginx/html:ro
      - /var/www/nginx-config/nginx.conf:/etc/nginx/conf.d/default.conf:ro
    networks:
      - npm_network

networks:
  npm_network:
    driver: bridge
```

## 3. Cấu hình Nginx cho Frontend

1. Tạo thư mục và file cấu hình:
```bash
sudo mkdir -p /var/www/nginx-config
sudo nano /var/www/nginx-config/nginx.conf
```

2. Thêm nội dung vào `nginx.conf`:
```nginx
server {
    listen 80 default_server;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;

    # Disable content size matching and buffering
    proxy_buffering off;
    proxy_buffer_size 128k;
    proxy_buffers 4 256k;
    proxy_busy_buffers_size 256k;

    # Increase timeouts
    proxy_connect_timeout 600;
    proxy_send_timeout 600;
    proxy_read_timeout 600;
    send_timeout 600;

    location / {
        try_files $uri $uri/ /index.html;
        
        # Disable caching for HTML files
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        
        # Fix content matching issues
        proxy_max_temp_file_size 0;
        proxy_buffering off;
    }

    # Static files handling
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
        access_log off;
        
        # Disable content size matching for static files
        proxy_buffering off;
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";

    # Increase client body size if needed
    client_max_body_size 20M;
}
```

3. Set permissions:
```bash
sudo chmod 644 /var/www/nginx-config/nginx.conf
```

## 4. Cấu hình Nginx Proxy Manager

1. Truy cập Nginx Proxy Manager:
   - URL: http://your-server-ip:81
   - Default login:
     - Email: admin@example.com
     - Password: changeme

2. Cấu hình cho Frontend (demoproject.software):
   - Add new Proxy Host
   - Domain Names: demoproject.software
   - Scheme: http
   - Forward Hostname/IP: frontend-server
   - Forward Port: 80
   - SSL Tab:
     - Request new SSL Certificate
     - Force SSL
     - HTTP/2 Support
     - Agree to Let's Encrypt Terms

3. Cấu hình cho Backend API (api.demoproject.software):
   - Add new Proxy Host
   - Domain Names: api.demoproject.software
   - Scheme: http
   - Forward Hostname/IP: your-server-ip
   - Forward Port: 8080 (hoặc port backend của bạn)
   - SSL Tab:
     - Request new SSL Certificate
     - Force SSL
     - HTTP/2 Support
   - Advanced Tab:
     - Websockets Support
     - Block Common Exploits
     - Custom headers:
       ```
       Access-Control-Allow-Origin: https://demoproject.software
       Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
       Access-Control-Allow-Headers: Content-Type, Authorization
       Access-Control-Allow-Credentials: true
       ```

## 5. Deploy Frontend

1. Build React app:
```bash
npm run build
```

2. Copy build files:
```bash
sudo mkdir -p /var/www/hospital-react-app
sudo cp -r build/* /var/www/hospital-react-app/
```

3. Set permissions:
```bash
sudo chown -R www-data:www-data /var/www/hospital-react-app
sudo chmod -R 755 /var/www/hospital-react-app
```

## 6. Khởi động Services

```bash
docker-compose up -d
```

## 7. Kiểm tra DNS

Đảm bảo DNS records đã được cấu hình đúng:
- A record cho demoproject.software trỏ đến IP server
- A record cho api.demoproject.software trỏ đến IP server

## 8. Kiểm tra hoạt động

1. Frontend: https://demoproject.software
2. Backend API: https://api.demoproject.software
3. Swagger UI: https://api.demoproject.software/swagger

## Xử lý sự cố

1. Nếu nội dung index.html bị matching sai:
   - Kiểm tra nginx.conf đã được cấu hình đúng
   - Restart frontend container
   ```bash
   docker-compose restart frontend-server
   ```

2. Nếu SSL không hoạt động:
   - Kiểm tra DNS propagation
   - Đảm bảo ports 80 và 443 đã mở
   - Kiểm tra logs của Nginx Proxy Manager

3. Nếu API không hoạt động:
   - Kiểm tra backend service đang chạy
   - Kiểm tra port forwarding
   - Kiểm tra CORS configuration 