import { Injectable } from "@angular/core";
import { CONSTANTS } from "../constants/constants";

@Injectable()
export class GlobalProvider{

  private APP_STATE:             string = CONSTANTS.APP_STATE;
  private URL:   		             any =    CONSTANTS.URL;
  public APP_KEY:                string = CONSTANTS.APP_KEY;
  
  public ONESIGNAL_KEY:          string = CONSTANTS.ONESIGNAL_KEY;
  public ONESIGNAL_APP_ID:       string = CONSTANTS.ONESIGNAL_APP_ID;

  public ON_UNAUTHORIZED_GO_TO:  string = CONSTANTS.ON_UNAUTHORIZED_GO_TO;

  public VERSION_URL:            string = CONSTANTS.VERSION_URL;

  private API_URL:               string = this.URL[this.APP_STATE];
 
  getApiUrl(complement){
    if (typeof complement == "undefined") {
      complement = "";
    }
    
  	return this.API_URL + complement;
  }
}