//React
import { useEffect, useState } from "react"

//Database
import { database } from '../services/firebase';

//Tipos
type QuestionsType = {
  id: string,
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean,
  isAnswered: boolean,
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean,
  isAnswered: boolean,
}>

//Hook
export function useRoom(roomID: string){
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
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parseQuestions)
    })
  },[roomID])

  return { questions, title };
}