import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { DefaultService } from './default.service';

@Injectable()
export class FileStorageApi extends DefaultService<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `https://rudorwedu.co.zw:1999/api/v1/Files/upload`);
  }
}

