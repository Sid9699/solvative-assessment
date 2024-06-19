import { Loader, SearchBox, Table } from "@components";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { TCity } from "@interfaces";
import { CitiesService } from "@services";

export const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [data, setData] = useState<Array<TCity>>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await CitiesService.getAll(page * size, size, search);
        setData(res.data.data);
        setRowCount(res.data.metadata.totalCount);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, size, search]);

  return (
    <>
      {loading && <Loader />}
      <header>
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search Places..."
        />
      </header>
      <main>
        <Table
          columns={[
            {
              key: "city",
              label: "Place Name",
            },
            {
              key: "country",
              label: "Country",
            },
          ]}
          rows={data}
          rowCount={rowCount}
          page={page}
          size={size}
          onPageChange={setPage}
          onSizeChange={setSize}
        />
      </main>
    </>
  );
};
