import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import book1 from '@salesforce/apex/Newpassenger.book1';
import book2 from '@salesforce/apex/Newpassenger.book2';
import book3 from '@salesforce/apex/Newpassenger.book3';
import addrev from '@salesforce/apex/Newpassenger.addrev';
import passengercomp from 'c/passengercomp';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Bookingcomp extends NavigationMixin(LightningElement) {
    slideright = true; slideleft = false; @track togglebar = 'toggle-bar';
    @track book1l = [];
    @track book2l = [];
    mainid; flag = 'yess';
    intervalid; livetime;
    showtoggle = false; upcoming = true; completed = true;
    sessionbutton1 = 'session-button'; sessionbutton2 = 'session-button';
    sessionbutton3 = 'session-button'; fdate; fmode;


    openpopup(event) {
        passengercomp.open({
            size: 'large'
        });
    }


    handleright() {
        this.slideright = false;
        this.slideleft = true;
        this.togglebar = 'toggle-bar2';
        this.showtoggle = true;
    }

    handleleft() {
        this.showtoggle = false;
        this.slideleft = false;
        this.slideright = true;
        this.togglebar = 'toggle-bar';
    }

    mainurl2 = 'https://png.pngtree.com/thumb_back/fh260/background/20210814/pngtree-blue-red-gradient-retro-sports-computer-wallpaper-image_762866.jpg';

    navigatetohomepage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Homepage',
            }
        });
    }

    handlelocations() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'interpage',
            }
        });
    }

    get bgstyle() {
        const gradient = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)`;
        return `background-image: ${gradient}, url(${this.mainurl2});background-repeat: no-repeat;background-position: center;background-size: cover;`;
    }

    showup() {
        this.upcoming = true;
        this.completed = false;
        this.sessionbutton1 = 'session-button';
        this.sessionbutton2 = 'session-button0';
        this.sessionbutton3 = 'session-button';
    }

    showcom() {
        this.upcoming = false;
        this.completed = true;
        this.sessionbutton1 = 'session-button';
        this.sessionbutton2 = 'session-button';
        this.sessionbutton3 = 'session-button0';
    }

    showall() {
        this.upcoming = true;
        this.completed = true;
        this.sessionbutton1 = 'session-button0';
        this.sessionbutton2 = 'session-button';
        this.sessionbutton3 = 'session-button';
    }

    filterdate(event) {
        this.fdate = event.target.value;
        console.log(this.fdate);
    }

    filtermode(event) {
        this.fmode = event.target.value;
        console.log(this.fmode);
    }


    renderedCallback() {
        if (this.flag === 'yess') {
            book2()
                .then(data => {
                    this.book2l = data;
                    this.book2l.forEach(b => {
                        b.Bpoint__c = b.Bpoint__c.toUpperCase();
                        b.Dpoint__c = b.Dpoint__c.toUpperCase();
                        if (b.Mode__c == 'Bus') {
                            b.image = "https://www.freeiconspng.com/thumbs/bus-icon/bus-icon-15.jpg";
                        }
                        else if (b.Mode__c == 'Train') {
                            b.image = "https://icon-library.com/images/train-icon-png/train-icon-png-29.jpg";
                        }
                        else if (b.Mode__c == 'Flight') {
                            b.image = "https://cdn-icons-png.flaticon.com/512/18/18430.png?w=740&t=st=1691663396~exp=1691663996~hmac=afaa8e99febb1baf8971de207d83862956b1dca2e4f2194159c0915c5737f93d";
                        }
                        else if (b.Mode__c == 'Cab') {
                            b.image = "https://tse4.mm.bing.net/th?id=OIP.jC_otMcrFB3hkFEAOswT5QHaFN&pid=Api&P=0&h=180";
                        }
                    });
                })
                .catch(error => {
                    console.log('error', error);
                });
            console.log(this.book2l);

            book1()
                .then(data => {
                    this.book1l = data;
                    this.book1l.forEach(b => {
                        b.Bpoint__c = b.Bpoint__c.toUpperCase();
                        b.Dpoint__c = b.Dpoint__c.toUpperCase();
                        if (b.Mode__c == 'Bus') {
                            b.image = "https://www.freeiconspng.com/thumbs/bus-icon/bus-icon-15.jpg";
                        }
                        else if (b.Mode__c == 'Train') {
                            b.image = "https://icon-library.com/images/train-icon-png/train-icon-png-29.jpg";
                        }
                        else if (b.Mode__c == 'Flight') {
                            b.image = "https://cdn-icons-png.flaticon.com/512/18/18430.png?w=740&t=st=1691663396~exp=1691663996~hmac=afaa8e99febb1baf8971de207d83862956b1dca2e4f2194159c0915c5737f93d";
                        }
                        else if (b.Mode__c == 'Cab') {
                            b.image = "https://tse4.mm.bing.net/th?id=OIP.jC_otMcrFB3hkFEAOswT5QHaFN&pid=Api&P=0&h=180";
                        }
                    });
                })
                .catch(error => {
                    console.log('error', error);
                });
            console.log(this.book1l);
            this.flag = 'nope';
        }
    }

    handleClick(event) {
        const event7 = new ShowToastEvent({
            title: 'CANCELLATION',
            message: 'BOOKING CANCELLED...REFUND WILL BE DONE SHORTLY',
            variant: 'base'
        });
        this.dispatchEvent(event7);
        const ll = event.target.value;
        this.mainid = ll;
        console.log(this.mainid);

        book3({ ii: this.mainid })
            .then(data => {
                console.log('money sent back')
                this.flag = 'yess';
                this.renderedCallback();
            })
            .catch(error => {
                console.log('error is sending money back', error);
            });
    }

    handleCLick2(event) {
        const primerate = event.target.value;
        const primeid = event.target.dataset.id;
        console.log(primerate);
        console.log(primeid);
        if (primerate >= 0 && primerate <= 5) {
            addrev({ a: primeid, b: primerate })
                .then(data => {
                    console.log(data);
                    this.flag = 'yess';
                    this.renderedCallback();
                });
            const event10 = new ShowToastEvent({
                title: 'RATING ADDED',
                message: 'RATING ADDED ...THANK YOU FOR YOUR FEEDBACK',
                variant: 'success'
            });
            this.dispatchEvent(event10);
        }
        else {
            const event10 = new ShowToastEvent({
                title: 'RATING NOT ADDED',
                message: 'RATING NOT ADDED...PLEASE CHOOSE THE WITHIN RANGE 0-5',
                variant: 'destructive'
            });
            this.dispatchEvent(event10);
        }
    }


    closepopup(event) {
        this.close({
            size: 'large'
        });
    }

}