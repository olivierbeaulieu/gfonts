import React, { useEffect, useState } from 'react'
import { getWebfonts, GoogleFont } from './utils/fonts'
import AppBar from './components/app-bar'
import FontListItem from './components/font-list-item'
import Grid from '@material-ui/core/Grid'
import { slugify } from 'underscore.string'
import useInfiniteScroll from './components/use-infinite-scroll'
import './index.css'

const resultsPerPage = 12
const startingPage = 2

function FontList(props: { fontList: GoogleFont[] }): React.ReactElement {
    const { fontList } = props

    const [currentPage, setCurrentPage] = useState(startingPage)
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)
    const hasMoreResultsAvailable =
        fontList.length >= (currentPage + 1) * resultsPerPage

    function fetchMoreListItems() {
        if (hasMoreResultsAvailable) {
            setCurrentPage(currentPage + 1)
            setIsFetching(false)
        }
    }

    return (
        <Grid container spacing={3}>
            {fontList.slice(0, currentPage * resultsPerPage).map(font => {
                return (
                    <Grid item xs={4} key={`grid-item-${slugify(font.family)}`}>
                        <FontListItem font={font} />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default function App(): React.ReactElement {
    const [fonts, setFonts] = useState<GoogleFont[]>([])
    const [filter, setFilter] = useState('')

    // console.log('fonts', fonts)

    useEffect(() => {
        getWebfonts().then(webfontList => setFonts(webfontList.items))
    }, [])

    const filteredFonts = fonts.filter(font =>
        font.family.toLowerCase().includes(filter)
    )

    return (
        <>
            <AppBar
                onSearchInput={event =>
                    setFilter(event.target.value.toLowerCase())
                }
            />

            <div className="container">
                <FontList fontList={filteredFonts} />
            </div>
        </>
    )
}
