import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/** Class for unsubscribe from streams */
@Injectable()
export class DestroyUnsubscribe implements OnDestroy {
  /** for unsubscribe from streams */
  protected unsubscribe$ = new Subject();

  constructor() {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }
}
