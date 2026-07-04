/**
 * Creates basic authorization token for API calls
 * @param username Username for basic authorization
 * @param password Password for basic authorization
 * @returns Basic authorization token
 */
export function createBasicAuthorization(username: string = 'TomRaiman', password: string = 'E)XAt,cqMfHK&9z') { // Not at all how I would handle the secrets, this is just for demonstration purposes
  return `Basic ${btoa(`${username}:${password}`)}`; 
}