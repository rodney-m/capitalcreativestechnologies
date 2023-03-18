import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesListComponent } from './pages/messages-list/messages-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageDetailComponent } from './pages/message-detail/message-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: MessageDetailComponent,
  },
  {
    path: '',
    component: MessagesListComponent,
  },
];

const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
  EditorModule,
  FileUploadModule,
  PaginatorModule,
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ...UX_MODULE],
  declarations: [MessagesListComponent, MessageDetailComponent],
})
export class MessagesModule {}
