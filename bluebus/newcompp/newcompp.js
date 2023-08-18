import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import newbook from '@salesforce/apex/Bookingclass.newbook';
import newnewbook from '@salesforce/apex/Bookingclass.newnewbook';
import listpassenger from '@salesforce/apex/Bookingclass.listpassenger';
import bookpass from '@salesforce/apex/Bookingclass.bookpass';
import paybook from '@salesforce/apex/Bookingclass.paybook';
import passengercomp from 'c/passengercomp';
import remainingseats from '@salesforce/apex/Bookingclass.remainingseats';
import payamount from '@salesforce/apex/Bookingclass.payamount';



export default class newcompp extends NavigationMixin(LightningElement) {
    intervalid; livetime;
    @api newmessage;
    dood; type;
    trainchoose; flightchoose; showtraintype; showflighttype;
    newbcId; name__c; bpoint__c; dpoint__c; mode__c; typec; showtype = false;
    count; couponchoose; methodchoose;
    seatsbookedlist;
    showpasssearch = true; searchpass = ''; passlist;
    myseat = 0; addcount = 0; passid;
    paymessage;
    finalfare=0; finalamount; couponfare; newfare; newgst; newbcTotal; finalfinal;showmessage=false;

    mainurl2 = 'https://png.pngtree.com/thumb_back/fh260/background/20210814/pngtree-blue-red-gradient-retro-sports-computer-wallpaper-image_762866.jpg';

