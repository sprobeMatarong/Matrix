import api from '../../utils/api';
import { useEffect, useState } from 'react';
import DataTable from '../../components/DataTable';
import { criteria, meta as defaultMeta } from '../../config/search';
import EditModal from './EditModal';

function Users() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState(criteria);
  const [meta, setMeta] = useState(defaultMeta);
  const [isEdit, setIsEdit] = useState(false);

  const fetchUsers = async () => {
    return await api.get(`/users?${new URLSearchParams(query).toString()}`).then((response) => {
      setMeta({ ...meta, ...response.data.meta });
      setData(response.data.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [query]);

  const headers = [
    {
      id: 'id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'first_name',
      numeric: false,
      disablePadding: false,
      label: 'First Name',
    },
    {
      id: 'last_name',
      numeric: false,
      disablePadding: false,
      label: 'Last Name',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email Address',
    },
    {
      id: 'status.name',
      numeric: false,
      disablePadding: false,
      label: 'Status',
    },
  ];

  const handleChangePage = (event, value) => {
    setQuery({ ...query, ...{ page: value } });
  };

  const handleSort = (event, { order, sort }) => {
    setQuery({ ...query, ...{ order, sort } });
  };

  const handleChangeKeyword = (event) => {
    if (event.key !== 'Enter' || event.keyCode !== 13) return;
    setQuery({ ...query, ...{ keyword: event.target.value, page: 1 } });
  };

  const handleEdit = (id) => {
    const user = data.find((user) => user.id === id);
    setIsEdit(true);
    setUser(user);
    // show edit modal
    // send api request
    // update redux
  };

  const handleDelete = (ids) => {
    console.log(ids);
    // show confirm modal
    // send api request
    // reload page
  };

  return (
    <>
      <DataTable
        header={headers}
        data={data}
        page={query.page}
        total={meta.lastPage}
        order={query.order}
        sort={query.sort}
        handleChangePage={handleChangePage}
        handleSort={handleSort}
        handleChangeKeyword={handleChangeKeyword}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <EditModal open={isEdit} user={user} handleClose={() => setIsEdit(false)} />
    </>
  );
}

export default Users;
