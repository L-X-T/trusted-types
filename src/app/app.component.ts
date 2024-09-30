import { AfterViewInit, Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'TrustedTypes Demo';
  goodTag = ` <img src="/favicon.ico" width="16x" height="16px">`;
  badTag = ` <img src="none" onerror="alert('XSS')">`;
  goodHtml = this.title + this.goodTag;
  badHtml = this.title + this.badTag;
  h1 = '';
  h2: SafeHtml = '';
  @ViewChild('h3') h3?: ElementRef;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly domSanitizer: DomSanitizer,
    private readonly renderer2: Renderer2,
  ) {
    this.h1 = this.badHtml;
    this.h2 = this.domSanitizer.bypassSecurityTrustHtml(this.goodHtml);
  }

  ngAfterViewInit() {
    this.setNativeElementOfH3();
  }

  private setNativeElementOfH3(): void {
    if (this.h3) {
      this.h3.nativeElement.innerHTML = this.badHtml;
    }
  }

  injectUnsafeHTML(): void {
    try {
      const unsafeHTML = '<img src="none" onerror="alert(\'XSS\')">';
      (this.document.getElementById('content') as Element).innerHTML = unsafeHTML;
    } catch (error) {
      console.error('Unsafe HTML injection blocked by Trusted Types:', error);
      alert('Unsafe HTML injection blocked by Trusted Types.');
    }
  }
}
