//React e hooks
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import toast, { Toaster } from 'react-hot-toast';

//Database
import { database } from '../../services/firebase';

//Componentes externos
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';

//Imagem
import logoImg from '../../assets/images/logo.svg';

//CSS
import './styles.scss';

//Tipos

type RoomParams = {
  id: string;
}

//Page
export function AdminRoom(){
  const params = useParams<RoomParams>();
  const roomID = params.id;

  const { questions, title } = useRoom(roomID);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomID}/>
            <Button>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room_title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && (<span>{questions.length} pergunta(s)</span>) }
        </div>

        <div className="questions-list">
          { questions.map(question => {
            return(
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            )
          })}
        </div>

      </main>
    </div>
  )
}