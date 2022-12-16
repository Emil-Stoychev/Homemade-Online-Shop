import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css'],
})
export class WheelComponent implements OnInit {
  public wheelOption: boolean = false;
  public style = {};
  public surprise: any;
  public text: string = 'Come again tomorrow!';

  constructor(
    private appComponent: AppComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    // window.onload = window.scrollTo(0, 0)
    let token = localStorage.getItem('sessionStorage');
    let userId = this.userService.jwtDecode(token as string);

    this.userService.getWheelStatus(userId?._id).subscribe((res: any) => {
      if (!res.message) {
        this.wheelOption = res.option;
      }
    });
  }

  spinHandler() {
    this.surprise = '';
    this.wheelOption = false;
    this.text = 'Good luck!';
    let deg = 0;

    deg = Math.floor(5000 + Math.random() * 5000);

    let wheelResult = this.getWheelResult(deg);

    let win = this.getWheelSurprise(wheelResult);

    let data = {
      cookie: {
        token: localStorage.getItem('sessionStorage'),
        _id: this.appComponent?.userFromToken?._id,
      },
      wheelResult,
    };

    this.userService
      .changeWheelStatus(data as object)
      .subscribe((res: any) => {});

    this.style = {
      transition: 'all 10s ease-out',
      transform: `rotate(${deg}deg)`,
      filter: 'blur(1px)',
    };

    setTimeout(() => {
      this.style = {
        transform: `rotate(${deg}deg)`,
        filter: 'blur(0)',
      };

      this.surprise = win;
      this.text = 'Come again tomorrow!';
    }, 10000);
  }

  getWheelResult(deg: any) {
    const actualDeg = deg % 360;
    let word = '';

    if (actualDeg >= 0 && actualDeg <= 45) {
      word = 'Heart';
    } else if (actualDeg >= 46 && actualDeg <= 90) {
      word = 'Kiss';
    } else if (actualDeg >= 91 && actualDeg <= 135) {
      word = 'Moon';
    } else if (actualDeg >= 136 && actualDeg <= 180) {
      word = 'Star';
    } else if (actualDeg >= 181 && actualDeg <= 225) {
      word = 'Cloud';
    } else if (actualDeg >= 226 && actualDeg <= 270) {
      word = 'Hipnosa';
    } else if (actualDeg >= 271 && actualDeg <= 315) {
      word = 'Rainbow';
    } else if (actualDeg >= 316 && actualDeg <= 360) {
      word = 'Lollipop';
    }

    return word;
  }

  getWheelSurprise(word: any) {
    let num = 0;

    if (word === 'Heart') {
      num = 25;
    }

    if (word === 'Kiss') {
      num = 15;
    }

    if (word === 'Moon') {
      num = 10;
    }

    if (word === 'Star') {
      num = 100;
    }

    if (word === 'Cloud') {
      num = 35;
    }

    if (word === 'Hipnosa') {
      num = 50;
    }

    if (word === 'Rainbow') {
      num = 40;
    }

    if (word === 'Lollipop') {
      num = 30;
    }

    return num;
  }
}
