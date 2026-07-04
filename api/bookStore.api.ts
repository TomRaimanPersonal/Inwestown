import { APIRequestContext, expect } from '@playwright/test';
import { verifyValuesTruthiness } from '../helpers/general/expect.helper';

/**
 * UUID of my created profile
 */
export const userId = 'ecafafea-ef65-4259-bcf8-4bb4bf3d41ad';

/**
 * ISBN of book we want to test the API scenario with adding a book
 */
export const isbnBookAddedToProfile = '9781449331818';

/**
 * Payload for adding a book to a profile
 */
export const booksAddedPayload = [
  {
    isbn: isbnBookAddedToProfile
  }
];

/**
 * Calls GET '/BookStore/v1/Books' checks status code for 200 and returns JSON books object
 * @param request Playwright request class
 * @returns JSON object of books from GET '/BookStore/v1/Books'
 */
export async function getAllBooks(request: APIRequestContext): Promise<any> {
  const response = await request.get('/BookStore/v1/Books');
  expect(response.status()).toBe(200);

  return (await response.json()).books;
}

/**
 * Calls POST '/BookStore/v1/Books' checks status code for 201 and returns JSON object with books added to profile
 * @param request Playwright request class
 * @param authorization Basic authorization string
 * @param payload Payload required for POST '/BookStore/v1/Books' call
 * @returns 
 */
export async function addBookToProfile(request: APIRequestContext, authorization: string, payload: object): Promise<any> {
  const response = await request.post('/BookStore/v1/Books', { headers: { Authorization: authorization }, 
    data: payload
  });
  expect(response.status()).toBe(201);

  return (await response.json());
}

/**
 * Calls DELETE '/BookStore/v1/Book' checks status code for 204
 * @param request Playwright request class
 * @param authorization Basic authorization string
 * @param payload Payload required for DELETE '/BookStore/v1/Book' call
 */
export async function deleteBookFromProfile(request: APIRequestContext, authorization: string, payload: object): Promise<void> {
  const response = await request.delete('/BookStore/v1/Book', { headers: { Authorization: authorization },
    data: payload
  });
  expect(response.status()).toBe(204);
}

/**
 * Verifies the schema received from GET '/BookStore/v1/Books' call
 * @param books JSON books object
 */
export function verifyAllBooksSchema(books: any[]): void {
  expect(books.length).toBeGreaterThanOrEqual(1);
  books.forEach(book => {
    expect(Object.keys(book)).toEqual(['isbn', 'title', 'subTitle', 'author', 'publish_date', 'publisher', 'pages', 'description', 'website']);
    verifyValuesTruthiness([book.isbn, book.title, book.subTitle, book.author, book.publish_date, book.publisher, book.pages.toString(), book.description, book.website]);
  });
}

/**
 * Verifies the schema received from POST '/BookStore/v1/Books' call
 * @param response JSON with ISBNs of book
 */
export function verifyBookAddedSchema(response: object) {
  expect(response).toEqual({ books: booksAddedPayload });
}