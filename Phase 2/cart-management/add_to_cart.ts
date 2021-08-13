
class Item {
    amount = 0;
    constructor(public name:string, public price:number, public image?:any){}
    dis(): void {
        console.log("item name "+this.name);
        console.log("price is "+this.price);
        console.log("image source is "+this.image);
        console.log("In shopping Cart: "+this.amount);
    }  
}

let myCart:Array <Item> = new Array();

function pushItem(name:string, cost:number,img:string) {
    console.log("pushItem function was called");
    let newObj:Item = new Item(name, cost, img);

    if (sessionStorage.myCart){
        myCart = JSON.parse(sessionStorage.getItem('myCart'))
    }

    newObj.amount++;
    myCart.push(newObj);
    sessionStorage.setItem("myCart", JSON.stringify(myCart));

    console.log(newObj);
    console.log(myCart);
}
