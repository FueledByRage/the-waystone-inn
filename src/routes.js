import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/'
import Login from './pages/Login/'
import PrivateRoute from './services/private'
import Register from './pages/register/Register'
import RegisterCommunity from './pages/register/RegisterCommunity'
import PublicRoute from './services/public'
import { isLogged } from './storage/utils'
import Community from './pages/Community/'
import ErrorPage from './pages/ErrorPage'
import Post from './pages/Post/'


export default function RoutesList(){

    return(
        <BrowserRouter>
            <Routes>
                <PublicRoute path='/login' element={<Login />}/>
                <PrivateRoute path='/' element={<HomePage />} />               
                <Route path="/register" element={<Register />}/>
                <PrivateRoute path="/register/community" element={<RegisterCommunity />}/>
                <Route path='/community/:id' element={<Community/>}/>
                <Route path='/post/:id' element={<Post />}/>


            </Routes>
        </BrowserRouter>
    )
}