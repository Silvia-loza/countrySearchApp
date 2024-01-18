import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent {
  @Input()
  placeholder: string = '';
  @Output()
  onValue: EventEmitter<string> = new EventEmitter();

  searchByCapital(searchWord: string): void {
    console.log('Desde SearchBoxComponent');
    console.log({ searchWord });
    this.onValue.emit(searchWord);
  }
}
