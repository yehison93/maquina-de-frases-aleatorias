import { Button, Stack } from 'react-bootstrap';
import { ChatQuoteFill, Quote, Share, Twitter } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ContenedorFrases( { ColorAleatorio, autor, frase, onClick, etiqueta} ) {

  const buscarAutor = autor?.split(",")[0];
  const setAutor = buscarAutor?.trim() === "type.fit"? "Anonimus" : buscarAutor;

  const buscarEtiqueta = (etiqueta + " ")?.replace(/[.,]+/g, ' ')
  .split(" ")[0]
  .trim();

  const toAutor = () => {return (autor
  .split(" ")
  .join("")
  )};

  const shareData = {
    title: `🌟 ${buscarEtiqueta} 🌟`,
    text: `
    📝 ${buscarEtiqueta} 📝
    --------------------------
    📚 Frase: ${frase}
    --------------------------
    ✍️ Autor: ${autor}
    --------------------------
    🎉 Comparte esta cita inspiradora! 🎉
    `,
  };

  const handleShare = async () => {
      
    if (navigator.share) {
      // Utiliza la API Web Share si está disponible
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error al compartir:', error);
      }
    } else {
      const twitterShareUrl = `https://twitter.com/intent/tweet?hashtags=quotes,${toAutor()},${buscarEtiqueta}&text=${encodeURIComponent(shareData.text)}`;
      window.open(twitterShareUrl, '_blank');
    }
  };  

  return (
    <Card className={`contenedor-principal`}  >
      <Card.Header className='text-center d-flex justify-content-center'>
        <Card.Title className='titulo-contenedor fs-1'>{`${buscarEtiqueta}`}</Card.Title>
      </Card.Header>
      <Card.Body className='contenedor-quote' id={`quote-box`}>
        <Stack style={{color: ColorAleatorio }} gap={2} className={`blockquote contenedor-frase-autor`}>
        <p className='frase-contenedor fs-3 text-center' id={`text`}>
        <Quote />{' '}
            {frase}{' '}
          </p>
          <footer className={`blockquote-footer contenedor-autor`}>
            <cite id={`author`} className='contenedor-nombre-autor fs-3' title={setAutor || "Anonimus"}>{setAutor}</cite>
          </footer>
        </Stack>
        <Stack direction='horizontal' gap={3} className='fs-2 px-3'>
          <OverlayTrigger overlay={<Tooltip>Comparte en Twitte!</Tooltip>}>
            <Button id={`tweet-quote`} href={`https://twitter.com/intent/tweet?hashtags=quotes,${toAutor()},${buscarEtiqueta}&text=${frase}`} target={"_blank"}  variant="link" className='fs-1'>
              <Twitter style={{color: ColorAleatorio }} className="d-inline-block icons-quote"/>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip >Comparte donde quieras!</Tooltip>}>
          <Button onClick={handleShare} variant="link" className='fs-1'>
              <Share style={{color: ColorAleatorio }} className="d-inline-block icons-quote"/>
            </Button>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip >Nueva frase</Tooltip>}>
          <Button id={`new-quote`} onClick={onClick} variant="link" className='ms-auto fs-1'>
              <ChatQuoteFill style={{color: ColorAleatorio }} className="d-inline-block icons-quote"/>
            </Button>
          </OverlayTrigger>
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default ContenedorFrases;