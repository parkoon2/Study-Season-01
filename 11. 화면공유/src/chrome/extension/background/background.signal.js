chrome.runtime.onConnect.addListener(function( port ) {
    port.onMessage.addListener(function( message ) {
        
        let data;

        /**
         * JSON.stringify 해서 넘어 온 데이터를 디코딩 시키려고하는데
         * 현재 개발된 다른 Chrome Extension에서 객체를 넘겨주고 있네
         * 예외처리!
         */
        if ( typeof message === 'string' ) {
            data = JSON.parse( message )
        } else {
            data = {}
        }

        if ( data.cmd && data.cmd === "get:desktop" ) {
            getSelectedDesktopID( port, function( err, result ) {
                if ( err ) {
                    console.error( err )
                    return;
                }

                let cmd = 'done:capture';

                port.postMessage({
                    cmd,
                    result,
                })
            })
        }
        
    })
});