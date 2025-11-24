import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import type { KeyPeopleProps, EditableRecord } from "../../types";
import { patchCard } from "../../store/peopleSlice";
import {
  API_GET_PEOPLE,
  LABEL_PEOPLE_PROPS,
  NO_ITERABLE_STRING_PROPS,
  NO_EDITABLE_STRING_PROPS,
  EPISODE_ID,
} from "../../const";
import {
  useAppDispatch,
  useFilmsSelector,
  usePeopleSelector,
  usePlanetSelector,
  useStarshipsSelector,
} from "../../store/store";
import NotFound from "../NotFound/NotFound";
import SaveIcon from "./diskette.png";
//import { SaveOutlined } from "@ant-design/icons";
import styles from "./CardDetail.module.css";

const CardDetail = (): React.ReactNode => {
  const { id } = useParams();

  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, control, handleSubmit } = useForm<EditableRecord>();

  const { list } = useSelector(usePeopleSelector);
  const { data: planets } = useSelector(usePlanetSelector);
  const { data: films } = useSelector(useFilmsSelector);
  const { data: starships } = useSelector(useStarshipsSelector);

  const people = list[`${API_GET_PEOPLE}/${id}/`];
  if (!people) {
    return <NotFound />;
  }

  const handlerEdit = () => {
    setEditMode(!editMode);
  };

  const handlerSave = (fields: EditableRecord) => {
    setEditMode(false);
    dispatch(patchCard(fields));
  };

  return (
    <div className="container">
      <h1 className="star-wars-text">{people.name}</h1>
      <form
        name="params"
        className={styles.grid}
        onSubmit={handleSubmit(handlerSave)}>
        <input type="hidden" value={people.url} {...register("url")} />

        {Object.keys(people).map((propName) => {
          if (NO_ITERABLE_STRING_PROPS.includes(propName as KeyPeopleProps))
            return null;

          if (typeof people[propName as KeyPeopleProps] === "string") {
            const value = String(people[propName as KeyPeopleProps]);
            return (
              <React.Fragment key={propName}>
                <label className={styles.label} htmlFor={propName}>
                  {LABEL_PEOPLE_PROPS[propName]}
                </label>
                <div className={styles.value}>
                  {editMode && !NO_EDITABLE_STRING_PROPS.includes(propName) ?
                    <Controller
                      defaultValue={value}
                      name={propName as keyof EditableRecord}
                      control={control}
                      render={({ field }) => <Input id={propName} {...field} />}
                    />
                  : propName !== "homeworld" ?
                    value
                  : (planets?.[value]?.name ?? value)}
                </div>
              </React.Fragment>
            );
          }

          if (propName === "starships" && people.starships.length > 0) {
            return (
              <React.Fragment key={propName}>
                <label className={styles.label}>
                  {LABEL_PEOPLE_PROPS[propName]}
                </label>
                <div className={styles.value}>
                  {people.starships.map((urlShip) => (
                    <div key={urlShip}>{starships[urlShip]?.name}</div>
                  ))}
                </div>
              </React.Fragment>
            );
          }

          if (propName === "films") {
            return (
              <React.Fragment key={propName}>
                <label className={styles.label}>
                  {LABEL_PEOPLE_PROPS[propName]}
                </label>
                <div className={styles.value}>
                  {people.films.map((urlFilm: string) => (
                    <div key={urlFilm}>
                      <b className="star-wars-text">
                        {EPISODE_ID[films[urlFilm]?.episode_id - 1]}
                      </b>{" "}
                      {films[urlFilm]?.title}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          }
        })}

        <div className={styles.action}>
          <Button
            variant="outlined"
            onClick={handlerEdit}
            className={styles.resetBtn}>
            {editMode ? "Сбросить" : "Редактировать"}
          </Button>
          {editMode && (
            <Button
              type="primary"
              title="Сохранить изменения"
              htmlType="submit">
              <img src={SaveIcon} alt="" style={{ height: "1rem" }} /> Сохранить
            </Button>
          )}
        </div>
      </form>
      <p className={styles.back}>
        <a onClick={() => navigate(-1)}>&larr; Назад</a>
      </p>
    </div>
  );
};

export default CardDetail;
