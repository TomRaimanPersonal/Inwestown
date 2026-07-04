import { expect, Locator, Page } from '@playwright/test';
import { getRandomNumber } from '../helpers/general/random.helper';
import { verifyElementsHavePhrase } from '../helpers/general/expect.helper';

export class BooksPage {
  readonly page: Page;

  readonly logo: Locator;
  readonly searchField: Locator;
  readonly bookTitles: Locator;
  readonly tableRowOptions: Locator;
  readonly paginationNextButton: Locator;
  readonly jumpToPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = this.page.locator('#app img').first();
    this.searchField = this.page.getByPlaceholder('Type to search');
    this.bookTitles = this.page.getByRole('rowgroup').getByRole('row').locator('a');
    this.tableRowOptions = this.page.locator('[aria-label="rows per page"]');
    this.paginationNextButton = this.page.getByRole('button', { name: /next/i });
    this.jumpToPage = this.page.locator('[aria-label="jump to page"]');
  }

  getBookLinkLocatorBasedOnNameOfBook(searchedBook: string): Locator {
    return this.page.getByText(searchedBook);
  }

  async checkLogoVisibility(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async clickOnBookLinkBasedOnNameOfSearchedBook(searchedBook: string): Promise<void> {
    await this.getBookLinkLocatorBasedOnNameOfBook(searchedBook).click();
  }

  async clickOnRandomBook(): Promise<void> {
    await this.bookTitles.nth(getRandomNumber(0, await this.getNumberOfAvailableBooks())).click()
  }

  async validateCorrectSearchedPhraseInTitles(searchPhrase: string): Promise<void> {
    expect((await this.bookTitles.all()).length).toBeGreaterThanOrEqual(1);
    await verifyElementsHavePhrase(await this.bookTitles.all(), new RegExp(`(.*?)${searchPhrase}(.*?)`));
  }

  async getAllTitlesFromTable(): Promise<string[]> {
    return await this.bookTitles.allInnerTexts();
  }

  async compareBookTitles(compareArray: string[], expectedArray: string[], same: boolean = true) {
    same ? expect(compareArray).toEqual(expectedArray) : expect(compareArray).not.toEqual(expectedArray);
  }

  private async getNumberOfAvailableBooks(): Promise<number> {
    return (await this.bookTitles.all()).length;
  }
}