var BASE_URL = "https://projeto01-ecommerce-backend.herokuapp.com"

// Método para limpar o formulário do modal
function limparFormns() {
    document.getElementById('formnsModalCadastro').reset();
}

// Método para 'Cadastrar' usuário no banco de dados
async function salvarUsuario() {

    $('#btnCadastrar').prop("style",'display:none');
	$('#btnLoading').show();
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value

    user = { id: null, name, email }

    await $.ajax({
        method: "POST",
        url: `${BASE_URL}/users`,
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            alert("Cadastro realizado com sucesso!\n"
            +"Você receberá um email de nossa Equipe");
            limparFormns();
            $('#btnLoading').prop("style",'display:none');
			$('#btnCadastrar').show();
        }

    }).fail(function (xhr, status, errorThrown) {
          alert(xhr.responseJSON.message);
          limparFormns();
          $('#btnLoading').prop("style",'display:none');
		  $('#btnCadastrar').show();
    });
}
