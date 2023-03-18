import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, FileStorageApi } from '@trogon-energy/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'trogon-energy-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit {
  form!: FormGroup;
  attachedImage = false;
  isSubmitted = false;
  editMode = false;
  imageDisplay!: string | ArrayBuffer| any;
  currentProduct! :any;
  brands = []
  categories :any = []
  currencyCodes = [
    {
      name : 'ZWL',
      id: 'ZWL'
    },
    {
      name : 'USD',
      id: 'USD'
    },
  ]
  imageUrl = ''
  imageUploaded = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService, 
    private messageService: MessageService,
    private location : Location,
    private fileStorageApi : FileStorageApi,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductCategories()
    this.innitializeForm()
    this.activatedRoute.snapshot.params['id'] ? this.editMode = true : this.editMode = false
    this.editMode ? this.getProduct() : ''
  }


  getProductCategories(){
    this.service.getFromUrl('/Category').subscribe({
      next: (res) => { this.categories = res.data}
    })
  }


  innitializeForm(){
    this.form = this.formBuilder.group({
      imageUrl: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],

    })
  }

  private getProduct() {

    this.service.getFromUrl(`/Product/${this.activatedRoute.snapshot.params['id']}`).subscribe({
      next:(res:any) => {
        this.currentProduct = res?.data
        this.formControls['description'].setValue(res?.data?.description)
        this.formControls['name'].setValue(res?.data?.name)
        this.formControls['categoryId'].setValue(res?.data?.categoryId)
        this.form.patchValue({categoryId: res?.data?.categoryId})
        this.formControls['price'].setValue(res?.data?.price)
        this.imageDisplay = res?.data?.imageUrl;
        this.formControls['imageUrl'].setValidators([]);

      }
    })
    
  }

  get formControls () {
    return this.form.controls
  }

  onCancel() {
    this.location.back()
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ imageUrl: file });
     if( this.form.get('imageUrl')) { this.form.get('imageUrl')?.updateValueAndValidity() }
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
    
  }
 

 

  imageUploader(ImagefileFormData : FormData){
    this.fileStorageApi.postToUrl('', ImagefileFormData).subscribe({
      next: (res) => {
        this.imageUrl = res.data.url
        this.createProduct()
      },
      error: () => {
        this.messageService.add({severity:'error', summary: 'Image upload failed', detail: 'Something went wrong try again'});
        return;
      }
    })
  }

  onSubmit() {
    const ImagefileFormData = new FormData();
    ImagefileFormData.append('file', this.formControls['imageUrl'].value);
    


    if(!this.editMode) {
      this.imageUploader(ImagefileFormData)  
      return;    
    }

    this.editProduct()
  }

  createProduct(){

    console.log(this.form.value)
    console.log(this.imageUrl)

    this.service.postToUrl('/product',{...this.form.value, imageUrl : this.imageUrl}).subscribe({
      next: (res:any) => {console.log(res)},
      error: (err:any) => {console.log(err)},
      complete: ()=> {
        this.attachedImage = true
        this.messageService.add({severity:'success', summary: 'Product created', detail: 'Product created successfully'});
        setTimeout(() => {
          this.location.back()
        }, 2000);
      }
    })
  }

  editProduct(){
    this.service.updateToUrl(`/product`,{
      ...this.form.value,
      imageUrl: this.imageUrl ? this.imageUrl : this.currentProduct.imageUrl,
      id: this.currentProduct.id
    }).subscribe({
      next: (res:any) => {console.log(res)},
      error: (err:any) => {console.log(err)},
      complete: ()=> {
        this.attachedImage = true
        this.messageService.add({severity:'success', summary: 'Product edited', detail: 'Product edited successfully'});
        setTimeout(() => {
          this.location.back()
        }, 2000);
      }
    })
  }
}
