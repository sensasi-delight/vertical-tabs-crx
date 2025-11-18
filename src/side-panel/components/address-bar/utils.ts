import { URL_REGEX } from './constants'

export function cleanUrl(url: string): string {
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
}

export function isValidUrl(href: string): boolean {
    return URL_REGEX.test(href)
}

export function formatUrlForNavigation(url: string): string {
    const trimmedUrl = url.trim()

    if (!isValidUrl(trimmedUrl)) {
        return `https://google.com/search?q=${encodeURIComponent(trimmedUrl)}`
    }

    if (!trimmedUrl.startsWith('http') && !trimmedUrl.startsWith('chrome')) {
        return `https://${trimmedUrl}`
    }

    return trimmedUrl
}

export function getFaviconUrl(url: string): string {
    try {
        const hostname = new URL(url).hostname
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`
    } catch {
        return ''
    }
}
