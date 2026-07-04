import { expect, test } from '@playwright/test';
import { BooksPage } from '../../pages/books.page';
import { BookDetailPage } from '../../pages/bookDetail.page';

test('Navigate to Book Details and Verify Content', async ({ page }) => {
  const booksPage = new BooksPage(page);
  const bookDetailPage = new BookDetailPage(page);

  const searchedBook = 'Learning JavaScript Design Patterns';

  await test.step('Navigate to a Books Page', async () => {
    await page.goto('/books');
    await booksPage.checkLogoVisibility();
  });

  await test.step('Click on a Book Title Link', async () => {
    await booksPage.clickOnBookLinkBasedOnNameOfSearchedBook(searchedBook);
  });

  await test.step('Assert book detail', async () => {
    expect(page.url()).toContain('https://demoqa.com/books?book=');

    // Code bellow is a heck how to get books detail page, since getting to books detail page can be done through profile account
    // Also code bellow could generalized to Profile and Login page or even could be handled during global setup
    await page.goto('/login');
    await page.locator('#userName').fill('TomRaiman');
    await page.locator('#password').fill('E)XAt,cqMfHK&9z');
    await page.locator('#login').click();
    await expect(booksPage.tableRowOptions).toBeVisible();

    await page.goto('/profile?book=9781449325862'); // I am fully aware this is not how to get to book detail, but we should have already been there
    await bookDetailPage.verifyVisibilityOfBookFields();
    await bookDetailPage.verifyBookFieldsTruthiness();
  });
});

test('Navigate to Random Book Details and Verify Content', async ({ page }) => {
  const booksPage = new BooksPage(page);
  const bookDetailPage = new BookDetailPage(page);

  await test.step('Navigate to a Books Page', async () => {
    await page.goto('/books');
    await booksPage.checkLogoVisibility();
  });

  await test.step('Click on a Random Book Title Link', async () => {
    await booksPage.clickOnRandomBook();
  });

  await test.step('Assert Book Detail', async () => {
    expect(page.url()).toContain('https://demoqa.com/books?book=');

    // Code bellow is a heck how to get books detail page, since getting to books detail page can be done through profile account
    // Also code bellow could generalized to Profile and Login page or even could be handled during global setup
    await page.goto('/login');
    await page.locator('#userName').fill('TomRaiman');
    await page.locator('#password').fill('E)XAt,cqMfHK&9z');
    await page.locator('#login').click();
    await expect(booksPage.tableRowOptions).toBeVisible();

    await page.goto('/profile?book=9781449325862'); // I am fully aware this is not how to get to book detail, but we should have already been there
    await bookDetailPage.verifyVisibilityOfBookFields();
    await bookDetailPage.verifyBookFieldsTruthiness();
  });
});

// npx playwright test booksDetail.test.ts --headed --project=chromium