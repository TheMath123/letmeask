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
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';

//Imagem
import logoImg from '../../assets/images/logo.svg';

//CSS
import './styles.scss';

//Tipos

type RoomParams = {
  id: string;
}

//Page
export function Room(){
  const params = useParams<RoomParams>();
  const roomID = params.id;

  const { questions, title } = useRoom(roomID);

  const { user } = useAuth();
  const [ newQuestion, setNewQuestion] = useState('');

  async function handlerSendQuestion(event: FormEvent){ //Envia um nova pergunta
    event.preventDefault();
    
    if(newQuestion.trim() === ''){
      toast.error("Question field cannot be empty");
      return;
    }

    if(!user){
      toast.error("You must be logged in");
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomID}/questions`).push(question);

    setNewQuestion('');
    toast.success('Question sent.')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomID}/>
        </div>
      </header>

      <main>
        <div className="room_title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && (<span>{questions.length} pergunta(s)</span>) }
        </div>

        <form onSubmit={handlerSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            { user ? (
             <div className="user-info">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
             </div> 
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
            )}
            <Button type="submit" disabled={!user} >Enviar pergunta</Button>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{ duration: 1000 }}
            />
          </div>
        </form>

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