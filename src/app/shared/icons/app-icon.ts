import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      @switch (name) {
        @case ('home') {
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />
        }
        @case ('pie_chart') {
          <path d="M11 3a9 9 0 1 0 9 9h-9z" />
          <path d="M13 3v7h7a7 7 0 0 0-7-7z" />
        }
        @case ('layers') {
          <path d="m12 3 9 5-9 5-9-5z" />
          <path d="m4 12 8 4.5 8-4.5" />
          <path d="m4 16 8 4.5 8-4.5" />
        }
        @case ('check_circle') {
          <path d="M21 11.1V12a9 9 0 1 1-5.34-8.23" />
          <path d="m9 11.5 2.2 2.2L20 5" />
        }
        @case ('settings') {
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          <path
            d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.04.04a2 2 0 1 1-2.83 2.83l-.04-.04A1.7 1.7 0 0 0 15 19.37a1.7 1.7 0 0 0-1 .6V20a2 2 0 1 1-4 0v-.06a1.7 1.7 0 0 0-1-.57 1.7 1.7 0 0 0-1.88.34l-.04.04a2 2 0 1 1-2.83-2.83l.04-.04A1.7 1.7 0 0 0 4.63 15a1.7 1.7 0 0 0-.6-1H4a2 2 0 1 1 0-4h.06a1.7 1.7 0 0 0 .57-1 1.7 1.7 0 0 0-.34-1.88l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04A1.7 1.7 0 0 0 9 4.63a1.7 1.7 0 0 0 1-.6V4a2 2 0 1 1 4 0v.06a1.7 1.7 0 0 0 1 .57 1.7 1.7 0 0 0 1.88-.34l.04-.04a2 2 0 1 1 2.83 2.83l-.04.04A1.7 1.7 0 0 0 19.37 9c.23.36.43.72.6 1H20a2 2 0 1 1 0 4h-.06a1.7 1.7 0 0 0-.54 1z"
          />
        }
        @case ('menu_book') {
          <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22z" />
          <path d="M4 5.5A3.5 3.5 0 0 0 7.5 9H20" />
          <path d="M8 5h8" />
        }
        @case ('info') {
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
          <path d="M12 10v6" />
          <path d="M12 7h.01" />
        }
        @case ('article') {
          <path d="M6 3h9l3 3v15H6z" />
          <path d="M14 3v4h4" />
          <path d="M9 11h6" />
          <path d="M9 15h6" />
        }
        @case ('chevron_right') {
          <path d="m9 18 6-6-6-6" />
        }
        @case ('expand_more') {
          <path d="m6 9 6 6 6-6" />
        }
        @case ('menu') {
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        }
        @case ('close') {
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        }
        @case ('apps') {
          <path d="M5 5h5v5H5z" />
          <path d="M14 5h5v5h-5z" />
          <path d="M5 14h5v5H5z" />
          <path d="M14 14h5v5h-5z" />
        }
        @case ('check') {
          <path d="m5 12 4 4L19 6" />
        }
        @case ('person') {
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      width: 1em;
      height: 1em;
      flex: 0 0 auto;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.8;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIcon {
  @Input({ required: true }) name = '';
}
