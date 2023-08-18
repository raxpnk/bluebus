import { LightningElement, track } from 'lwc';
import passengercomp from 'c/passengercomp';
import searchveh from '@salesforce/apex/Searchvehicle.searchveh';
import { NavigationMixin } from 'lightning/navigation';

export default class Homepage extends NavigationMixin(LightningElement) {

    jdate; bpoint; dpoint; mode; mainvalue;newmain;
    intervalid; livetime; showchild = false;; showparent = true;
    modebutton = 'modebutton0'; modebutton1 = 'modebutton0'; modebutton2 = 'modebutton0'; modebutton3 = 'modebutton0';
    searchResults = [];nodata=false;
    showmainparent=true;showbooking=false;

    mainurl2 = 'https://png.pngtree.com/thumb_back/fh260/background/20210814/pngtree-blue-red-gradient-retro-sports-computer-wallpaper-image_762866.jpg';


    openpopup(event) {
        passengercomp.open({
            size: 'large'
        });
    }


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

    handlebookings() {
        console.log('boooooooo');
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

    handleboard(event) {
        this.bpoint = event.target.value;
        console.log(this.bpoint);
    }

    handledest(event) {
        this.dpoint = event.target.value;
        console.log(this.dpoint);
    }

    handledate(event) {
        this.jdate = event.target.value;
        console.log(this.jdate);
    }

    handleNextClick(event) {
        this.mode = event.target.value;
        if (this.mode === 'Bus') {
            this.modebutton = 'modebutton00';
            this.modebutton1 = 'modebutton0';
            this.modebutton2 = 'modebutton0';
            this.modebutton3 = 'modebutton0';
        }
        if (this.mode === 'Train') {
            this.modebutton = 'modebutton0';
            this.modebutton1 = 'modebutton000';
            this.modebutton2 = 'modebutton0';
            this.modebutton3 = 'modebutton0';
        }
        if (this.mode === 'Flight') {
            this.modebutton = 'modebutton0';
            this.modebutton1 = 'modebutton0';
            this.modebutton2 = 'modebutton000';
            this.modebutton3 = 'modebutton0';
        }
        if (this.mode === 'Cab') {
            this.modebutton = 'modebutton0';
            this.modebutton1 = 'modebutton0';
            this.modebutton2 = 'modebutton0';
            this.modebutton3 = 'modebutton0000';
        }
        console.log(this.mode);
    }

    searchbutton() {
        console.log(this.bpoint, this.dpoint, this.mode, this.jdate);
        searchveh({ a: this.bpoint, b: this.dpoint, c: this.mode, d: this.jdate })
            .then(data => {
                this.searchResults = data;
                if (Array.isArray(data) && data.length === 0) {
                    console.log('passing empty');
                    this.nodata = true;
                }
            })
            .catch(error => {
                console.log('Apex error:', error);
            });
        this.showchild = true;
        this.showparent = false;
    }

    booknowbutton(event){
        this.newmain=event.target.value;
        console.log(this.newmain);
        this.showbooking=true;
        this.showmainparent=false;
    }



    connectedCallback() {
        this.intervalId = setInterval(() => {
            this.updateTime();
        }, 1000);
        this.updateTime();
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
}