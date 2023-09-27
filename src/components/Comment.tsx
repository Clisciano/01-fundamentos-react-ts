import { ThumbsUp, Trash } from '@phosphor-icons/react';
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';

interface PropsComment {
    comment: string,
    onDeleteComment: (comment: string) => void
}

export function Comment({comment, onDeleteComment}: PropsComment) {
    const [likeCount, setLikeCount] = useState(0)
    function handleDeleteComment() {
        onDeleteComment(comment)
    }

    function handleLikeComment() {
        //sempre que for atualizar uma informação e essa informação depende 
        //do valor que lea tinha anteriormente usa-se esse padrão de funções
        setLikeCount((like) => like + 1 )       
    }
    return (
    <div className={styles.comment}>    
        <Avatar hasBorder={false} src='http://github.com/diego3g.png' alt=""/>
        <div className={styles.commentBox}>
            <div className={styles.commentContent}>
               <header>
                <div className={styles.authorAndTime}>
                    <strong>Clisciano Souza</strong>
                    <time title='11 de Maio às 08:13h' dateTime="2023-05-11 08:10:45">Cerca de 2h atrás</time>
                </div>
                <button title="Deletar comentário">
                    <Trash
                     onClick={handleDeleteComment}   
                     size={24}
                    />
                </button>               
               </header>
               <p>{comment}</p>
            </div>
            <footer>
                <button
                    onClick={handleLikeComment}
                    // onClick={() => setLikeCount(likeCount + 1)}
                >
                    <ThumbsUp />
                    Aplaudir <span>{likeCount}</span>
                </button>
            </footer>
        </div>
    </div>
    )  
}