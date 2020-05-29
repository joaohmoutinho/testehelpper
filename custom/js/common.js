/**
 * Método que faz uma requisição get
 * @param {*} theUrl - URL da requisição
 * 
 */
function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * Método que completa as informações de endereço do usuário
 * @param {*} elm - Elemento onde o value é o CEP
 */
function completeAddressInfos(elm) {
    document.getElementById('address').value = "";
    document.getElementById('city').value = "";
    document.getElementById('state').value = "";
    document.getElementById('neighbourhood').value = "";

    var cep = "";

    //valida o cep
    if(elm.value.length != 8) {
        alert("É necessário que o CEP tenha 8 dígitos!")
        return false;
    }

    cep = elm.value;

    var requestUrl = "https://viacep.com.br/ws/"+cep+"/json/";
    var complete_address = JSON.parse(httpGet(requestUrl));

    if(!complete_address['erro']) {
        document.getElementById('address').value = complete_address['logradouro'];
        document.getElementById('city').value = complete_address['localidade'];
        document.getElementById('state').value = complete_address['uf'];
        document.getElementById('neighbourhood').value = complete_address['bairro'];
    }
}

/**
 * Método de envio do formulário
 * 
 */
var selectedRow = null
function onFormSubmit(){
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
        else
        updateRecord(formData);
    
    resetForm();    
}

/**
 * Método que le as informações nos inputs para montar o objeto de informações do usuário
 */
function readFormData() {
    var  formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["telephone"] = document.getElementById("telephone").value;
    formData["cep"] = document.getElementById("cep").value;
    formData["address"] = document.getElementById("address").value;
    formData["address_number"] = document.getElementById("address_number").value;
    formData["neighbourhood"] = document.getElementById("neighbourhood").value;
    formData["city"] = document.getElementById("city").value;
    formData["state"] = document.getElementById("state").value;
    return formData;
}

/**
 * Método que insere um novo registro na tabela
 * @param {*} data - objeto com as informações do usuário (objeto montado no método readFormData)
 * 
 */
function insertNewRecord(data) {
    var table = document.getElementById("tablelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.telephone;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.cep;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.address;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.address_number;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.neighbourhood;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.city;
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = data.state;
    cell10 = newRow.insertCell(9);
    cell10.innerHTML = `<a onClick="onEdit(this)" class="btn_edit">Editar</a>
                        <a onClick="onDelete(this)" class="btn_ed">Deletar</a>`;
}

/**
 * Método que limpa os inputs do formulário
 * 
 */
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("address").value = "";
    document.getElementById("address_number").value = "";
    document.getElementById("neighbourhood").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
}

/**
 * Método que possibilita a edição de dados
 * @param {*} td - linha a ser editada
 */
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("telephone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cep").value = selectedRow.cells[3].innerHTML;
    document.getElementById("address").value = selectedRow.cells[4].innerHTML;
    document.getElementById("address_number").value = selectedRow.cells[5].innerHTML;
    document.getElementById("neighbourhood").value = selectedRow.cells[6].innerHTML;
    document.getElementById("city").value = selectedRow.cells[7].innerHTML;
    document.getElementById("state").value = selectedRow.cells[8].innerHTML;
}

/**
 * Método que faz atualiza os dados editados
 * @param {*} formData - Objeto atualizado
 * 
 */
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.telephone;
    selectedRow.cells[3].innerHTML = formData.cep;
    selectedRow.cells[4].innerHTML = formData.address;
    selectedRow.cells[5].innerHTML = formData.address_number;
    selectedRow.cells[6].innerHTML = formData.neighbourhood;
    selectedRow.cells[7].innerHTML = formData.city;
    selectedRow.cells[8].innerHTML = formData.state;
}

/**
 * Método que delete uma row
 * @param {*} td - linha a ser deletada
 * 
 */
function onDelete(td) {
    if (confirm('Você tem certeza que deseja excluir esse registro?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tablelist").deleteRow(row.rowIndex);
        resetForm();
    } 
        
}