import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './Comments.css'
import { FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router'
import { getUser } from '../../storage/utils'
import { FiTrash } from 'react-icons/fi'
 
export default function Comments(props){
    const [ error, setError ] = useState(null) 
    const [ data, setData ] =useState(null)
    const navigate = useNavigate()

    useEffect(async () =>{
        let isCancelled = false

        const response = await api.get(`/comments/${props.id}`).catch((error) => setError(error.message))
        if(!isCancelled) setData(response.data) 
        return () => {
            isCancelled = true
        }

    }, [])

    async function handleDelete(id){

            await api.delete(`/comment/deleteComment/${id}`).catch((error) =>{
                setError(error.message)
            })
            window.location.reload()
            
    }

    return(
        !data ? <h1> { error } </h1> :
        <ul>
                    {
                        Array.from(data).map(
                            c => (
                                <div key={c._id} className = 'comment'>
                                    <div className = 'commentHeader'>
                                        <FiUser size={20}/> 
                                        <span>{c.authorId.user}</span>
                                        { toString(c.authorId.user) == toString(getUser()) ? <button className='delete' onClick={() => { handleDelete(c._id) }} className='trashButton'> <FiTrash /> </button> : <span>{data.authorId.user}</span>}
                                        </div>
                                    <p>{c.comment}</p>
                                </div>
                             )
                        )
                    }
        </ul>
    )

}