$(document).ready(function() {
    $('#signup').submit(function(){
        let $idInput = $('#signup input[name=id]');
        let $pwdInput = $('#signup input[name=pwd]');
        let $repwdInput = $('#signup input[name=repwd]');
        let $name = $('#signup input[name=name]');
        if(!$idInput.val()){
            alert("아이디를 입력해주세요.");
            $idInput.focus();
            return false;
        }
        if(!$pwdInput.val()){
            alert("비밀번호를 입력해주세요.");
            $pwdInput.focus();
            return false;
        }
        if(!$repwdInput.val()){
            alert("비밀번호를 다시 한번 입력해주세요.");
            $repwdInput.focus();
            return false;
        }
        if(!$name.val()){
            alert("이름을 입력해주세요.");
            $name.focus();
            return false;
        }
        if($pwdInput.val() !== $repwdInput.val()){
            alert("비밀번호가 일치하지 않습니다.");
            return false;
        }
        return true;
    });
});