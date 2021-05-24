import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/components/alert/alert.service';
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
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      name: [""],
      email: [""],
      imageName: [""]
    });
  }

  ngOnInit(): void {
    this.profileService.getProfileInfoById(1)
      .subscribe(res => {
        this.imageUrl = res.imageUrl;
        this.profileForm.patchValue({
          name: res.name,
          email: res.email,
        });
      })
  }

  onSubmit() {
    const valueForm = this.profileForm.getRawValue();
    if (!isEmail(valueForm.email)) {
      this.alertService.error('E-mail inválido', this.options);
      return;
    }

    this.profileService.updateProfileInfo(1, new Profile({
      name: valueForm.name,
      email: valueForm.email
    })).subscribe();
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
            this.imageUrl = imgBase64Path;

            this.profileService.uploadProfileImage(1, imgBase64Path)
              .subscribe((result: Profile) => {
                console.log(result.imageUrl);
              }, error => {
                console.log(error);
                this.imageUrl = this.defaultUrl;
                this.profileForm.get('imageName')?.patchValue(null);
              });
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
