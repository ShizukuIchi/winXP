# Karim's Personal Website

🏁 A personal website built with the Windows XP desktop recreation theme.

## Features

This website showcases:
- **Angel Investments** - Portfolio of early-stage technology investments
- **About Me** - Personal bio, experience, and interests  
- **Articles** - Published writings on technology, investing, and entrepreneurship
- Classic Windows XP experience with draggable, resizable windows
- Minesweeper and other nostalgic Windows apps

## Updating Content

To update your personal information, simply edit these JSON files:

### Angel Investments (`src/data/investments.json`)
```json
{
  "id": 1,
  "companyName": "Your Company Name",
  "description": "Brief description of the company",
  "sector": "Industry sector (e.g., FinTech, HealthTech)",
  "investmentStage": "Investment stage (e.g., Seed, Series A)",
  "investmentYear": 2024,
  "logo": "URL to company logo",
  "website": "https://company-website.com",
  "status": "Active",
  "notes": "Your thoughts or notes about the investment"
}
```

### Personal Bio (`src/data/bio.json`)
Update your name, title, bio, experience, social links, and interests.

### Articles (`src/data/articles.json`)
```json
{
  "id": 1,
  "title": "Your Article Title",
  "description": "Brief description of the article",
  "publication": "Where it was published",
  "publishDate": "2024-01-15",
  "readTime": "5 min read",
  "url": "https://link-to-article.com",
  "category": "Category (e.g., Investing, Technology)",
  "featured": true
}
```

## Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Build for production
npm run build
```

## Deployment

The site can be deployed to any static hosting service like:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront

## Built With

- React
- Styled Components
- Windows XP Recreation by [ShizukuIchi](https://github.com/ShizukuIchi/winXP)

## Thanks
- [Webamp](https://github.com/captbaritone/webamp), Winamp 2 reimplementation by: [captbaritone](https://github.com/captbaritone)
- [JS Paint](https://github.com/1j01/jspaint), Paint reimplementation by: [1j01](https://github.com/1j01)

## License

The Windows XP name, artwork, trademark are surely property of Microsoft. This project is provided for educational purposes only. It is not affiliated with and has not been approved by Microsoft.

Original WinXP recreation: MIT License
