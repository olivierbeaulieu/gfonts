import React, { useEffect, useState } from 'react'
import { getWebfonts, GoogleFont } from './utils/fonts'
import AppBar from './components/app-bar'
import FontListItem from './components/font-list-item'
import Grid from '@material-ui/core/Grid'
import { slugify } from 'underscore.string'
import useInfiniteScroll from './components/use-infinite-scroll'
import { SortBy } from './components/app-bar'
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
    const [sortBy, setSortBy] = useState('popularity')

    // console.log('fonts', fonts)

    useEffect(() => {
        getWebfonts({ sortBy: sortBy as SortBy }).then(webfontList =>
            setFonts(webfontList.items)
        )
    }, [sortBy])

    const filteredFonts = fonts.filter(font =>
        font.family.toLowerCase().includes(filter)
    )

    return (
        <div style={{ paddingTop: '60px' }}>
            <div
                style={{
                    position: 'fixed',
                    zIndex: 1000,
                    top: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <AppBar
                    sortBy={sortBy as SortBy}
                    onSearchInput={event =>
                        setFilter(event.target.value.toLowerCase())
                    }
                    onSortChange={value => setSortBy(value)}
                />
            </div>

            <div className="container">
                <FontList fontList={filteredFonts} />
            </div>
        </div>
    )
}
