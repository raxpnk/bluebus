import LightningModal from 'lightning/modal';
import listpassenger2 from '@salesforce/apex/Bookingclass.listpassenger2';
import deletepassenger from '@salesforce/apex/Bookingclass.deletepassenger';

export default class Passlist extends LightningModal {
    passlist= [];pass;flag='yess';

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

    closepopup(event) {
        this.close({
            size: 'large'
        });
    }

}