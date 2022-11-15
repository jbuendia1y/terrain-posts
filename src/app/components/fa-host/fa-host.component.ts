import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { getIcon } from 'src/app/libs';

@Component({
  selector: 'app-fa-host',
  templateUrl: './fa-host.component.html',
  styleUrls: ['./fa-host.component.css'],
})
export class FaHostComponent implements OnInit {
  @ViewChild('host', { static: true, read: ViewContainerRef })
  container: ViewContainerRef = {} as any;

  @Input('icon') icon: string = 'faCamera';

  constructor() {}

  ngOnInit(): void {
    this.createIcon();
  }

  async createIcon() {
    const ref = this.container.createComponent(FaIconComponent);
    ref.instance.icon = await getIcon(this.icon);
    ref.instance.render();
  }
}
