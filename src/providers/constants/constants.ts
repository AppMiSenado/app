import { Constants } from './constants.model';

export const CONSTANTS: Constants = {
  APP_STATE:              "PRODUCTION",
	URL:   		          	  {
		                        "DEPLOY": "http://url de pruebas",
		                        "PRODUCTION": "http://url de produccion"
		                      },
	APP_KEY :               "App key generado por el backend",
	ONESIGNAL_KEY:					"",
	ONESIGNAL_APP_ID:  			"",
	ON_UNAUTHORIZED_GO_TO: 	"LoginPage",
	VERSION_URL:            "http://version.uberflug.co/api/v1/version",
	FIREBASE: 							{ //Objeto de configuracion de firebase
														apiKey: "",
	                          authDomain: "",
	                          databaseURL: "",
	                          projectId: "",
	                          storageBucket: "",
	                          messagingSenderId: ""
													}
}