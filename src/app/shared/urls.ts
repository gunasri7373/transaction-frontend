import { environment } from '../../environments/environment';

export class ApplicationURLs {
  serverUrl = environment.apiURL;
  get transaction() {
    return this.serverUrl + 'transaction/';
  }
}
export const applicationUrls = new ApplicationURLs();
