import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MainComponent } from './components/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTabsModule } from '@angular/material/tabs';
import { AddpostComponent } from './components/home/addpost/addpost.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddpostDialogComponent } from './components/home/addpost/addpost-dialog/addpost-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './components/main/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PostComponent } from './components/home/post/post.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommentComponent } from './components/home/comment/comment.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { MatBadgeModule } from '@angular/material/badge';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditpostComponent } from './components/home/editpost/editpost.component';
@NgModule({
  declarations: [
    AppComponent,
    SnackbarComponent,
    LoginComponent,
    HomeComponent,
    NotfoundComponent,
    MainComponent,
    AddpostComponent,
    AddpostDialogComponent,
    MenuComponent,
    ProfileComponent,
    ConfirmComponent,
    PostComponent,
    CommentComponent,
    CreatePostComponent,
    EditpostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    LayoutModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatBadgeModule,
    NgScrollbarModule,
    MatTooltipModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
