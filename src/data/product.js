import { Category } from "./category";
import { Subcategory } from "./subcategory";
import { DosageForm } from "./dosageForm";
import { AdministrationRoute } from "./administrationRoute";
import { Catalog } from "./catalog";
import { Tag } from "./tag";
import { Provider } from "./provider";

/**
 *  @typedef Product
 *  @property {AdministrationRoute=} adminRoute
 *  @property {Catalog} catalog
 *  @property {Category=} category
 *  @property {Subcategory=} subcategory
 *  @property {boolean} consign
 *  @property {string} contentSize
 *  @property {number=} discount
 *  @property {DosageForm=} dosageForm
 *  @property {string} expirationDate
 *  @property {string=} imageUrl
 *  @property {Provider=} provider
 *  @property {number} purchasePriceUnit
 *  @property {number} sellingPriceUnit
 *  @property {number} stock
 *  @property {Tag[]} tags
 */
