import {Component,ApplicationRef} from "@angular/core";
import {Model} from "./repository.model";
import {Product} from "./product.model";
import {NgForm} from "@angular/forms";
import {ProductFormGroup} from "./form.model";

@Component({
    selector:"app",
    templateUrl:"template.html"
})

export class ProductComponent{
    model: Model = new Model();
    form: ProductFormGroup = new ProductFormGroup();


    constructor(ref:ApplicationRef){
        (<any>window).appRef = ref;
        (<any>window).model = this.model;
    }

    getProductByPosition(position:number):Product{
        return this.model.getProducts()[position];
    }
    getClassesByPosition(position:number):string{
        let product = this.getProductByPosition(position);
        return "p-2 "+ (product.price < 50 ? "bg-info":"bg-warning");
    }

    getClasses():string{
        return this.model.getProducts().length == 5 ? "bg-success":"bg-warning"
    }
    getClasses2(key:number):string{
        let product = this.model.getProduct(key);
        // console.log('Product is ',product);
        return "p-2 " + (product.price < 50 ? "bg-info":"bg-warning");
    }
    getClassMap(key:number):Object{
        let product = this.model.getProduct(key);
        return{
            "text-center bg-danger":product.name == "Kayak",
            "bg-info":product.price < 50
        }
    }
    fontSizeWithUnits:string = "30px";
    fontSizeWithoutUnits:string = "30";
    getStyles(key:number){
        let product = this.model.getProduct(key);
        return{
            fontSize:"30px",
            "margin.px":100,
            color:product.price > 50 ? "red":"green"
        }

    }
    getProduct(key:number):Product{
        return this.model.getProduct(key);
    }
    getProducts():Product[]{
        return this.model.getProducts();
    }
    getProductCount():number{
        console.log("get Product count invoked");
        return this.getProducts().length;
    }
    targetName:string = "Kayak"
    /**Chapter 14 Forms*/
    selectedProduct:string;
    getSelected(product:Product):boolean{
        console.log(this.selectedProduct);
        return product.name == this.selectedProduct;
    }
    newProduct: Product = new Product();
    get jsonProduct(){
        return JSON.stringify(this.newProduct);
    }
    addProduct(p:Product){
        console.log("New Product: "+this.newProduct);
    }
    getFormValidationMessages(form:NgForm):string[]{
        let messages:string[] = [];
        Object.keys(form.controls).forEach(k => {
            this.getValidationMessages(form.controls[k],k).forEach(m => messages.push(m));
        })
        return messages;
    }
    getValidationMessages(state:any,thingName?:string){
        let thing:string = state.path || thingName;
        let messages:string[] = [];

        if(state.errors){
            for(let errorName in state.errors){
                switch(errorName){
                    case "required":
                        messages.push(`You must enter a ${thing}`);
                        break;
                    case "minlength":
                        messages.push(`A ${thing} must be at least ${state.errors['minlength'].requiredLength} characters`);
                        break;
                    case "pattern":
                        messages.push(`The ${thing} contains illegal characters`);
                        break;
                }
            }
        }
        return messages;
    }
    formSubmitted:boolean = false;
    submitForm(form:NgForm){
        this.formSubmitted = true;
        if(form.valid){
            this.addProduct(this.newProduct);
            this.newProduct = new Product();
            form.reset();
            this.formSubmitted = false;
        }
    }
}
