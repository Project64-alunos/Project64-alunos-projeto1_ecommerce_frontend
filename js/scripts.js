var BASE_URL = "https://wideecommerce.herokuapp.com"

// Método para limpar o formulário do modal
function limparFormns() {
    document.getElementById('formnsModalCadastro').reset();
}

// Método para 'Cadastrar' usuário no banco de dados
async function salvarUsuario() {

    let name = document.getElementById('name').value
    let email = document.getElementById('email').value

    user = { id: null, name, email }

    await $.ajax({
        method: "POST",
        url: `${BASE_URL}/users`,
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            alert("Cadastro realizado com sucesso!");
            limparFormns();
        }

    }).fail(function (xhr, status, errorThrown) {
        if (xhr.responseJSON.error == "Bad Request") {
            alert("Error ao salvar! Preencha os campos vazios.");
        }
        alert(xhr.responseJSON.error);
        limparFormns();
    });
}