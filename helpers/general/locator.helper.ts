import { Locator } from '@playwright/test';

/**
 * Fill value into input or text area and presses enter on keyboard
 * @param locator Locator where we want to fill specific value
 * @param value Value we want to fill in locator
 */
export async function fillAndPressEnter(locator: Locator, value: string): Promise<void> {
  await locator.fill(value);
  await locator.press('Enter');
}