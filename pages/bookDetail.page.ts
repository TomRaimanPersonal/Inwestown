import { expect, Locator, Page } from '@playwright/test';
import { verifyElementsVisibility, verifyValuesTruthiness } from '../helpers/general/expect.helper';

export class BookDetailPage {
  readonly page: Page;

  readonly isbnWrapper: Locator;
  readonly titleWrapper: Locator;
  readonly subtitleWrapper: Locator;
  readonly authorWrapper: Locator;
  readonly publisherWrapper: Locator;
  readonly pagesWrapper: Locator;
  readonly descriptionWrapper: Locator;
  readonly websiteWrapper: Locator;


  constructor(page: Page) {
    this.page = page;

    this.isbnWrapper = this.page.locator('#ISBN-wrapper');
    this.titleWrapper = this.page.locator('#title-wrapper');
    this.subtitleWrapper = this.page.locator('#subtitle-wrapper');
    this.authorWrapper = this.page.locator('#author-wrapper');
    this.publisherWrapper = this.page.locator('#publisher-wrapper');
    this.pagesWrapper = this.page.locator('#pages-wrapper');
    this.descriptionWrapper = this.page.locator('#description-wrapper');
    this.websiteWrapper = this.page.locator('#website-wrapper');
  }

  async getBookDetailValue(locator: Locator): Promise<string> {
    return await locator.locator('#userName-value').innerText();
  }

  async verifyVisibilityOfBookFields(): Promise<void> {
    await verifyElementsVisibility([this.isbnWrapper, this.titleWrapper, this.subtitleWrapper, this.authorWrapper, this.publisherWrapper,
      this.pagesWrapper, this.descriptionWrapper, this.websiteWrapper]);
  }

  async verifyBookFieldsTruthiness(): Promise<void> {
    verifyValuesTruthiness([await this.getBookDetailValue(this.isbnWrapper), await this.getBookDetailValue(this.titleWrapper),
      await this.getBookDetailValue(this.subtitleWrapper), await this.getBookDetailValue(this.authorWrapper), await this.getBookDetailValue(this.publisherWrapper),
      await this.getBookDetailValue(this.pagesWrapper), await this.getBookDetailValue(this.descriptionWrapper), await this.getBookDetailValue(this.websiteWrapper)]);
  }
}