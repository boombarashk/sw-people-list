import React from "react";
import Card from "antd/es/card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Alert from "antd/es/alert";
import { usePeopleSelector } from "../../store/store";
import Nav from "../Nav/Nav";
import type { IPeople } from "../../types";
import styles from "./CardList.module.css";

const CardList = (): React.ReactNode => {
  const navigate = useNavigate();
  const { selectedPeople, loaded } = useSelector(usePeopleSelector);

  const handleClick = (url: string) => {
    const id = url.match(/\d+(?=\/|$)/)?.[0] ?? "";

    if (id) {
      navigate(`/card/${id}`);
    }
  };

  return (
    <>
      <h1 className="star-wars-text">Список персонажей</h1>

      <Nav />

      {selectedPeople.length > 0 && (
        <section className={styles.list}>
          {selectedPeople.map((item: IPeople) => (
            <Card
              key={item.url}
              title={item.name}
              onClick={() => handleClick(item.url)}
              className={styles.card}
              tabIndex={0}></Card>
          ))}
        </section>
      )}

      {loaded && selectedPeople.length === 0 && (
        <Alert title="Ни одного персонажа не найдено" type="warning" />
      )}
    </>
  );
};
export default CardList;
