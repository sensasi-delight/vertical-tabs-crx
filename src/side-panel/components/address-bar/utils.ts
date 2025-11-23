export function cleanUrl(url: string): string {
    return url
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '')
        .replace(/^chrome:\/\/(newtab)\/?$/, '')
}

export const URL_REGEX =
    /^(https?:\/\/)?(([a-z\d.-]+)\.([a-z.]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:[0-9]+)?([/\w\s.\-?&=%+#]*)\/?$|^chrome:\/\/[\w-]+([/\w.-]*)*\/?$|^chrome-extension:\/\/[\w]+([/\w.-]*)*\/?$/

export function isValidUrl(href: string): boolean {
    return URL_REGEX.test(href)
}

export function formatUrlForNavigation(url: string): string {
    const trimmedUrl = url.trim()

    console.log('Formatting URL for navigation:', trimmedUrl)

    if (!isValidUrl(trimmedUrl)) {
        return `https://google.com/search?q=${encodeURIComponent(trimmedUrl)}`
    }

    if (!trimmedUrl.startsWith('http') && !trimmedUrl.startsWith('chrome')) {
        return `https://${trimmedUrl}`
    }

    return trimmedUrl
}
