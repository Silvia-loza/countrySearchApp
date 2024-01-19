import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  placeholder: string = '';
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(300)).subscribe((searchWord) => {
      this.onDebounce.emit(searchWord);
    });
  }
  onKeyPress(searchWord: string) {
    this.debouncer.next(searchWord);
  }
}
