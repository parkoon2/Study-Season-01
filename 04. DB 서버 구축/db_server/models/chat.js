const mongoose = require( 'mongoose' );

/** 스키마 선언 */
let Schema = mongoose.Schema;

let chatSchema = new Schema({
	chat_name : String,
	chat_password : String
});
/** 첫 번째 인자 chat 은 해당 document 가 사용할 collection 의 단수적 표현 */
module.exports = mongoose.model('chat', chatSchema);