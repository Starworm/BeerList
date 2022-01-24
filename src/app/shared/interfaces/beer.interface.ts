/** interface for describing of parsed beer object */

export interface BeerInterface {
  /** name of beer */
  beer_name: string;
  /** url path to beer's image */
  image_url: string;
  /** beer's tag */
  tagline: string;
  /** beer description */
  beer_description: string;
}
