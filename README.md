# 🌐 jasperhdeen.com

Personal website built with GitHub Pages.

## 🚀 Setup

This site is configured to work with GitHub Pages and the custom domain `jasperhdeen.com`.

## 📁 Project Structure

```
.
├── index.html    # Main homepage
├── 404.html      # Custom 404 error page
├── CNAME         # GitHub Pages domain configuration
├── README.md     # This file
└── .git/         # Git repository
```

## 🔧 Custom Domain Configuration

### DNS Records (Namecheap)

**For jasperhdeen.com (apex domain):**
```
Type: A Records
Name: @
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

**For www.jasperhdeen.com:**
```
Type: CNAME
Name: www
Value: JDeez0.github.io
```

### GitHub Pages Settings

- Repository: JDeez0/jasperhdeen.com
- Custom domain: jasperhdeen.com
- HTTPS: Enabled (automatic)
- Source: Main branch

## 🛡️ Security Features

- HTTPS enforced (automatic with GitHub Pages)
- Security headers configured
- Domain ownership verified
- No wildcard DNS records

## 📝 Editing the Website

1. Edit `index.html` to change the homepage
2. Edit `404.html` to change the error page
3. Commit your changes: `git add . && git commit -m "Your message"`
4. Push to GitHub: `git push origin main`

## 🔄 Deployment

Changes are automatically deployed when you push to the main branch.

## 📧 Contact

Email: jasperhdeen@gmail.com
GitHub: [@JDeez0](https://github.com/JDeez0)

---

Built with ❤️ using GitHub Pages