import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UserComponent,
    UserDetailComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: UserComponent},
      { path: 'user/:id', component: UserDetailComponent}

    ])
    
  ],

  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
