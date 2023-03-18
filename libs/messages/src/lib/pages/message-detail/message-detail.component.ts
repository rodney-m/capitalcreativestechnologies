import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@trogon-energy/core';

@Component({
  selector: 'trogon-energy-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss'],
})
export class MessageDetailComponent implements OnInit {
  messageId = '';
  message! :any;
  constructor(private service : ApiService, private activatedRoute : ActivatedRoute) {}

  ngOnInit(): void {
    this.messageId = this.activatedRoute.snapshot.params['id'];
    this.getMessage()
  }

  getMessage(){
    this.service.getFromUrl(`/Contact/${this.messageId}`).subscribe({
      next: (res) => {
        this.message = res?.data

        console.log(this.message)
      }
    })
  }
}
