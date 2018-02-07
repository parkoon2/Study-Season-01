(function() {
    let port = chrome.runtime.connect( chrome.runtime.id );
   
    console.log( 'chrome id ::: ', chrome.runtime.id, port )

    window.addEventListener( 'message', function( message ) {
        
        let data = message.data;

        port.postMessage( data )
    })


    port.onMessage.addListener(function( message ) {
        console.log('c_message', message)

        let event, eventName

        if ( message.cmd === 'done:capture' ) {
            eventName = 'capturedone';
            event = new CustomEvent( eventName, {
                detail: {
                    result: message.result
                }
            });
        }

        window.dispatchEvent( event );
    });

})();

