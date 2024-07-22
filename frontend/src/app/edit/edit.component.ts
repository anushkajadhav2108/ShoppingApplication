import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit{

  id: String = "";
  editProductForm ! : FormGroup

  // updateProd ={
  //   "name": '',
  //   "price": '',
  //   "color": '',
  //   "category": '',
  //   "description": '',
  //   "image": ''
  // }

  constructor(private http: HttpClient,
              private route: ActivatedRoute, 
              private routes: Router, 
              private fb: FormBuilder,
              private productService: ProductService){}

   ngOnInit(): void {

    this.editProductForm = this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      color: ['',Validators.required],
      category:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required]
    })

     this.route.params.subscribe(params =>{
      this.id=params['id']
     })
   }

updateProduct(){
 console.log(this.editProductForm.value);
 

 this.productService.updateProductService(this.editProductForm.value, this.id).subscribe({
  next:(res:any)=>{
    console.log(res);

  },
  error: (err)=>{
    console.log(err);
    
  }
 })
}

gotToView() {
  this.routes.navigate(['/header']);
}

}
