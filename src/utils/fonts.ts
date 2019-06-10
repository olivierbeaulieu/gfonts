import config from '../config'
import { SortBy } from '../components/app-bar'

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

type Props = {
    sortBy: SortBy
}
export function getWebfonts(props: Props): Promise<{ items: GoogleFont[] }> {
    const { sortBy } = props

    return fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${config.GOOGLE_API_KEY}&sort=${sortBy}`
    ).then(response => response.json())
}
