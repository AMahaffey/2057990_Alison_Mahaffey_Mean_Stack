var Item = /** @class */ (function () {
    function Item(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.amount = 0;
    }
    Item.prototype.dis = function () {
        console.log("item name " + this.name);
        console.log("price is " + this.price);
        console.log("image source is " + this.image);
        console.log("In shopping Cart: " + this.amount);
    };
    return Item;
}());
var myCart = new Array();
function pushItem(name, cost, img) {
    console.log("pushItem function was called");
    var newObj = new Item(name, cost, img);
    if (sessionStorage.myCart) {
        myCart = JSON.parse(sessionStorage.getItem('myCart'));
    }
    newObj.amount++;
    myCart.push(newObj);
    sessionStorage.setItem("myCart", JSON.stringify(myCart));
    console.log(newObj);
    console.log(myCart);
}
