import { expect, Locator } from '@playwright/test';

/**
 * Verifies if elements are visible
 * @param locators Array of locators we want to check visibility on
 */
export async function verifyElementsVisibility(locators: Locator[]): Promise<void> {
  for(const locator of locators) {
    await expect(locator).toBeVisible();
  }
}

/**
 * Verifies if values are truthy
 * @param values Array of values we want to check for truthiness
 */
export function verifyValuesTruthiness(values: string[]): void {
  values.forEach(value => { expect(value).toBeTruthy(); });
}

/**
 * Verifies if elements have text we want to compare to
 * @param locators List of locators in which we want to look for compare phrase
 * @param comparePhrase Phrase against which we want to compare the locator text
 */
export async function verifyElementsHavePhrase(locators: Locator[], comparePhrase: string|RegExp): Promise<void> {
  for(const locator of locators) {
    await expect(locator).toHaveText(comparePhrase);
  }
}