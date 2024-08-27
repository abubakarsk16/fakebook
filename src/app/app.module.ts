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
import { ProfileComponent } from './components/profile/profile.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PostComponent } from './components/home/post/post.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { MatBadgeModule } from '@angular/material/badge';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditpostComponent } from './components/home/editpost/editpost.component';
import { LoadingPlaceholderComponent } from './components/loading-placeholder/loading-placeholder.component';
import { UsersComponent } from './components/users/users.component';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestComponent } from './components/test/test.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './components/right-sidenav/right-sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';
import { CommentComponent } from './components/home/post/comment/comment.component';
import { CommentFormComponent } from './components/home/post/comment-form/comment-form.component';
import { CommentSectionComponent } from './components/home/post/comment-section/comment-section.component';
import { CommentEditFormComponent } from './components/home/post/comment/comment-edit-form/comment-edit-form.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CommentBottomSheetComponent } from './components/home/post/comment-bottom-sheet/comment-bottom-sheet.component';
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
    ProfileComponent,
    ConfirmComponent,
    PostComponent,
    EditpostComponent,
    LoadingPlaceholderComponent,
    UsersComponent,
    NavbarComponent,
    TestComponent,
    LeftSidenavComponent,
    RightSidenavComponent,
    FooterComponent,
    SidenavContentComponent,
    CommentComponent,
    CommentFormComponent,
    CommentSectionComponent,
    CommentEditFormComponent,
    CommentBottomSheetComponent,
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
    MatTableModule,
    MatBottomSheetModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
