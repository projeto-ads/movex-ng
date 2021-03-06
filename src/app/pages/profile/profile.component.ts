import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Profile } from 'src/app/model/profile.model';
import { ProfileService } from 'src/app/service/profile.service';
import { isEmail } from 'src/app/util/email-util';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  defaultUrl: string = 'assets/default.png';
  imageUrl: string;

  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };

  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private profileService: ProfileService,
    public authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: [""],
      email: {value: "", disabled: true},
      imageName: [""]
    });
  }

  ngOnInit(): void {
    this.profileService.getProfileInfoById(this.authService.profileInfo.id)
      .subscribe(profile => {
        this.authService.profileInfo = profile;
        this.authService.profileInfo.imageUrl = profile.imageUrl + '?' + performance.now();
        this.imageUrl = this.authService.profileInfo.imageUrl;
        this.profileForm.patchValue({
          name: this.authService.profileInfo.name,
          email: this.authService.profileInfo.email,
        });
      });
  }

  onSubmit() {
    const valueForm = this.profileForm.getRawValue();
    if (!isEmail(valueForm.email)) {
      this.alertService.error('E-mail inválido', this.options);
      return;
    }

    this.profileService.updateProfileInfo(this.authService.profileInfo.id, new Profile({
      name: valueForm.name
    })).subscribe(() => {
      Object.assign(this.authService.profileInfo, {
        name: valueForm.name
      });
    });
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.alertService.warn('Tamanho permitido da imagem: ' + max_size / 1000 + 'Mb')
        return;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.alertService.warn('Selecione uma imagem ( JPG | JPEG | PNG)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs: any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.alertService.warn(
              'Dimensão permitida da imagem ' +
              max_height +
              '*' +
              max_width +
              'px');
            return;
          } else {
            const imgBase64Path = e.target.result;

            this.profileService.uploadProfileImage(1, imgBase64Path)
              .subscribe((result: Profile) => {
                this.authService.profileInfo.imageUrl = imgBase64Path;
                this.imageUrl = imgBase64Path;
              }, error => {
                if (this.imageUrl.includes('assets')) {
                  this.imageUrl = this.defaultUrl;
                } else {
                  this.imageUrl = this.authService.profileInfo.imageUrl;
                }
                this.profileForm.get('imageName')?.patchValue(null);
              });
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
