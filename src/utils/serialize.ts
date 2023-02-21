/**
 * Create query string, as format: '?key=value&key2=value2'
 * @param params - Object with {key: value} schema
 */
export const getQueryString = (params: {
  [key: string]: string | number
}): string => {
  return '?' + new URLSearchParams(params as Record<string, string>).toString()
}

/**
 * Makes the first letter in the string uppercase
 * @param string
 */
export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
