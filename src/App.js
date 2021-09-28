import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

function App() {
  const [userList, setUserList] = useState([]);

  const columns = [
    { dataField: "id", text: "Id" },
    { dataField: "name", text: "Name", sort: true, filter: textFilter() },
    {
      dataField: "username",
      text: "username",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "email", text: "Email", sort: true, filter: textFilter() },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,

    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUserList(response.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <BootstrapTable
        bootstrap4
        keyField="id"
        columns={columns}
        data={userList}
        pagination={pagination}
        filter={filterFactory()}
        rowStyle={{ backgroundColor: "grey", width: 50, color: "black" }}
      ></BootstrapTable>
    </div>
  );
}

export default App;
