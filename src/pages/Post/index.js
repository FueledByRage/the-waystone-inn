import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router'
import  InfoBox  from '../../components/infoBox'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getUser } from '../../storage/utils'
import Comments from '../../components/Comments'
import  { PostBox }  from '../../components/PostBox'
import { CommentsBox, Container, StyledLink, StyledForm } from './style'
import { FiArrowDown, FiArrowUp, FiTrash } from 'react-icons/fi'



export default function Post(props){

    const [ data, setData ] = useState(null) 
    const [ error, setError ] = useState(null)
    const [ errorSubmit, setErrorSubmit ] = useState(null)
    const [ errorComments, setErrorComments ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const { id } = useParams()
    const [ comment, setComment ] = useState('')
    const token = getToken()
    const navigate = useNavigate()
    const [date, setDate] = useState(null)
    
    useEffect(async ()=>{
        try {
            let isCancelled = false
            const response = await api.get(`/post/${id}`).catch((error)=> {
                throw Error(error.response.data)
            })                    
            if(!isCancelled){     
                setData(response.data)
                setDate(new Date(response.data.communityId.date))}
                return () => {
                    setLoading(false)
                    isCancelled = true
                }
            } catch (error) {
                setLoading(false)
                setError(error.message)
        }
    }, [])
    
    async function handleSubmit(){
        
        
        await api.post('/comment/register', { token, id, comment })
        .catch((error) =>{ 
            alert(error.response.data)
        })
        
    }

    async function handleDelete(){

       const response = await api.post(`/post/deletePost`, {id, token}).catch((error) =>{ setError(error.message)})
        navigate(`/community/${response.data.id}/1`)
    }

    if(!data || !date) return(<h1>{error}</h1>)

    return(

        <Container>

            {
                loading ?
                <PostBox>
                    <div style={{display: 'flex',
                    justifyContent: 'space-between'
                    }} >
                        <h1>{ error ?<span>error</span> : data.title}</h1>
                        {error ? <span>error</span> : data.authorId.user == getUser() ? <button onClick={handleDelete} style={{width: '80px',}} ><FiTrash/></button> : <span></span>}
                    </div>
                    <div className='postBody' > {error ? <h1>{error}</h1> : data.url ? <img src={data.url} /> : <span>{data.body}</span> } </div>
                    <div className='footer'><StyledLink to={`/community/${data.communityId._id}/1`}> {data.communityId.name} </StyledLink> {error ? <span>{error}</span> : <StyledLink  to={`/profile/${data.authorId.user}`} > {data.authorId.user} </StyledLink> }</div>
                </PostBox> : <h1>Loading...</h1>
            }
            <CommentsBox>
                <StyledForm onSubmit={handleSubmit}>
                <textarea
                    id="comment"
                    rows='5'
                    type="textarea"
                    name="comment"
                    placeholder="Comentário"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    />
                    <button className="button" type="submit">Comentar</button>  
                </StyledForm>
                <Comments id={id}/> 
            </CommentsBox>
            <div className='aside'>
                {
                    <InfoBox community={data.communityId}/>
                }
            </div>
        </Container> 

    )
}