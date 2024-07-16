import { BehaviorSubject, Subject } from "rxjs";
import { distinctUntilChanged, map, takeUntil } from "rxjs/operators";

export type Sizes = "S" | "XS" | "M" | "L" | "XL" | "XXL";

export type ProductVariants = {
  color: string;
  imageUrl: string;
  hexCode?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  sizes?: Sizes[];
  variants?: ProductVariants[];
};

export type BagProduct = Product & {
  quantity: number;
  size: string;
  color: string;
};

const localStorageKey = "omul-bag";

// Function to save the bag to both localStorage and sessionStorage
const saveBagToStorage = (bag: BagProduct[]) => {
  const bagString = JSON.stringify(bag);
  localStorage.setItem(localStorageKey, bagString);
};

// Initial bag setup
const initialBag = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
export const bag = new BehaviorSubject<BagProduct[]>(initialBag);

// Subject for unsubscription
const unsubscribe$ = new Subject<void>();

// // Subscribe to bag changes to update storages
bag.pipe(takeUntil(unsubscribe$)).subscribe((updatedBag) => {
  saveBagToStorage(updatedBag);
});

// Get the current bag
export const getBag = () => {
  return bag.getValue();
};

// Add or update an item in the bag
export const addToBag = (item: BagProduct) => {
  const currentBag = getBag();
  const itemIndex = currentBag.findIndex(
    (bagItem) => bagItem.id === item.id && bagItem.size === item.size
  );

  let updatedBag;
  if (itemIndex > -1) {
    updatedBag = currentBag.map((bagItem, index) =>
      index === itemIndex
        ? { ...bagItem, quantity: bagItem.quantity + item.quantity }
        : bagItem
    );
  } else {
    updatedBag = [...currentBag, item];
  }

  bag.next(updatedBag);
};

// Observable for the bag
export const bagObservable = bag.asObservable();

// Observable for the number of items in the bag
export const noOfItemsObservable = bagObservable.pipe(
  map((bag) => bag.reduce((acc, item) => acc + item.quantity, 0)),
  distinctUntilChanged()
);

// Remove an item from the bag
export const removeFromBag = (id: string, size: string) => {
  const currentBag = getBag();
  const updatedBag = currentBag.filter(
    (bagItem) => !(bagItem.id === id && bagItem.size === size)
  );
  bag.next(updatedBag);
};

// Clear the bag
export const clearBag = () => {
  bag.next([]);
  localStorage.setItem(localStorageKey, "[]");
};

// Function to clean up the subscription
export const cleanup = () => {
  unsubscribe$.next();
  unsubscribe$.complete();
};
