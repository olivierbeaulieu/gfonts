import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { GoogleFont } from '../utils/fonts'

type Props = {
    font: GoogleFont
}

export default function FontListItem(props: Props): React.ReactElement {
    const { font } = props
    const formattedFontFamily = font.family.replace(/ /g, '+')
    const [fontLoaded, setFontLoaded] = useState(false)

    return (
        <Card>
            <link
                href={`https://fonts.googleapis.com/css?family=${formattedFontFamily}`}
                rel="stylesheet"
                onLoad={() => setFontLoaded(true)}
            />

            <CardContent>
                <Typography
                    style={{ fontSize: 14 }}
                    color="textSecondary"
                    gutterBottom
                >
                    {font.family}
                </Typography>
                <Typography
                    component="h3"
                    style={{
                        fontFamily: `"${font.family}", sans-serif`,
                    }}
                >
                    The quick brown fox jumps over the lazy dog
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary" size="small">
                    Preview
                </Button>
            </CardActions>
        </Card>
    )
}
