import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../Service/product.service';

// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {

  product: any = [];
  AddProductForm ! : FormGroup


  constructor(private http: HttpClient, 
              private router: Router, 
              private fb : FormBuilder,
              private productService : ProductService 
              ){}

  ngOnInit(): void {
    
    this.AddProductForm = this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      color: ['',Validators.required],
      category:['',Validators.required],
      description:['',Validators.required],
      image:['',Validators.required]
    })
  }


  createProduct(){
    console.log(this.AddProductForm.value);
    
    this.productService.addProductService(this.AddProductForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        
        
      },
      error: (err) => {
        console.log(err);  
      }
    })
  }

  gotToView() {
    this.router.navigate(['/home']);
  }
}
