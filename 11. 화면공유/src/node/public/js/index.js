(function( global ) {

    const getIdBtn = document.getElementById( 'getIdBtn' );

    getIdBtn.addEventListener( 'click', getIdHandler );
    window.addEventListener( 'capturedone', captureDoneHandler );

    function getIdHandler() {
        const cmd = 'get:desktop';
        sendMessage({
            cmd,
        })
    }

    function captureDoneHandler( e ) {
        let streamId = e.detail.result;
        webrtc.getMedia( streamId, function() {
            
        });
        //console.log('stream', stream)
        // 이제 이 아이디값을 가지고 화면을 공유하면 되는데....
    }

    function sendMessage( message ) {
        window.postMessage( JSON.stringify(message), 'http://localhost:7777' );
    }
})( this );