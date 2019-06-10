import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'

export type SortBy = 'popularity' | 'alpha' | 'trending' | 'date'
type OnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => void
type SearchInputProps = {
    onChange: OnSearchChange
}
type OnSortChange = (value: string) => void

function SearchInput(props: SearchInputProps): React.ReactElement {
    return (
        <Paper
            style={{
                padding: '2px 4px',
                display: 'flex',
            }}
        >
            <InputBase
                style={{
                    marginLeft: 8,
                    flex: 1,
                }}
                placeholder="Search Google Fonts"
                inputProps={{ 'aria-label': 'Search Google Fonts' }}
                onChange={props.onChange}
            />
            <IconButton
                style={{
                    padding: 10,
                }}
                aria-label="Search"
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

type AppBarProps = {
    onSearchInput: OnSearchChange
    onSortChange: OnSortChange
    sortBy: SortBy
}
export default function MyAppBar(props: AppBarProps): React.ReactElement {
    const { onSearchInput, onSortChange, sortBy } = props

    return (
        <div style={{ flexGrow: 1, marginBottom: '10px' }}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <SearchInput onChange={onSearchInput} />
                    <SortBySelect
                        initialValue={sortBy}
                        onChange={onSortChange}
                    />
                </Toolbar>
            </AppBar>
        </div>
    )
}

function SortBySelect(props: {
    onChange: OnSortChange
    initialValue: SortBy
}): React.ReactElement {
    const { onChange, initialValue } = props
    const [value, setValue] = useState(initialValue)

    return (
        <form autoComplete="off" style={{ marginLeft: '10px' }}>
            <FormControl variant="outlined" style={{ width: '180px' }}>
                <Select
                    native
                    value={value}
                    onChange={event => {
                        setValue(event.target.value as SortBy)
                        onChange(event.target.value as SortBy)
                    }}
                    input={
                        <OutlinedInput
                            name="sort-by"
                            id="sort-by"
                            labelWidth={0}
                        />
                    }
                >
                    <option value="popularity">By popularity</option>
                    <option value="trending">Trending first</option>
                    <option value="alpha">Alphabetically</option>
                    <option value="date">By date</option>
                </Select>
            </FormControl>
        </form>
    )
}
