(function( global ) {
    
    function getMedia( streamId, callback ) {

        // let constraints = {
        //     video: true,
        //     audio: true
        // }

        let constraints = {

            audio: false,
            video: {
                mandatory: {
                    chromeMediaSourceId: streamId,
                    chromeMediaSource: 'desktop',
                    maxWidth: window.screen.width,
                    maxHeight: window.screen.height
                    //...
              }
            }
        }


        if ( hasUserMedia() ) {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            navigator.getUserMedia( constraints, function( stream ) {
                console.log('stream',stream)
                callback( null, stream );
            }, function( err ) {
                callback( err, null);
            })
        }
    }


    function hasUserMedia() {
        // `!!`를 이용해 객체의 유무를 true/false로 강제 변환
        return !!( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia );
    }

    global.webrtc = {
        getMedia,
    }
})( this );

