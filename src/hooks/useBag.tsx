import { useEffect, useState } from "react";
import {
  addToBag,
  bagObservable,
  BagProduct,
  clearBag,
  noOfItemsObservable,
  removeFromBag,
} from "../util";

const useBag = () => {
  const [bag, setBag] = useState<BagProduct[]>([]);
  const [noOfItems, setNoOfItems] = useState<number>(0);

  useEffect(() => {
    const bagSubscription = bagObservable.subscribe(setBag);
    const noOfItemsSubscription = noOfItemsObservable.subscribe(setNoOfItems);

    return () => {
      bagSubscription.unsubscribe();
      noOfItemsSubscription.unsubscribe();
    };
  }, []);

  return { bag, noOfItems, addToBag, removeFromBag, clearBag };
};

export default useBag;
