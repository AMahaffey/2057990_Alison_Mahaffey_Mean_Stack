function makePost(){
    let title = document.getElementById("title").value;
    let text = document.getElementById("content").value;
    let imgSrc = document.getElementById("img").value;
    console.log(title);
    console.log(text);
    console.log(imgSrc);

    var myPost = document.createElement("div");
    myPost.setAttribute('class', 'my-post');

    var myTitleText = document.createTextNode(title);
    var myContentText = document.createTextNode(text);

    var titleElement = document.createElement("h5");
    titleElement.appendChild(myTitleText);
    titleElement.setAttribute('style','background-color:rgb(139, 194, 191); text-align:center; color:white');

    var contentElement = document.createElement("p");
    contentElement.appendChild(myContentText);

    myPost.appendChild(titleElement);
    myPost.appendChild(contentElement);
    if(imgSrc){
        var imgElement = document.createElement("img");
        imgElement.setAttribute('src', imgSrc);
        myPost.appendChild(imgElement);
    }
    console.log(myPost);

    document.getElementById("all-posts").appendChild(myPost);
    
}