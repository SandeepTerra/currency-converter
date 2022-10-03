import { Component, OnInit } from '@angular/core';
import { Currency, CurrencyConversionServiceService, HistoryData } from './currency-conversion-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currency-converter-app';
  currencies: Currency[] | undefined;
  currentMessage = '';
  amount: string = '1';
  fromCurrency = '';
  toCurrency = '';
  history: HistoryData[] | undefined;
  error = {amount: '', fromCurrency: 'This field is mandatory.', toCurrency: 'This field is mandatory.', isValid: false};

  constructor(private currencyService: CurrencyConversionServiceService) {
    
  }
  ngOnInit(): void {
    this.getCurrencies();
  }

  getCurrencies() {  

    this.currencyService.getCurrencies()
      .subscribe(
        curnies => {
          this.currencies=curnies;
        
        },
        error => console.log(error) // error path
        );
        
  }

  validateControls() {
      
    if(isNaN(Number(this.amount))) {
      this.error.amount = 'Please enter a valid amount';
      this.error.isValid = false;
    }
    else if(Number(this.amount) <=0) {
      this.error.amount = 'Please enter an amount greater than 0';
      this.error.isValid = false;
    }
    else if(this.fromCurrency == '') {
      this.error.fromCurrency = 'Please select currency';
      this.error.isValid = false;
    }
    else if(this.toCurrency == '') {
      this.error.toCurrency = 'Please select currency';
      this.error.isValid = false;
    }

    else {
      this.error.amount = '';
      this.error.isValid = true;
    }
  }

  onConvertClick() {

    this.currencyService.getlatestExchangeRate(this.fromCurrency,this.toCurrency)
    .subscribe(
      curval => {
        //testing
        let exchange =curval;
        let frmtext = this.currencies?.find(cur => cur.code === this.fromCurrency)?.name;
        let totext = this.currencies?.find(cur => cur.code === this.toCurrency)?.name;
        this.currentMessage= this.amount.toString() + ' ' + frmtext + ' equals ' + (parseFloat(this.amount) * exchange).toString() + ' ' + totext;
        this.getHistory(this.fromCurrency,this.toCurrency);//live
        //this.getHistory1();//test
      },
      error => console.log(error) // error path
      );
}

getHistory(frmCur: string, toCur: string) {
     
     this.currencyService.getHistory(frmCur,toCur)
    .subscribe(
      histry => {
        
        histry.sort((a,b)=>(new Date(b.date) as any) - (new Date(a.date) as any));
        this.history = histry;
      },
      error => console.log(error) // error path
      );
}

}

