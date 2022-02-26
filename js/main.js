var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var addBookmarkBtn = document.getElementById('addbookmark');
var inputs = document.getElementsByClassName('form-control');
var tbody= document.getElementById('tbody');
var search = document.getElementById('search');
var errorUrl = document.getElementById('errorUrl');
var alert = document.getElementById('alert');
var currentIndex ;
var bookmarks ;

if(localStorage.getItem('bookmarks') == null)
{
    bookmarks =[] 
}
else
{
    bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmark();
}

addBookmarkBtn.onclick = function()
{
    if(addBookmarkBtn.innerHTML=="Add Bookmark")
    {
        addBookmark();
    }
    else
    {
        updateBookmark();
    }
    
    displayBookmark();
    clearForm();
}

function addBookmark()
{
        var bookmark =
    {
        name:siteName.value,
        url:siteUrl.value
    }
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));
    
}

function displayBookmark()
{
    var container = '';
    for(var i =0 ; i<bookmarks.length ; i++)
    {
        container+=
        `<tr>
        <td> ${bookmarks[i].name} </td>
        <td><a href="${bookmarks[i].url}" class="btn btn-primary " tabindex="-1" role="button" aria-disabled="true">Visit</a></td>
        <td> <button class="btn btn-warning" onclick="getbookmark(${i})">Update</button> </td>
        <td> <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button> </td>
        </tr>`
    }
    tbody.innerHTML=container;
}

function clearForm()
{
    for(var i = 0 ; i<inputs.length ; i++)
    {
        inputs[i].value = "";
    }
}

function deleteBookmark(index)
{
    bookmarks.splice(index , 1);
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks));
    displayBookmark();
}

search.onkeyup = function()
{
    var container = '';
    for(var i = 0 ; i<bookmarks.length ; i++)
    {
        if(bookmarks[i].name.toLowerCase().includes(search.value.toLowerCase()))
        {
            container+=
        `<tr>
        <td> ${bookmarks[i].name} </td>
        <td><a href="${bookmarks[i].url}" class="btn btn-primary " tabindex="-1" role="button" aria-disabled="true">Visit</a></td>
        <td> <button class="btn btn-warning" onclick="getbookmark(${i})">Update</button> </td>
        <td> <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button> </td>
        </tr>`
        }
    }
    tbody.innerHTML=container;
}

function getbookmark(index)
{
    currentIndex = index ;
    siteName.value = bookmarks[index].name;
    siteUrl.value = bookmarks[index].url;
    addBookmarkBtn.innerHTML="Update Bookmark";
    addBookmarkBtn.classList.add('btn-warning');
}

function updateBookmark()
{
    var bookmark =
    {
        name :siteName.value,
        url:siteUrl.value
    }
    bookmarks[currentIndex].name = bookmark.name;
    bookmarks[currentIndex].url = bookmark.url;
    
    displayBookmark();
    localStorage.setItem("bookmarks" ,JSON.stringify(bookmarks) );
    addBookmarkBtn.innerHTML="Add Bookmark";
    addBookmarkBtn.classList.remove('btn-warning');
}

siteUrl.onkeyup=function()
{
    regexUrl=/^(https:\/\/|http:\/\/)www\.[a-zA-Z0-9@:%._\+~#=]{3,32}\.[a-zA-Z]{2,6}$/i;
    if(regexUrl.test(siteUrl.value))
    {
        siteUrl.classList.add('is-valid');
        siteUrl.classList.remove('is-invalid');
        addBookmarkBtn.removeAttribute('disabled')
    }
    else
    {
        siteUrl.classList.add('is-invalid');
        siteUrl.classList.remove('is-valid');
        alert.classList.remove('d-none');
        addBookmarkBtn.disabled="true";
        
    }
}