    navigatetohomepage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Homepage',
            }
        });
    }

    openpopup(event) {
        passengercomp.open({
            size: 'large'
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

    handlebookings() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'bookingcomp1',
            }
        });
    }

    get bgstyle() {
        const gradient = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)`;
        return `background-image: ${gradient}, url(${this.mainurl2});background-repeat: no-repeat;background-position: center;background-size: cover;`;
    }


    handletrain(event) {
        this.trainchoose = event.target.value;
        this.type = this.trainchoose;
        console.log(this.type);
        this.calfinalfare();
    }
    handleflight(event) {
        this.flightchoose = event.target.value;
        this.type = this.flightchoose;
        console.log(this.type);
        this.calfinalfare();
    }

    connectedCallback() {
        /*this.intervalId = setInterval(() => {
            this.updateTime();
        }, 1000);
        this.updateTime();*/

        console.log(this.newmessage);
        this.dood = true;
        console.log('got routeshifts');
        newbook({ a: this.newmessage })
            .then(data => {
                this.name__c = data.Name.toUpperCase();
                this.mode__c = data.Mode__c.toUpperCase();
                this.bpoint__c = data.Bpoint__c.toUpperCase();
                this.dpoint__c = data.Dpoint__c.toUpperCase();
                this.dood = data;
                if (data.Mode__c === 'Train') {
                    this.showtraintype = true;
                    this.showtype = false;
                }
                else if (data.Mode__c === 'Flight') {
                    this.showflighttype = true;
                    this.showtype = false;
                }
                else {
                    this.showtype = true;
                    this.typec = data.Type__c.toUpperCase();
                    console.log('this is a bus/cab type');
                    this.calfinalfare();
                }
            })
            .catch(error => {
                console.error('routeshift error', error);
            });

        this.findrem();
    }

    disconnectedCallback() {
        clearInterval(this.intervalId);
    }

    updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        this.livetime = `${hours}:${minutes}:${seconds}`;
    }

    findrem() {
        remainingseats({ a: this.newmessage })
            .then(data => {
                this.seatsbookedlist = data;
            })
            .catch(error => {
                console.error('error in catching seats', error);
            });
    }

    navigatetohome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Homepage',
            }
        });
    }


    calfinalfare(event) {
        newnewbook({ a: this.newmessage, types: this.type })
            .then(data => {
                if (data) {
                    this.newbcId = data.Id;
                    console.log('booking created', data);
                    console.log(this.newbcId);
                }
            })
            .catch(error => {
                console.log('error on booking creation');
                console.error(error);
            });
    }


    handlecount(event) {
        this.count = event.target.value;
        console.log(this.count);
        if (this.count > this.addcount) {
            this.showpasssearch = true;
        }
    }


    handlecoupon(event) {
        this.couponchoose = event.target.value;
        console.log(this.couponchoose);
    }

    handlemethod(event) {
        this.methodchoose = event.target.value;
        console.log(this.methodchoose);
        let gg = '';
        if (this.couponchoose === 'BLUEBLUE') {
            gg = 'CODEBLUE';
        }
        else {
            gg = this.couponchoose;
        }
        console.log(gg);

        paybook({ a: this.newbcId, method: this.methodchoose, coupon: gg, intercount: this.count })
            .then(data => {
                console.log(data.Id);
                this.newbcTotal = data.Total__c;
                console.log(this.newbcTotal);

                this.newgst = data.GST__c;
                console.log(this.newgst);

                this.newfare = this.newgst + this.newbcTotal;
                console.log(this.newfare);

                if (gg === 'SUPERBLUE') {
                    this.couponfare = this.newbcTotal / 20;
                }
                else if (gg === 'CODEBLUE') {
                    this.couponfare = this.newbcTotal / 10;
                }

                this.finalfare = ((this.newfare + 20) - this.couponfare) * this.count;
                console.log(this.newfare + 'nwefaree');
            })
            .catch(error => {
                console.log('payment error', error);
            });
    }

    changepass(event) {
        this.searchpass = event.target.value;
        console.log(this.searchpass);
        if (this.searchpass != '') {
            listpassenger({ a: this.searchpass })
                .then(data => {
                    this.passlist = data;
                    console.log('success passlist');
                    console.log(this.passlist);
                })
                .catch(error => {
                    console.error('passlist error', error)
                });
        }
        else {
            this.passlist = [];
        }
    }

    findseatnum(event) {
        const gg = event.target.value;
        this.myseat = gg;
        this.seatsbookedlist.forEach(a => {
            if (a.Seat__c == this.myseat) {
                this.myseat = 'change';
                console.log('change seat');
                const event8 = new ShowToastEvent({
                    title: 'SEAT',
                    message: 'THIS SEAT HAS ALREADY BEEN BOOKED BY OTHER USER',
                    variant: 'destructive'
                });
                this.dispatchEvent(event8);
            }
        })
    }

    addpass(event) {
        this.searchpass = '';
        this.addcount += 1;
        console.log(this.addcount + 'addcount');
        if (this.myseat != 'change') {
            const constpassid = event.target.dataset.passId;
            this.passid = constpassid;
            console.log(this.newbcId);
            console.log(this.passid);
            console.log(this.count + 'mycount');
            console.log(this.myseat);
            bookpass({ a: this.newbcId, b: this.passid, c: this.myseat, d: this.count })
                .then(data => {
                    console.log('created bpass', data);
                    this.findrem();
                })
                .catch(error => {
                    console.error('error in bpass', error);
                })

            const event5 = new ShowToastEvent({
                title: 'ADD PASSENGER',
                message: 'PASSENGER HAS BEEN ADDED',
                variant: 'success'
            });
            this.dispatchEvent(event5);
            if (this.addcount == this.count) {
                console.log('should not show');
                this.showpasssearch = false;
            }
        }
    }

    pay(event) {
        this.showmessage=true;
        const event7 = new ShowToastEvent({
            title: 'PAYMENT SUCCESS',
            message: 'PAYMENT PROCEEDED...WILL BE REDIRECTED SHORTLY',
            variant: 'success'
        });
        this.dispatchEvent(event7);
        payamount({ a: this.newbcId, d: this.finalfinal })
            .then(data => {
                console.log('success payment');
                console.log(data);
            })
            .catch(error => {
                console.log('error while paying', error);
            });


        setTimeout(() => {
            console.log('wait bro22');
            this[NavigationMixin.Navigate]({
                type: 'standard__navItemPage',
                attributes: {
                    apiName: 'Homepage',
                }
            });
        }, 10000);
    }

    payfinalamount(event) {
        const ff = event.target.value;
        console.log(ff);
        this.finalfinal = ff;
        console.log(this.finalfinal);
        if (this.finalfinal < this.finalfare) {
            const event7 = new ShowToastEvent({
                title: 'AMOUNT',
                message: 'AMOUNT IS LESSER',
                variant: 'destructive'
            });
            this.dispatchEvent(event7);
        }
    }
}