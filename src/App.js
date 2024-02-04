import { useState, useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import ContenedorFrases from './components/ComponenteFrases';
import { getQuotes } from './getQuotes';

const indiceAleatorio = (min = 0, max = 200) => Math.floor(Math.random() * (max - min + 1) + min);
function App() {
  const [colorAleatorio, setColorAleatorio] = useState({});
  const [quotes, setQuotes] = useState({});

  const handleClick = () => {
    getQuotes().then(newData => setQuotes(newData));
  };

  useEffect(() => {
    handleClick()
  }, []);
  
    useEffect (()=> {
    setColorAleatorio(`rgb(${indiceAleatorio()}, ${indiceAleatorio()}, ${indiceAleatorio()})`)
  },[quotes])


  return (
    <Container fluid style={{backgroundColor: colorAleatorio}} className={`App`}>
      <ContenedorFrases
        ColorAleatorio={colorAleatorio}
        etiqueta={quotes.tags}
        autor={quotes.author? quotes.author: "Anonimus"}
        frase={quotes.content}
        onClick={handleClick}
      />
    </Container>
  );
}

export default App;
