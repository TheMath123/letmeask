//Imagem
import copyImg from '../../assets/images/copy.svg'

//CSS
import './styles.scss';

//Tipos
type RoomCodeProps = {
  code: string;
}
//Componente
export function RoomCode(props: RoomCodeProps){
  function copyRoomCodeClipboard(){
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}