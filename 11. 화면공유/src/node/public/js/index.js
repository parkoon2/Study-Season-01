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

    startBtn.addEventListener( 'click', startHandler );
    endBtn.addEventListener( 'click', endHandler );
    window.addEventListener( 'capturedone', captureDoneHandler );


    socket.on( 'webrtc', function( message ) {
        message = JSON.parse( message );

        if ( message.cmd === 'offer' ) {
            onOffer( message.data );
        } else if ( message.cmd === 'answer' ) {
            onAnswer( message.data );
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

            ;

            console.log( 'peer 만들어짐!', peer );

            peer.createOffer(function( offerSdp ) {
                console.log( 'offer', offerSdp )

                let message = {
                    cmd: 'offer',
                    data: offerSdp
                }

                socket.emit( 'webrtc', JSON.stringify(message) );

            }, function( error ) {
                return new Error( error );
            })



            peer.onicecandidate = function( event ) {
                console.log( '!!!!!!!!!!!!!!!!!!!!!!!!!!!! 호출이냥' );
            }
            
        });
        //console.log('stream', stream)
        // 이제 이 아이디값을 가지고 화면을 공유하면 되는데....
    }

    function onOffer( offerSdp ) {
        peer.setRemoteDescription( new RTCSessionDescription(offerSdp) );
        console.log('In onOffer...', peer)
        
        peer.createAnswer(function( answerSdp ) {
            console.log('answerSdpzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', answerSdp)
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
        console.log( 'In onAnswer', answerSdp );
        peer.setRemoteDescription( new RTCSessionDescription(answerSdp) );
    }

    function sendMessage( message ) {
        window.postMessage( JSON.stringify(message), 'http://localhost:7777' );
    }
})( this );