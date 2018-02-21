(function( global ) {

    const startBtn = document.querySelector( '#startBtn' );
    const endBtn = document.querySelector( '#endBtn' );
    const screen1  = document.querySelector( '#screen1' );

    let peer, stream;
    let socket = io();

    const configuration = {
        "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
    }

    peer = new webkitRTCPeerConnection( configuration )

// let the 'negotiationneeded' event trigger offer generation
    peer.onnegotiationneeded = function () {
        console.log("on negotiation called");
    }

    peer.onaddstream = function ( event ) {
        console.log("going to add their stream...", event );
        screen1.src = URL.createObjectURL( event.stream );
	};


    startBtn.addEventListener( 'click', startHandler );
    endBtn.addEventListener( 'click', endHandler );
    window.addEventListener( 'capturedone', captureDoneHandler );


    socket.on( 'webrtc', function( message ) {
        message = JSON.parse( message );
        console.log( 'message.cmdmessage.cmdmessage.cmd', message.cmd );
        if ( message.cmd === 'offer' ) {
            onOffer( message.data );
        } else if ( message.cmd === 'answer' ) {
            onAnswer( message.data );
        } else if ( message.cmd === 'candidate' ) {
            onCandidate( message.data )
        }
    })

    function startHandler() {
        const cmd = 'get:desktop';
        sendMessage({
            cmd,
        })
    }

    function endHandler() {
        if ( stream ) {
            /**
             * 트랙 지우기
             */
            stream.removeTrack( stream.getVideoTracks()[0] ); 
            screen1.src = null;
        }
    }

    function captureDoneHandler( e ) {
        let streamId = e.detail.result;
        webrtc.getMedia( streamId, function( err, result ) {
            if ( err ) {
                throw new Error( err );
            }

            stream = result;
            screen1.src = window.URL.createObjectURL( stream );
            peer.addStream( stream )
            
            //peer = new webkitRTCPeerConnection( configuration );

            console.log( 'peer 만들어짐!', peer );
            

            peer.createOffer(function( offerSdp ) {
                console.log( 'offer', offerSdp )

                peer.setLocalDescription( offerSdp )

                let message = {
                    cmd: 'offer',
                    data: offerSdp
                }

                socket.emit( 'webrtc', JSON.stringify(message) );

            }, function( error ) {
                return new Error( error );
            })


            peer.onaddstream = function( event ) {
                console.log('onaddstreamonaddstreamonaddstream')
            }
            peer.onicecandidate = function( event ) {
                
                if ( event.candidate ) {
                    let message = {
                        cmd: 'candidate',
                        data: event.candidate
                    }
                    socket.emit( 'webrtc', JSON.stringify(message) );
                }


                console.log( '!!!!!!!!!!!!!!!!!!!!!!!!!!!! 호출이냥', event );
            }
            
        });
        //console.log('stream', stream)
        // 이제 이 아이디값을 가지고 화면을 공유하면 되는데....
    }

    function onCandidate( candidate ) {

        peer.addIceCandidate( new RTCIceCandidate(candidate) );
    }

    function onOffer( offerSdp ) {
        console.log('In onOffer...', peer)
        peer.setRemoteDescription( new RTCSessionDescription(offerSdp) );
        
        peer.createAnswer(function( answerSdp ) {
            
            peer.setLocalDescription( answerSdp )

            let message = {
                cmd: 'answer',
                data: answerSdp
            }

            socket.emit( 'webrtc', JSON.stringify(message) );            
        }, function( error ) {
            throw new Error( error );
        })
    }

    function onAnswer( answerSdp ) {
        console.log( 'In onAnswer', peer );
        //  Failed to set remote answer sdp
       // peer.setLocalDescription( new RTCSessionDescription(answerSdp) );
        peer.setRemoteDescription( new RTCSessionDescription(answerSdp) );
    }

    function sendMessage( message ) {
        window.postMessage( JSON.stringify(message), 'http://localhost:7777' );
    }
})( this );