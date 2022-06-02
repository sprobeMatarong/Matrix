import api from '../../../utils/api';
import { useEffect, useState } from 'react';
import DataTable from '../../../components/DataTable';
import { criteria, meta as defaultMeta } from '../../../config/search';
import AddEditModal from './AddEditModal';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function Users() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState(criteria);
  const [meta, setMeta] = useState(defaultMeta);
  const [open, setOpen] = useState(false);

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
      label: t('pages.users.first_name'),
    },
    {
      id: 'last_name',
      numeric: false,
      disablePadding: false,
      label: t('pages.users.last_name'),
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: t('pages.users.email_address'),
    },
    {
      id: 'status.name',
      numeric: false,
      disablePadding: false,
      label: t('pages.users.status'),
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

  const handleEdit = async (id) => {
    await api.get(`/users/${id}`).then(({ data }) => {
      setOpen(true);
      setUser(data.data);
    });
  };

  const handleDelete = async (ids) => {
    if (confirm(t('pages.users.delete_confirmation'))) {
      await api.delete(`/users/bulk-delete`, { data: { ids } }).then(() => {
        fetchUsers();
        toast(t('pages.users.user_deleted'), { type: 'success' });
      });
    }
  };

  const handleAdd = () => {
    setUser(null);
    setOpen(true);
  };

  const handleSaveEvent = (response) => {
    if (!user) {
      fetchUsers();
      setOpen(false);
      toast(t('pages.users.user_created'), { type: 'success' });
      return;
    }

    let updatedList = [...data];
    const index = updatedList.findIndex((row) => parseInt(row.id) === parseInt(response.id));
    updatedList[index] = response;
    setData(updatedList);
    setOpen(false);
    toast(t('pages.users.user_updated'), { type: 'success' });
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
        handleAdd={handleAdd}
      />

      <AddEditModal
        open={open}
        user={user}
        handleSaveEvent={handleSaveEvent}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}

export default Users;
