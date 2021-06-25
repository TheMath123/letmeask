//React e hooks
import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

//Componentes externos
import { Button } from '../../components/Button';


//Database
import { database } from '../../services/firebase';

//Imagens
import illustrationsImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

//CSS
import '../../styles/auth.scss';

//Page
export function Home() {
  const history = useHistory()
  const { user, singInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  //Autentificação do usuário, para criar nova sala
  async function handlerCreateRoom() {
    if(!user){
      await singInWithGoogle()
    }

    history.push('/rooms/new') //DIrecionar o usuário para criar nova sala
  }

  //Entrar em uma sala já criada
  async function handlerJoinRoom(event: FormEvent) {
    event.preventDefault()

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      alert('Room does not exists.')
      return;
    }

    history.push(`/rooms/${roomCode}`)
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
          <button onClick={handlerCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handlerJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit" >
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}