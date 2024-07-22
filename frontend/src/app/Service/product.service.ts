import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProductService(addObj: any)
  {
    return this.http.post(`${apiUrls.prodUrl}addProduct`, addObj)
  }

  viewProductService() {
    return this.http.get(`${apiUrls.prodUrl}`);
  }

  deleteProductService(deleteObj: any)
  {
    return this.http.delete(`${apiUrls.prodUrl}:id`,deleteObj)
  }

  updateProductService(updateObj: any, id : any)
  {
     return this.http.put(`${apiUrls.prodUrl}:`+id, updateObj)
  }

}
