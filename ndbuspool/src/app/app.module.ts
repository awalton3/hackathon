import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormsMaterialComponentsModule } from './shared/forms-material-components.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialComponentsModule } from './shared/material-components.module';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { HomeComponent } from './home/home.component';
import { AvailableGroupsComponent } from './available-groups/available-groups.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { ManageTripDialogueComponent } from './manage-trip-dialogue/manage-trip-dialogue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AvailableGroupsCardsComponent } from './available-groups/available-groups-cards/available-groups-cards.component';
import { CreateGroupDialogueComponent } from './available-groups/create-group-dialogue/create-group-dialogue.component';



firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AvailableGroupsComponent,
    SidenavComponent,
    HeaderToolbarComponent,
    ManageTripDialogueComponent,
    AvailableGroupsCardsComponent,
    CreateGroupDialogueComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsMaterialComponentsModule,
    MaterialComponentsModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [ManageTripDialogueComponent, CreateGroupDialogueComponent]
})
export class AppModule { }
