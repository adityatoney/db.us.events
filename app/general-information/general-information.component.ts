import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";


@Component({
    selector: "general-information",
    moduleId: module.id,
    templateUrl: "./general-information.component.html"
})
export class GeneralInformationComponent implements OnInit {

    @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    public ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    public onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
     public firstWebViewSRC = '<!DOCTYPE html><html><head><title></title> <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> <style type="text/css"> @import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,800");@import url(https://fonts.googleapis.com/css?family=Lato:300,400,900);@import url(https://fonts.googleapis.com/css?family=Audiowide);html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p, blockquote, pre,a, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed,figure, figcaption, footer, header, hgroup,menu, nav, output, ruby, section, summary,time, mark, audio, video{margin: 0; padding: 0; border: 0; font: inherit; font-size: 100%; vertical-align: baseline;}html{line-height: 1;}ol, ul{list-style: none;}table{border-collapse: collapse; border-spacing: 0;}caption, th, td{text-align: left; font-weight: normal; vertical-align: middle;}q, blockquote{quotes: none;}q:before, q:after, blockquote:before, blockquote:after{content: ""; content: none;}a img{border: none;}article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary{display: block;}html,body{-webkit-box-sizing: border-box; box-sizing: border-box; font-size: 100%; height: 100%; width: 100%;}*,*:before,*:after{-webkit-box-sizing: inherit; box-sizing: inherit;}body{font-family: "Open Sans", sans-serif; font-size: 16px; font-weight: normal; line-height: 1.6;}h1, h2, h3{font-weight: 800; line-height: 1.2;}h2, h3{margin: 1.414em 0 0.5em;}h1{font-size: 1.5em; font-size: 6vw; margin: 0 0 0.5em;}@media (min-width: 50em){h1{font-size: 2.25em;}}@media (min-width: 62.5em){h1{font-size: 3.375em;}}h2{font-size: 1em;}@media (min-width: 50em){h2{font-size: 1.5em;}}@media (min-width: 62.5em){h2{font-size: 2.25em;}}h3{font-size: 0.75em;}@media (min-width: 50em){h3{font-size: 1em;}}@media (min-width: 62.5em){h3{font-size: 1.5em;}}p, ul{font-size: 0.75em; margin-bottom: 0.75em;}@media (min-width: 31.25em){p, ul{font-size: 1em;}}@media (min-width: 81.25em){p, ul{font-size: 1.15em;}}strong{font-weight: bold;}/*====================================Some styles to spruce up the demo=====================================*/body{background: #f2f1f1; color: #5E5E5E; font-family: "Lato", sans-serif; font-weight: 300; text-shadow: 1px 1px 1px #fff; text-align: center;}h1{font-size: 1.5em; font-size: 7vw; line-height: 1.2; margin: 0;}@media (min-width: 31.25em){h1{font-size: 2.25em; font-size: 7vw;}}@media (min-width: 62.5em){h1{font-size: 4.5em;}}h2{font-size: 1em; line-height: 1.2; margin: 1.414em 0 0.5em;}@media (min-width: 31.25em){h2{font-size: 1.5em;}}@media (min-width: 50em){h2{font-size: 1.8em;}}h1{color: #000000; font-family: "Audiowide", cursive; font-weight: 900; margin: 0.5em 0 2.5em;}h1 span{color: #FFD300;}.wrap{padding: 1em; text-align: center;}@media (min-width: 43.75em){.wrap{padding: 1em 2em;}}/*====================================Our Modal Window styles=====================================*/.modal{background: #fff; -webkit-box-shadow: 0 0 3px rgba(0, 0, 0, 0.15); box-shadow: 0 0 3px rgba(0, 0, 0, 0.15); display: inline-block; padding: 1em;}@media (min-width: 43.75em){.modal{padding: 1.5em;}}.modal > label{background: #FFD300; border: 1px solid #f0c600; border-radius: .2em; color: #000000; cursor: pointer; display: inline-block; font-weight: bold; padding: 0.75em 1.5em; text-shadow: 1px 1px 1px #fff; -webkit-transition: all 0.55s; transition: all 0.55s;}.modal > label:hover{-webkit-transform: scale(0.97); transform: scale(0.97);}.modal__overlay{background: #000000; bottom: 0; left: 0; position: fixed; right: 0; text-align: center; text-shadow: none; top: 0; z-index: 600;}.modal__wrap{padding: 1em 0; position: relative; margin: 0 auto; max-width: 500px; width: 90%;}@media (min-width: 50em){.modal__wrap{padding: 1.75em;}}@media (min-height: 37.5em){.modal__wrap{left: 50%; position: absolute; top: 50%; -webkit-transform: translate(-50%, -80%); transform: translate(-50%, -80%);}}.modal__wrap label{background: #FFD300; border-radius: 50%; color: #000000; cursor: pointer; display: inline-block; height: 1.5em; line-height: 1.5; position: absolute; right: .5em; top: .5em; width: 1.5em;}.modal__wrap h2{color: #FFD300; margin-bottom: 1em; text-transform: uppercase;}.modal__wrap p{color: #FFD300; text-align: justify;}.modal input:focus ~ label{-webkit-transform: scale(0.97); transform: scale(0.97);}input{position: absolute; top: -1000px;}.modal__overlay{opacity: 0; -webkit-transform: scale(0.5); transform: scale(0.5); -webkit-transition: all 0.75s cubic-bezier(0.68, -0.55, 0.265, 1.55); transition: all 0.75s cubic-bezier(0.68, -0.55, 0.265, 1.55); z-index: -100;}input:checked ~ .modal__overlay{opacity: 1; -webkit-transform: scale(1); transform: scale(1); z-index: 800;}</style></head><body><div class="wrap"> <h1>Info</h1></div><div class="modal"> <input id="modal__trigger" type="checkbox"/> <label for="modal__trigger">About Gurupurnima 2018</label> <div class="modal__overlay" role="dialog" aria-labelledby="modal__title" aria-describedby="modal_desc"> <div class="modal__wrap"> <label for="modal__trigger">&#10006;</label> <h2 id="modal__title">South West Gurupurnima 2018</h2> <p id="modal__desc">Under the grace of Pujya Dadabhagwan and Pujya Niruma and with Pujya Deepakbhai"s blessings, the Southeast Dadabhagwan Parivar heartily invites all mahatmas and mumukshus, with their friends and family from around the world to join them in celebrating Pujya Dada"s Gurupurnima in Jacksonville, Florida from July 22nd to July 28th, 2018. <br></br>Our theme for Gurupurnima 2018 is global unity, and in this spirit, our tagline is"YOUnity starts with YOU!" As individuals, we can all play a role in making this event a success! </p></div></div></div><br><div class="modal"> <input id="modal__trigger2" type="checkbox"/> <label for="modal__trigger2">&nbsp;&nbsp;&nbsp;What is Gurupurnima?&nbsp;&nbsp; &nbsp; </label> <div class="modal__overlay" role="dialog" aria-labelledby="modal__title1" aria-describedby="modal_desc1"> <div class="modal__wrap"> <label for="modal__trigger2">&#10006;</label> <h2 id="modal__title1">What is Gurupurnima?</h2> <p id="modal__desc1">Gurupurnima is an Indian festival which is celebrated during the full moon when the Guru is in his full form. The Dada Bhagwan Foundation makes the most out of the auspicious period by holding a weeklong shibir every year for all of its followers as well as anyone who is interested in finding truth and a path towards liberation.<br></br>"There are three very auspicious days in a year : The Indian New Year Day, Janmajayanti (birthday of the Gnani) and Gurupurnima (day of paying reverence to the Gnani). On these days there are no external interactions with anyone and therefore I, the Gnani Purush become one with "Dada Bhagwan" within, and consequently "I" am in the absolute state. You can reap tremendous benefit by doing darshan of this state. That is why it is very important to do Dada"s darshan on these days." <br></br>- Param Pujya Dadashri </p></div></div></div><br><div class="modal"> <input id="modal__trigger5" type="checkbox"/> <label for="modal__trigger5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Translation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label> <div class="modal__overlay" role="dialog" aria-labelledby="modal__title1" aria-describedby="modal_desc1"> <div class="modal__wrap"> <label for="modal__trigger5">&#10006;</label> <h2 id="modal__title1">Translation</h2> <p id="modal__desc1">There will be simultaneous translation of Satsang in English and Hindi.<br></br>To listen to the translation, you will require a FM radio.<br></br>Please bring your own FM radio, if possible.</p></div></div></div><br><div class="modal"> <input id="modal__trigger4" type="checkbox"/> <label for="modal__trigger4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accomodation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <div class="modal__overlay" role="dialog" aria-labelledby="modal__title1" aria-describedby="modal_desc1"> <div class="modal__wrap"> <label for="modal__trigger4">&#10006;</label> <h2 id="modal__title1">Gurupurnima registration & Hotel room request process:</h2> <p id="modal__desc1"><b>Step 1:</b> Click <a href="https://usevents.dadabhagwan.org/?utm_source=Wordpress+Testing+List&utm_campaign=13bca20760-EMAIL_CAMPAIGN_2017_12_06&utm_medium=email&utm_term=0_b0cfd4c5e7-13bca20760-">here</a> to register yourself and your family members living at the same residential address with you. You will then need to select Nut allergy information, food preferences and special needs for each family member.<br></br>Step 2: Complete the event information, enter arrival & departure dates and answer the questions pertaining to the Hotel room requirement and members staying in the requested room(s).<br></br>Step 3: Add members from another family in your room by entering their member ID.Member ID information can be found on the confirmation email sent to the mahatma, once they have registered for this event. Please make sure the answer to "Hotel room required?" is No on their email. Step 4: If you have any children between the ages of 0-12 years, then sign them up for LMHT activities before December 20, 2017.<br></br>Step 5: If you have any youth/young adult between the ages of 13-35, sign them up for YMHT (13-17) or YMHT+(18-35) activities.<br></br>Step 6: Verify your registration and receive an email with a unique family member ID.<br></br>Step 7: After the 1st week of February 2018, you will receive an email on the email address used to login on this website instructing you to finalize your Hotel room bookings. Please keep an eye out for this email.</p></div></div></div><br><div class="modal"> <input id="modal__trigger3" type="checkbox"/> <label for="modal__trigger3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contact Information &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label> <div class="modal__overlay" role="dialog" aria-labelledby="modal__title1" aria-describedby="modal_desc1"> <div class="modal__wrap"> <label for="modal__trigger3">&#10006;</label> <h2 id="modal__title1">Contact Us</h2> <p id="modal__desc1">If you have any questions or need support with any of the event registration or hotel reservation steps, contact us at:<br></br>Phone: 1-(877) 505-DADA (3232), Ext. 10<br></br>Email: gp@us.dadabhagwan.org</p></div></div></div></body></html>';
    
    
}

