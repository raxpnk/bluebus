import { LightningElement, track, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import passengercomp from 'c/passengercomp';

export default class Routecomp extends NavigationMixin(LightningElement) {
    showparent = true;
    intervalid; livetime;


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

    mapsss = [
        {
            location: {
                City: 'Coimbatore',
                Country: 'India'
            },
            value: 'Boarding point',
            title: 'CBE',
            description: 'Marudamalai Temple,Dhyanalinga Temple,Vellingiri Hill Temple,Siruvani Waterfalls,Gedee Car Museum',
            icon: 'standard:account',
        },
        {
            location: {
                City: 'Mumbai',
                Country: 'India'
            },
            value: 'Boarding point',
            title: 'MUM',
            description: 'Gateway of India, Marine Drive, Elephanta Caves, Chhatrapati Shivaji Maharaj Terminus (CSMT), Siddhivinayak Temple',
            icon: 'standard:account',
        },
        {
            location: {
                City: 'Theni',
                Country: 'India'
            },
            value: 'Boarding point',
            title: 'TNE',
            description: 'Vaigai Dam, Suruli Falls, Meghamalai, Periyakulam, Kumbakkarai Falls',
            icon: 'standard:account',
        },
        {
            location: {
                City: 'Bengaluru',
                Country: 'India'
            },
            value: 'Boarding point',
            title: 'BGL',
            description: 'Lalbagh Botanical Garden, Bangalore Palace, Cubbon Park, Bannerghatta National Park, Tipu Sultan\'s Summer Palace',
            icon: 'standard:account',
        }
    ];
}