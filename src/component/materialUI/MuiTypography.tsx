import { Typography } from '@mui/material'
import React from 'react'

const MuiTypography = () => {
  return (
    <div>MuiTypography
        {/* h1, h2 represents tags in html */}
        <Typography variant='h1'></Typography>
        <Typography variant='h2'></Typography>
        <Typography variant='h3'></Typography>
        {/* gutterbottom gives the invisible bottom margin to th h4 variant */}
        <Typography variant='h4' gutterBottom></Typography>

        {/* subtitle 1 2 represents h6 tags */}
        <Typography variant='h6'></Typography>
        <Typography variant='subtitle1'></Typography>
        <Typography variant='subtitle2'></Typography>

{/* body1 and body2 represents p tag in html */}
        <Typography variant='body1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium repudiandae commodi accusamus in dolore aut voluptatem aliquid, labore excepturi natus sint eligendi iste, velit eos assumenda? Commodi iusto voluptas fuga.</Typography>
        <Typography variant='body2'></Typography>
    </div>
  )
}

export default MuiTypography