export function FaviconImage({ url }: { url: string }) {
    const faviconUrl = getFaviconUrl(url)

    /**
     * Known issue: fallbackSVG will never show up because {@link getFaviconUrl} has it's own fallback mechanism. example: https://www.google.com/s2/favicons?domain=nonexistentdomain12345.com&sz=32 always returns a generic favicon image.
     */
    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.target as HTMLImageElement

        img.style.display = 'none'

        const fallbackSvg = img.nextElementSibling as HTMLElement
        if (fallbackSvg) {
            fallbackSvg.style.display = 'block'
        }
    }

    return (
        <>
            <img
                alt=""
                onError={handleError}
                src={faviconUrl}
                style={{
                    borderRadius: '2px',
                    height: '16px',
                    width: '16px',
                }}
            />
            <svg
                aria-hidden="true"
                fill="none"
                height="14"
                style={{ display: 'none' }}
                viewBox="0 0 16 16"
                width="14">
                <path
                    d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"
                    fill="currentColor"
                />
            </svg>
        </>
    )
}

function getFaviconUrl(url: string): string {
    try {
        const hostname = new URL(url).hostname
        return `https://www.google.com/s2/favicons?domain=https://${hostname}&sz=32`
    } catch {
        return ''
    }
}
