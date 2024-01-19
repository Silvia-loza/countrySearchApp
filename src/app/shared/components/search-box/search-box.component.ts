import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscirption?: Subscription;

  @Input()
  placeholder: string = '';
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  ngOnInit(): void {
    this.debouncerSubscirption = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((searchWord) => {
        this.onDebounce.emit(searchWord);
      });
  }
  onKeyPress(searchWord: string) {
    this.debouncer.next(searchWord);
  }

  ngOnDestroy(): void {
    this.debouncerSubscirption?.unsubscribe();
    console.log('destruido');
  }
}
