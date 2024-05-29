var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var tableBody = document.getElementById('table-body');
var submitBtn = document.getElementById('submit-btn');
var websites;
if(localStorage.getItem('list') == null){
    websites = []
}
else{
    websites = JSON.parse(localStorage.getItem('list'))
    display()
}

submitBtn.onclick = function(){
    adding()
    
    
}

function adding(){
    if(validation(siteName) && validation(siteUrl)){
        var bookmark = {
            bookmarkName : siteName.value,
            url : siteUrl.value
        }
        websites.push(bookmark)
        localStorage.setItem('list',JSON.stringify(websites))
        clearForm()
        console.log(websites);
        display()
    }
    
}

function clearForm(){
    siteName.value = null
    siteUrl.value = null
}

function display(){
    var box = ''
    for(var i=0;i<websites.length;i++){
        box+=`<tr>
        <td scope="row">${i + 1}</td>
        <td>${websites[i].bookmarkName}</td>
        <td><a href="${websites[i].url}" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><button class="btn btn-danger" onclick = 'deleting(${i})'><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    }
    tableBody.innerHTML = box;
}

function deleting(i){
    websites.splice(i,1)
    display()
    localStorage.setItem('list',JSON.stringify(websites))
}

function validation(inp) {
    var regex = {
        siteName : /^[\w]{3,}$/,
        siteUrl : /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
    }
    if(regex[inp.id].test(inp.value)){
        inp.classList.add('is-valid')
        inp.classList.remove('is-invalid')
        return true
    }
    else{
        inp.classList.add('is-invalid')
        inp.classList.remove('is-valid')
        return false
    }
}