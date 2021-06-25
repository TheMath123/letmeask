//React e hooks
import { useHistory, useParams } from 'react-router-dom';
import { useRoom } from '../../hooks/useRoom';
// import toast, { Toaster } from 'react-hot-toast';

//Database
import { database } from '../../services/firebase';

//Componentes externos
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { Button } from '../../components/Button';

//Imagem
import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';

//CSS
import './styles.scss';

//Tipos

type RoomParams = {
  id: string;
}

//Page
export function AdminRoom(){
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handlerEndRoom(){
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handlerDeleteQuestion(questionId: string){
    if(window.confirm('Tem certeza que você deseja encerrar esta sala?')){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button
              isOutlined={true}
              onClick={handlerEndRoom}
            >
              Encerrar sala
            </Button>
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
              >
                <button
                  type="button"
                  aria-label="Remover pergunta"
                  onClick={() => handlerDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover perguntar" />
                </button>
              </Question>
            )
          })}
        </div>

      </main>
    </div>
  )
}