# QR Code Scan Map

A real-time visualization platform that tracks and displays QR code scans globally. Built with modern web technologies to provide a seamless experience for tracking QR code engagement across geographical locations.

## Features

- 🗺️ Real-time scan visualization on an interactive world map
- 📱 Mobile-friendly QR code scanning
- 📍 Automatic location tracking (with user consent)
- 🔒 Privacy-focused data collection
- 📊 Scan analytics and statistics

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma with PostgreSQL
- **Map Visualization**: Mapbox GL JS
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- Mapbox API key
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qr-code-scan-map.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```bash
DATABASE_URL="postgresql://..."
MAPBOX_API_KEY="your_mapbox_key"
NEXTAUTH_SECRET="your_secret"
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
├── app/
│   ├── api/          # API routes
│   ├── components/   # Reusable components
│   ├── lib/          # Utility functions
│   └── pages/        # App pages
├── prisma/           # Database schema and migrations
├── public/           # Static assets
└── types/           # TypeScript type definitions
```

## API Routes

- `GET /api/scan/[qrCodeId]` - Record a QR code scan
- `GET /api/stats` - Get scan statistics
- `GET /api/locations` - Get all scan locations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Mapbox](https://www.mapbox.com/) - Maps and location data
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## Support

For support, email marcusjpeters1@gmail.com or open an issue in this repository.
