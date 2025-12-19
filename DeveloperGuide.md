# <img src="logo/logo_long_desc_bg_white.svg" alt="CONTEXT Builder">

## Developer Guide

### Prerequisites

- Node.js
- pnpm (preferred package manager)

### Setup Development Environment

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/context-builder.git
cd context-builder
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm dev
```

### Testing the CLI Locally

To test the CLI tool in your local environment:

1. Link the package globally:
```bash
pnpm dev:link
```

2. Test the CLI in any project directory:
```bash
cd /path/to/test-project
context-builder
```

3. When done testing, unlink the package:
```bash
pnpm dev:unlink
```

### Building

Before submitting a PR, ensure the build is successful:
```bash
pnpm build
```

### Tech Stack

- Built with Vite
- Package manager: pnpm (npm can also be used, but pnpm is preferred)

### Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Ensure the build passes (`pnpm build`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### License

MIT License - feel free to use, modify, and distribute this project.
