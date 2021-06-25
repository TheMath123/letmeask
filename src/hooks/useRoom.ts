//React e Hook externos
import { useEffect, useState } from "react"
import { useAuth } from "./useAuth";

//Database
import { database } from '../services/firebase';

//Tipos
type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean,
  isAnswered: boolean,
  likes: Record<string, {
    authorId: string,
  }>,
}>

type QuestionsType = {
  id: string,
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean,
  isAnswered: boolean,
  likeCount: number,
  likeId: string | undefined,
}

//Hook
export function useRoom(roomID: string){
  const { user } = useAuth()
  const [ questions, setQuestions ] = useState<QuestionsType[]>([])
  const [ title, setTitle ] = useState('')

  useEffect(()=>{
    const roomRef = database.ref(`rooms/${roomID}`)

    roomRef.on('value', room => { //Fica escutando alterações no banco de dados
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parseQuestions = Object.entries(firebaseQuestions).map(([key, value]) => { //Converte o objeto em array
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parseQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  },[roomID, user?.id])

  return { questions, title };
}