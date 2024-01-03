import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import theme from '../themes/theme'
import { Paper } from '@mui/material'

const currentYear = new Date().getFullYear()
const Footer = () => {
    return (
        <Paper
            component={'footer'}
            sx={{
                width: '100%',
                position: 'absolute',
                paddingY: 1,
                bottom: 0,
                borderTop: '1px solid #313131',
            }}
        >
            <Container>
                <Typography
                    component={'p'}
                    variant={'overline'}
                    align={'center'}
                >
                    Wszystkie prawa zastrzeżone © Kacper Baranowski / {currentYear}
                </Typography>
            </Container>
        </Paper>
    )
}

export default Footer
