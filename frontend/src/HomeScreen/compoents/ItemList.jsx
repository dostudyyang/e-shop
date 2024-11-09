import React, { useEffect, useState } from "react";
import { ReturnItem } from "./ReturnItem";
import { SpinnerLoading } from "../../components/Utils/SpinnerLoading";

export const ItemList = () => {


    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const baseUrl = `http://localhost:8080/api/items`;

            const url = `${baseUrl}?page=0&size=9`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Somthing went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.items;

            const loadedItems = [];

            for (const key in responseData) { // key is the indices of the array
                // {id:1, title:xxx} creates a new ItemModel Object
                loadedItems.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    category: responseData[key].category,
                    brand: responseData[key].brand,
                    quantity: responseData[key].quantity,
                    price: responseData[key].price,
                    img: responseData[key].img,
                });
            }

            setItems(loadedItems);
            setIsLoading(false);
        };

        fetchItems().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });

    }, [])

    if (isLoading) {
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Item List</h2>
      <div className="row">
        {items.map((item) => (
          <ReturnItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
