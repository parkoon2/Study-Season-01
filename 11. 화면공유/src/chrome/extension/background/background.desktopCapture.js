function getSelectedDesktopID( port, callback ) {
    const dataSoure = [ 'screen', 'window' ];

    let desktopMediaRequestId;
    /**
     * https://developer.chrome.com/extensions/desktopCapture
     *    params:
     * - 'dataSources' Set of sources that should be shown to the user.
     * - 'targetTab' Tab for which the stream is created.
     * - 'streamId' String that can be passed to getUserMedia() API
     */
    chrome.desktopCapture.chooseDesktopMedia ( dataSoure, port.sender.tab, function( streamId ) {
         console.log( 'streamId', streamId );
         if ( !streamId ) {
             console.log( '공유 취소' );
             return;
         }

         callback( null, streamId )
    })
}