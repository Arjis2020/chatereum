import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { Container, CssBaseline } from '@mui/material';
import Home from './components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Bubbles from './components/Home/Bubbles';
import Footer from './components/Footer';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#304fff',
        light: '#7B7CFF',
        dark: '#0026CA',
        contrastText: '#FFF'
      },
      secondary: {
        light: '#FFF350',
        main: '#FFC107',
        dark: '#C79100',
        contrastText: '#000000'
      },
      background: {
        default: '#304fff15',
      },
    },
    typography: {
      fontFamily: 'SFProText-Medium',
    },
  })

  return (
    <ThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <Container
        maxWidth='xl'
      >
        <Home />
      </Container >
      <Footer />
    </ThemeProvider>
  );
}

export default App;
