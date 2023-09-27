import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from './Comment'
import { Avatar } from './Avatar'

import styles from './Post.module.css'

interface Author {
   name: string;
   role: string;
   avatarUrl: string;
}

interface Content {
    type: string
    content: string;   
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}
// define a interface para o objeto interiro
export function Post({author, content, publishedAt}: PostProps) {
   const [comments, setComments] = useState(['post muito bacana!']) 
   const [newCommentText, setNewCommentText] = useState('')

   const publishedDateFormatted = format(publishedAt,"d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,     
   })

   const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true 
   })

   function handleCreateNewContent(event: FormEvent) {
    event.preventDefault()
      setComments([...comments, newCommentText]) 
      setNewCommentText('')  
   }
   
   function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
       event.target.setCustomValidity('')
       setNewCommentText(event.target.value)
    }

    function deleteComment(commentDelete: string) {
     const commentsWithoutDeleteOne = comments.filter(comment => {
         return comment !== commentDelete
     })
     setComments(commentsWithoutDeleteOne)
    }

   function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
       event.target.setCustomValidity('Esse campo é obrigatório!')
   }

   const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                        <div className={styles.authorInf}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time 
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                >{publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {content.map((line) => {
                    if(line.type === 'paragraph'){
                        return(
                            <p key={line.content}>{line.content}</p>
                        )    
                    } else if(line.type ==='link') {
                        <p><a href="">{line.content}</a></p>
                    }
                })}
                <p>
                    <a href="">#novoprojeto</a>{' '}
                    <a href="">#nlw</a>{''}
                    <a href="">#rocketseat</a>                      
                </p>
            </div>

            <form onSubmit={handleCreateNewContent} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea 
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    required
                    onInvalid={handleNewCommentInvalid}
                    onChange={handleNewCommentChange}
                />
               <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
               </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map((comment) => {
                    return (
                        <Comment 
                            key={comment}
                            comment={comment}
                            onDeleteComment={deleteComment}
                        />)
                })}
            </div>
        </article>
    )
}