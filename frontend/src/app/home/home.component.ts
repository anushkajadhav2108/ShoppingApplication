import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  product: any =[];
  isLoading = false;
  HomeForm! : FormGroup

  newProduct ={
    name: '',
    price: '',
    color: '',
    category: '',
    description: '',
    image: ''
  }

  
  constructor(private http: HttpClient, 
    private router: Router){
      
    }
    
    ngOnInit(): void {
      this.getProduct();
    }
    
  getProduct(){
    this.isLoading =true;
    this.http.get('http://localhost:3000/product').subscribe({
      next: (res: any)=> {
        console.log(res);
        this.product = res.product; 
      },
      error:(err)=>{
        console.log(err); 
      }
    })
  }

  createProduct(){
    this.http.post('http://localhost:3000/product/addProduct',this.newProduct).subscribe({
      next: (res: any)=> {
        console.log(res);
        this.getProduct();
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

deleteProduct(id:any){
  this.http.delete('http://localhost:3000/product/'+id).subscribe({
    next: (res: any) => {
      this.product = res.product;
      this.getProduct();
    },
    error: (err) => {
      console.log(err); 
    }
  })
}

goToUpdate(id :any){
  this.router.navigate(['/edit-product/'+id]);
  }

}
