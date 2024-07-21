import React, { useEffect } from 'react';
import DishItem from './DishItem';
import { Dish } from '../../types';
import { addDish } from '../../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDeleteDishLoading,
  selectDishes,
  selectFetchDishesLoading,
} from '../../store/dishesSlice';
import { deleteDish, fetchDishes } from '../../store/dishesThunks';
import Spinner from '../Spinner/Spinner';

const Dishes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);

  const addDishToCart = (dish: Dish) => {
    dispatch(addDish(dish));
  };

  const removeDish = async (id: string) => {
    await dispatch(deleteDish(id));
    await dispatch(fetchDishes());
  };

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <>
      <h4>Dishes</h4>
      {dishesLoading ? (
        <Spinner />
      ) : (
        dishes.map((dish) => (
          <DishItem
            key={dish.id}
            dish={dish}
            addToCart={() => addDishToCart(dish)}
            onDelete={() => removeDish(dish.id)}
            deleteLoading={deleteLoading}
          />
        ))
      )}
    </>
  );
};

export default Dishes;
