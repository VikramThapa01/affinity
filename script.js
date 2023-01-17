let reset_btn = document.getElementById("reset")
let form = document.getElementById("persnal");
let submit_btn = document.getElementById("submit");
let universal_error = document.getElementById("universal_error");
let insert_msg = document.getElementById("insert_msg");



// All fields 
let first_name_val = document.getElementById("first_name");
let last_name_val = document.getElementById("last_name");
let email_val = document.getElementById("email");
let phone_val = document.getElementById("phone");
let gender_val = document.getElementById("gender");
let marks_val = document.getElementById("marks");
let age_val = document.getElementById("age");

let disp_table_data = document.getElementById("disp_table_data");;

// All error fields
let first_name_error = document.getElementById("first_name_error")
let last_name_error=document.getElementById("last_name_error")
let email_error=document.getElementById("email_error")
let phone_error=document.getElementById("phone_error")
let gender_error=document.getElementById("gender_error")
let marks_error=document.getElementById("marks_error")
let age_error=document.getElementById("age_error")

let all_validate=true;

function first_name_validation(){
    let fn_name = first_name_val.value;
    let letters = /^[A-Za-z]+$/;
    if(fn_name==""){
        first_name_error.innerHTML="Please enter the first name."
        submit_btn.disabled=true;
    }else if(!fn_name.match(letters)){
        first_name_error.innerHTML="string only contains letters";
        submit_btn.disabled=true;
    }else{
        first_name_error.innerHTML="";
        submit_btn.disabled=false;
    }
}

function last_name_validation(){
    let ln_name = last_name_val.value;
    let letters = /^[A-Za-z]+$/;
    if(ln_name==""){
        last_name_error.innerHTML="Please enter the last name."
        submit_btn.disabled=true;
    }else if(!ln_name.match(letters)){
        last_name_error.innerHTML="string only contains letters";
        submit_btn.disabled=true;
    }else{
        last_name_error.innerHTML="";
        submit_btn.disabled=false;
    }
}

function phone_validation(){
    let ph_no = phone_val.value;
    let reg = /^\d+$/;
    if(ph_no==""){
        phone_error.innerHTML="Please enter the phone number."
        submit_btn.disabled=true;
    }else if(!ph_no.match(reg)){
        phone_error.innerHTML="Mobile number should contains digit only"
        submit_btn.disabled=true;
    }else if(ph_no.length<10 || ph_no.length>10){
        phone_error.innerHTML="Mobile number should be of 10 digit."
        submit_btn.disabled=true;
    }else{
        phone_error.innerHTML=""
        submit_btn.disabled=false;
    }
}

gender_val.addEventListener("click",()=>{

    if(gender_val.value==""){
        gender_error.innerHTML="Please select Gender.";
        submit_btn.disabled=true;
    }else{
        gender_error.innerHTML="";
        submit_btn.disabled=false;
    }
})

function marks_validation(){
    let marks = marks_val.value;
    console.log(marks);
    if(marks.includes(".")){
        var after_digit = marks.split(".")[1];
    }
    console.log(after_digit);
    if(marks==""){
        marks_error.innerHTML="Marks cannot be empty."
        submit_btn.disabled=true;
    }else if(isNaN(marks)){
        marks_error.innerHTML="Marks should contains digit only"
        submit_btn.disabled=true;
    }else if(marks<0 || marks>100){
        marks_error.innerHTML="Marks percentage should be in 0-100."
        submit_btn.disabled=true;
    }else if(after_digit!=undefined){
        if(after_digit.length>2){
            marks_error.innerHTML="2 digit after decimal please."
            submit_btn.disabled=true;
        }else{
            marks_error.innerHTML=""
            submit_btn.disabled=false;
        }     
    }
    else{
        marks_error.innerHTML=""
        submit_btn.disabled=false;
    }
}

function age_validation(){
    let age = age_val.value;
    let number_only = /^[1-9]\d*$/g;
    
    if(age==""){
        age_error.innerHTML="Age cannot be empty."
        submit_btn.disabled=true;
    }else if(!age.match(number_only)){
        age_error.innerHTML="Age should be of whole number and contains digit only."
        submit_btn.disabled=true;
    }else{
        age_error.innerHTML=""
        submit_btn.disabled=false;
    }
}

