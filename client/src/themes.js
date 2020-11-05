import { createMuiTheme } from '@material-ui/core/styles'


const mainTheme = createMuiTheme({

    typography: {
        h4: {
            fontWeight: '700',
            fontFamily: "'Varela Round', sans-serif"
        },
        h5: {
            fontWeight: '700',
            fontFamily: "'Itim', cursive",
            fontSize: '1.8rem'
        },
        h6: {
            fontWeight: '600',
            fontFamily: "'Varela Round', sans-serif",
            fontSize: '1.5rem'
        }
    }
})

export { mainTheme } 