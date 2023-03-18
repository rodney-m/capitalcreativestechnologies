import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { GetAQuoteComponent } from './get-a-quote/get-a-quote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import {
  ApiService,
  CoreModule,
  httpInterceptor,
  TokenService,
  UiLoader,
} from '@trogon-energy/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactPageComponent } from './contact-page/contact-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    AboutPageComponent,
    GetAQuoteComponent,
    ContactPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    RadioButtonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    NgxUiLoaderModule.forRoot(UiLoader.load()),
    HttpClientModule,
    ToastModule,
    CoreModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    ApiService,
    TokenService,
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
