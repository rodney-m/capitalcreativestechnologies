import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@trogon-energy/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'trogon-energy-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  form! : FormGroup;
  constructor(
    private messageService : MessageService, 
    private formbuilder : FormBuilder, 
    private service: ApiService,
    private uiloader: NgxUiLoaderService,

    ) {}

  ngOnInit(): void {
    this.innitializeForm()
  }

  innitializeForm(){
    this.form = this.formbuilder.group({
      fullName : ['', Validators.required],
      phoneNumber : ['', Validators.required],
      email : ['', Validators.required],
      subject : ['', Validators.required],
      message : ['', Validators.required],
    })
  }

  send(){
    if(this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Fill in all fields correctly!'
      });
      return;
    }
    const payload = {
      "customerEmail": this.formControls['email'].value,
      "fullName": this.formControls['fullName'].value,
      "message": this.formControls['message'].value,
      "phoneNumber": this.formControls['phoneNumber'].value,
      "subject": this.formControls['subject'].value
    }

    this.uiloader.start()

    this.service.postToUrl('/Contact',payload).subscribe((res:any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Contact request sent successfully!`
      });
      this.uiloader.stop();
      this.form.reset()
    }, (error: any) =>{
      this.uiloader.stop();

      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Contact request was not sent!'
      });
    })
  }

  get formControls(){
    return this.form.controls
  }
}
