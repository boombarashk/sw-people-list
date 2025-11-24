import React, { useEffect } from "react";
import { Pagination } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useAppDispatch, usePeopleSelector } from "../../store/store";
import {
  filterByTerm,
  filterList,
  setPage,
  setSearchTerm,
} from "../../store/peopleSlice";
import PaginationItem from "../../components/PaginationItem";
import Input from "antd/es/input";
import Button from "antd/es/button";
import styles from "./Nav.module.css";

const Nav = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const { page, count, searchTerm, loaded } = useSelector(usePeopleSelector);
  const { control, handleSubmit, watch, reset } = useForm<{ term: string }>({
    defaultValues: { term: searchTerm },
  });
  const watcher = watch();
  const disableBtn = !watcher.term;

  useEffect(() => {
    if (loaded) {
      if (searchTerm.length > 0) {
        dispatch(filterByTerm(searchTerm));
      } else {
        dispatch(filterList(page));
      }
    }
  }, [loaded, page, searchTerm]);

  useEffect(() => {
    reset({ term: searchTerm });
  }, [searchTerm]);

  const onChangePage = (value: number) => {
    dispatch(setPage(value));
  };
  const onSearch = (data: { term: string }) => {
    dispatch(setSearchTerm(data.term));
  };
  const onResetSearch = () => {
    dispatch(setSearchTerm(""));
  };

  return (
    <nav className={styles.container}>
      <form
        name="search"
        className={styles.search}
        onSubmit={handleSubmit(onSearch)}>
        <Controller
          name="term"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Поиск.."
              className={styles.searchInput}
              {...field}
            />
          )}
        />

        <Button
          title="Найти по имени персонажа"
          type="primary"
          htmlType="submit"
          className={disableBtn ? styles.noCursor : ""}>
          {/*<SearchOutlined />*/}Найти
        </Button>

        <Button
          title="Сбросить параметры поиска"
          variant="outlined"
          disabled={disableBtn}
          onClick={onResetSearch}
          className={styles.resetBtn}>
          Сбросить
        </Button>
      </form>

      <Pagination
        align="center"
        current={page}
        showSizeChanger={false}
        onChange={onChangePage}
        total={count}
        hideOnSinglePage
        itemRender={PaginationItem}
        className={searchTerm.length === 0 ? "" : styles.hidden}
      />
    </nav>
  );
};
export default Nav;