reset_btn.addEventListener("click",()=>{
    submit_btn.disabled=false;
    universal_error.innerHTML="";
    insert_msg.innerHTML="";
    first_name_error.innerHTML="";
    last_name_error.innerHTML="";
    phone_error.innerHTML="";
    gender_error.innerHTML="";
    marks_error.innerHTML="";
    age_error.innerHTML="";
})

$(document).ready(function(){

    $.ajax({
        type:"POST",
        url:"process.php",
        data:"",
        success: (data) => {
            var html="";
            ret = JSON.parse(data);
            console.log(ret);
            html = create_table(ret.select);
            disp_table_data.innerHTML = html;
            var editButton = document.querySelectorAll(".edit_info");
            edit_function(editButton,ret.select);
        }
    });

});

function resume_line(){
    console.log("Clicked");
    //console.log(id);
}

function edit_function(editButton,data){
    let html="";
    Array.from(editButton).map(function (edit_button){
        edit_button.addEventListener("click",function (){
            let button_parent_ele = edit_button.parentNode.parentNode;
            let clicked_button_id = edit_button.getAttribute("id");
            data.map(function (each_data){
                if(clicked_button_id == each_data.id){
                    html = "<tr><td>"+each_data.id+"</td><td><input type='text' value="+each_data.first_name+"></td><td><input type='text' value="+each_data.last_name+"></td><td><input type='text' value="+each_data.emailid+"></td><td><input type='text' value="+each_data.phone+"></td><td><select name='gender' id='gender' style='width: 100% !important;'><option value=''>Select</option><option value='male'>Male</option><option value='female'>Female</option><option value='other'>Other</option><option value='Prefer not to answer'>Perfer not to Answer</option></select></td><td><input type='text' value="+each_data.marks+"></td><td><input type='text' value="+each_data.age+"></td><td><button class='edit_info_save' id="+each_data.id+" title='save'><i class='fa fa-save'></i></button>&nbsp;&nbsp;<button class='edit_info_close' id="+each_data.id+" title='close' onclick=resume_line()>&#x2718;</button></td></tr>";
                }
            })
            button_parent_ele.innerHTML = html;
        })
    })
}

submit_btn.addEventListener("click",()=>{
    if(first_name_val.value=="" || last_name_val.value=="" || email_val.value=="" || phone_val.value==""||gender_val.value==""||marks_val.value==""||age_val.value==""){
        universal_error.innerHTML = "Please insert value in all the fields.";
        return false;
    }else{
        universal_error.innerHTML="";
    }

    var formData = {
        first_name: first_name_val.value,
        last_name: last_name_val.value,
        email: email_val.value,
        phone: phone_val.value,
        gender: gender_val.value,
        marks: marks_val.value,
        age: age_val.value
    };  

    $.ajax({
        type:"POST",
        url:"process.php",
        data:formData,
        success: (data) => {
            var html="";
            ret = JSON.parse(data);
            console.log(ret.select);
            if(ret.error_code==0){
                insert_msg.innerHTML = ret.error;
                html = create_table(ret.select);
                disp_table_data.innerHTML = html;
                setTimeout(()=>reset_btn.click(), 1000);
            }else{
                insert_msg.innerHTML = ret.error;
                insert_msg.style.color = "#f4dede";
            }
            
        }
    });
        
})
    
function create_table(data){
    var table_html=`<tr style="background: #077dd5;color: white;">
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email ID</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Marks</th>
                    <th>Age</th>
                    <th>Edit</th>
                </tr>`;
    if(data.length>0){
        data.forEach(element => {
            table_html += `
                        <tr>
                            <td>${element.id}</td>
                            <td>${element.first_name}</td>
                            <td>${element.last_name}</td>
                            <td>${element.emailid}</td>
                            <td>${element.phone}</td>
                            <td>${element.gender}</td>
                            <td>${element.marks}</td>
                            <td>${element.age}</td>
                            <td><button class="edit_info" id=${element.id} title="edit"><i class='fas fa-edit'></i></button></td>
                        </tr>`;
        });
    }else{
        table_html += `
                        <tr style="text-align: center;">
                            <td colspan="8">No data</td>
                        </tr>`;
    }
    
    return table_html
}


