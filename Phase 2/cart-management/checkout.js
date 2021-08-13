var runningTotal = 0;
var cart = sessionStorage.getItem("myCart");
var cartJson = new Array();
cartJson = JSON.parse(cart);
console.log("My cart has " + cartJson);
var DataInTableFormat = "   \n                                <table border=1 width=\"500px\">\n                                <tr><th>Name</th><th>Price</th><th>Image</th></tr>\n                            ";
document.write(DataInTableFormat);
for (var i = 0; i < cartJson.length; i++) {
    runningTotal = runningTotal + cartJson[i].price;
    if (cartJson[i].image) {
        var imgElement = document.createElement('img');
        imgElement.setAttribute('src', cartJson[i].image);
        document.write('<tr><td>' + cartJson[i].name + '</td><td>' + cartJson[i].price + '</td><td><img src="' + cartJson[i].image + '"></td></tr>');
    }
    else {
        document.write('<tr><td>' + cartJson[i].name + '</td><td>' + cartJson[i].price + '<td> No Picture </td>');
    }
}
document.write('</table>');
document.write('<h3> Cart Total: ' + runningTotal + ' </h3>');
