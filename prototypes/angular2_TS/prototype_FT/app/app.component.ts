//http://stackoverflow.com/questions/29589556/how-to-display-a-partial-view-as-a-popup-modal-on-button-click-using-bootstrap-o
import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './Dashboard/dashboard.component';
import { DashboardPublicationComponent } from './DashboardPublication/dashboardPublication.component';
import { DashboardUserComponent} from './DashboardUser/dashboardUser.component.ts';
//import { DashboardFullResponsiveTab} from './DashboardFullResponsiveTab/dashboardFullResponsiveTab.component.ts';

import { PublicationService } from './Publication/publication.service';
import { PublicationsComponent } from './Publication/publications.component';
import { PublicationDetailComponent } from './Publication/publication-detail.component';


import { UserService } from './User/user.service';
import { UsersComponent } from './User/users.component';
import { UserDetailComponent } from './User/user-detail.component';

import { HeroService } from './Hero/hero.service';
import { HeroesComponent } from './Hero/heroes.component';
import { HeroDetailComponent } from './Hero/hero-detail.component';

@Component({
  selector: 'my-app',
  template:
//  /*
  `
  <body>

    <!-- START #fh5co-header -->
    <header id="fh5co-header-section" role="header" class="" >
      <div class="container">



        <!-- <div id="fh5co-menu-logo"> -->
          <!-- START #fh5co-logo -->
          <h1 id="fh5co-logo" class="pull-left"><a href="index.html"><img src="app/ressources/Template/slant_MAIN/slant/images/Js_Fighters_Team_RLC_trans.png" alt="Logo Js_Fighters_Team_RLC" height="82" width="82"></a></h1>

          <!-- START #fh5co-menu-wrap -->
          <nav id="fh5co-menu-wrap" role="navigation">


            <ul class="sf-menu" id="fh5co-primary-menu">
              <li class="active">
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="#" class="fh5co-sub-ddown">Dropdown</a>
                 <ul class="fh5co-sub-menu">
                  <li><a href="left-sidebar.html">Left Sidebar</a></li>
                  <li><a href="right-sidebar.html">Right Sidebar</a></li>
                  <li>
                    <a href="#" class="fh5co-sub-ddown">Free HTML5</a>
                    <ul class="fh5co-sub-menu">
                      <li><a href="http://freehtml5.co/preview/?item=build-free-html5-bootstrap-template" target="_blank">Build</a></li>
                      <li><a href="http://freehtml5.co/preview/?item=work-free-html5-template-bootstrap" target="_blank">Work</a></li>
                      <li><a href="http://freehtml5.co/preview/?item=light-free-html5-template-bootstrap" target="_blank">Light</a></li>
                      <li><a href="http://freehtml5.co/preview/?item=relic-free-html5-template-using-bootstrap" target="_blank">Relic</a></li>
                      <li><a href="http://freehtml5.co/preview/?item=display-free-html5-template-using-bootstrap" target="_blank">Display</a></li>
                      <li><a href="http://freehtml5.co/preview/?item=sprint-free-html5-template-bootstrap" target="_blank">Sprint</a></li>
                    </ul>
                  </li>
                  <li><a href="#">CSS3</a></li>
                </ul>
              </li>
              <li><a href="elements.html">Elements</a></li>
              <li>
                <a href="#" class="fh5co-sub-ddown">Events</a>
                 <ul class="fh5co-sub-menu">
                  <li><a href="left-sidebar.html">Create</a></li>
                  <li><a href="right-sidebar.html">Read</a></li>
                  <li><a href="#">Update</a></li>
                  <li><a href="#">Delete</a></li>
                  <li><a href="#">List</a></li>
                </ul>
              </li>
              <li>
                <a href="elements.html">Publications</a>
                <ul class="fh5co-sub-menu">
                 <li><a href="left-sidebar.html">Create</a></li>
                 <li><a href="right-sidebar.html">Read</a></li>
                 <li><a href="#">Update</a></li>
                 <li><a href="#">Delete</a></li>
                 <li><a href="#">List</a></li>
               </ul></li>
              <li>
                <a href="elements.html">Users</a>
                <ul class="fh5co-sub-menu">
                 <li><a href="left-sidebar.html">Create</a></li>
                 <li><a href="right-sidebar.html">Read</a></li>
                 <li><a href="#">Update</a></li>
                 <li><a href="#">Delete</a></li>
                 <li><a href="#">List</a></li>
               </ul>
             </li>


              <li class="fh5co-special"><a href="../../html5up-eventually_SIGNINUP/index.html">SIGN</a></li>
            </ul>
          </nav>
        <!-- </div> -->

      </div>
    </header>


    <div id="fh5co-hero">
      <a href="#fh5co-main" class="smoothscroll fh5co-arrow to-animate hero-animate-4"><i class="ti-angle-down"></i></a>
      <!-- End fh5co-arrow -->
      <div class="container">
        <div class="col-md-8 col-md-offset-2">
          <div class="fh5co-hero-wrap">
            <div class="fh5co-hero-intro">
              <h1 class="to-animate hero-animate-1">TER FriendlyTrain_JS</h1>
              <h2 class="to-animate hero-animate-2">Lovely Made by <a href="http://freehtml5.co" target="_blank">FREEHTML5.co</a></h2>
              <p class="to-animate hero-animate-3"><a href="#" class="btn btn-outline btn-lg">Get Started</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="fh5co-main">

      <div class="container">
        <div class="row" id="fh5co-features">

          <div class="col-md-4 col-sm-6 text-center fh5co-feature feature-box">
            <div class="fh5co-feature-icon">
              <i class="ti-mobile"></i>
            </div>
            <h3 class="heading">Mobile</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sunt porro delectus cum officia magnam.</p>
          </div>
          <div class="col-md-4 col-sm-6 text-center fh5co-feature feature-box">
            <div class="fh5co-feature-icon">
              <i class="ti-lock"></i>
            </div>
            <h3 class="heading">Lock</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sunt porro delectus cum officia magnam. </p>
          </div>

          <div class="clearfix visible-sm-block"></div>

          <div class="col-md-4 col-sm-6 text-center fh5co-feature feature-box">
            <div class="fh5co-feature-icon">
              <i class="ti-video-camera"></i>
            </div>
            <h3 class="heading">Video</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sunt porro delectus cum officia magnam.</p>
          </div>

          <div class="clearfix visible-md-block visible-lg-block"></div>

          <div class="col-md-4 col-sm-6 text-center fh5co-feature feature-box">
            <div class="fh5co-feature-icon">
              <i class="ti-shopping-cart"></i>
            </div>
            <h3 class="heading">Shop</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sunt porro delectus cum officia magnam. </p>
          </div>

          <div class="clearfix visible-sm-block"></div>

          <div class="col-md-4 col-sm-6 text-center fh5co-feature feature-box">
            <div class="fh5co-feature-icon">
              <i class="ti-palette"></i>
            </div>
            <h3 class="heading">Pallete</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sunt porro delectus cum officia magnam.</p>
          </div>
          <div class="col-md-4 col-sm-6 text-center fh5co-feature feature-box">
            <div class="fh5co-feature-icon">
              <i class="ti-truck"></i>
            </div>
            <h3 class="heading">Deliver</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste sunt porro delectus cum officia magnam.</p>
          </div>
        </div>
        <!-- END row -->

        <div class="fh5co-spacer fh5co-spacer-md"></div>
        <!-- End Spacer -->

        <div class="row" id="fh5co-works">
          <div class="col-md-8 col-md-offset-2 text-center fh5co-section-heading work-box">
            <h2 class="fh5co-lead">Awesome Projects</h2>
            <p class="fh5co-sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis. Ut, dolores sit amet consectetur adipisicing elit.</p>
            <div class="fh5co-spacer fh5co-spacer-sm"></div>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 text-center fh5co-work-item work-box">
            <figure><a href="#"><img class="img-responsive" src="app/ressources/Template/slant_MAIN/slant/images/work_1.jpg" alt="Free HTML5 Template"></a></figure>
            <p class="fh5co-category">Web Design, Identity, Packaging </p>
            <h3 class="heading">Work no. 1</h3>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 text-center fh5co-work-item work-box">
            <figure><a href="#"><img class="img-responsive" src="app/ressources/Template/slant_MAIN/slant/images/work_2.jpg" alt="Free HTML5 Template"></a></figure>
            <p class="fh5co-category">Web Design, Identity, Packaging </p>
            <h3 class="heading">Work no. 2</h3>
          </div>

          <div class="clearfix visible-sm-block visible-xs-block"></div>

          <div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 text-center fh5co-work-item work-box">
            <figure><a href="#"><img class="img-responsive" src="app/ressources/Template/slant_MAIN/slant/images/work_3.jpg" alt="Free HTML5 Template"></a></figure>
            <p class="fh5co-category">Web Design, Identity, Packaging </p>
            <h3 class="heading">Work no. 3</h3>
          </div>

          <div class="clearfix visible-md-block visible-lg-block"></div>

          <div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 text-center fh5co-work-item work-box">
            <figure><a href="#"><img class="img-responsive" src="app/ressources/Template/slant_MAIN/slant/images/work_4.jpg" alt="Free HTML5 Template"></a></figure>
            <p class="fh5co-category">Web Design, Identity, Packaging </p>
            <h3 class="heading">Work no. 4</h3>
          </div>

          <div class="clearfix visible-sm-block visible-xs-block"></div>

          <div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 text-center fh5co-work-item work-box">
            <figure><a href="#"><img class="img-responsive" src="app/ressources/Template/slant_MAIN/slant/images/work_5.jpg" alt="Free HTML5 Template"></a></figure>
            <p class="fh5co-category">Web Design, Identity, Packaging </p>
            <h3 class="heading">Work no. 5</h3>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-6 col-xxs-12 text-center fh5co-work-item work-box">
            <figure><a href="#"><img class="img-responsive" src="app/ressources/Template/slant_MAIN/slant/images/work_6.jpg" alt="Free HTML5 Template"></a></figure>
            <p class="fh5co-category">Web Design, Identity, Packaging </p>
            <h3 class="heading">Work no. 6</h3>
          </div>

          <div class="col-md-4 col-md-offset-4 text-center work-box">
            <p><a href="#" class="btn btn-outline btn-md">View Portfolio</a></p>
          </div>
        </div>
        <!-- END row -->

        <div class="fh5co-spacer fh5co-spacer-md"></div>
        <div class="row">
          <!-- Start Slider Testimonial -->
              <h2 class="fh5co-uppercase-heading-sm text-center animate-box">Customer Says...</h2>
              <div class="fh5co-spacer fh5co-spacer-xs"></div>
              <div class="owl-carousel-fullwidth animate-box">
              <div class="item">
                <p class="text-center quote">&ldquo;Design must be functional and functionality must be translated into visual aesthetics, without any reliance on gimmicks that have to be explained. &rdquo; <cite class="author">&mdash; Ferdinand A. Porsche</cite></p>
              </div>
              <div class="item">
                <p class="text-center quote">&ldquo;Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn’t really do it, they just saw something. It seemed obvious to them after a while. &rdquo;<cite class="author">&mdash; Steve Jobs</cite></p>
              </div>
              <div class="item">
                <p class="text-center quote">&ldquo;I think design would be better if designers were much more skeptical about its applications. If you believe in the potency of your craft, where you choose to dole it out is not something to take lightly. &rdquo;<cite class="author">&mdash; Frank Chimero</cite></p>
              </div>
            </div>
             <!-- End Slider Testimonial -->
        </div>
        <!-- END row -->
        <div class="fh5co-spacer fh5co-spacer-md"></div>

      </div>
      <!-- END container -->


    </div>
    <!-- END fhtco-main -->


    <footer role="contentinfo" id="fh5co-footer">
      <a href="#" class="fh5co-arrow fh5co-gotop footer-box"><i class="ti-angle-up"></i></a>
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-6 footer-box">
            <h3 class="fh5co-footer-heading">About us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima delectus dolorem fugit totam, commodi ad.</p>
            <p><a href="#" class="btn btn-outline btn-sm">I'm a button</a></p>

          </div>
          <div class="col-md-4 col-sm-6 footer-box">
            <h3 class="fh5co-footer-heading">Links</h3>
            <ul class="fh5co-footer-links">
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Our Careers</a></li>
              <li><a href="#">Support &amp; FAQ's</a></li>
              <li><a href="#">Sign up</a></li>
              <li><a href="#">Log in</a></li>
            </ul>
          </div>
          <div class="col-md-4 col-sm-12 footer-box">
            <h3 class="fh5co-footer-heading">Get in touch</h3>
            <ul class="fh5co-social-icons">

              <li><a href="#"><i class="ti-google"></i></a></li>
              <li><a href="#"><i class="ti-twitter-alt"></i></a></li>
              <li><a href="#"><i class="ti-facebook"></i></a></li>
              <li><a href="#"><i class="ti-instagram"></i></a></li>
              <li><a href="#"><i class="ti-dribbble"></i></a></li>
            </ul>
          </div>
          <div class="col-md-12 footer-box">
            <div class="fh5co-copyright">
            <p>&copy; 2015 Free Slant. All Rights Reserved. <br>Designed by <a href="http://freehtml5.co" target="_blank">FREEHTML5.co</a> Images by: <a href="http://unsplash.com">Unsplash</a> and <a href="http://plmd.me" target="_blank">plmd.me</a></p>
            </div>
          </div>

        </div>
        <!-- END row -->
        <div class="fh5co-spacer fh5co-spacer-md"></div>
      </div>
    </footer>


    <!-- jQuery -->
    <script src="js/jquery-1.10.2.min.js"></script>
    <!-- jQuery Easing -->
    <script src="js/jquery.easing.1.3.js"></script>
    <!-- Bootstrap -->
    <script src="js/bootstrap.js"></script>
    <!-- Owl carousel -->
    <script src="js/owl.carousel.min.js"></script>
    <!-- Magnific Popup -->
    <script src="js/jquery.magnific-popup.min.js"></script>
    <!-- Superfish -->
    <script src="js/hoverIntent.js"></script>
    <script src="js/superfish.js"></script>
    <!-- Easy Responsive Tabs -->
    <script src="js/easyResponsiveTabs.js"></script>
    <!-- FastClick for Mobile/Tablets -->
    <script src="js/fastclick.js"></script>
    <!-- Parallax -->
    <script src="js/jquery.parallax-scroll.min.js"></script>
    <!-- Waypoints -->
    <script src="js/jquery.waypoints.min.js"></script>
    <!-- Main JS -->
    <script src="js/main.js"></script>

  </body>

  <h1>{{title}}</h1>
  <nav>
    <a [routerLink]="['Dashboard']">Dashboard</a>
    <a [routerLink]="['DashboardPublication']">DashboardPublication</a>
    <a [routerLink]="['DashboardUser']">DashboardUser</a>
    <a [routerLink]="['Heroes']">Heroes</a>

    <!-- <a [routerLink]="['Publications']">Publications</a> -->

  </nav>
  <router-outlet></router-outlet>
  `,
//  */
  /*
  'app/Template/slant_MAIN/slant/index_template.html',
  */
  styleUrls: ['app/ressources/Template/slant_MAIN/slant/css/style.css',
  'app/ressources/Template/slant_MAIN/slant/css/animate.css',
  'app/ressources/Template/slant_MAIN/slant/css/themify-icons.css',
  'app/ressources/Template/slant_MAIN/slant/css/bootstrap.css',
  'app/ressources/Template/slant_MAIN/slant/css/owl.carousel.min.css',
  'app/ressources/Template/slant_MAIN/slant/css/owl.theme.default.min.css',
  'app/ressources/Template/slant_MAIN/slant/css/magnific-popup.css',
  'app/ressources/Template/slant_MAIN/slant/css/superfish.css',
  'app/ressources/Template/slant_MAIN/slant/css/easy-responsive-tabs.css',
  'app/ressources/Template/slant_MAIN/slant/css/animate.css',
  'app/app.component.css',
  `mycss.css`]
  ,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    PublicationService
  ],
})
@RouteConfig([
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/DashboardPublication',
    name: 'DashboardPublication',
    component: DashboardPublicationComponent
  },
  {
    path: '/DashboardUser',
    name: 'DashboardUser',
    component: DashboardUserComponent
  },
  {
    path: '/detail/:id',
    name: 'HeroDetail',
    component: HeroDetailComponent
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/detail-user/:id',
    name: 'UserDetail',
    component: UserDetailComponent
  },
  {
    path: '/users',
    name: 'Users',
    component: HeroesComponent
  }/*,
  {
    path: '/detail-publication/:id',
    name: 'PublicationDetail',
    component: PublicationDetailComponent
  },DashboardFullResponsiveTabComponent
  {
    path: '/publications',
    name: 'Publications',
    component: PublicationComponent
  }*/
])
export class AppComponent {
  title = 'TER FriendlyTrain';
}
