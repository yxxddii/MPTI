import React from "react"
import { useRef, useEffect } from "react"
const OvVideo = (props) => {
    const video = useRef()
    useEffect(()=>{
        if (props && props.user.streamManager && !!video.current) {
            props.user.getStreamManager().addVideoElement(video.current);
          }
    
          if (props && props.user.streamManager.session && props.user && !!video) {
            props.user.streamManager.session.on('signal:userChanged', (event) => {
              let data = JSON.parse(event.data);
    
              if (data.isScreenShareActive !== undefined) {
                props.user.getStreamManager().addVideoElement(video.current);
              }
            });
          }
    },[])
    
    // 여기는 !한개면 됌.
    if(props && !!video.current){
        props.user.getStreamManager().addVideoElement(video.current)
    }

    return <div>
        <video id={`video-${props.user.getStreamManager().stream.streamId}`} ref={video} autoPlay={true} muted={props.mutedSound}/>
    </div>
}

export default OvVideo