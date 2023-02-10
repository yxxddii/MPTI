import React from 'react';
import './Lesson.css';
import axios from 'axios';
import OpenViduSession from 'openvidu-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const SERVER_URL = 'https://i8a803.p.ssafy.io';
const SERVER_SECRET = 'mpti';
const Lesson = ()=>{
    const location = useLocation()
    const userName = location.state.name
    const sessionId = location.state.sessionId
    const [token, setToken] = useState(undefined);
    const [session, setSession] = useState(undefined)
    useEffect(()=>{
    joinSession()
    }, [])
    //FUNCTIONS
    const handlerJoinSessionEvent=()=> {
        console.log('레슨방 입장');
    }
    const handlerLeaveSessionEvent= () =>{
        window.location.replace('/home')
        console.log('레슨방 떠나기');
    }
    const handlerErrorEvent=() => {
        console.log('Leave session');
        
    }
    const joinSession= () => {
        if (sessionId && userName) {
            getToken().then((token) => {
                setToken(token)
                setSession(true)
            });
        }
    }


    return(
        <div>
            {session === undefined ? (
                    <div id="join">
                    </div>
                ) : (
                    <div id="session">
                        <OpenViduSession
                            id="opv-session"
                            sessionName={sessionId}
                            user={userName}
                            token={token}
                            joinSession={handlerJoinSessionEvent}
                            leaveSession={handlerLeaveSessionEvent}
                            error={handlerErrorEvent}
                        />
                    </div>
                )}
        </div>
    )



    async function getToken() {
        return await createSession(sessionId)
            .then((sessionId)=> {console.log(sessionId); return createToken(sessionId)})
            .catch((Err)=>console.error(Err))
    }
    async function createSession(sessionId) {
        const data = JSON.stringify({customSessionId: sessionId});
        return axios.post(SERVER_URL+'/openvidu/api/sessions', data, {
            headers: {
                Authorization:'Basic ' + btoa('OPENVIDUAPP:' + SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log('세션을 만들었습니다 - ',response);
            return (response.data.id); //resolve
        })
        .catch((response => {
            const error = Object.assign({}, response);
            if (error.response && error.response.status === 409){
                
                return (sessionId); //resolve
            } else {
                console.log(error);
                console.warn('연결 못했습니다.');
                if ( window.confirm('certificate문제로 연결 못했습니다. OK 누르세요 ')) {
                    window.location.assign(SERVER_URL + '/accept-certificate');
                }
            }
        }))
    }

    async function createToken(sessionId) {
        const data = JSON.stringify({});
        return  axios
            .post(SERVER_URL+'/openvidu/api/sessions/'+ sessionId + '/connection', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
        })
        .then((response) => {
            console.log('TOKEN :', response.data);
            return (response.data.token); //resolve
        })
        .catch((error)=> console.log(error));
    }









    }

export default Lesson;