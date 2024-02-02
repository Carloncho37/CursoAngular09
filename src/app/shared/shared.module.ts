import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contact-page/contact-page.component';
import { ShearchBoxComponent } from './components/shearch-box/shearch-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';


@NgModule({
  declarations: [
    AboutPageComponent,
    ContactComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    ShearchBoxComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    AboutPageComponent,
    ContactComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    ShearchBoxComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
