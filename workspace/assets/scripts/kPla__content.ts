import $ from 'jquery';
// TODO(baba):
// import * as Utils from './utils';

class KPla {
  constructor() {
    this.setAdditionalStyles();
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
    $('#jsi-kPla-mark').click(() => {
      $roomName.append(this.generateRoomDescriptionModal());
      this.activateDescriptionModalCloser();
    });
  }

  private generateRoomDescriptionModal(): string {
    return `
      <div id="jsi-kPla-room-description" class="kPla-room-description">
        <a id="jsi-kPla-close-description-trigger" class="kPla-close-description-trigger">
          <img src="https://dummyimage.com/25x25/333/fff" alt="">
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
    `;
  }

  private activateDescriptionModalCloser(): void {
    $('#jsi-kPla-close-description-trigger').click(() => {
      $('#jsi-kPla-room-description').remove();
    });
  }

  private setAdditionalStyles(): void {
    $('body').append(`
      <style>
        [aria-label="Rooms and resources"] > li {
          position: relative;
          padding-left: calc(1.5em + 0.5em);
        }

        .kPla-mark > img {
          position: absolute;
          top: 50%;
          left: 0;
          height: 1.5em;
          transform: translate(0, -50%);
        }

        .kPla-room-name > ruby {
          display: block;
        }

        .kPla-room-description {
          z-index: 9999;
          position: fixed;
          top: 10%;
          left: 35%;
          background-color: #FFFFFF;
          width: 200px;
          padding: 20px;
          border: 2px solid #333333;
          white-space: normal;
          transform: translate(-50%, 0);
        }

        .kPla-room-description > div {
          text-align: center;
        }

        .kPla-room-description > figure {
          margin: 0;
        }

        .kPla-close-description-trigger {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .kPla-close-description-trigger > img {
          vertical-align: top;
        }
      </style>
    `);
  }
}

new KPla();
