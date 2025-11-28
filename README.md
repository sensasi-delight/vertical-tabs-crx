# Vertical Tabs 🧭

A clean and simple Chrome extension that shows your tabs in a vertical sidebar. Perfect for managing many tabs without clutter!

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/cgocnaphmglbfjcdhkmpakgildijpgkf)](https://chromewebstore.google.com/detail/vertical-tabs-by-sensasi/cgocnaphmglbfjcdhkmpakgildijpgkf)
![Build Status](https://github.com/sensasi-delight/vertical-tabs-crx/actions/workflows/build.yml/badge.svg)

**Having issues?** [Report a bug](https://github.com/sensasi-delight/vertical-tabs-crx/issues)  
**Like this extension?** Give it a ⭐ on [GitHub](https://github.com/sensasi-delight/vertical-tabs-crx)

## Why Vertical Tabs?

- **See More Tabs** - Vertical layout shows way more tabs than the default horizontal bar
- **Works in Fullscreen** - Access your tabs even when watching videos or presenting
- **Stay Organized** - Drag and drop to reorder, never lose track of your tabs
- **Fast Navigation** - Click any tab instantly, search your history, or open new URLs

## Features

✨ **Vertical Sidebar** - All your tabs in a clean list  
🎯 **Smart Address Bar** - Search history or navigate to any URL  
🖱️ **Drag & Drop** - Reorder tabs easily  
⌨️ **Keyboard Shortcut** - Press `Alt+X` to open/close  
🔄 **Auto Sync** - Changes update instantly  
🌙 **Dark Theme** - Easy on your eyes

## Quick Start

### For Users

1. [Download from Chrome Web Store](https://chromewebstore.google.com/detail/vertical-tabs-by-sensasi/cgocnaphmglbfjcdhkmpakgildijpgkf)
2. Click the extension icon or press `Alt+X`
3. Enjoy your vertical tabs!

### For Developers

#### Install Dependencies

```bash
bun install
```

#### Development Mode

```bash
bun dev
```

Then load the `dist/` folder in Chrome at `chrome://extensions/` (enable Developer mode first)

#### Production Build

```bash
bun build
```

## How to Use

1. **Toggle Sidebar** - Click the extension icon or press `Alt+X`
2. **Switch Tabs** - Click any tab in the list
3. **New Tab** - Click the + button at the top
4. **Navigate** - Type a URL or search term in the address bar
5. **Reorder** - Drag tabs up or down to organize them
6. **Close Tabs** - Click the × button on any tab

## Tech Stack

Built with modern tools for speed and reliability:

- **React 19.2** - Latest React with built-in compiler
- **TypeScript** - Type-safe code
- **Vite** - Lightning-fast builds
- **Biome** - Super fast linting
- **Chrome Manifest V3** - Latest extension standard

## Project Structure

```text
src/
├── service-worker.ts          # Handles keyboard shortcuts
├── side-panel/
│   ├── components/
│   │   ├── address-bar/      # URL navigation & search
│   │   ├── vertical-tabs/    # Tab list with drag & drop
│   │   ├── new-tab-button/   # Create new tabs
│   │   └── refresh-button/   # Reload current page
```

## Contributing

We welcome contributions! Here's how:

1. Fork this repo
2. Create a branch: `git checkout -b my-feature`
3. Make your changes
4. Format code: `bun lint:fix`
5. Submit a pull request

## Commands

```bash
bun dev        # Start development
bun build      # Build for production
bun lint:fix   # Format code
```

---

Made with ❤️ by [🍕](https://sensasi-delight.web.app)
