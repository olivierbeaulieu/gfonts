import config from '../config'

export type GoogleFont = {
    category: string
    family: string
    files: { regular: string; italic: string }
    kind: string
    lastModified: string
    subsets: string[]
    variants: string[]
    version: string
}

export function getWebfonts(): Promise<{ items: GoogleFont[] }> {
    return fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${config.GOOGLE_API_KEY}`
    ).then(response => response.json())
}
