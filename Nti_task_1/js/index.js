const show_button = document.getElementById('show_btn');
const show_table = document.getElementById('show_table');



show_button.addEventListener('click', e => {
    e.preventDefault();
    show_button.style.display = 'none';
    show_table.style.display = 'block';
    showDataInView(readLocalData())
});

validate = () => {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}



 readFormData = () => {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value ;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

readLocalData = () => {
   let data
    try{
        data = JSON.parse(localStorage.getItem('Employees'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data = []
    }
    return data
}

const writeDataInLocalStorage = ( data ) =>{
    localStorage.setItem('Employees', JSON.stringify(data))
}

addNewEmpToLoacalStoreage = () => {
    let employees = JSON.parse(localStorage.getItem('Employees'));
    employees.push(readFormData());
    writeDataInLocalStorage(employees);
}

showDataInView = data => {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    data.map(a => {
        cell1 = newRow.insertCell(0).innerHTML = a.fullName;
        cell2 = newRow.insertCell(1).innerHTML = a.empCode;
        cell3 = newRow.insertCell(2).innerHTML = a.salary;
        cell4 = newRow.insertCell(3).innerHTML = a.city;
        cell4 = newRow.insertCell(4).innerHTML = `<button class="btn btn-danger ml-2" onClick="onDelete()">Delete</button>`;
    })
}

onsubmit = () => {
    if (validate()) {
        addNewEmpToLoacalStoreage();
        showDataInView(readLocalData());
        if (selectedRow != null)
            upadteRow(data);
              
    }
    resetForm();
    
    
}

resetForm = () => {
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onDelete(item) {
    const data = readLocalData()
    
    data.splice(item,1)
    writeDataInLocalStorage(data);
}



