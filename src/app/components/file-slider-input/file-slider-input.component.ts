import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { readFile } from 'src/app/libs';

@Component({
  selector: 'app-file-slider-input',
  templateUrl: './file-slider-input.component.html',
  styleUrls: ['./file-slider-input.component.css'],
})
export class FileSliderInputComponent implements OnInit {
  @Input('imgWidth') public width: number | string = '100%';
  @Input('imgHeight') public height: number | string = '250px';

  @Output('change') public change = new EventEmitter<FileList>();

  public faCamera = faCamera;
  public files: FileList = {} as FileList;
  public previews: string[] = [];

  onChange = async (e: Event) => {
    const el = e.target as HTMLInputElement;
    const files = el.files;
    if (!files) return;
    const value = Array.from(files);
    this.change.emit(files);
    this.previews = await Promise.all(value.map((f) => readFile<string>(f)));
  };

  constructor() {}

  ngOnInit(): void {}
}
