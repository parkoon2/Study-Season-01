module.exports = function( app, Chat ) {
	/** 모든 정보 */
	app.get( '/api/chats', function( req, res ) {
		Chat.find(function(err, chats){
	        if(err) return res.status(500).send({error: 'database failure'});
	        res.json(chats);
	    })
	});
	/** 데이터 가져오기 */
	/*app.get( '/api/chats/:chat_id', function( req, res ) {
		Chat.findOne({_id: req.params.book_id}, function(err, chat){
	        if(err) return res.status(500).json({error: err});
	        if(!chat) return res.status(404).json({error: 'chat not found'});
	        res.json(chat);
	    })
    });
	app.get( '/api/chats/chat_name/:chat_name', function( req, res ) {
		Chat.find({ chat_name: req.params.chat_name }, { _id: 0, chat_password: 1 }, function( err, books ) {
	        if( err ) return res.status( 500 ).json({ error : err });
	        if( chats.length === 0 ) return res.status( 404 ).json({ error : 'chat not found' });
	        res.json( chats );
	    })
    });*/
	/** 생성 */
	/*app.post( '/api/chats', function( req, res ) {
		let chat = new Chat();
		chat.chat_name = req.body.chat_name;
		chat.chat_password = req.body.chat_password;

		chat.save( function( err ) {
	        if(err){
	            console.error( err );
	            res.json({ result : 0 });
	            return;
	        }

	        res.json({ result : 1 });

	    });
    });*/
	/** 수정 */
	/*app.put( '/api/chats/:chat_id', function( req, res ) {*/
		/** chat_id 를 찾아서 document를 수정*/
		/*Chat.findById(req.params.chat_id, function(err, chat){
	        if(err) return res.status(500).json({ error : 'database failure' });
	        if(!chat) return res.status(404).json({ error : 'chat not found' });

	        if( req.body.chat_name ) chat.chat_name = req.body.chat_name;
	        if( req.body.chat_password ) chat.chat_password = req.body.chat_password;

	        chat.save(function( err ) {
	            if( err ) res.status(500).json({ error : 'failed to update' });
	            res.json({ message : 'chat updated' });
	        });

	    });*/
		/** document 조회하지 않고 수정 */
		/*Chat.update({ _id: req.params.chat_id }, { $set: req.body }, function(err, output){
	        if(err) res.status(500).json({ error: 'database failure' });
	        console.log(output); // output 은 mongod 에서 출력하는 결과물
	        if(!output.n) return res.status(404).json({ error : 'chat not found' });
	        res.json( { message : 'chat updated' } );
	    })
    });*/
	/** 삭제 */
	/*app.delete( '/api/chats/:chat_id', function( req, res ) {
		Chat.remove({ _id : req.params.chat_id }, function( err, output ) {
			if(err) return res.status(500).json({ error: 'database failure' });

			res.status(204).end();
		})
    });*/
	


}
