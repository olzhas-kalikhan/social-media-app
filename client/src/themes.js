import { createMuiTheme } from '@material-ui/core/styles'


const mainTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#011640"
        }
    },

    typography: {
        h1: {
            fontSize: "3.2rem",
            fontWeight: '700',
            fontFamily: "'Baloo Chettan 2', cursive",
            color: "#011640"
        },
        h2: {
            fontSize: "3rem",
            fontFamily: "'Baloo Chettan 2', cursive",
        },
        h3: {
            fontSize: "1.8rem",
            fontWeight: '700',
            fontFamily: "'Baloo Chettan 2', cursive",
            color: "#FFFFFF"
        },
        h4: {
            fontWeight: '700',
            fontFamily: "'Varela Round', sans-serif"
        },
        h5: {
            fontWeight: '600',
            fontFamily: "'Baloo Chettan 2', cursive",
            fontSize: '1.6rem',
        },
        h6: {
            fontWeight: '400',
            fontFamily: "'Baloo Chettan 2', cursive",
            fontSize: '1.3rem',

        },
        subtitle1: {
            fontWeight: '400',
            fontFamily: "'Ubuntu', sans-serif",
            fontSize: '0.9rem',
            color: '#505050'
        },
        subtitle2: {
            fontWeight: '400',
            fontFamily: "'Ubuntu', sans-serif",
            fontSize: '1rem'
        },
        caption: {
            fontFamily: "'Ubuntu', sans-serif",
            fontWeight: '600',
            color: "#404040",
            fontSize: '0.7rem'
        }

    }
})

export { mainTheme }