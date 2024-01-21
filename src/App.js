import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Container } from 'react-bootstrap';
import ContenedorFrases from './components/ComponenteFrases';
import { CSSTransition } from 'react-transition-group';

const indiceAleatorio = (min = 0, max = 200) => Math.floor(Math.random() * (max - min + 1) + min);
const url = "https://api.quotable.io/random";

function App() {
  const [colorAleatorio, setColorAleatorio] = useState({});
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getQuotes();
  }, []);

  async function getQuotes() {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setQuotes(res.data);
      setColorAleatorio(`rgb(${indiceAleatorio()}, ${indiceAleatorio()}, ${indiceAleatorio()})`)
    } catch (err) {
      console.log(err);
    }finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid style={{backgroundColor: colorAleatorio}} className={`App`}>
       <CSSTransition
        in={!loading} // La transición se activa cuando 'loading' es falso
        timeout={2000} // Duración de la transición en milisegundos
        classNames="fade" // Nombre de la clase para los estilos de transición
        unmountOnExit
      >
        <ContenedorFrases
                ColorAleatorio={colorAleatorio}
                etiqueta={quotes.tags}
                autor={quotes.author? quotes.author: "Anonimus"}
                frase={quotes.content}
                onClick={getQuotes}
              />
      </CSSTransition>
    </Container>
  );
}

export default App;
