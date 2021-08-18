var BASE_URL = "https://projeto01-ecommerce-backend.herokuapp.com"

// Método para limpar o formulário do modal
function limparFormns() {
    document.getElementById('formnsModalCadastro').reset();
}

// Método para limpar alert de erros
function limparAlert(){
    document.getElementById('alertName').innerHTML = "";
    document.getElementById('alertEmail').innerHTML = ""; 
}
 
// Método para manipular os botões do modal cadastro
function responseSucesso(){
    $('#btnLoading').prop("style",'display:none');
	$('#btnCadastrar').show();
    $('#alertSucesso').show();
    $('#alertInf').show();
}

// Método para resetar o modal de cadastro
function fecharModal(){
    $('#alertSucesso').prop("style",'display:none');
    $('#alertInf').prop("style",'display:none');
    $('#cadastroModal').on('hidden.bs.modal', function (){
        $(this).find('form').trigger('reset');
    })
    limparAlert();
}

// Método para 'Cadastrar' usuário no banco de dados
async function salvarUsuario() {
    $('#btnCadastrar').prop("style",'display:none');
	$('#btnLoading').show();
    limparAlert();

    let name = document.getElementById('name').value
    let email = document.getElementById('email').value

    user = { id: null, name, email }

    await $.ajax({
        method: "POST",
        url: `${BASE_URL}/users`,
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            //alert("Cadastro realizado com sucesso!\n"
            //+"Você receberá um email de nossa Equipe");
            limparFormns();
            responseSucesso();
            limparAlert();
        }

    }).fail(function (xhr, status, errorThrown) {
        if(xhr.responseJSON.error == "Erro de validação"){
            alertError(xhr.responseJSON.errors);
        }else if (xhr.responseJSON.error == "Duplicate email") {
        //$('#alertEmail').append(" " + xhr.responseJSON.message)
            document.getElementById('alertEmail').innerHTML = xhr.responseJSON.message
        } else {
            alert(xhr.responseJSON.message);
        }
        //   alert(xhr.responseJSON.message);
        //   alertError(xhr.responseJSON.errors);
        limparFormns();
        $('#btnLoading').prop("style",'display:none');
		$('#btnCadastrar').show();
    });
}

let errorsClass = [
    erro = {
       fieldName : 'String',
       message : 'String'
    }
];

function alertError(obj){
    // Objeto de referencia
    errorsClass = obj;
    // aplicando o lambda no array de objeto e utilizando operado ternário
    errorsClass.forEach(
       item => (item.fieldName == "name" ? 
        document.getElementById('alertName').innerHTML = item.message :
        document.getElementById('alertEmail').innerHTML = item.message)
    );
}
