import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { MagicSpinner } from 'react-spinners-kit'
import FsLightbox from 'fslightbox-react'
import { useState } from 'react'
import useDalle from '../hooks/useDalle'
import { useTheme } from '@mui/material'
import { createPortal } from 'react-dom'

export const GenerateForm = () => {
    // Referencja do obiektu theme - Material UI
    const theme = useTheme()

    // Import funkcji generateImages oraz response z hooka useDalle
    const { generateImages, response } = useDalle()

    // Stan komponentu za pomocą react.useState
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [prompt, setPrompt] = useState('')

    // Funkcja uruchamiana przy zatwierdzeniu formularza
    const handleSubmit = async (e) => {
        e.preventDefault()
        generateImages(prompt)
    }

    return (
        <>
            <Box
                mt={10}
                mb={4}
                component={'form'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                }}
            >
                <TextField
                    id='prompt'
                    value={prompt}
                    variant={'outlined'}
                    onChange={(e) => setPrompt(e.target.value)}
                    label={'Wpisz co chciałbyś wygenerować'}
                    fullWidth
                    helperText={
                        'Podaj szczegółowy opis. Pamiętaj o określeniu tła, stylu grafiki oraz o perspektywie.'
                    }
                    size={'small'}
                />
                <Tooltip title='Wygeneruje 5 obrazków na podstawie podanego opisu'>
                    <Button
                        onClick={handleSubmit}
                        size={'normal'}
                        variant={'outlined'}
                        color={'success'}
                    >
                        Generuj
                    </Button>
                </Tooltip>
            </Box>

            {response.isLoading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MagicSpinner
                        // size={30}
                        color={theme.palette.primary.main}
                        loading={response.isLoading}
                    />
                </Box>
            )}

            {response.error && (
                <Box>
                    <Alert severity='error'>
                        <AlertTitle>Error</AlertTitle>
                        {response.error}
                    </Alert>
                </Box>
            )}

            {response.success && (
                <>
                    <Divider />
                    <Box mt={4}>
                        <Typography
                            variant={'h5'}
                            sx={{ textAlign: 'center' }}
                        >
                            Wygenerowane obrazy:
                        </Typography>
                        <Grid
                            container
                            columnSpacing={2}
                            justifyContent={'space-around'}
                        >
                            {response.images && (
                                <>
                                    {response.images.map((image, index) => (
                                        <Grid
                                            item
                                            xs={2}
                                            sx={{ height: 260 }}
                                            key={index}
                                        >
                                            <Box
                                                component={'img'}
                                                key={index}
                                                src={image.url}
                                                onClick={() =>
                                                    setLightboxOpen(!lightboxOpen)
                                                }
                                                alt=''
                                                sx={{
                                                    objectFit: 'contain',
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                    {createPortal(
                                        <>
                                            <FsLightbox
                                                toggler={lightboxOpen}
                                                type={'image'}
                                                types={[
                                                    'image',
                                                    'image',
                                                    'image',
                                                    'image',
                                                    'image',
                                                ]}
                                                sources={response.images.map(
                                                    (image) => image.url
                                                )}
                                            />
                                        </>,
                                        document.body
                                    )}
                                </>
                            )}
                        </Grid>
                    </Box>
                </>
            )}
        </>
    )
}

export default GenerateForm
