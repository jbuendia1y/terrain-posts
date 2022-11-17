import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent implements OnInit {
  @Output('value') value: EventEmitter<string> = new EventEmitter();
  @Input('placeholder') placeholder: string = 'Buscar ...';

  public search: string | null = null;

  constructor() {}

  ngOnInit(): void {}

  onSearch() {}
}
