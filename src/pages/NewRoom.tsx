//React
import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';

//Componentes externos
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

//Imagens
import illustrationsImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

//CSS
import '../styles/auth.scss';

//Componente
export function NewRoom() {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState('')

  async function handlerCreateRoom(e: FormEvent){
    e.preventDefault()

    if(newRoom.trim() === ''){
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorID: user?.id,
    })
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationsImg} alt="Ilustração mensagens" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo do letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handlerCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit" >
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala já existente? <Link to="/">Clique aqui </Link>
          </p>
        </div>
      </main>
    </div>
  )
}