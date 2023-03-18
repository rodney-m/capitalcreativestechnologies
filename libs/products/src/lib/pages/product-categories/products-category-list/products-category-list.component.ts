import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@trogon-energy/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'trogon-energy-products-category-list',
  templateUrl: './products-category-list.component.html',
  styleUrls: ['./products-category-list.component.scss'],
})
export class ProductsCategoryListComponent implements OnInit {
  categories = []
  isLoading = false;
  constructor(private service : ApiService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.isLoading = true
    this.service.getFromUrl('/category').subscribe((res:any) => {
      this.categories = res.data
      this.isLoading = false
    }, (error:any) => {
      this.isLoading = false
      console.log(error)
    })
  }

  updateCategory(id:any){
    this.router.navigateByUrl('/products/category/form/'+id)
  }


  deleteCategory(id:any){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(`/product-category/${id}`).subscribe({
          error: (err:any) => {
            this.messageService.add({severity:'error', summary: 'Category not deleted', detail: 'Something went wrong'});
          },
          complete: ()=> {
            this.messageService.add({severity:'success', summary: 'Category deleted', detail: 'Product category deleted successfully'});
            window.location.reload()
          }
        })

      },
      
  });    

  }
}
