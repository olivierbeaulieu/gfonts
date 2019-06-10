import React, { ChangeEvent } from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

type Props = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CustomizedInputBase(props: Props): React.ReactElement {
    return (
        <Paper
            style={{
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
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
