import { Component, OnInit } from '@angular/core';
import { ApiService } from '@trogon-energy/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'trogon-energy-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
  messages : any[] = [];
  isLoading = false
  constructor(private service : ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages(){
    this.isLoading = true
    this.service.getFromUrl('/Contact').subscribe({
      next: (res) => {
        this.isLoading = false
        this.messages = res?.data
      },
      error: () => {
        this.messageService.add({severity:'error', summary: 'Error occurred', detail: 'Failed to fetch product details'});

      },
      complete: ()=> this.isLoading = false
    })
  }
}
