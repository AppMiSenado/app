import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } 			from "@angular/core";
import { LoadingController, ToastController , AlertController }   		from 'ionic-angular';
import { StorageProvider } from '../storage/storage';
import { Chart } from 'chart.js';

import * as moment from 'moment';

@Injectable()

export class CommonProvider{
	auth: any;

	constructor( private loadingCtrl: LoadingController,
				 			 private toastCtrl: ToastController,
				 			 private sanitizer: DomSanitizer,
				 			 private alertCtrl: AlertController,
				 			 private storageProvider: StorageProvider) {
  };

  loading(){
  	let loading = this.loadingCtrl.create({
      spinner: "ios",
      content: ''
    });
    loading.present();
    
    setTimeout(() => {
      if (loading)
        loading.dismiss();
     }, 7000);

    return loading;
  }

  toast(string) {
	 let toast = this.toastCtrl.create({
	    message: string,
	    duration: 3000,
	    position: 'bottom'
	  });

	 	toast.present();
	}

	error(error){
		let errorMessage = JSON.parse(error);
		console.log(errorMessage);
		if (errorMessage.message != undefined) {
			console.log('message');
			this.toast(errorMessage.message);
		}else{
			console.log('error');
			this.toast(error);
		}
	}

	validateEmail(string) {
	  var validation = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return validation.test(string);
	}

	required(string){
		return (string != "" && string != "" && string != null && string != undefined)? true : false;
	}

	trustSrc(url){
		let video = url.replace('watch?v=', 'embed/');
		return this.sanitizer.bypassSecurityTrustResourceUrl(video);
	}

	alertStreaming(){
		if (!this.storageProvider.get('streaming')) {
      let alert = this.alertCtrl.create({
        title: 'Cuidado',
    		subTitle: 'El vídeo streaming puede consumir muchos datos móviles, le recomendamos estar conectado a una red wifi.',
    		buttons: ['Ok']
      });
      this.storageProvider.set('streaming', true);
      alert.present();
    }
	}

  formatEvents(events, attr){
    return events.map(function (item) {
              item['startTime'] =  moment(item[attr[0]]).toDate();
              item['endTime'] =  moment(item[attr[1]]).toDate();
              item['allDay'] = false;
              return item;
            });
  }

  search(elements, keys, term){
    return (elements || []).filter((item) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])))
  }

	generateDoughnutChart(element, value, color){
		return new Chart(element.nativeElement, {
      type: 'doughnut',
      options: { 
        cutoutPercentage: 70,
      	responsive: false,
  			maintainAspectRatio: false,
        legend: { 
          display: true 
        },
        tooltips: {
        	enabled: false
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }
      },
      data: {
      	animation: { animateRotate: true },
        datasets: [{
          data: [100-value, value],
          backgroundColor: [
	          'rgba(153, 153, 153, 0.2)',
	          color,
          ],
        }]
      }
    });
	}
}