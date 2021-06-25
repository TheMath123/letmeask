//React 
import { ReactNode } from 'react'
import cx from 'classnames'

//CSS
import './styles.scss';

//Tipos
type QuestionProps = {
  content: string,
  author: {
    name: string,
    avatar: string,
  }
  children: ReactNode,
  isHighlighted?: boolean,
  isAnswered?: boolean,
}

//Componente
export function Question({
  content,
  author,
  isHighlighted = false,
  isAnswered = false,
  children,
}: QuestionProps) {
  return (
    <div 
      className={cx(
        'question',
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          { children }
        </div>
      </footer>
    </div>
  )
}