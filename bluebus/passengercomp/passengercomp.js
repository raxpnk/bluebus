import { LightningElement, api, wire, track } from 'lwc';
import LightningModal from 'lightning/modal';
import listpassenger2 from '@salesforce/apex/Bookingclass.listpassenger2';
import deletepassenger from '@salesforce/apex/Bookingclass.deletepassenger';
import newpass from '@salesforce/apex/Newpassenger.newpass';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Passengercomp extends LightningModal {
    fname=''; lname=''; phone=''; otherphone='';
    age; gender='options'; email=''; address='';
    finalpass;showg=false;toptextp1='toptext';toptextp2='toptextsmall'
    showbackbutton2=true;showbackbutton=false;showinter=false;passlist= [];pass;flag='yess';showpass=true;genderbutton=false;


    mainurl2 = 'https://png.pngtree.com/thumb_back/fh260/background/20210814/pngtree-blue-red-gradient-retro-sports-computer-wallpaper-image_762866.jpg';

    handletoptext1(){
        this.toptextp1='toptext';
        this.toptextp2='toptextsmall';
        this.showbackbutton=false;
        this.showinter=false;
        this.showpass=true;
        this.showbackbutton2=true;
        this.genderbutton=false;
    }

    handletoptext2(){
        this.flag='nope';
        this.toptextp1='toptextsmall';
        this.toptextp2='toptext';
        this.showbackbutton=true;
        this.showinter=true; 
        this.genderbutton=true;
        this.showpass=false;  
        this.showbackbutton2=false;
    }

    get bgstyle() {
        const gradient = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)`;
        return `background-image: ${gradient}, url(${this.mainurl2});background-repeat: no-repeat;background-position: center;background-size: cover;`;
    }

    fnamec(event) {
        this.fname = event.target.value;
        console.log(this.fname);
    }
    lnamec(event) {
        this.lname = event.target.value;
        console.log(this.lname);
    }
    
    genderc(event) {
        this.genderbutton=false;
        this.showg=!this.showg;
    }

    handlegender(event){
        this.genderbutton=true;
        this.showg=false;
        this.gender = event.target.value;
        console.log(this.gender);
    }

    emailc(event) {
        this.email = event.target.value;
        console.log(this.email);
    }
    agec(event) {
        let hh = event.target.value;
        this.age = event.target.value;
        console.log(this.age);
        this.age = hh;
        console.log(this.age);
    }
    phonec(event) {
        this.phone = event.target.value;
        console.log(this.phone);
    }
    otherphonec(event) {
        this.otherphone = event.target.value;
        console.log(this.otherphone);
    }
    addressc(event) {
        this.address = event.target.value;
        console.log(this.address);
    }

    createnewpass(event) {
        newpass({ a: this.fname, b: this.lname, c: this.gender, d: this.age, e: this.phone, f: this.otherphone, g: this.email, h: this.address })
            .then(data => {
                this.finalpass = data;
                console.log(this.finalpass);
            })
            .catch(error => {
                console.log('cannot create', error);
            })
        const event5 = new ShowToastEvent({
            title: 'NEW PASSENGER',
            message: 'PASSENGER HAS BEEN ADDED',
            variant: 'success'
        });
        this.dispatchEvent(event5);
        this.closepopup();
    }

    closepopup(event) {
        this.close({
            size: 'large'
        });
    }

    renderedCallback() {
        if(this.flag=='yess'){
        listpassenger2()
            .then(data => {
                this.passlist = data;
                console.log('success passlist');
                console.log(this.passlist);
            })
            .catch(error => {
                console.error('passlist error', error)
            });
            this.flag='nope';
        }
    }

    oneclick(event){
        const gg=event.target.value;
        this.pass=gg;
        console.log(this.pass);
        deletepassenger({a:this.pass})
            .then(data=>{
                this.flag='yess';
                this.renderedCallback();
                console.log(this.flag);
                console.log('deleted');
            })
            .catch(error=>{
                console.log('failure deletion');
            });
    }

}