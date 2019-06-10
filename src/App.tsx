import React, { useEffect, useState } from 'react'
import { getWebfonts, GoogleFont } from './utils/fonts'
import Button from '@material-ui/core/Button'
import SearchInput from './components/search-input'
import './index.css'

export default function App(): React.ReactElement {
    const [fonts, setFonts] = useState<GoogleFont[]>([])
    const [filter, setFilter] = useState('')

    console.log('fonts', fonts)

    useEffect(() => {
        getWebfonts().then(webfontList => setFonts(webfontList.items))
    }, [])

    const filteredFonts = fonts.filter(font =>
        font.family.toLowerCase().includes(filter)
    )

    return (
        <>
            <SearchInput
                onChange={event => setFilter(event.target.value.toLowerCase())}
            />

            {filteredFonts.map(font => (
                <p>{font.family}</p>
            ))}

            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </>
    )
}
