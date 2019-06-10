import React, { ChangeEvent } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

type OnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => void
type SearchInputProps = {
    onChange: OnSearchChange
}

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
}
export default function MyAppBar(props: AppBarProps): React.ReactElement {
    const { onSearchInput } = props

    return (
        <div style={{ flexGrow: 1, marginBottom: '10px' }}>
            <AppBar position="static" color="default">
                <Toolbar style={{ justifyContent: 'center' }}>
                    <SearchInput onChange={onSearchInput} />
                </Toolbar>
            </AppBar>
        </div>
    )
}
