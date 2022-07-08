import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '../atoms/DataTable/TableHead';
import TableToolbar from '../atoms/DataTable/TableToolbar';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

DataTable.propTypes = {
  header: PropTypes.array.isRequired,
  data: PropTypes.array,
  page: PropTypes.number,
  total: PropTypes.number,
  handleChangePage: PropTypes.func,
  order: PropTypes.string,
  sort: PropTypes.string,
  handleSort: PropTypes.func,
  handleChangeKeyword: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleAdd: PropTypes.func,
};

DataTable.defaultProps = {
  data: [],
  page: 1,
  total: 1,
  order: 'desc',
  sort: 'id',
};

function DataTable(props) {
  const {
    data,
    header,
    page,
    total,
    order,
    sort,
    handleChangePage,
    handleSort,
    handleChangeKeyword,
    handleDelete,
    handleEdit,
    handleAdd,
  } = props;
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // handle event from parent component
  const handleClickEdit = () => handleEdit(selected[0]);

  // handle event from parent component
  const handleClickDelete = () => handleDelete(selected);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <Box sx={{ alignItems: 'center' }}>
          <Button
            onClick={() => handleAdd()}
            size="medium"
            variant="contained"
            sx={{ mr: 1, height: '40px' }}
            startIcon={<AddIcon />}
            disableElevation
          >
            {t('labels.add_new')}
          </Button>

          <TextField
            variant="outlined"
            size="small"
            onKeyUp={handleChangeKeyword}
            InputProps={{
              style: { backgroundColor: '#fff' },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            placeholder={t('labels.enter_keyword')}
          />
        </Box>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          selectedCount={selected.length}
          onClickEdit={handleClickEdit}
          onClickDelete={handleClickDelete}
        />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead
              selectedCount={selected.length}
              order={order}
              orderBy={sort}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleSort}
              rowCount={data.length}
              headCells={header}
            />
            <TableBody>
              {data.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {header.map((cell, index) => {
                      const getLabel = (cell) => {
                        let label = row;
                        // support value from objects e.g cell id: "status.name"  |  { "status": { "name": "Active"} }
                        cell.id.split('.').forEach((key) => {
                          label = label[key];
                        });
                        return label;
                      };

                      return (
                        <TableCell key={index} align={cell.numeric ? 'right' : 'left'}>
                          {getLabel(cell)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}

              {data.length < 1 && (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} sx={{ display: 'flex', alignItems: 'end', py: 1 }}>
          <Pagination onChange={handleChangePage} page={page} count={total} />
        </Stack>
      </Paper>
    </Box>
  );
}

export default DataTable;
