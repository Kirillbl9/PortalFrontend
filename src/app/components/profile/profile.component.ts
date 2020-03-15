import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {log} from 'util';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser: User = new User(0, '', '', '');
  public selectedFile;
  imgURL: any;



  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getLoggedInUser().subscribe(
      user => this.currentUser = user
  )
    // this.userService.getByEmail(sessionStorage.getItem('email')).
    // subscribe(user => this.currentUser = user);
    log(this.currentUser);
  }

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  onChangeImage() {
    const uploadData = new FormData();
    uploadData.append('profile_image', this.selectedFile, this.selectedFile.name);
    this.userService.uploadImageForProfile(uploadData).subscribe(
      res => {
        // this.receivedImageData = res;
        // this.base64Data = this.receivedImageData.image;
        // this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['profile']));
      },
      err => console.log('Error Occured duringng saving: ' + err)
    );
  }
}
