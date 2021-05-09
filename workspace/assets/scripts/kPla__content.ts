import $ from 'jquery';
// TODO(baba):
// import * as Utils from './utils';

class KPla {
  constructor() {
    this.startMutationObserver();
  }

  private startMutationObserver(): void {
    const observer = new MutationObserver(() => {
      this.setRoomMark();
    });

    const auditTargetElement = document.getElementsByTagName('body').item(0);

    const observerConfig = {
      attributes: true,
      childList: true,
      characterData: true
    };

    observer.observe(
      <Node>auditTargetElement,
      observerConfig
    );
  }

  private setRoomMark(): void {
    const $roomName = $('[aria-label="Rooms and resources"] > li').eq(0);

    if (this.alreadyHasMark($roomName)) return;

    $roomName.prepend(this.generateRoomMarkHtml());
    this.activateDescriptionModalOpener($roomName);
  }

  private alreadyHasMark($roomName: JQuery): boolean {
    return $roomName.find('#jsi-kPla-mark').length > 0;
  }

  private generateRoomMarkHtml(): string {
    return `
      <a id="jsi-kPla-mark" class="kPla-mark">
        <img src="https://dummyimage.com/15x15/333/fff" alt="">
      </a>
    `;
  }

  private activateDescriptionModalOpener($roomName: JQuery): void {
    const _this = this;

    $('#jsi-kPla-mark').click(function() {
      $roomName.append(_this.generateRoomDescriptionModal($(this)));
      _this.activateDescriptionModalCloser();
    });
  }

  private generateRoomDescriptionModal($markElement: JQuery): string {
    return `
      <div id="jsi-kPla-room-description"
           class="kPla-room-description"
           style="left: ${this.calculateModalLeftPosition($markElement)}px">

        <a id="jsi-kPla-close-description-trigger" class="kPla-close-description-trigger">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
          </svg>
        </a>
        <div class="kPla-room-name">
          <img src="https://dummyimage.com/100x100/333/fff" alt="">
          <ruby>
            {会議室名}
            <rt>{かいぎしつめい}</rt>
          </ruby>
        </div>
        <p>{会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明会議室の説明}</p>
        <figure>
          <img src="https://dummyimage.com/200x150/333/fff" alt="">
        </figure>
      </div>
      <div class="kPla-room-description-arrow"
           style="${this.calculateModalArrowPosition($markElement)}">
        <div></div>
      </div>
    `;
  }

  private calculateModalLeftPosition($markElement: JQuery): number {
    const leftPosition = (<{ left: number }>$markElement.offset()).left;
    const modalPadding = 20;
    const modalWidth = 240 + modalPadding * 2;

    if (this.shouldSetModalToLeft(leftPosition)) {
      return leftPosition - modalWidth;
    } else {
      const gCalDetailWidth = (<number>$markElement.parents('[jsmodel]').innerWidth());
      return leftPosition + gCalDetailWidth - modalWidth;
    }
  }

  private calculateModalArrowPosition($markElement: JQuery): string {
    const offset = <{ top: number, left: number }>$markElement.offset();
    const modalPadding = 20;

    if (this.shouldSetModalToLeft(offset.left)) {
      return `
        top: ${offset.top}px;
        left: ${offset.left - modalPadding * 2}px;
      `;
    } else {
      const modalWidth = 240 + modalPadding * 2;
      const gCalDetailWidth = (<number>$markElement.parents('[jsmodel]').innerWidth());
      return `
        top: ${offset.top}px;
        left: ${offset.left + gCalDetailWidth - modalWidth - modalPadding}px;
        transform: rotate(180deg);
      `;
    }
  }

  private shouldSetModalToLeft(leftPosition: number): boolean {
    const windowWidth = $(window).width();
    return <number>windowWidth / 2 < leftPosition;
  }

  private activateDescriptionModalCloser(): void {
    $('#jsi-kPla-close-description-trigger').click(() => {
      $('#jsi-kPla-room-description').remove();
    });
  }
}

new KPla();
